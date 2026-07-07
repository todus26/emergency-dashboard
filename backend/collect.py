import requests
import pandas as pd
from datetime import datetime, timezone, timedelta

API_KEY = "xTxwS05FZONbg3ir1sz4IHUM8nyaVPdpVXbGA8DDX9evtnzjsh0jx9SsgozK8emzX0b93JEdg07sIkESkmMMgw=="

EMERGENCY_URL = "http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEmrrmRltmUsefulSckbdInfoInqire"
HOSPITAL_URL = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire"

KST = timezone(timedelta(hours=9))

def fetch_emergency(region):
    params = {
        "serviceKey": API_KEY,
        "pageNo": 1,
        "numOfRows": 100,
        "STAGE1": region,
        "_type": "json"
    }
    try:
        res = requests.get(EMERGENCY_URL, params=params, timeout=60)
        res.raise_for_status()
        items = res.json()["response"]["body"]["items"]["item"]
        df = pd.DataFrame(items if isinstance(items, list) else [items])
        df["수집시간"] = datetime.now(KST).strftime("%Y-%m-%d %H:%M")
        df["지역"] = region
        return df
    except Exception as e:
        print(f"[ERROR] {region} 수집 실패: {e}")
        return pd.DataFrame()

regions = ["서울", "경기", "충북", "충남", "경북", "경남", "전남", "강원"]
all_data = pd.concat([fetch_emergency(r) for r in regions], ignore_index=True)

all_data.to_csv("/mnt/iscsi/emergency-data/emergency_raw.csv", index=False, encoding="utf-8-sig")
print(f"수집 완료: {len(all_data)}건 / {datetime.now(KST)}")
