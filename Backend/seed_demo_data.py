from datetime import datetime, timezone

from werkzeug.security import generate_password_hash

DEMO_ADMIN_PHONE = "8754975995"
DEMO_ADMIN_PASSWORD = "Admin@123"

DEMO_STUDENT_PHONE = "+919876543210"
DEMO_STUDENT_NAME = "Aarav Sharma"


def main():

    from app import app
    from extensions import db
    from models import Certificate, PortalUser, Project, StudentProfile
    from portal import ROLE_ADMIN, ROLE_STUDENT

    with app.app_context():
        admin_user = PortalUser.query.filter_by(role=ROLE_ADMIN).first()
        if admin_user is None:
            admin_user = PortalUser(
                phone_number=DEMO_ADMIN_PHONE,
                full_name="Portal Administrator",
                role=ROLE_ADMIN,
                password_hash=generate_password_hash(DEMO_ADMIN_PASSWORD),
                is_active=True,
                date_joined=datetime.now(timezone.utc),
            )
            db.session.add(admin_user)
            db.session.commit()
            print(f"Created admin: {admin_user.phone_number}")
        elif admin_user.phone_number != DEMO_ADMIN_PHONE:
            old_phone = admin_user.phone_number
            admin_user.phone_number = DEMO_ADMIN_PHONE
            db.session.commit()
            print(f"Reset admin phone number: {old_phone} -> {DEMO_ADMIN_PHONE}")
        else:
            print(f"Admin already exists: {admin_user.phone_number}")

        if not admin_user.password_hash:
            admin_user.password_hash = generate_password_hash(DEMO_ADMIN_PASSWORD)
            db.session.commit()
            print("Set demo password for admin.")

        student_user = PortalUser.query.filter_by(phone_number=DEMO_STUDENT_PHONE).first()
        if student_user is None:
            student_user = PortalUser(
                phone_number=DEMO_STUDENT_PHONE,
                full_name=DEMO_STUDENT_NAME,
                role=ROLE_STUDENT,
                password_hash=None,
                is_active=True,
                date_joined=datetime.now(timezone.utc),
            )
            db.session.add(student_user)
            db.session.commit()
            print(f"Created student: {student_user.phone_number}")
        else:
            print(f"Student already exists: {student_user.phone_number}")

        profile = StudentProfile.query.filter_by(user_id=student_user.id).first()
        if profile is None:
            profile = StudentProfile(
                user_id=student_user.id,
                college_name="Sunrise Institute of Technology",
                course_name="B.Tech in Computer Science & Engineering",
                branch="Computer Science",
                year="3rd Year",
                enrollment_type="course",
                photo_path=None,
            )
            db.session.add(profile)
            db.session.commit()

        if Project.query.filter_by(student_id=profile.id).count() == 0:
            db.session.add(
                Project(
                    student_id=profile.id,
                    title="Smart Attendance System",
                    description=(
                        "A facial-recognition based attendance system for classrooms, "
                        "reducing manual roll-call time by 90%."
                    ),
                    tech_stack="Python, OpenCV, Flask, PostgreSQL",
                    status="completed",
                    link="https://github.com/example/smart-attendance",
                    assigned_by=admin_user.id,
                    uploaded_at=datetime.now(timezone.utc),
                )
            )
            db.session.commit()
            print("Created sample project.")

        if Certificate.query.filter_by(student_id=profile.id).count() == 0:
            db.session.add(
                Certificate(
                    student_id=profile.id,
                    title="AWS Certified Cloud Practitioner",
                    issuer="Amazon Web Services",
                    issue_date="2026-08-24",
                    credential_id="AWS-CCP-88213",
                    assigned_by=admin_user.id,
                    uploaded_at=datetime.now(timezone.utc),
                )
            )
            db.session.commit()
            print("Created sample certificate.")

        print("\nDemo data ready:")
        print(f"  Student — phone {student_user.phone_number} + captcha (no password)")
        print(f"  Admin   — phone {DEMO_ADMIN_PHONE}, then password: {DEMO_ADMIN_PASSWORD}")


if __name__ == "__main__":
    main()