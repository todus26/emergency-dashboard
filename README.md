# 전국 응급의료 현황 대시보드

> OCI 기반 Cloud 데이터 파이프라인 구축 — 기말 프로젝트  
> 충북대학교 소프트웨어학부 · 2026

**서비스 주소:** http://131.186.18.12:3000

---

## 서비스 소개 및 사용 시나리오

2024년 응급실 현황 관리 시스템 프로젝트에서 공공 API 데이터를 화면에 표시하는 역할을 담당했다. 당시 실시간 데이터를 보여주는 것에 그쳤던 경험을 바탕으로, 이번 프로젝트에서는 데이터를 직접 수집·축적·분석하는 전체 파이프라인을 구축했다.

전국 응급의료기관의 실시간 가용병상 데이터를 공공 API를 통해 매 1시간마다 자동 수집하고, 전처리 후 Oracle DB에 적재하여 웹 대시보드로 시각화한다.

**사용 시나리오**
- 지역별 탭 — 전국 7개 광역시·도 평균 가용병상 수를 비교해 의료 공백 지역 파악
- 시간대별 탭 — 특정 시간대의 병상 변화 패턴 확인
- 프로젝트 개요 탭 — 파이프라인 구조, 기술 스택, 데이터 출처 확인

---

## 아키텍처 설명

### 전체 파이프라인
<img width="515" height="430" alt="image" src="https://github.com/user-attachments/assets/02b26708-0cb7-47e0-9a08-5b8316c17c27" />



### 사용 OCI 리소스

| 리소스 | 이름 | 용도 |
|---|---|---|
| VM Instance | VM-14 | 전체 파이프라인 실행 서버 |
| Block Volume | BV-14 (50GB) | 수집 원본 CSV 저장 |
| Object Storage | bucket-14-cbnu-lv2 | 전처리 완료 CSV 백업 |
| Oracle DB XE | xepdb1 | 정형 데이터 적재 및 API 서빙 |
| VCN / 보안목록 | - | 포트 80, 3000 외부 오픈 |

---

## 데이터 흐름 상세 설명

### 수집 소스
- **국립중앙의료원 응급의료정보 Open API** — 전국 응급의료기관 실시간 가용병상, 중증질환 수용가능 정보
- **건강보험심사평가원(HIRA) 병·의원 찾기 Open API** — 전국 의료기관 기관 정보

### 저장 위치
- 수집 원본: OCI Block Volume `/mnt/iscsi/emergency-data/emergency_raw.csv`
- 전처리 완료본: OCI Block Volume `/mnt/iscsi/emergency-data/emergency_clean.csv`
- 정형 데이터: Oracle DB `emergency_bed` 테이블
- 백업: OCI Object Storage `bucket-14-cbnu-lv2`

### 가공 로직
1. 가용병상 정보 없는 기관 제거 (`hvec` 결측값 제거)
2. 컬럼명 정리 (dutyName → 병원명, hvec → 가용병상수 등)
3. 수집시간에서 시간대·요일 파생 변수 생성
4. 가용병상수 수치형 변환

### 제공 방식
Flask REST API → React + Chart.js 웹 대시보드

| 엔드포인트 | 설명 |
|---|---|
| GET /api/region | 지역별 평균 가용병상 수 |
| GET /api/hourly | 시간대별 평균 가용병상 수 |
| GET /api/table | 최근 100건 데이터 |

---

## 프로젝트 구조

```
emergency-dashboard/
├── backend/
│   ├── collect.py           # 데이터 수집
│   ├── preprocess.py        # 전처리 + Oracle DB 적재
│   ├── eda.py               # EDA 분석
│   └── app.py               # Flask REST API 서버
└── frontend/
    └── src/
        ├── App.js
        ├── components/
        │   ├── RegionChart.jsx
        │   └── HourlyChart.jsx
        └── api/
            └── index.js
```

---

## 설치 및 실행 방법

### 환경 요건

- OCI VM Instance (Oracle Linux 8)
- Python 3.6+
- Node.js 18+
- Oracle DB XE 21c
- OCI Block Volume (마운트: /mnt/iscsi)

### 1. Python 패키지 설치

```bash
sudo pip3 install flask flask-cors requests pandas cx_Oracle
```

### 2. Node.js 설치

```bash
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo dnf install nodejs -y
```

### 3. Oracle 환경변수 설정

```bash
echo 'export ORACLE_HOME=/opt/oracle/product/21c/dbhomeXE' >> ~/.bashrc
echo 'export LD_LIBRARY_PATH=$ORACLE_HOME/lib:$LD_LIBRARY_PATH' >> ~/.bashrc
source ~/.bashrc
```

### 4. Oracle DB 테이블 생성

```bash
sudo su - oracle
sqlplus vm14/비밀번호@localhost:1521/xepdb1
```

```sql
CREATE TABLE emergency_bed (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    hospital_name VARCHAR2(100),
    address VARCHAR2(200),
    region VARCHAR2(20),
    available_beds NUMBER,
    update_time VARCHAR2(30),
    collected_at VARCHAR2(30),
    hour_of_day NUMBER,
    day_of_week VARCHAR2(20)
);
```

### 5. 데이터 수집 및 전처리 실행

```bash
cd /home/opc/emergency-dashboard/backend
python3 collect.py
python3 preprocess.py
```

### 6. Flask 서버 실행

```bash
sudo bash -c 'export ORACLE_HOME=/opt/oracle/product/21c/dbhomeXE; export LD_LIBRARY_PATH=$ORACLE_HOME/lib; nohup python3 /home/opc/emergency-dashboard/backend/app.py > /home/opc/flask.log 2>&1 &'
```

### 7. 방화벽 포트 오픈

```bash
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload
```

### 8. cron 자동화 등록

```bash
crontab -e
```

```
ORACLE_HOME=/opt/oracle/product/21c/dbhomeXE
LD_LIBRARY_PATH=/opt/oracle/product/21c/dbhomeXE/lib

0 * * * * python3 /home/opc/emergency-dashboard/backend/collect.py >> /home/opc/collect.log 2>&1
5 * * * * python3 /home/opc/emergency-dashboard/backend/preprocess.py >> /home/opc/preprocess.log 2>&1
```

### 9. React 프론트엔드 실행

```bash
cd /home/opc/emergency-dashboard/frontend
npm install
npm start
```

### 10. 접속

```
http://VM_공인IP:3000
```

---

## 한계점 및 향후 개선 방향

**한계점**
- 경남 지역 수집 실패: API 응답이 단일 객체로 반환될 때 파싱 오류 발생
- 초기 데이터 부족으로 시간대별 분석 신뢰도가 낮음 (데이터 누적 시 개선)
- Flask 개발 서버 사용 중 (운영 환경에서는 Gunicorn + nginx 권장)

**향후 개선 방향**
- 경남 수집 실패 예외 처리 강화
- Object Storage 자동 업로드 파이프라인 완성
- Gunicorn + nginx 기반 운영 서버 전환

---

## 데이터 출처

- 국립중앙의료원 응급의료정보 Open API: https://www.data.go.kr/data/15000563/openapi.do
- 건강보험심사평가원 병·의원 찾기 Open API: https://www.data.go.kr/data/15000736/openapi.do
