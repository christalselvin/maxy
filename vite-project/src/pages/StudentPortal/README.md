# Student Portal (frontend)

The React side of the MaxoTechs Student Portal: **one login page for both
Students and Admins**, authenticated by **phone number + captcha** (Admin:
phone number, then password) against a Flask + MongoDB backend (see
`../../../../Backend/portal.py` for the full backend implementation).

There is no role picker on the login page — the backend determines the
role from whichever account the phone number belongs to, and the frontend
auto-redirects to the matching dashboard.

## Setup

```bash
cd vite-project
npm install

# Point this at your running Flask backend (see ../../../../Backend/README
# or the repo root README for how to start it). Already set in .env by
# default:
#   VITE_PORTAL_API_BASE_URL=http://localhost:8000

npm run dev
```

The backend must be running (`python app.py` inside `Backend/`) for login,
the student dashboard, and the admin console to work — this frontend has
no local mock data anymore.

## Routes

| Route                                      | Role    | Description                                              |
|----------------------------------------------|---------|------------------------------------------------------------|
| `/student-portal`                             | Both    | Single login page: Phone Number + Captcha                  |
| `/student-portal/dashboard`                   | Student | Own profile (name, phone, college, course, year)            |
| `/student-portal/dashboard/projects`          | Student | Own assigned projects, downloadable if a file was uploaded  |
| `/student-portal/dashboard/certificates`      | Student | Own assigned certificates, downloadable if a file exists    |
| `/student-portal/admin`                       | Admin   | Searchable list of **all** students                         |
| `/student-portal/admin/students/:studentId`   | Admin   | Full student profile + add/upload projects & certificates|

## Auth flow

1. `StudentLogin.tsx` fetches a one-time image captcha from
   `GET /api/auth/captcha/` on load (and after any failed attempt).
2. The person enters their **phone number** and the **code shown in the
   image** — nothing else.
3. `POST /api/auth/login/` is called with `{ phone_number, captcha_key,
   captcha_value }`. The backend verifies the captcha, looks up the phone
   number against its `portal_users` collection, and returns a JWT token
   pair plus `role` (`"student"` or `"admin"`) and a `redirect` path.
4. `PortalAuthContext` stores the tokens (`localStorage` if "Keep me
   signed in" is checked, otherwise `sessionStorage`) and the frontend
   navigates straight to `result.redirect` — no role selection, no second
   login form.
5. Every subsequent API call carries `Authorization: Bearer <access
   token>` (added automatically by `src/lib/api.ts`); a 401 triggers a
   one-time silent refresh via the stored refresh token before falling
   back to logging the person out.

## Access control

- **`RequireRole.tsx`** is the single route guard, parameterized by role
  (`<RequireRole role="student">` / `<RequireRole role="admin">`). Both
  check the exact same session — a Student's valid session never satisfies
  `role="admin"`, so `/student-portal/admin*` is unreachable for a student
  even by navigating to the URL directly, and there is nothing in the UI
  that links there for a student to find.
- **Students** only ever see their own data — `StudentPortalLayout.tsx`
  calls `GET /students/me/`, which takes no student ID at all; the backend
  derives "which student" entirely from the authenticated token.
- **Admins** can browse/search the full student directory
  (`GET /admin/students/`), open any student's full profile
  (`GET /admin/students/:id/`), and upload a project or certificate file
  for any student via the forms in `AdminStudentDetail.tsx`
  (`AdminProjectUploadForm.tsx` / `AdminCertificateUploadForm.tsx`).
- **Downloads** never hit a plain file URL — `utils/download.ts` calls the
  backend's protected `/projects/:id/download/` and
  `/certificates/:id/download/` endpoints with the person's auth token, so
  the server enforces (not just hides) that a student can only download
  their own files while an admin can download anyone's.
- **Previews** work the same way — `utils/preview.ts` calls the sibling
  `/projects/:id/preview/` / `/certificates/:id/preview/` endpoints (and
  their per-file `/project-files/:id/preview/` /
  `/certificate-files/:id/preview/` equivalents), which apply the exact
  same role/ownership checks as the download endpoints but respond with
  `Content-Disposition: inline` instead of `attachment`. `ProjectCard.tsx`
  and `CertificateCard.tsx` use this to let a student view a project or
  certificate (images and PDFs render in a modal; other file types show a
  "download to view" notice) before deciding to download it.

## Folder structure

```
src/pages/StudentPortal/
├── StudentLogin.tsx                    # Single login page: phone + captcha
├── RequireRole.tsx                     # Role-parameterized route guard
├── StudentPortalLayout.tsx             # Fetches own profile, shares via Outlet context
├── StudentDashboardHome.tsx            # Own profile summary
├── StudentProjects.tsx                 # Own projects (protected download)
├── StudentCertificates.tsx             # Own certificates (protected download)
├── AdminPortalLayout.tsx               # Admin console chrome
├── AdminDashboardHome.tsx              # All-students list + search
├── AdminStudentDetail.tsx              # Full detail + upload forms
├── types.ts                            # Types matching the backend's JSON responses
├── context/
│   └── PortalAuthContext.tsx           # Single auth context for both roles
├── components/
│   ├── ProjectCard.tsx
│   ├── CertificateCard.tsx
│   ├── AdminStudentCard.tsx
│   ├── AdminProjectUploadForm.tsx      # Admin: add a project (+ file)
│   ├── AdminCertificateUploadForm.tsx  # Admin: add a certificate (+ file)
│   └── EmptyState.tsx
└── utils/
    ├── download.ts                     # Protected-endpoint file downloads
    └── initials.ts                     # Avatar initials from a full name

src/lib/api.ts                          # Axios client: JWT + auto-refresh
```

## Demo accounts

Created by the backend's `python seed_demo_data.py` (run once, inside
`Backend/`, after installing requirements):

| Role    | Phone number     | Password    |
|---------|------------------|-------------|
| Admin   | `8754975995`     | `Admin@123` |
| Student | `+919876543210`  | *(none — phone + captcha only)* |

## Security note

Phone number + captcha proves the person isn't a bot; it does **not**
prove they own that phone number. This matches exactly what was
requested, but before using this anywhere beyond a demo/internal tool,
add a real SMS OTP verification step — see `Backend/portal.py`'s
`LoginView`-equivalent (`login()` in that file) for where to plug that in.
