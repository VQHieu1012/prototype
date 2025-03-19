from datetime import datetime
from app import db


class Quiz(db.Model):
    __tablename__ = "quiz"

    id = db.Column(db.Integer, primary_key=True)
    quiz_name = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    def __repr__(self):
        return f"<Quiz {self.id}: {self.quiz_name[:30]}...>"

    def to_dict(self):
        return {
            "id": self.id,
            "quiz_name": self.quiz_name,
            "answer": self.answer,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }


# Create simple index on id for faster primary key lookups
db.Index("idx_quiz_id", Quiz.id)
