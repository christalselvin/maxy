"""Creates (or resets the password of) an Admin login for the Student Portal.

Run from the Backend folder, against the database in Backend/.env:

    python create_admin.py 8754975995 "YourNewPassword"

or just `python create_admin.py` to be prompted.
"""
import getpass
import sys
from datetime import datetime, timezone

from werkzeug.security import generate_password_hash


def main():
    from app import app
    from extensions import db
    from models import PortalUser
    from portal import ROLE_ADMIN

    phone = (sys.argv[1] if len(sys.argv) > 1 else input("Admin phone number: ")).strip()
    password = sys.argv[2] if len(sys.argv) > 2 else getpass.getpass("Admin password: ")

    if not phone or not password:
        print("Phone number and password are both required.")
        return

    with app.app_context():
        user = PortalUser.query.filter_by(phone_number=phone).first()

        if user is None:
            user = PortalUser(
                phone_number=phone,
                full_name="Portal Administrator",
                role=ROLE_ADMIN,
                password_hash=generate_password_hash(password),
                is_active=True,
                date_joined=datetime.now(timezone.utc),
            )
            db.session.add(user)
            db.session.commit()
            print(f"Created admin {phone}")
        elif user.role != ROLE_ADMIN:
            print(f"{phone} already exists as a '{user.role}' account. Use a different phone number.")
        else:
            user.password_hash = generate_password_hash(password)
            user.is_active = True
            db.session.commit()
            print(f"Admin {phone} already existed - password updated.")


if __name__ == "__main__":
    main()
