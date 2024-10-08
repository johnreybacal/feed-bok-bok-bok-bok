import sqlalchemy
from sqlalchemy import text

engine = sqlalchemy.create_engine('sqlite:///../backend/db.sqlite3')

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
