import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { fetchRegionData } from "../api";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function RegionChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRegionData().then(setData);
  }, []);

  const chartData = {
    labels: data.map(d => d["지역"]),
    datasets: [{
      label: "평균 가용병상 수 (개)",
      data: data.map(d => d["가용병상수"]),
      backgroundColor: "rgba(30, 58, 95, 0.75)",
      borderColor: "rgba(30, 58, 95, 1)",
      borderWidth: 1,
      borderRadius: 4,
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#e5eaf0" },
        ticks: { color: "#4a6080" }
      },
      x: {
        grid: { display: false },
        ticks: { color: "#4a6080" }
      }
    }
  };

  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "28px 32px",
      marginBottom: "24px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
    }}>
      <h2 style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: 600, color: "#1e3a5f" }}>
        지역별 평균 가용병상 수
      </h2>
      <p style={{ margin: "0 0 20px", fontSize: "13px", color: "#7a90a8" }}>
        가용병상이 적을수록 응급의료 공백 위험이 높습니다
      </p>
      <Bar data={chartData} options={options} />
    </div>
  );
}
