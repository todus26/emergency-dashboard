import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { fetchDates, fetchHourlyByDate } from "../api";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler);

export default function HourlyChart() {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDates().then(d => {
      setDates(d);
      setSelectedDate(d[d.length - 1]);
    });
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchHourlyByDate(selectedDate).then(setData);
    }
  }, [selectedDate]);

  const chartData = {
    labels: data.map(d => `${d["시간대"]}시`),
    datasets: [{
      label: "평균 가용병상 수 (개)",
      data: data.map(d => d["가용병상수"]),
      borderColor: "rgba(30, 58, 95, 1)",
      backgroundColor: "rgba(30, 58, 95, 0.08)",
      tension: 0.4,
      fill: true,
      pointBackgroundColor: "rgba(30, 58, 95, 1)",
      pointRadius: 4,
    }]
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: false, grid: { color: "#e5eaf0" }, ticks: { color: "#4a6080" } },
      x: { grid: { display: false }, ticks: { color: "#4a6080" } }
    }
  };

  const currentIdx = dates.indexOf(selectedDate);

  return (
    <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "28px 32px", marginBottom: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <h2 style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: 600, color: "#1e3a5f" }}>시간대별 응급 병상 현황</h2>
          <p style={{ margin: 0, fontSize: "13px", color: "#7a90a8" }}>날짜별로 이동하며 확인할 수 있습니다</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => setSelectedDate(dates[currentIdx - 1])}
            disabled={currentIdx <= 0}
            style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: currentIdx <= 0 ? "#ccc" : "#1e3a5f", padding: "4px 8px" }}
          >
            ‹
          </button>
          <span style={{ fontSize: "13px", fontWeight: 500, color: "#1e3a5f", minWidth: "90px", textAlign: "center" }}>
            {selectedDate}
          </span>
          <button
            onClick={() => setSelectedDate(dates[currentIdx + 1])}
            disabled={currentIdx >= dates.length - 1}
            style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: currentIdx >= dates.length - 1 ? "#ccc" : "#1e3a5f", padding: "4px 8px" }}
          >
            ›
          </button>
        </div>
      </div>

      <Line data={chartData} options={options} />
    </div>
  );
}
