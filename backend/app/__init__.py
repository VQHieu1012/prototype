from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config

# Initialize extensions
db = SQLAlchemy()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions with app
    db.init_app(app)
    CORS(app)

    # Register blueprints
    from app.routes import api_bp

    app.register_blueprint(api_bp)

    # Create database tables if they don't exist
    with app.app_context():
        db.create_all()

    @app.route("/health")
    def health_check():
        return {"status": "ok"}, 200

    return app
