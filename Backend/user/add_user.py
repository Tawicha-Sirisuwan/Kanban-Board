# backend/user/add_user.py
import psycopg2
from config import DB_CONFIG

def add_user(username, email, password):
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()

        sql = """
        INSERT INTO "User" (username, email, password)
        VALUES (%s, %s, %s)
        RETURNING user_id;
        """

        cur.execute(sql, (username, email, password))
        user_id = cur.fetchone()[0]

        conn.commit()
        cur.close()
        conn.close()

        print(f"✅ Add user success! ID: {user_id}")
    except Exception as e:
        print(f"❌ Error: {e}")

# ทดลองเรียกใช้
if __name__ == "__main__":
    add_user("demo_user", "demo@email.com", "123456")
