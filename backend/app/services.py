from app import db
from app.models import Quiz


class QuizService:
    @staticmethod
    def search_by_keyword(keyword, limit=10, offset=0):
        """
        Search for quizzes by keyword using simple ILIKE operator on quiz_name.

        Args:
            keyword (str): The search term
            limit (int): Maximum number of results to return
            offset (int): Offset for pagination

        Returns:
            list: List of Quiz objects matching the search criteria
        """
        try:
            # Simple pattern matching on quiz_name only
            pattern = f"%{keyword}%"
            query = Quiz.query.filter(Quiz.quiz_name.ilike(pattern))

            # Apply pagination
            query = query.limit(limit).offset(offset)

            return query.all()
        except Exception as e:
            # Log the error
            print(f"Search error: {str(e)}")
            return []

    @staticmethod
    def get_quiz_by_id(quiz_id):
        """
        Get a quiz by its ID.

        Args:
            quiz_id (int): The ID of the quiz

        Returns:
            Quiz: The quiz object if found, None otherwise
        """
        return Quiz.query.get(quiz_id)
