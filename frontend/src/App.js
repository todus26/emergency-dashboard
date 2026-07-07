import { useState } from "react";
import RegionChart from "./components/RegionChart";
import HourlyChart from "./components/HourlyChart";

function App() {
  const [activeTab, setActiveTab] = useState("region");

  const tabs = [
    { id: "region", label: "지역별 가용병상 수" },
    { id: "hourly", label: "시간대별 현황" },
    { id: "overview", label: "프로젝트 개요" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f8", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* 헤더 */}
      <div style={{ backgroundColor: "#1e3a5f", color: "white", padding: "56px 60px 0", textAlign: "center" }}>
        <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#7a9bbf", letterSpacing: "1.5px", textTransform: "uppercase" }}>
          Cloud 기반 데이터 AI 파이프라인 구축 — 기말 프로젝트
        </p>
        <h1 style={{ margin: "0 0 20px", fontSize: "28px", fontWeight: 600, letterSpacing: "-0.5px" }}>
          전국 응급의료 현황 대시보드
        </h1>

        {/* 탭 */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0", marginTop: "24px" }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: "none",
                border: "none",
                color: activeTab === tab.id ? "white" : "#7a9bbf",
                fontSize: "14px",
                padding: "12px 28px",
                cursor: "pointer",
                borderBottom: activeTab === tab.id ? "2px solid white" : "2px solid transparent",
                fontWeight: activeTab === tab.id ? 600 : 400,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 콘텐츠 */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 20px" }}>

        {activeTab === "region" && <RegionChart />}

        {activeTab === "hourly" && <HourlyChart />}

        {activeTab === "overview" && (
          <div>
            {/* 소개 */}
            <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "36px 40px", marginBottom: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
              <p style={{ margin: "0 0 8px", fontSize: "11px", color: "#7a9bbf", letterSpacing: "1px", textTransform: "uppercase" }}>프로젝트 배경</p>
              <h2 style={{ margin: "0 0 16px", fontSize: "18px", fontWeight: 600, color: "#1e3a5f" }}>왜 이 주제인가</h2>
              <p style={{ margin: "0 0 24px", fontSize: "14px", color: "#3a4f66", lineHeight: "1.9" }}>
                응급실 뺑뺑이 문제를 직접 경험한 건 아니지만, 2024년에 응급실 현황 관리 시스템을 개발하면서
                실시간 데이터를 그냥 보여주는 것 너머의 분석이 필요하다고 느꼈습니다.
                이번 프로젝트에서는 공공 API를 통해 데이터를 직접 수집하고, 전처리·저장·분석까지
                전체 파이프라인을 구축해 지역별 의료 공백과 시간대별 병상 변화 패턴을 시각화했습니다.
              </p>
              <div style={{ display: "flex", gap: "32px", fontSize: "13px", color: "#7a9bbf", borderTop: "1px solid #e5eaf0", paddingTop: "20px" }}>
                <span>수집 주기 — 매 1시간 자동 수집</span>
                <span>분석 범위 — 전국 7개 광역시·도</span>
                <span>저장 방식 — Oracle DB + Block Volume</span>
              </div>
            </div>

            {/* 파이프라인 */}
            <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "36px 40px", marginBottom: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
              <p style={{ margin: "0 0 8px", fontSize: "11px", color: "#7a9bbf", letterSpacing: "1px", textTransform: "uppercase" }}>파이프라인 구조</p>
              <h2 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: 600, color: "#1e3a5f" }}>데이터 흐름</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { step: "01", title: "수집", desc: "국립중앙의료원 응급의료정보 API를 매 1시간마다 호출하여 전국 7개 광역시·도 응급실 실시간 병상 데이터를 수집합니다." },
                  { step: "02", title: "저장", desc: "수집된 원본 데이터는 OCI Block Volume에 CSV 파일로 저장하고, 전처리 완료 데이터는 Oracle DB에 적재합니다." },
                  { step: "03", title: "가공", desc: "Pandas를 활용해 결측값 처리, 컬럼 정제, 시간대·요일 파생 변수 생성 등의 전처리를 수행합니다." },
                  { step: "04", title: "제공", desc: "Flask REST API를 통해 가공된 데이터를 제공하고, React와 Chart.js로 시각화하여 웹 대시보드로 서비스합니다." },
                ].map(item => (
                  <div key={item.step} style={{ padding: "20px 24px", backgroundColor: "#f7f9fc", borderRadius: "6px", borderLeft: "3px solid #1e3a5f" }}>
                    <p style={{ margin: "0 0 6px", fontSize: "11px", color: "#7a9bbf", fontWeight: 600 }}>STEP {item.step} — {item.title}</p>
                    <p style={{ margin: 0, fontSize: "13px", color: "#3a4f66", lineHeight: "1.7" }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 기술 스택 */}
            <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "36px 40px", marginBottom: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
              <p style={{ margin: "0 0 8px", fontSize: "11px", color: "#7a9bbf", letterSpacing: "1px", textTransform: "uppercase" }}>기술 스택</p>
              <h2 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: 600, color: "#1e3a5f" }}>사용 기술</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                {[
                  { label: "수집·처리", items: ["Python", "Pandas", "Flask"] },
                  { label: "저장", items: ["Oracle DB XE", "OCI Block Volume", "Object Storage"] },
                  { label: "시각화", items: ["React", "Chart.js", "OCI VM"] },
                ].map(stack => (
                  <div key={stack.label} style={{ padding: "20px 24px", backgroundColor: "#f7f9fc", borderRadius: "6px" }}>
                    <p style={{ margin: "0 0 12px", fontSize: "11px", color: "#7a9bbf", letterSpacing: "1px", textTransform: "uppercase" }}>{stack.label}</p>
                    {stack.items.map(item => (
                      <p key={item} style={{ margin: "0 0 4px", fontSize: "13px", color: "#3a4f66" }}>{item}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* 노션 카드 */}
            <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "28px 40px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "32px" }}>
              <div>
                <p style={{ margin: "0 0 8px", fontSize: "11px", color: "#7a9bbf", letterSpacing: "1px", textTransform: "uppercase" }}>프로젝트 문서</p>
                <h3 style={{ margin: "0 0 10px", fontSize: "16px", fontWeight: 600, color: "#1e3a5f" }}>보고서 및 설계 문서</h3>
                <p style={{ margin: "0 0 20px", fontSize: "13px", color: "#7a90a8", lineHeight: "1.6" }}>
                  데이터 수집 방법, 전처리 과정, EDA 결과, 아키텍처 설계까지 전체 프로젝트 내용을 정리한 문서입니다.
                </p>
                
                  <a href="https://infrequent-beauty-3c5.notion.site/3964c5fe05c980fc8e48ca241ae87b76?source=copy_link"
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "inline-block", backgroundColor: "#1e3a5f", color: "white", padding: "10px 20px", borderRadius: "6px", fontSize: "13px", textDecoration: "none", fontWeight: 500 }}
                >
                  노션 페이지 방문하기
                </a>
              </div>
              <div style={{ flexShrink: 0 }}>
                <img src="https://www.notion.so/images/meta/default.png" alt="노션 미리보기" style={{ width: "160px", borderRadius: "8px", border: "1px solid #e5eaf0" }} />
              </div>
            </div>

          </div>
        )}
      </div>

      {/* 하단 */}
      <div style={{ backgroundColor: "#1e3a5f", color: "#7a9bbf", padding: "36px 60px", fontSize: "13px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
          <div>
            <p style={{ margin: "0 0 10px", color: "white", fontWeight: 500 }}>데이터 출처</p>
            <p style={{ margin: "0 0 4px" }}>국립중앙의료원 응급의료정보 Open API</p>
            <p style={{ margin: 0 }}>건강보험심사평가원(HIRA) 병·의원 찾기 Open API</p>
          </div>
          <div>
            <p style={{ margin: "0 0 10px", color: "white", fontWeight: 500 }}>기술 스택</p>
            <p style={{ margin: "0 0 4px" }}>수집·처리 — Python, Pandas, Flask</p>
            <p style={{ margin: "0 0 4px" }}>저장 — Oracle DB XE, OCI Block Volume, Object Storage</p>
            <p style={{ margin: 0 }}>시각화 — React, Chart.js</p>
          </div>
        </div>
        <div style={{ maxWidth: "960px", margin: "24px auto 0", paddingTop: "20px", borderTop: "1px solid #2e4f78", fontSize: "12px" }}>
          충북대학교 소프트웨어학부 · Cloud 기반 데이터 AI 파이프라인 구축 · 2026
        </div>
      </div>

    </div>
  );
}

export default App;
