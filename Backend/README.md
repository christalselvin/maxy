# Backend (Flask)

Single Flask server providing both of the site's APIs:

- **Blog / Contact API** (`app.py`) — `/login`, `/register`, `/blog`,
  `/blogs`, `/blogs/search`, `/contact`, `/contacts`. Used by the public
  site's blog pages.
- **Student Portal API** (`portal.py`, mounted under `/api/*`) — captcha,
  phone/admin login, JWT refresh, student profile, and admin management of
  students/projects/certificates. Used by `src/pages/StudentPortal/*` in
  the Vite frontend. This replaces the previous Django backend.

Both run on the same server/port, so the frontend only ever needs to know
about one backend URL (`http://localhost:8000` by default — see
`vite-project/.env`).

Data is stored in **PostgreSQL**, via SQLAlchemy (`models.py`). This
backend previously used MongoDB directly through `pymongo` — see
"Migrating from MongoDB" below if you have existing data to bring over.

## Setup

```bash
cd Backend
python -m venv venv
source venv/bin/activate        # venv\Scripts\activate on Windows
pip install -r requirements.txt
```

Get a PostgreSQL database (local install, Docker, or a managed provider —
see `docker-compose.yml` for a local Docker option) and set `DATABASE_URL`
in `.env`:

```
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/<database>
```

`.env` also contains a generated `PORTAL_JWT_SECRET` and
`CORS_ALLOWED_ORIGINS`, which controls which frontend origins may call the
API (defaults to the Vite dev server, `http://localhost:5173`).

Tables are created automatically on first run (`db.create_all()` in
`app.py`) — no separate migration step needed for a fresh database. For
schema changes down the line, consider adopting
[Flask-Migrate](https://flask-migrate.readthedocs.io/)/Alembic instead of
relying on `create_all()`.

Create the demo Student Portal accounts (run once):

```bash
python seed_demo_data.py
```

This creates:

| Role    | Phone number     | Password    |
|---------|------------------|-------------|
| Admin   | `8754975995`     | `Admin@123` |
| Student | `+919876543210`  | *(none — phone + captcha only)* |

Start the server:

```bash
python app.py
```

The server listens on `http://0.0.0.0:8000` by default (matches
`VITE_API_BASE_URL` / `VITE_PORTAL_API_BASE_URL` in `vite-project/.env`).

### Running with Docker Compose

`docker-compose.yml` runs both PostgreSQL and the Flask backend:

```bash
docker compose up --build
```

Set `PORTAL_JWT_SECRET` and `CORS_ALLOWED_ORIGINS` in your shell (or a
`.env` file next to `docker-compose.yml`) before running it — see the
comments in `docker-compose.yml` for details. Change the default
`change-me` Postgres password for anything beyond local dev.

## Data & file storage

- PostgreSQL tables (see `models.py`): `users`, `blogs`, `contacts`
  (Blog/Contact API) and `portal_users`, `student_profiles`, `projects`,
  `certificates`, `project_files`, `certificate_files`, `captchas`
  (Student Portal API), all in the same database. Former Mongo
  `student_id`/`project_id`/`user_id`-style references are now real
  foreign keys with `ON DELETE CASCADE` where appropriate.
- Uploaded student profile photos are saved under `Backend/media/` and
  served publicly at `/media/<path>`.
- Uploaded project/certificate attachments are saved under
  `Backend/private_media/` and are **not** served by any static route —
  they're only reachable through the protected `.../download/` and
  `.../preview/` endpoints in `portal.py`, which check the requester's
  role and ownership first.

Both `media/` and `private_media/` are created automatically on first run.

## Migrating from MongoDB

If you have existing data in the old MongoDB database, `migrate_data.py`
copies it over once your new PostgreSQL database is set up:

```bash
pip install pymongo   # temporary — not a runtime dependency otherwise
MONGO_URI="<your old Mongo connection string>" \
DATABASE_URL="<your new Postgres connection string>" \
python migrate_data.py
```

It migrates `User`/`Blog`/`Contact` and all of the Student Portal
collections, remapping Mongo `ObjectId`s to the new Postgres UUIDs and
preserving foreign-key relationships. Old plaintext admin passwords (in
the `User` collection) are re-hashed with `generate_password_hash` in the
process — the previous `app.py` stored these as plaintext, which this
migration also fixes. Captchas are intentionally not migrated (they're
short-lived, 5-minute tokens).

Run it once against a copy of your data to verify row counts and spot-check
a few records, then once for real during a maintenance window.
