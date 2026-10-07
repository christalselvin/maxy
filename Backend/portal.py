import io
import mimetypes
import os
import random
import re
import string
import uuid
from collections import defaultdict
from datetime import datetime, timedelta, timezone
from functools import wraps

import jwt
from flask import Blueprint, current_app, jsonify, request, send_file
from dotenv import load_dotenv
from PIL import Image, ImageDraw, ImageFont
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename

from extensions import db
from models import (
    Captcha,
    Certificate,
    CertificateFile,
    PortalUser,
    Project,
    ProjectFile,
    StoredFile,
    StudentProfile,
)

portal_bp = Blueprint("portal", __name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

load_dotenv()

# ---------------------------------------------------------
# Storage paths
# Vercel filesystem is read-only except /tmp
# ---------------------------------------------------------
if os.environ.get("VERCEL"):
    MEDIA_ROOT = "/tmp/media"
    PRIVATE_MEDIA_ROOT = "/tmp/private_media"
else:
    MEDIA_ROOT = os.path.join(BASE_DIR, "media")
    PRIVATE_MEDIA_ROOT = os.path.join(BASE_DIR, "private_media")

os.makedirs(MEDIA_ROOT, exist_ok=True)
os.makedirs(PRIVATE_MEDIA_ROOT, exist_ok=True)

# ---------------------------------------------------------
# JWT configuration
# ---------------------------------------------------------
JWT_SECRET = os.getenv(
    "PORTAL_JWT_SECRET",
    "dev-insecure-portal-secret-change-me"
)

JWT_ALGORITHM = "HS256"

ACCESS_TOKEN_LIFETIME = timedelta(hours=8)
REFRESH_TOKEN_LIFETIME = timedelta(days=7)
CAPTCHA_LIFETIME = timedelta(minutes=5)
CAPTCHA_LENGTH = 5

CAPTCHA_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

ROLE_STUDENT = "student"
ROLE_ADMIN = "admin"


# ---------------------------------------------------------
# Error helper
# ---------------------------------------------------------
def _err(message, status_code):
    return jsonify({"detail": message}), status_code


# ---------------------------------------------------------
# UUID helper
# ---------------------------------------------------------
def _uuid_or_none(value):
    """
    Postgres-UUID equivalent of the old _oid_or_none
    helper — accepts any string, returns a uuid.UUID or None.
    """
    try:
        return uuid.UUID(str(value))
    except (ValueError, AttributeError, TypeError):
        return None


# ---------------------------------------------------------
# JWT
# ---------------------------------------------------------
def _encode_token(user_id, token_type, lifetime):
    now = datetime.now(timezone.utc)

    payload = {
        "user_id": str(user_id),
        "type": token_type,
        "iat": now,
        "exp": now + lifetime,
        "jti": uuid.uuid4().hex,
    }

    return jwt.encode(
        payload,
        JWT_SECRET,
        algorithm=JWT_ALGORITHM
    )


def _tokens_for(user):
    return {
        "access": _encode_token(
            user.id,
            "access",
            ACCESS_TOKEN_LIFETIME
        ),
        "refresh": _encode_token(
            user.id,
            "refresh",
            REFRESH_TOKEN_LIFETIME
        ),
    }


def _decode_token(token, expected_type):
    try:
        payload = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=[JWT_ALGORITHM]
        )
    except jwt.ExpiredSignatureError:
        return None, "Token has expired."
    except jwt.InvalidTokenError:
        return None, "Token is invalid."

    if payload.get("type") != expected_type:
        return None, "Token is invalid."

    return payload, None


# ---------------------------------------------------------
# Authentication
# ---------------------------------------------------------
def _get_user_from_request():
    """Returns (user, error_message). user is None on failure."""

    auth_header = request.headers.get("Authorization", "")

    if not auth_header.startswith("Bearer "):
        return None, "Authentication credentials were not provided."

    token = auth_header[len("Bearer "):].strip()

    payload, error = _decode_token(token, "access")

    if error:
        return None, error

    user_id = _uuid_or_none(payload.get("user_id"))

    if user_id is None:
        return None, "Token is invalid."

    user = PortalUser.query.get(user_id)

    if not user or not user.is_active:
        return None, "User not found or inactive."

    return user, None


def require_auth(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        user, error = _get_user_from_request()

        if user is None:
            return _err(error, 401)

        request.portal_user = user

        return view(*args, **kwargs)

    return wrapped


def require_role(role):
    def decorator(view):
        @wraps(view)
        def wrapped(*args, **kwargs):
            user, error = _get_user_from_request()

            if user is None:
                return _err(error, 401)

            if user.role != role:
                message = (
                    "Admin access required."
                    if role == ROLE_ADMIN
                    else "Student access required."
                )

                return _err(message, 403)

            request.portal_user = user

            return view(*args, **kwargs)

        return wrapped

    return decorator


# ---------------------------------------------------------
# Phone helpers
# ---------------------------------------------------------
def _phone_login_candidates(raw):
    raw = (raw or "").strip()

    digits = re.sub(r"\D", "", raw)

    candidates = [raw] if raw else []

    if digits:
        candidates.append(digits)
        candidates.append(f"+{digits}")

        if len(digits) == 10:
            candidates.append(f"91{digits}")
            candidates.append(f"+91{digits}")

        elif len(digits) == 12 and digits.startswith("91"):
            candidates.append(digits[2:])

    seen = set()
    ordered = []

    for c in candidates:
        if c and c not in seen:
            seen.add(c)
            ordered.append(c)

    return ordered


def _find_user_by_phone(raw_phone, role=None):
    candidates = _phone_login_candidates(raw_phone)

    if not candidates:
        return None

    query = PortalUser.query.filter(
        PortalUser.phone_number.in_(candidates),
        PortalUser.is_active.is_(True)
    )

    if role:
        query = query.filter(
            PortalUser.role == role
        )

    return query.first()


# ---------------------------------------------------------
# CAPTCHA
# ---------------------------------------------------------
def _load_font(size):
    for name in (
        "DejaVuSans-Bold.ttf",
        "DejaVuSans.ttf",
        "Arial.ttf",
        "LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ):
        try:
            return ImageFont.truetype(name, size)
        except (IOError, OSError):
            continue

    # Serverless hosts (Vercel) have no system fonts. Pillow >= 10.1 can
    # draw its built-in font at any size; plain load_default() is a tiny
    # fixed-size bitmap font, which made the captcha text very small.
    try:
        return ImageFont.load_default(size=size)
    except TypeError:
        return ImageFont.load_default()


def _generate_captcha_image(text):
    width, height = 160, 60

    image = Image.new(
        "RGB",
        (width, height),
        color=(245, 245, 245)
    )

    draw = ImageDraw.Draw(image)

    # Noise lines behind the text.
    for _ in range(6):
        x1 = random.randint(0, width)
        y1 = random.randint(0, height)

        x2 = random.randint(0, width)
        y2 = random.randint(0, height)

        draw.line(
            ((x1, y1), (x2, y2)),
            fill=(random.randint(150, 200),) * 3,
            width=1,
        )

    font = _load_font(32)

    char_width = width // (len(text) + 1)

    for i, ch in enumerate(text):
        x = char_width * i + random.randint(5, 12)
        y = random.randint(5, 15)
        angle = random.randint(-20, 20)

        char_img = Image.new(
            "RGBA",
            (40, 40),
            (255, 255, 255, 0)
        )

        char_draw = ImageDraw.Draw(char_img)

        char_draw.text(
            (5, 0),
            ch,
            font=font,
            fill=(30, 40, 90, 255)
        )

        char_img = char_img.rotate(
            angle,
            expand=1
        )

        image.paste(
            char_img,
            (x, y),
            char_img
        )

    # Noise dots.
    for _ in range(80):
        x = random.randint(0, width - 1)
        y = random.randint(0, height - 1)

        draw.point(
            (x, y),
            fill=(random.randint(120, 180),) * 3
        )

    buffer = io.BytesIO()

    image.save(
        buffer,
        format="PNG"
    )

    return buffer.getvalue()


def _cleanup_expired_captchas():
    Captcha.query.filter(
        Captcha.expires_at < datetime.now(timezone.utc)
    ).delete(
        synchronize_session=False
    )

    db.session.commit()


@portal_bp.route(
    "/auth/captcha/",
    methods=["GET"]
)
def captcha_request():
    _cleanup_expired_captchas()

    text = "".join(
        random.choice(CAPTCHA_ALPHABET)
        for _ in range(CAPTCHA_LENGTH)
    )

    captcha_key = uuid.uuid4().hex

    db.session.add(
        Captcha(
            id=captcha_key,
            answer=text,
            expires_at=datetime.now(timezone.utc)
            + CAPTCHA_LIFETIME,
        )
    )

    db.session.commit()

    image_bytes = _generate_captcha_image(text)

    import base64

    b64 = base64.b64encode(
        image_bytes
    ).decode("ascii")

    return jsonify(
        {
            "captcha_key": captcha_key,
            "image_url": f"data:image/png;base64,{b64}",
        }
    )


def _verify_and_consume_captcha(
    captcha_key,
    captcha_value
):
    """
    Returns an error message, or None on success.
    One-time use.
    """

    store = Captcha.query.get(captcha_key)

    if not store:
        return (
            "Captcha expired or invalid. "
            "Please refresh and try again."
        )

    if store.expires_at < datetime.now(timezone.utc):
        db.session.delete(store)
        db.session.commit()

        return "Captcha expired. Please refresh and try again."

    if store.answer.strip().lower() != (
        captcha_value or ""
    ).strip().lower():
        return "Incorrect captcha. Please try again."

    # One-time use.
    db.session.delete(store)
    db.session.commit()

    return None


# ---------------------------------------------------------
# Student login
# ---------------------------------------------------------
@portal_bp.route(
    "/auth/login/",
    methods=["POST"]
)
def login():
    """Student login: phone number + captcha only."""

    data = request.get_json(
        silent=True
    ) or {}

    phone_number = data.get("phone_number")
    captcha_key = data.get("captcha_key")
    captcha_value = data.get("captcha_value")

    if (
        not phone_number
        or not captcha_key
        or captcha_value is None
    ):
        return _err(
            "phone_number, captcha_key and captcha_value are required.",
            400
        )

    captcha_error = _verify_and_consume_captcha(
        captcha_key,
        captcha_value
    )

    if captcha_error:
        return _err(
            captcha_error,
            400
        )

    user = _find_user_by_phone(
        phone_number
    )

    if user is None:
        return _err(
            "No account found with that phone number.",
            404
        )

    if user.role != ROLE_STUDENT:
        return _err(
            "Admin accounts sign in from the Admin login using a password.",
            400
        )

    tokens = _tokens_for(user)

    return jsonify(
        {
            **tokens,
            "role": user.role,
            "full_name": user.full_name or "",
            "redirect": "/student-portal/dashboard",
        }
    )


# ---------------------------------------------------------
# Admin authentication
# ---------------------------------------------------------
@portal_bp.route(
    "/auth/admin/check-phone/",
    methods=["POST"]
)
def admin_check_phone():
    data = request.get_json(
        silent=True
    ) or {}

    phone_number = data.get(
        "phone_number"
    )

    if not phone_number:
        return _err(
            "phone_number is required.",
            400
        )

    user = _find_user_by_phone(
        phone_number,
        role=ROLE_ADMIN
    )

    if user is None:
        return _err(
            "No Admin account found with that phone number.",
            404
        )

    return jsonify(
        {"exists": True}
    )


@portal_bp.route(
    "/auth/admin/login/",
    methods=["POST"]
)
def admin_login():
    data = request.get_json(
        silent=True
    ) or {}

    phone_number = data.get(
        "phone_number"
    )

    password = data.get(
        "password"
    )

    if not phone_number or not password:
        return _err(
            "phone_number and password are required.",
            400
        )

    user = _find_user_by_phone(
        phone_number,
        role=ROLE_ADMIN
    )

    password_hash = (
        user.password_hash
        if user
        else None
    )

    if (
        user is None
        or not password_hash
        or not check_password_hash(
            password_hash,
            password
        )
    ):
        return _err(
            "Incorrect phone number or password.",
            400
        )

    tokens = _tokens_for(user)

    return jsonify(
        {
            **tokens,
            "role": user.role,
            "full_name": user.full_name or "",
            "redirect": "/student-portal/admin",
        }
    )


@portal_bp.route(
    "/auth/admin/change-credentials/",
    methods=["POST"]
)
@require_role(ROLE_ADMIN)
def admin_change_credentials():
    """
    Admin Dashboard -> Settings -> Change Password
    and optionally phone number.
    """

    user = request.portal_user

    data = request.get_json(
        silent=True
    ) or {}

    current_phone_number = (
        data.get("current_phone_number")
        or ""
    ).strip()

    current_password = (
        data.get("current_password")
        or ""
    )

    new_phone_number = (
        data.get("new_phone_number")
        or ""
    ).strip()

    new_password = (
        data.get("new_password")
        or ""
    )

    if (
        not current_phone_number
        or not current_password
    ):
        return _err(
            "current_phone_number and current_password are required.",
            400
        )

    if user.phone_number not in _phone_login_candidates(
        current_phone_number
    ):
        return _err(
            "Current phone number is incorrect.",
            400
        )

    if (
        not user.password_hash
        or not check_password_hash(
            user.password_hash,
            current_password
        )
    ):
        return _err(
            "Current password is incorrect.",
            400
        )

    changing_password = bool(
        new_password
    )

    changing_phone = (
        bool(new_phone_number)
        and new_phone_number != user.phone_number
    )

    if not changing_password and not changing_phone:
        return _err(
            "Enter a new password and/or a new phone number to update.",
            400
        )

    if changing_password:
        if len(new_password) < 8:
            return _err(
                "New password must be at least 8 characters.",
                400
            )

        user.password_hash = generate_password_hash(
            new_password
        )

    if changing_phone:
        clash = PortalUser.query.filter(
            PortalUser.phone_number == new_phone_number,
            PortalUser.id != user.id,
        ).first()

        if clash:
            return _err(
                "That phone number is already in use by another account.",
                400
            )

        user.phone_number = new_phone_number

    db.session.commit()

    return jsonify(
        _serialize_me(user)
    )


# ---------------------------------------------------------
# Token refresh
# ---------------------------------------------------------
@portal_bp.route(
    "/auth/refresh/",
    methods=["POST"]
)
def refresh_token():
    data = request.get_json(
        silent=True
    ) or {}

    refresh = data.get(
        "refresh"
    )

    if not refresh:
        return _err(
            "refresh is required.",
            400
        )

    payload, error = _decode_token(
        refresh,
        "refresh"
    )

    if error:
        return _err(
            error,
            401
        )

    user_id = _uuid_or_none(
        payload.get("user_id")
    )

    if user_id is None:
        return _err(
            "Token is invalid.",
            401
        )

    user = PortalUser.query.get(
        user_id
    )

    if not user or not user.is_active:
        return _err(
            "User not found or inactive.",
            401
        )

    return jsonify(
        {
            "access": _encode_token(
                user.id,
                "access",
                ACCESS_TOKEN_LIFETIME
            )
        }
    )


# ---------------------------------------------------------
# Current user
# ---------------------------------------------------------
@portal_bp.route(
    "/auth/me/",
    methods=["GET"]
)
@require_auth
def me():
    user = request.portal_user

    return jsonify(
        _serialize_me(user)
    )


def _serialize_me(user):
    return {
        "id": str(user.id),
        "phone_number": user.phone_number or "",
        "full_name": user.full_name or "",
        "role": user.role,
    }


# ---------------------------------------------------------
# File storage
# ---------------------------------------------------------
def _store_file_in_db(storage_file, key):
    """Writes the uploaded file's bytes to the stored_files table."""
    data = storage_file.read()

    existing = db.session.get(StoredFile, key)
    if existing is not None:
        existing.data = data
        existing.mimetype = storage_file.mimetype
    else:
        db.session.add(
            StoredFile(
                key=key,
                data=data,
                mimetype=storage_file.mimetype,
            )
        )


def _delete_stored_files(prefix):
    """Removes every stored file whose key starts with ``prefix``."""
    StoredFile.query.filter(
        StoredFile.key.startswith(prefix, autoescape=True)
    ).delete(synchronize_session=False)


def _save_public_file(
    storage_file,
    *sub_parts
):
    """
    Saves in the database (stored_files, key ``public/<rel_path>``).
    Publicly served via /media/<rel_path>.
    """

    filename = (
        secure_filename(
            storage_file.filename
        )
        or "file"
    )

    unique_name = (
        f"{uuid.uuid4().hex}_{filename}"
    )

    rel_path = "/".join(
        [str(p) for p in sub_parts] + [unique_name]
    )

    _store_file_in_db(
        storage_file,
        f"public/{rel_path}"
    )

    return rel_path, filename


def _save_private_file(
    storage_file,
    *sub_parts
):
    """
    Saves in the database (stored_files, key ``private/<...>``).
    The returned key is what gets stored in ``file_path``.
    """

    filename = (
        secure_filename(
            storage_file.filename
        )
        or "file"
    )

    unique_name = (
        f"{uuid.uuid4().hex}_{filename}"
    )

    key = "private/" + "/".join(
        [str(p) for p in sub_parts] + [unique_name]
    )

    _store_file_in_db(
        storage_file,
        key
    )

    return key, filename


def _public_media_url(rel_path):
    if not rel_path:
        return None

    return (
        f"{request.host_url.rstrip('/')}"
        f"/media/{rel_path}"
    )


# ---------------------------------------------------------
# Project serialization
# ---------------------------------------------------------
def _serialize_project_file(f):
    return {
        "id": str(f.id),
        "file": None,
        "name": f.file_name or "",
        "uploaded_at": (
            f.uploaded_at.isoformat()
            if f.uploaded_at
            else None
        ),
    }


def _serialize_certificate_file(f):
    return {
        "id": str(f.id),
        "file": None,
        "name": f.file_name or "",
        "uploaded_at": (
            f.uploaded_at.isoformat()
            if f.uploaded_at
            else None
        ),
    }


def _serialize_project(p, files=None):
    # `files` is pre-fetched and passed in by the caller (see
    # _serialize_student_profile) to avoid one query per project. Falls
    # back to a per-project query only when called standalone.
    if files is None:
        files = (
            ProjectFile.query.filter_by(project_id=p.id)
            .order_by(ProjectFile.uploaded_at.desc())
            .all()
        )
    return {
        "id": str(p.id),
        "title": p.title or "",
        "description": p.description or "",
        "tech_stack": p.tech_stack or "",
        "status": p.status or "planned",
        "link": p.link or "",
        "file": None,
        "files": [
            _serialize_project_file(f)
            for f in files
        ],
        "uploaded_at": (
            p.uploaded_at.isoformat()
            if p.uploaded_at
            else None
        ),
    }


def _serialize_certificate(c, files=None):
    # See _serialize_project — same batching pattern.
    if files is None:
        files = (
            CertificateFile.query.filter_by(certificate_id=c.id)
            .order_by(CertificateFile.uploaded_at.desc())
            .all()
        )
    return {
        "id": str(c.id),
        "title": c.title or "",
        "issuer": c.issuer or "",
        "issue_date": (
            c.issue_date
            if c.issue_date
            else None
        ),
        "credential_id": c.credential_id or "",
        "file": None,
        "files": [
            _serialize_certificate_file(f)
            for f in files
        ],
        "uploaded_at": (
            c.uploaded_at.isoformat()
            if c.uploaded_at
            else None
        ),
    }


def _serialize_student_profile(profile):
    user = PortalUser.query.get(
        profile.user_id
    )

    projects = (
        Project.query
        .filter_by(student_id=profile.id)
        .order_by(
            Project.uploaded_at.desc()
        )
        .all()
    )

    certificates = (
        Certificate.query
        .filter_by(student_id=profile.id)
        .order_by(
            Certificate.uploaded_at.desc()
        )
        .all()
    )
    # Batch-fetch every project's/certificate's files in ONE query each
    # (instead of one query per project + one per certificate — the N+1
    # pattern that was making this endpoint slow). Group the flat result
    # by parent id in Python.
    project_ids = [p.id for p in projects]
    cert_ids = [c.id for c in certificates]

    project_files_by_id = defaultdict(list)
    if project_ids:
        for f in (
            ProjectFile.query.filter(ProjectFile.project_id.in_(project_ids))
            .order_by(ProjectFile.uploaded_at.desc())
            .all()
        ):
            project_files_by_id[f.project_id].append(f)

    cert_files_by_id = defaultdict(list)
    if cert_ids:
        for f in (
            CertificateFile.query.filter(CertificateFile.certificate_id.in_(cert_ids))
            .order_by(CertificateFile.uploaded_at.desc())
            .all()
        ):
            cert_files_by_id[f.certificate_id].append(f)

    return {
        "id": str(profile.id),
        "phone_number": (
            user.phone_number
            if user
            else ""
        ),
        "full_name": (
            user.full_name
            if user
            else ""
        ),
        "college_name": profile.college_name or "",
        "course_name": profile.course_name or "",
        "branch": profile.branch or "",
        "year": profile.year or "",
        "enrollment_type": profile.enrollment_type or "course",
        "photo": _public_media_url(
            profile.photo_path
        ),
        "projects": [
            _serialize_project(p, project_files_by_id[p.id]) for p in projects
        ],
        "certificates": [
            _serialize_certificate(c, cert_files_by_id[c.id]) for c in certificates
        ],
    }


def _serialize_student_list_item(profile):
    user = PortalUser.query.get(
        profile.user_id
    )

    project_count = (
        Project.query
        .filter_by(
            student_id=profile.id
        )
        .count()
    )

    certificate_count = (
        Certificate.query
        .filter_by(
            student_id=profile.id
        )
        .count()
    )

    return {
        "id": str(profile.id),
        "phone_number": (
            user.phone_number
            if user
            else ""
        ),
        "full_name": (
            user.full_name
            if user
            else ""
        ),
        "course_name": profile.course_name or "",
        "college_name": profile.college_name or "",
        "enrollment_type": (
            profile.enrollment_type
            or "course"
        ),
        "photo": _public_media_url(
            profile.photo_path
        ),
        "project_count": project_count,
        "certificate_count": certificate_count,
    }


# ---------------------------------------------------------
# Student fields
# ---------------------------------------------------------
@portal_bp.route(
    "/students/me/",
    methods=["GET"]
)
@require_role(ROLE_STUDENT)
def my_profile():
    user = request.portal_user

    profile = (
        StudentProfile.query
        .filter_by(
            user_id=user.id
        )
        .first()
    )

    if profile is None:
        profile = StudentProfile(
            user_id=user.id,
            college_name="",
            course_name="",
            branch="",
            year="",
            enrollment_type="course",
            photo_path=None,
        )

        db.session.add(profile)
        db.session.commit()

    return jsonify(
        _serialize_student_profile(
            profile
        )
    )


_STUDENT_FIELD_NAMES = (
    "full_name",
    "phone_number",
    "college_name",
    "course_name",
    "branch",
    "year",
    "enrollment_type",
)


def _student_write_fields_from_request():
    """
    Returns (fields, provided_keys, photo).
    """

    if (
        request.content_type
        and "multipart/form-data"
        in request.content_type
    ):
        source = request.form
    else:
        source = (
            request.get_json(
                silent=True
            )
            or {}
        )

    def get(key, default=""):
        value = source.get(
            key,
            default
        )

        return (
            value.strip()
            if isinstance(value, str)
            else value
        )

    fields = {
        name: get(name)
        for name in _STUDENT_FIELD_NAMES
    }

    if not fields["enrollment_type"]:
        fields["enrollment_type"] = "course"

    provided_keys = {
        name
        for name in _STUDENT_FIELD_NAMES
        if name in source
    }

    photo = (
        request.files.get("photo")
        if request.files
        else None
    )

    return (
        fields,
        provided_keys,
        photo
    )


# ---------------------------------------------------------
# Admin students
# ---------------------------------------------------------
@portal_bp.route(
    "/admin/students/",
    methods=["GET", "POST"]
)
@require_role(ROLE_ADMIN)
def admin_student_list():

    if request.method == "GET":
        profiles = StudentProfile.query.all()

        items = [
            _serialize_student_list_item(p)
            for p in profiles
        ]

        items.sort(
            key=lambda i: i["full_name"].lower()
        )

        return jsonify(items)

    # POST -> create new student.
    fields, _provided_keys, photo = (
        _student_write_fields_from_request()
    )

    if not fields["phone_number"]:
        return _err(
            "Phone number is required.",
            400
        )

    if (
        PortalUser.query
        .filter_by(
            phone_number=fields["phone_number"]
        )
        .first()
    ):
        return _err(
            "A user with this phone number already exists.",
            400
        )

    user = PortalUser(
        phone_number=fields["phone_number"],
        full_name=fields["full_name"],
        role=ROLE_STUDENT,
        password_hash=None,
        is_active=True,
        date_joined=datetime.now(timezone.utc),
    )

    db.session.add(user)
    db.session.flush()

    profile = StudentProfile(
        user_id=user.id,
        college_name=fields["college_name"],
        course_name=fields["course_name"],
        branch=fields["branch"],
        year=fields["year"],
        enrollment_type=(
            fields["enrollment_type"]
            or "course"
        ),
        photo_path=None,
    )

    if photo and photo.filename:
        rel_path, _name = _save_public_file(
            photo,
            "students",
            str(user.id),
            "photo"
        )

        profile.photo_path = rel_path

    db.session.add(profile)
    db.session.commit()

    return jsonify(
        _serialize_student_profile(
            profile
        )
    ), 201


def _get_profile_or_404(pk):
    uid = _uuid_or_none(pk)

    if uid is None:
        return None

    return StudentProfile.query.get(
        uid
    )


@portal_bp.route(
    "/admin/students/<pk>/",
    methods=["GET", "PUT", "PATCH", "DELETE"]
)
@require_role(ROLE_ADMIN)
def admin_student_detail(pk):

    profile = _get_profile_or_404(pk)

    if profile is None:
        return _err(
            "Not found.",
            404
        )

    if request.method == "GET":
        return jsonify(
            _serialize_student_profile(
                profile
            )
        )

    if request.method == "DELETE":
        _delete_student_cascade(
            profile
        )

        return "", 204

    fields, provided_keys, photo = (
        _student_write_fields_from_request()
    )

    user = PortalUser.query.get(
        profile.user_id
    )

    if (
        "phone_number" in provided_keys
        and fields["phone_number"]
    ):
        existing = (
            PortalUser.query
            .filter_by(
                phone_number=fields["phone_number"]
            )
            .first()
        )

        if (
            existing
            and existing.id != profile.user_id
        ):
            return _err(
                "A user with this phone number already exists.",
                400
            )

        user.phone_number = (
            fields["phone_number"]
        )

    if "full_name" in provided_keys:
        user.full_name = (
            fields["full_name"]
        )

    for key in (
        "college_name",
        "course_name",
        "branch",
        "year",
        "enrollment_type"
    ):
        if key in provided_keys:
            setattr(
                profile,
                key,
                fields[key]
            )

    if photo and photo.filename:
        _delete_stored_files(
            f"public/students/{profile.user_id}/photo/"
        )

        rel_path, _name = _save_public_file(
            photo,
            "students",
            str(profile.user_id),
            "photo"
        )

        profile.photo_path = rel_path

    db.session.commit()

    return jsonify(
        _serialize_student_profile(
            profile
        )
    )


def _delete_student_cascade(profile):
    project_ids = [
        row.id
        for row in (
            Project.query
            .filter_by(
                student_id=profile.id
            )
            .with_entities(
                Project.id
            )
        )
    ]

    certificate_ids = [
        row.id
        for row in (
            Certificate.query
            .filter_by(
                student_id=profile.id
            )
            .with_entities(
                Certificate.id
            )
        )
    ]

    for pid in project_ids:
        ProjectFile.query.filter_by(
            project_id=pid
        ).delete(
            synchronize_session=False
        )

    for cid in certificate_ids:
        CertificateFile.query.filter_by(
            certificate_id=cid
        ).delete(
            synchronize_session=False
        )

    Project.query.filter_by(
        student_id=profile.id
    ).delete(
        synchronize_session=False
    )

    Certificate.query.filter_by(
        student_id=profile.id
    ).delete(
        synchronize_session=False
    )

    for prefix in (
        f"public/students/{profile.user_id}/",
        f"private/projects/{profile.user_id}/",
        f"private/certificates/{profile.user_id}/",
    ):
        _delete_stored_files(prefix)

    user = PortalUser.query.get(
        profile.user_id
    )

    db.session.delete(profile)

    if user:
        db.session.delete(user)

    db.session.commit()


# ---------------------------------------------------------
# Projects / Certificates
# ---------------------------------------------------------
_PROJECT_FIELD_NAMES = (
    "title",
    "description",
    "tech_stack",
    "status",
    "link"
)

_CERTIFICATE_FIELD_NAMES = (
    "title",
    "issuer",
    "issue_date",
    "credential_id"
)


def _project_fields_from_form():
    form = request.form

    fields = {
        name: (
            form.get(name) or ""
        ).strip()
        for name in _PROJECT_FIELD_NAMES
    }

    if not fields["status"]:
        fields["status"] = "planned"

    provided_keys = {
        name
        for name in _PROJECT_FIELD_NAMES
        if name in form
    }

    return (
        fields,
        provided_keys
    )


def _certificate_fields_from_form():
    form = request.form

    fields = {
        name: (
            form.get(name) or ""
        ).strip()
        for name in _CERTIFICATE_FIELD_NAMES
    }

    provided_keys = {
        name
        for name in _CERTIFICATE_FIELD_NAMES
        if name in form
    }

    if not fields["issue_date"]:
        provided_keys.discard(
            "issue_date"
        )

    return (
        fields,
        provided_keys
    )


# ---------------------------------------------------------
# Project upload
# ---------------------------------------------------------
@portal_bp.route(
    "/admin/students/<student_id>/projects/",
    methods=["POST"]
)
@require_role(ROLE_ADMIN)
def admin_project_upload(student_id):

    profile = _get_profile_or_404(
        student_id
    )

    if profile is None:
        return _err(
            "Not found.",
            404
        )

    fields, _provided_keys = (
        _project_fields_from_form()
    )

    if not fields["title"]:
        return _err(
            "Title is required.",
            400
        )

    project = Project(
        student_id=profile.id,
        assigned_by=request.portal_user.id,
        uploaded_at=datetime.now(timezone.utc),
        **fields,
    )

    db.session.add(project)
    db.session.flush()

    for upload in request.files.getlist(
        "files"
    ):
        if not upload or not upload.filename:
            continue

        abs_path, filename = (
            _save_private_file(
                upload,
                "projects",
                str(profile.user_id),
                str(project.id)
            )
        )

        db.session.add(
            ProjectFile(
                project_id=project.id,
                student_id=profile.id,
                file_path=abs_path,
                file_name=filename,
                uploaded_at=datetime.now(
                    timezone.utc
                ),
            )
        )

    db.session.commit()

    return jsonify(
        _serialize_project(
            project
        )
    ), 201


# ---------------------------------------------------------
# Certificate upload
# ---------------------------------------------------------
@portal_bp.route(
    "/admin/students/<student_id>/certificates/",
    methods=["POST"]
)
@require_role(ROLE_ADMIN)
def admin_certificate_upload(student_id):

    profile = _get_profile_or_404(
        student_id
    )

    if profile is None:
        return _err(
            "Not found.",
            404
        )

    fields, _provided_keys = (
        _certificate_fields_from_form()
    )

    if not fields["title"]:
        return _err(
            "Title is required.",
            400
        )

    certificate = Certificate(
        student_id=profile.id,
        assigned_by=request.portal_user.id,
        uploaded_at=datetime.now(timezone.utc),
        **fields,
    )

    db.session.add(certificate)
    db.session.flush()

    for upload in request.files.getlist(
        "files"
    ):
        if not upload or not upload.filename:
            continue

        abs_path, filename = (
            _save_private_file(
                upload,
                "certificates",
                str(profile.user_id),
                str(certificate.id)
            )
        )

        db.session.add(
            CertificateFile(
                certificate_id=certificate.id,
                student_id=profile.id,
                file_path=abs_path,
                file_name=filename,
                uploaded_at=datetime.now(
                    timezone.utc
                ),
            )
        )

    db.session.commit()

    return jsonify(
        _serialize_certificate(
            certificate
        )
    ), 201


# ---------------------------------------------------------
# Project detail
# ---------------------------------------------------------
def _check_ownership_or_403(student_id):
    """
    Helper: check if current user owns the student.
    Returns a (message, status_code) error response if forbidden, else None.
    """
    if request.portal_user.role == ROLE_ADMIN:
        return None
    
    user_profile = StudentProfile.query.filter_by(
        user_id=request.portal_user.id
    ).first()
    
    if not user_profile or user_profile.id != student_id:
        return _err("Access denied.", 403)
    
    return None


def _send_protected_file(abs_path, filename, as_attachment):
    """
    Send a file from the protected storage.

    New uploads live in the database (key starts with ``private/``);
    older uploads that were saved on disk are still served from disk.
    """
    if abs_path and abs_path.startswith("private/"):
        stored = db.session.get(StoredFile, abs_path)

        if stored is None:
            return _err("File not found.", 404)

        return send_file(
            io.BytesIO(stored.data),
            mimetype=(
                stored.mimetype
                or mimetypes.guess_type(filename or "")[0]
                or "application/octet-stream"
            ),
            as_attachment=as_attachment,
            download_name=filename or "file",
        )

    if not abs_path or not os.path.exists(abs_path):
        return _err("File not found.", 404)
    
    return send_file(
        abs_path,
        as_attachment=as_attachment,
        download_name=filename if as_attachment else None
    )


@portal_bp.route(
    "/admin/projects/<pk>/",
    methods=["GET", "PUT", "PATCH", "DELETE"]
)
@require_role(ROLE_ADMIN)
def admin_project_detail(pk):

    uid = _uuid_or_none(pk)

    project = (
        Project.query.get(uid)
        if uid
        else None
    )

    if project is None:
        return _err("Not found.", 404)

    if request.method == "GET":
        return jsonify(
            _serialize_project(project)
        )

    if request.method == "DELETE":
        ProjectFile.query.filter_by(
            project_id=project.id
        ).delete(synchronize_session=False)

        _delete_stored_files(
            f"private/projects/{project.student.user_id}/{project.id}/"
        )
        
        db.session.delete(project)
        db.session.commit()
        
        return "", 204

    fields, provided_keys = (
        _project_fields_from_form()
    )

    for key in provided_keys:
        if key in _PROJECT_FIELD_NAMES:
            setattr(project, key, fields[key])

    db.session.commit()

    return jsonify(
        _serialize_project(project)
    )


@portal_bp.route(
    "/admin/certificates/<pk>/",
    methods=["GET", "PUT", "PATCH", "DELETE"]
)
@require_role(ROLE_ADMIN)
def admin_certificate_detail(pk):

    uid = _uuid_or_none(pk)

    certificate = (
        Certificate.query.get(uid)
        if uid
        else None
    )

    if certificate is None:
        return _err("Not found.", 404)

    if request.method == "GET":
        return jsonify(
            _serialize_certificate(certificate)
        )

    if request.method == "DELETE":
        CertificateFile.query.filter_by(
            certificate_id=certificate.id
        ).delete(synchronize_session=False)

        _delete_stored_files(
            f"private/certificates/{certificate.student.user_id}/{certificate.id}/"
        )
        
        db.session.delete(certificate)
        db.session.commit()
        
        return "", 204

    fields, provided_keys = (
        _certificate_fields_from_form()
    )

    for key in provided_keys:
        if key in _CERTIFICATE_FIELD_NAMES:
            setattr(certificate, key, fields[key])

    db.session.commit()

    return jsonify(
        _serialize_certificate(certificate)
    )


# ---------------------------------------------------------
# File download/preview endpoints
# ---------------------------------------------------------
@portal_bp.route("/projects/<project_id>/download/", methods=["GET"])
@require_auth
def project_download(project_id):
    return _project_file_legacy(project_id, as_attachment=True)


@portal_bp.route("/projects/<project_id>/preview/", methods=["GET"])
@require_auth
def project_preview(project_id):
    return _project_file_legacy(project_id, as_attachment=False)


def _project_file_legacy(project_id, as_attachment):
    uid = _uuid_or_none(project_id)
    project = Project.query.get(uid) if uid else None
    if project is None:
        return _err("Not found.", 404)
    forbidden = _check_ownership_or_403(project.student_id)
    if forbidden:
        return forbidden
    return _err("No file has been uploaded for this project yet.", 404)


@portal_bp.route("/certificates/<certificate_id>/download/", methods=["GET"])
@require_auth
def certificate_download(certificate_id):
    return _certificate_file_legacy(certificate_id, as_attachment=True)


@portal_bp.route("/certificates/<certificate_id>/preview/", methods=["GET"])
@require_auth
def certificate_preview(certificate_id):
    return _certificate_file_legacy(certificate_id, as_attachment=False)


def _certificate_file_legacy(certificate_id, as_attachment):
    uid = _uuid_or_none(certificate_id)
    certificate = Certificate.query.get(uid) if uid else None
    if certificate is None:
        return _err("Not found.", 404)
    forbidden = _check_ownership_or_403(certificate.student_id)
    if forbidden:
        return forbidden
    return _err("No file has been uploaded for this certificate yet.", 404)


@portal_bp.route("/project-files/<file_id>/download/", methods=["GET"])
@require_auth
def project_file_download(file_id):
    return _project_file_by_id(file_id, as_attachment=True)


@portal_bp.route("/project-files/<file_id>/preview/", methods=["GET"])
@require_auth
def project_file_preview(file_id):
    return _project_file_by_id(file_id, as_attachment=False)


def _project_file_by_id(file_id, as_attachment):
    uid = _uuid_or_none(file_id)
    doc = ProjectFile.query.get(uid) if uid else None
    if doc is None:
        return _err("Not found.", 404)
    forbidden = _check_ownership_or_403(doc.student_id)
    if forbidden:
        return forbidden
    return _send_protected_file(doc.file_path, doc.file_name or "file", as_attachment)


@portal_bp.route("/certificate-files/<file_id>/download/", methods=["GET"])
@require_auth
def certificate_file_download(file_id):
    return _certificate_file_by_id(file_id, as_attachment=True)


@portal_bp.route("/certificate-files/<file_id>/preview/", methods=["GET"])
@require_auth
def certificate_file_preview(file_id):
    return _certificate_file_by_id(file_id, as_attachment=False)


def _certificate_file_by_id(file_id, as_attachment):
    uid = _uuid_or_none(file_id)
    doc = CertificateFile.query.get(uid) if uid else None
    if doc is None:
        return _err("Not found.", 404)
    forbidden = _check_ownership_or_403(doc.student_id)
    if forbidden:
        return forbidden
    return _send_protected_file(doc.file_path, doc.file_name or "file", as_attachment)