from flask import Flask, jsonify, request
from flask_cors import CORS
import cx_Oracle

app = Flask(__name__)
CORS(app)

def get_conn():
    return cx_Oracle.connect("vm14", "Enjoy1011", "localhost:1521/xepdb1")

@app.route("/api/region")
def region():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT region, AVG(available_beds) as avg_beds
        FROM emergency_bed
        GROUP BY region
        ORDER BY avg_beds ASC
    """)
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{"지역": r[0], "가용병상수": round(r[1], 1)} for r in rows])

@app.route("/api/hourly")
def hourly():
    conn = get_conn()
    cursor = conn.cursor()
    date = request.args.get("date", "")
    if date:
        cursor.execute("""
            SELECT hour_of_day, AVG(available_beds) as avg_beds
            FROM emergency_bed
            WHERE SUBSTR(collected_at, 1, 10) = :1
            GROUP BY hour_of_day
            ORDER BY hour_of_day
        """, (date,))
    else:
        cursor.execute("""
            SELECT hour_of_day, AVG(available_beds) as avg_beds
            FROM emergency_bed
            GROUP BY hour_of_day
            ORDER BY hour_of_day
        """)
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{"시간대": r[0], "가용병상수": round(r[1], 1)} for r in rows])

@app.route("/api/dates")
def dates():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT DISTINCT SUBSTR(collected_at, 1, 10) as 날짜
        FROM emergency_bed
        ORDER BY 날짜
    """)
    rows = cursor.fetchall()
    conn.close()
    return jsonify([r[0] for r in rows])

@app.route("/api/table")
def table():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT hospital_name, region, available_beds, collected_at
        FROM emergency_bed
        ORDER BY collected_at DESC
        FETCH FIRST 100 ROWS ONLY
    """)
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{"병원명": r[0], "지역": r[1], "가용병상수": r[2], "수집시간": str(r[3])} for r in rows])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
