import pandas as pd

df = pd.read_csv("/mnt/iscsi/emergency-data/emergency_clean.csv")

# 기본 정보
print("shape:", df.shape)
print("결측값:\n", df.isnull().sum())
print("기초통계:\n", df.describe())

# 핵심 분석
print("\n지역별 평균 가용병상:")
print(df.groupby("지역")["가용병상수"].mean().sort_values())

print("\n시간대별 평균 가용병상:")
print(df.groupby("시간대")["가용병상수"].mean())

print("\n요일별 평균 가용병상:")
print(df.groupby("요일")["가용병상수"].mean())
