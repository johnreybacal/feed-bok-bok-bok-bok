import pathlib
import sqlalchemy
from sqlalchemy import text

sqlite_path = pathlib.Path(__file__).parent.as_posix().replace("sentiment-analysis", "backend/db.sqlite3");
engine = sqlalchemy.create_engine('sqlite:///' + sqlite_path)

def save_category(id: str, category: str):
    print(id, category)
    with engine.begin() as connection:
        query = "UPDATE feedbacks SET category = :category WHERE id = :id"
        connection.execute(
            text(query),
            {
                "category": category,
                "id": id,
            }
        )
