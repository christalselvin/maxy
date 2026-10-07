import io
import mimetypes

from flask import Flask, request, jsonify, send_from_directory, send_file
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta
import pytz
from apscheduler.schedulers.background import BackgroundScheduler
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash

from extensions import db

load_dotenv(override=True)

app = Flask(__name__)

_cors_origins = os.environ.get(
    "CORS_ALLOWED_ORIGINS",
    "https://maxotechs.com,https://www.maxotechs.com,http://localhost:5173,http://127.0.0.1:5173"
).split(",")

_cors_origins = [origin.strip() for origin in _cors_origins if origin.strip()]

CORS(
    app,
    origins=_cors_origins,
    expose_headers=["Content-Disposition"],
    supports_credentials=True
)


DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL not found in .env file")

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_pre_ping": True}
db.init_app(app)


from models import User, Blog, Contact, StoredFile  
from portal import portal_bp, MEDIA_ROOT  

app.register_blueprint(portal_bp, url_prefix="/api")


with app.app_context():
    db.create_all()


@app.errorhandler(Exception)
def handle_unexpected_error(error):
    import traceback

    traceback.print_exc()
    return jsonify({"detail": "Internal server error", "error": str(error)}), 500


@app.route("/media/<path:subpath>")
def serve_media(subpath):
    """Publicly serves student profile photos (uploaded via the Admin
    console). Project/certificate attachments are NOT served here — they
    live under Backend/private_media and are only reachable through the
    protected download/preview endpoints in portal.py."""
    stored = db.session.get(StoredFile, f"public/{subpath}")

    if stored is not None:
        return send_file(
            io.BytesIO(stored.data),
            mimetype=(
                stored.mimetype
                or mimetypes.guess_type(subpath)[0]
                or "application/octet-stream"
            ),
            max_age=3600,
        )

    # Older uploads that were saved on disk.
    return send_from_directory(MEDIA_ROOT, subpath)


@app.route("/")
def home():
    return jsonify({
        "status": "ok",
        "message": "Maxotechs backend is running"
    })

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Request body must be JSON"}), 400

        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400

        user = User.query.filter_by(username=username).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        if not check_password_hash(user.password_hash, password):
            return jsonify({"error": "Invalid password"}), 401

        return jsonify({"message": "Login successful"}), 200

    except Exception as e:
        return jsonify({
            "error": "Internal server error",
            "details": str(e)
        }), 500

    finally:
        print("login api executed")


@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Request body must be JSON"}), 400

        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({"error": "Enter all fields"}), 400

        if User.query.filter_by(username=username).first():
            return jsonify({"error": "Username already exists"}), 409

        user = User(username=username, password_hash=generate_password_hash(password))
        db.session.add(user)
        db.session.commit()

        return jsonify({"message": "User inserted successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": "Internal server error",
            "details": str(e)
        }), 500


@app.route("/blog", methods=["POST"])
def create_blog():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Request body must be JSON"}), 400

        title = data.get("title")
        heading = data.get("heading")
        subheading = data.get("subheading")
        content = data.get("content")
        author = data.get("author")
        category = data.get("category")
        tags = data.get("tags")
        image_link = data.get("image_link")
        video_link = data.get("video_link")

        if not title or not content or not author or not tags:
            return jsonify({"error": "All required fields must be filled"}), 400

        blog = Blog(
            title=title,
            heading=heading,
            subheading=subheading,
            content=content,
            author=author,
            category=category,
            tags=tags,
            image_link=image_link,
            video_link=video_link,
            created_at=datetime.utcnow(),
        )
        db.session.add(blog)
        db.session.commit()

        return jsonify({"message": "Blog stored successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": "Internal server error",
            "details": str(e)
        }), 500


@app.route("/contact", methods=["POST"])
def create_contact():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Request body must be JSON"}), 400

        name = data.get("name")
        email = data.get("email")
        phone_number = data.get("phone_number")
        business_category = data.get("business_category")
        company_name = data.get("company_name")

        if not name or not email or not phone_number or not business_category:
            return jsonify({"error": "All required fields must be filled"}), 400

        contact = Contact(
            name=name,
            email=email,
            phone_number=phone_number,
            business_category=business_category,
            company_name=company_name,
            created_at=datetime.utcnow(),
        )
        db.session.add(contact)
        db.session.commit()

        return jsonify({"message": "Contact stored successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": "Internal server error",
            "details": str(e)
        }), 500


@app.route("/blogs", methods=["GET"])
def get_blogs():
    try:
        ist = pytz.timezone("Asia/Kolkata")

        data = []
        for blog in Blog.query.all():
            item = blog.to_dict()

            if item.get("created_at"):
                item["created_at"] = (
                    item["created_at"]
                    .replace(tzinfo=pytz.utc)
                    .astimezone(ist)
                    .strftime("%Y-%m-%d %I:%M:%S %p")
                )

            data.append(item)

        return jsonify(data), 200

    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500


@app.route("/blogs/titles", methods=["GET"])
def get_blog_titles():
    try:
        titles = [row.title for row in Blog.query.with_entities(Blog.title).all()]
        return jsonify({"titles": titles}), 200

    except Exception as e:
        return jsonify({
            "error": "Internal server error",
            "details": str(e)
        }), 500


@app.route("/contacts", methods=["GET"])
def get_contacts():
    try:
        ist = pytz.timezone("Asia/Kolkata")

        data = []
        for contact in Contact.query.all():
            item = contact.to_dict()

            if item.get("created_at"):
                item["created_at"] = (
                    item["created_at"]
                    .replace(tzinfo=pytz.utc)
                    .astimezone(ist)
                    .strftime("%Y-%m-%d %I:%M:%S %p")
                )

            data.append(item)

        return jsonify(data), 200

    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500


@app.route("/blogs/search", methods=["GET"])
def search_blog_by_title():
    try:
        title = request.args.get("title")

        if not title:
            return jsonify({"error": "Title query parameter is required"}), 400

        results = Blog.query.filter(Blog.title.ilike(f"%{title}%")).all()
        results = [
            {k: v for k, v in blog.to_dict().items() if k != "_id"} for blog in results
        ]

        return jsonify({
            "count": len(results),
            "blogs": results
        }), 200

    except Exception as e:
        return jsonify({
            "error": "Internal server error",
            "details": str(e)
        }), 500


def delete_old_blogs():
    with app.app_context():
        try:
            cutoff_date = datetime.utcnow() - timedelta(days=12)

            deleted_count = Blog.query.filter(Blog.created_at < cutoff_date).delete(
                synchronize_session=False
            )
            db.session.commit()

            print(f"[CRON] Deleted {deleted_count} blog(s) older than 12 days")

        except Exception as e:
            db.session.rollback()
            print("[CRON ERROR] Blog delete failed:", e)


scheduler = BackgroundScheduler()
scheduler.add_job(delete_old_blogs, "interval", hours=24)
scheduler.start()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True, use_reloader=False)
