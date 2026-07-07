import pandas as pd
import cx_Oracle
from datetime import datetime

# 전처리
df = pd.read_csv("/mnt/iscsi/emergency-data/emergency_raw.csv")

df = df.dropna(subset=["hvec"])
df = df.rename(columns={
    "dutyName": "병원명",
    "hvec": "가용병상수",
    "hvidate": "갱신시간",
})

df["수집시간"] = pd.to_datetime(df["수집시간"])
df["시간대"] = df["수집시간"].dt.hour
df["요일"] = df["수집시간"].dt.day_name()
df["가용병상수"] = pd.to_numeric(df["가용병상수"], errors="coerce").fillna(0).astype(int)
df["수집시간_str"] = df["수집시간"].dt.strftime("%Y-%m-%d %H:%M")

df.to_csv("/mnt/iscsi/emergency-data/emergency_clean.csv", index=False, encoding="utf-8-sig")
print("전처리 완료")

# Oracle DB 적재
conn = cx_Oracle.connect("vm14", "Enjoy1011", "localhost:1521/xepdb1")
cursor = conn.cursor()

for _, row in df.iterrows():
    cursor.execute("""
        INSERT INTO emergency_bed
        (hospital_name, address, region, available_beds, update_time, collected_at, hour_of_day, day_of_week)
        VALUES (:1, :2, :3, :4, :5, :6, :7, :8)
    """, (
        str(row.get("병원명", "")),
        "",
        str(row.get("지역", "")),
        int(row.get("가용병상수", 0)),
        str(row.get("갱신시간", "")),
        str(row.get("수집시간_str", "")),
        int(row.get("시간대", 0)),
        str(row.get("요일", ""))
    ))

conn.commit()
cursor.close()
conn.close()
print("Oracle DB 적재 완료")
