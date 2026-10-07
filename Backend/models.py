import uuid
from datetime import datetime, timezone

from sqlalchemy.dialects.postgresql import ARRAY, UUID

from extensions import db


def _now():
    return datetime.now(timezone.utc)


def _uuid_pk():
    return db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)



class User(db.Model):
    """Old ``User`` collection — simple admin login for the blog/contact API."""

    __tablename__ = "users"

    id = _uuid_pk()
    username = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {"id": str(self.id), "username": self.username}


class Blog(db.Model):
    __tablename__ = "blogs"

    id = _uuid_pk()
    title = db.Column(db.String(500), nullable=False)
    heading = db.Column(db.String(500))
    subheading = db.Column(db.String(500))
    content = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255))
    tags = db.Column(ARRAY(db.String), nullable=False, default=list)
    image_link = db.Column(db.String(1000))
    video_link = db.Column(db.String(1000))
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=_now)

    def to_dict(self):
        return {
            "_id": str(self.id),
            "title": self.title,
            "heading": self.heading,
            "subheading": self.subheading,
            "content": self.content,
            "author": self.author,
            "category": self.category,
            "tags": self.tags,
            "image_link": self.image_link,
            "video_link": self.video_link,
            "created_at": self.created_at,
        }


class Contact(db.Model):
    __tablename__ = "contacts"

    id = _uuid_pk()
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(50), nullable=False)
    business_category = db.Column(db.String(255), nullable=False)
    company_name = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=_now)

    def to_dict(self):
        return {
            "_id": str(self.id),
            "name": self.name,
            "email": self.email,
            "phone_number": self.phone_number,
            "business_category": self.business_category,
            "company_name": self.company_name,
            "created_at": self.created_at,
        }


class PortalUser(db.Model):
    __tablename__ = "portal_users"

    id = _uuid_pk()
    phone_number = db.Column(db.String(32), unique=True, nullable=False)
    full_name = db.Column(db.String(255), nullable=False, default="")
    role = db.Column(db.String(20), nullable=False)  # "student" | "admin"
    password_hash = db.Column(db.String(255), nullable=True)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    date_joined = db.Column(db.DateTime(timezone=True), nullable=False, default=_now)

    profile = db.relationship(
        "StudentProfile", backref="user", uselist=False, cascade="all, delete-orphan"
    )


class StudentProfile(db.Model):
    __tablename__ = "student_profiles"

    id = _uuid_pk()
    user_id = db.Column(
        UUID(as_uuid=True), db.ForeignKey("portal_users.id", ondelete="CASCADE"),
        unique=True, nullable=False,
    )
    college_name = db.Column(db.String(255), default="")
    course_name = db.Column(db.String(255), default="")
    branch = db.Column(db.String(255), default="")
    year = db.Column(db.String(50), default="")
    enrollment_type = db.Column(db.String(50), default="course")
    photo_path = db.Column(db.String(1000), nullable=True)
    photo_name = db.Column(db.String(500), nullable=True)

    projects = db.relationship("Project", backref="student", cascade="all, delete-orphan")
    certificates = db.relationship("Certificate", backref="student", cascade="all, delete-orphan")


class Project(db.Model):
    __tablename__ = "projects"

    id = _uuid_pk()
    student_id = db.Column(
        UUID(as_uuid=True), db.ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False
    )
    title = db.Column(db.String(500), nullable=False)
    description = db.Column(db.Text, default="")
    tech_stack = db.Column(db.String(500), default="")
    status = db.Column(db.String(50), default="planned")
    link = db.Column(db.String(1000), default="")
    assigned_by = db.Column(UUID(as_uuid=True), nullable=True)
    uploaded_at = db.Column(db.DateTime(timezone=True), nullable=False, default=_now)

    files = db.relationship("ProjectFile", backref="project", cascade="all, delete-orphan")


class Certificate(db.Model):
    __tablename__ = "certificates"

    id = _uuid_pk()
    student_id = db.Column(
        UUID(as_uuid=True), db.ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False
    )
    title = db.Column(db.String(500), nullable=False)
    issuer = db.Column(db.String(255), default="")
    
    issue_date = db.Column(db.String(50), default="")
    credential_id = db.Column(db.String(255), default="")
    assigned_by = db.Column(UUID(as_uuid=True), nullable=True)
    uploaded_at = db.Column(db.DateTime(timezone=True), nullable=False, default=_now)

    files = db.relationship("CertificateFile", backref="certificate", cascade="all, delete-orphan")


class ProjectFile(db.Model):
    __tablename__ = "project_files"

    id = _uuid_pk()
    project_id = db.Column(
        UUID(as_uuid=True), db.ForeignKey("projects.id", ondelete="CASCADE"), nullable=False
    )
    student_id = db.Column(
        UUID(as_uuid=True), db.ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False
    )
    file_path = db.Column(db.String(1000), nullable=False)
    file_name = db.Column(db.String(500), nullable=False)
    uploaded_at = db.Column(db.DateTime(timezone=True), nullable=False, default=_now)


class CertificateFile(db.Model):
    __tablename__ = "certificate_files"

    id = _uuid_pk()
    certificate_id = db.Column(
        UUID(as_uuid=True), db.ForeignKey("certificates.id", ondelete="CASCADE"), nullable=False
    )
    student_id = db.Column(
        UUID(as_uuid=True), db.ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False
    )
    file_path = db.Column(db.String(1000), nullable=False)
    file_name = db.Column(db.String(500), nullable=False)
    uploaded_at = db.Column(db.DateTime(timezone=True), nullable=False, default=_now)


class Captcha(db.Model):
    __tablename__ = "captchas"

    id = db.Column(db.String(64), primary_key=True)  # the captcha_key
    answer = db.Column(db.String(20), nullable=False)
    expires_at = db.Column(db.DateTime(timezone=True), nullable=False)


class StoredFile(db.Model):
    """Uploaded file bytes (student photos, project / certificate files).

    Stored in PostgreSQL instead of on disk so uploads survive on
    serverless hosts (Vercel) where the filesystem is temporary.
    ``key`` is ``public/<rel path>`` for photos and ``private/<...>`` for
    project / certificate attachments.
    """

    __tablename__ = "stored_files"

    key = db.Column(db.String(1000), primary_key=True)
    data = db.Column(db.LargeBinary, nullable=False)
    mimetype = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=_now)
