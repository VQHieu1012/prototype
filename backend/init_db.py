from app import create_app, db
from app.models import Quiz

app = create_app()

with app.app_context():
    # Tạo tất cả bảng trong database
    db.create_all()

    # Thêm dữ liệu mẫu
    sample_quizzes = [
        Quiz(quiz_name="What is the capital of France?", answer="Paris"),
        Quiz(quiz_name="Who wrote Romeo and Juliet?", answer="William Shakespeare"),
        Quiz(
            quiz_name="What is the largest planet in our solar system?",
            answer="Jupiter",
        ),
        Quiz(quiz_name="What is the chemical symbol for gold?", answer="Au"),
        Quiz(
            quiz_name="What is the formula for calculating the area of a circle?",
            answer="A = πr²",
        ),
        Quiz(
            quiz_name="What is the boiling point of water in Celsius?", answer="100°C"
        ),
        Quiz(quiz_name="Who painted the Mona Lisa?", answer="Leonardo da Vinci"),
        Quiz(
            quiz_name="What is the tallest mountain in the world?",
            answer="Mount Everest",
        ),
        Quiz(quiz_name="What year did World War II end?", answer="1945"),
        Quiz(quiz_name="What is the chemical symbol for sodium?", answer="Na"),
    ]

    # Kiểm tra nếu bảng trống mới thêm vào
    if Quiz.query.count() == 0:
        for quiz in sample_quizzes:
            db.session.add(quiz)
        db.session.commit()
        print("Sample data added successfully")
    else:
        print("Database already contains data")
