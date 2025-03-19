from flask import Blueprint, request, jsonify
from app.services import QuizService

api_bp = Blueprint("api", __name__, url_prefix="/api")


@api_bp.route("/search", methods=["GET"])
def search_quizzes():
    keyword = request.args.get("keyword", "")
    limit = request.args.get("limit", 10, type=int)
    offset = request.args.get("offset", 0, type=int)

    if not keyword:
        return (
            jsonify(
                {"success": False, "message": "Search keyword is required", "data": []}
            ),
            400,
        )

    quizzes = QuizService.search_by_keyword(keyword, limit, offset)

    return jsonify(
        {
            "success": True,
            "message": f'Found {len(quizzes)} results for "{keyword}"',
            "data": [quiz.to_dict() for quiz in quizzes],
        }
    )


@api_bp.route("/quizzes/<int:quiz_id>", methods=["GET"])
def get_quiz(quiz_id):
    quiz = QuizService.get_quiz_by_id(quiz_id)

    if not quiz:
        return (
            jsonify(
                {
                    "success": False,
                    "message": f"Quiz with ID {quiz_id} not found",
                    "data": None,
                }
            ),
            404,
        )

    return jsonify({"success": True, "message": "Quiz found", "data": quiz.to_dict()})
