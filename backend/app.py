from flask import Flask, jsonify
from flask_cors import CORS
import cx_Oracle

app = Flask(__name__)
CORS(app)

def get_conn():
    return cx_Oracle.connect("vm14", "Enjoy1011", "localhost:1521/xepdb1")

# 지역별 평균 가용병상
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

# 시간대별 평균 가용병상
@app.route("/api/hourly")
def hourly():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT hour_of_day, AVG(available_beds) as avg_beds
        FROM emergency_bed
        GROUP BY hour_of_day
        ORDER BY hour_of_day
    """)
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{"시간대": r[0], "가용병상수": round(r[1], 1)} for r in rows])

# 전체 데이터 테이블 (Oracle은 LIMIT 대신 FETCH FIRST 사용)
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
    app.run(host="0.0.0.0", port=80)
