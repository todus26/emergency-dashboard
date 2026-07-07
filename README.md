<img width="165" height="150" alt="oci_emergency_pipeline_architecture" src="https://github.com/user-attachments/assets/1d3477c6-3259-4cc2-b792-7969642db543" /># 전국 응급의료 현황 대시보드

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
![Uploading o<svg width="100%" viewBox="0 0 680 620" role="img" style="" xmlns="http://www.w3.org/2000/svg">
  <title style="fill:rgb(0, 0, 0);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">OCI 기반 응급의료 데이터 파이프라인 아키텍처</title>
  <desc style="fill:rgb(0, 0, 0);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">공공 API 수집부터 React 웹 대시보드까지의 전체 데이터 파이프라인 구조도</desc>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  <mask id="imagine-text-gaps-zc42l4" maskUnits="userSpaceOnUse"><rect x="0" y="0" width="680" height="620" fill="white"/><rect x="57.98090744018555" y="49.46946334838867" width="124.03816986083984" height="21.061077117919922" fill="black" rx="2"/><rect x="69.29148864746094" y="68.28189849853516" width="101.73941040039062" height="19.43621253967285" fill="black" rx="2"/><rect x="265.88287353515625" y="49.46946334838867" width="68.23423385620117" height="21.061077117919922" fill="black" rx="2"/><rect x="253.3980712890625" y="68.28189849853516" width="93.53767395019531" height="19.43621253967285" fill="black" rx="2"/><rect x="212.5125732421875" y="157.46946716308594" width="74.95978546142578" height="21.061077117919922" fill="black" rx="2"/><rect x="160.986572265625" y="176.28189086914062" width="177.53738403320312" height="19.43621253967285" fill="black" rx="2"/><rect x="425.18756103515625" y="170.28189086914062" width="78.48979949951172" height="19.43621253967285" fill="black" rx="2"/><rect x="160.55496215820312" y="257.469482421875" width="178.89004516601562" height="21.061077117919922" fill="black" rx="2"/><rect x="157.57180786132812" y="276.2818908691406" width="184.26858520507812" height="19.43621253967285" fill="black" rx="2"/><rect x="197.98399353027344" y="357.469482421875" width="104.8313980102539" height="21.061077117919922" fill="black" rx="2"/><rect x="152.92572021484375" y="376.2818908691406" width="194.14852905273438" height="19.43621253967285" fill="black" rx="2"/><rect x="425.18756103515625" y="368.2818908691406" width="77.9917984008789" height="19.43621253967285" fill="black" rx="2"/><rect x="91.88111114501953" y="457.4694519042969" width="96.99995422363281" height="21.061077117919922" fill="black" rx="2"/><rect x="71.91939544677734" y="476.2818908691406" width="135.67078399658203" height="19.43621253967285" fill="black" rx="2"/><rect x="411.4497375488281" y="457.4694519042969" width="137.10055541992188" height="21.87350845336914" fill="black" rx="2"/><rect x="402.30987548828125" y="476.2818908691406" width="154.56785583496094" height="19.43621253967285" fill="black" rx="2"/><rect x="197.59046936035156" y="557.469482421875" width="104.8190689086914" height="21.061077117919922" fill="black" rx="2"/><rect x="157.4829559326172" y="576.2819213867188" width="185.49630737304688" height="19.43621253967285" fill="black" rx="2"/><rect x="482.60162353515625" y="557.469482421875" width="114.8320083618164" height="21.061077117919922" fill="black" rx="2"/><rect x="487.27947998046875" y="576.2819213867188" width="104.68146514892578" height="19.43621253967285" fill="black" rx="2"/><rect x="26.000001907348633" y="15.813518524169922" width="30.08800506591797" height="19.43621253967285" fill="black" rx="2"/><rect x="26.000001907348633" y="225.8135223388672" width="30.41370391845703" height="19.43621253967285" fill="black" rx="2"/><rect x="26.000001907348633" y="325.81353759765625" width="30.41370391845703" height="19.43621253967285" fill="black" rx="2"/><rect x="26.000001907348633" y="425.8135070800781" width="30.08800506591797" height="19.43621253967285" fill="black" rx="2"/><rect x="26.000001907348633" y="527.8135375976562" width="30.41370391845703" height="19.43621253967285" fill="black" rx="2"/></mask></defs>

  
  <g style="fill:rgb(0, 0, 0);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
    <rect x="40" y="40" width="160" height="48" rx="8" stroke-width="0.5" style="fill:rgb(225, 245, 238);stroke:rgb(15, 110, 86);color:rgb(11, 11, 11);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
    <text x="120" y="60" text-anchor="middle" dominant-baseline="central" style="fill:rgb(8, 80, 65);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">국립중앙의료원 API</text>
    <text x="120" y="78" text-anchor="middle" dominant-baseline="central" style="fill:rgb(15, 110, 86);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">응급실 실시간 병상</text>
  </g>
  <g style="fill:rgb(0, 0, 0);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
    <rect x="220" y="40" width="160" height="48" rx="8" stroke-width="0.5" style="fill:rgb(225, 245, 238);stroke:rgb(15, 110, 86);color:rgb(11, 11, 11);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
    <text x="300" y="60" text-anchor="middle" dominant-baseline="central" style="fill:rgb(8, 80, 65);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">HIRA API</text>
    <text x="300" y="78" text-anchor="middle" dominant-baseline="central" style="fill:rgb(15, 110, 86);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">병·의원 기관 정보</text>
  </g>

  
  <line x1="120" y1="88" x2="220" y2="148" marker-end="url(#arrow)" style="fill:none;stroke:rgb(137, 135, 129);color:rgb(11, 11, 11);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <line x1="300" y1="88" x2="260" y2="148" marker-end="url(#arrow)" style="fill:none;stroke:rgb(137, 135, 129);color:rgb(11, 11, 11);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  
  <g style="fill:rgb(0, 0, 0);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
    <rect x="130" y="148" width="240" height="56" rx="8" stroke-width="0.5" style="fill:rgb(230, 241, 251);stroke:rgb(24, 95, 165);color:rgb(11, 11, 11);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
    <text x="250" y="168" text-anchor="middle" dominant-baseline="central" style="fill:rgb(12, 68, 124);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">collect.py</text>
    <text x="250" y="186" text-anchor="middle" dominant-baseline="central" style="fill:rgb(24, 95, 165);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">cron 매 정각 자동 실행 / KST 기록</text>
  </g>

  
  <text x="430" y="180" text-anchor="start" dominant-baseline="central" style="fill:rgb(82, 81, 78);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:central">cron 0 * * * *</text>
  <line x1="370" y1="176" x2="428" y2="176" stroke="var(--border)" stroke-width="0.5" stroke-dasharray="3 3" mask="url(#imagine-text-gaps-zc42l4)" style="fill:rgb(0, 0, 0);stroke:color(srgb 0.0431373 0.0431373 0.0431373 / 0.1);color:rgb(11, 11, 11);stroke-width:0.5px;stroke-dasharray:3px, 3px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  
  <line x1="250" y1="204" x2="250" y2="248" marker-end="url(#arrow)" style="fill:none;stroke:rgb(137, 135, 129);color:rgb(11, 11, 11);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  
  <g style="fill:rgb(0, 0, 0);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
    <rect x="100" y="248" width="300" height="56" rx="8" stroke-width="0.5" style="fill:rgb(241, 239, 232);stroke:rgb(95, 94, 90);color:rgb(11, 11, 11);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
    <text x="250" y="268" text-anchor="middle" dominant-baseline="central" style="fill:rgb(68, 68, 65);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">OCI Block Volume (BV-14)</text>
    <text x="250" y="286" text-anchor="middle" dominant-baseline="central" style="fill:rgb(95, 94, 90);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">emergency_raw.csv / /mnt/iscsi</text>
  </g>

  
  <line x1="250" y1="304" x2="250" y2="348" marker-end="url(#arrow)" style="fill:none;stroke:rgb(137, 135, 129);color:rgb(11, 11, 11);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  
  <g style="fill:rgb(0, 0, 0);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
    <rect x="130" y="348" width="240" height="56" rx="8" stroke-width="0.5" style="fill:rgb(230, 241, 251);stroke:rgb(24, 95, 165);color:rgb(11, 11, 11);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
    <text x="250" y="368" text-anchor="middle" dominant-baseline="central" style="fill:rgb(12, 68, 124);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">preprocess.py</text>
    <text x="250" y="386" text-anchor="middle" dominant-baseline="central" style="fill:rgb(24, 95, 165);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">결측값 처리 / 파생변수 생성 / DB 적재</text>
  </g>

  
  <text x="430" y="378" text-anchor="start" dominant-baseline="central" style="fill:rgb(82, 81, 78);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:central">cron 5 * * * *</text>
  <line x1="370" y1="376" x2="428" y2="376" stroke="var(--border)" stroke-width="0.5" stroke-dasharray="3 3" mask="url(#imagine-text-gaps-zc42l4)" style="fill:rgb(0, 0, 0);stroke:color(srgb 0.0431373 0.0431373 0.0431373 / 0.1);color:rgb(11, 11, 11);stroke-width:0.5px;stroke-dasharray:3px, 3px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  
  <line x1="180" y1="404" x2="120" y2="448" marker-end="url(#arrow)" style="fill:none;stroke:rgb(137, 135, 129);color:rgb(11, 11, 11);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  
  <line x1="320" y1="404" x2="430" y2="448" marker-end="url(#arrow)" style="fill:none;stroke:rgb(137, 135, 129);color:rgb(11, 11, 11);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  
  <g style="fill:rgb(0, 0, 0);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
    <rect x="40" y="448" width="200" height="56" rx="8" stroke-width="0.5" style="fill:rgb(238, 237, 254);stroke:rgb(83, 74, 183);color:rgb(11, 11, 11);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
    <text x="140" y="468" text-anchor="middle" dominant-baseline="central" style="fill:rgb(60, 52, 137);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">Oracle DB XE</text>
    <text x="140" y="486" text-anchor="middle" dominant-baseline="central" style="fill:rgb(83, 74, 183);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">emergency_bed 테이블</text>
  </g>

  
  <g style="fill:rgb(0, 0, 0);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
    <rect x="380" y="448" width="200" height="56" rx="8" stroke-width="0.5" style="fill:rgb(241, 239, 232);stroke:rgb(95, 94, 90);color:rgb(11, 11, 11);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
    <text x="480" y="468" text-anchor="middle" dominant-baseline="central" style="fill:rgb(68, 68, 65);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">OCI Object Storage</text>
    <text x="480" y="486" text-anchor="middle" dominant-baseline="central" style="fill:rgb(95, 94, 90);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">emergency_clean.csv 백업</text>
  </g>

  
  <line x1="140" y1="504" x2="200" y2="548" marker-end="url(#arrow)" style="fill:none;stroke:rgb(137, 135, 129);color:rgb(11, 11, 11);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  
  <g style="fill:rgb(0, 0, 0);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
    <rect x="130" y="548" width="240" height="48" rx="8" stroke-width="0.5" style="fill:rgb(230, 241, 251);stroke:rgb(24, 95, 165);color:rgb(11, 11, 11);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
    <text x="250" y="568" text-anchor="middle" dominant-baseline="central" style="fill:rgb(12, 68, 124);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">Flask REST API</text>
    <text x="250" y="586" text-anchor="middle" dominant-baseline="central" style="fill:rgb(24, 95, 165);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">port 80 / /api/region, /api/hourly</text>
  </g>

  
  <line x1="370" y1="572" x2="440" y2="572" marker-end="url(#arrow)" style="fill:none;stroke:rgb(137, 135, 129);color:rgb(11, 11, 11);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  
  <g style="fill:rgb(0, 0, 0);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto">
    <rect x="440" y="548" width="200" height="48" rx="8" stroke-width="0.5" style="fill:rgb(250, 236, 231);stroke:rgb(153, 60, 29);color:rgb(11, 11, 11);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
    <text x="540" y="568" text-anchor="middle" dominant-baseline="central" style="fill:rgb(113, 43, 19);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:14px;font-weight:500;text-anchor:middle;dominant-baseline:central">React + Chart.js</text>
    <text x="540" y="586" text-anchor="middle" dominant-baseline="central" style="fill:rgb(153, 60, 29);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:middle;dominant-baseline:central">131.186.18.12:3000</text>
  </g>

  
  <text x="30" y="30" text-anchor="start" style="fill:rgb(82, 81, 78);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">수집</text>
  <text x="30" y="240" text-anchor="start" style="fill:rgb(82, 81, 78);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">저장</text>
  <text x="30" y="340" text-anchor="start" style="fill:rgb(82, 81, 78);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">가공</text>
  <text x="30" y="440" text-anchor="start" style="fill:rgb(82, 81, 78);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">적재</text>
  <text x="30" y="542" text-anchor="start" style="fill:rgb(82, 81, 78);stroke:none;color:rgb(11, 11, 11);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:12px;font-weight:400;text-anchor:start;dominant-baseline:auto">제공</text>

  
  <line x1="30" y1="134" x2="650" y2="134" stroke="var(--border)" stroke-width="0.5" stroke-dasharray="4 4" style="fill:rgb(0, 0, 0);stroke:color(srgb 0.0431373 0.0431373 0.0431373 / 0.1);color:rgb(11, 11, 11);stroke-width:0.5px;stroke-dasharray:4px, 4px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <line x1="30" y1="234" x2="650" y2="234" stroke="var(--border)" stroke-width="0.5" stroke-dasharray="4 4" mask="url(#imagine-text-gaps-zc42l4)" style="fill:rgb(0, 0, 0);stroke:color(srgb 0.0431373 0.0431373 0.0431373 / 0.1);color:rgb(11, 11, 11);stroke-width:0.5px;stroke-dasharray:4px, 4px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <line x1="30" y1="334" x2="650" y2="334" stroke="var(--border)" stroke-width="0.5" stroke-dasharray="4 4" mask="url(#imagine-text-gaps-zc42l4)" style="fill:rgb(0, 0, 0);stroke:color(srgb 0.0431373 0.0431373 0.0431373 / 0.1);color:rgb(11, 11, 11);stroke-width:0.5px;stroke-dasharray:4px, 4px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <line x1="30" y1="434" x2="650" y2="434" stroke="var(--border)" stroke-width="0.5" stroke-dasharray="4 4" mask="url(#imagine-text-gaps-zc42l4)" style="fill:rgb(0, 0, 0);stroke:color(srgb 0.0431373 0.0431373 0.0431373 / 0.1);color:rgb(11, 11, 11);stroke-width:0.5px;stroke-dasharray:4px, 4px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <line x1="30" y1="534" x2="650" y2="534" stroke="var(--border)" stroke-width="0.5" stroke-dasharray="4 4" mask="url(#imagine-text-gaps-zc42l4)" style="fill:rgb(0, 0, 0);stroke:color(srgb 0.0431373 0.0431373 0.0431373 / 0.1);color:rgb(11, 11, 11);stroke-width:0.5px;stroke-dasharray:4px, 4px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
</svg>ci_emergency_pipeline_architecture.svg…]()


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
