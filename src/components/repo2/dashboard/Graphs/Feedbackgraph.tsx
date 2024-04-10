import React from "react";
import { Bar } from "react-chartjs-2";

interface FeedbackBarGraphProps {
  feedback: {
    month: string;
    total_feedbacks: number;
  }[];
}

const FeedbackBarGraph: React.FC<FeedbackBarGraphProps> = ({ feedback }) => {
  const getTooltipLabel = (tooltipItem: any, data: any) => {
    const label = data.labels[tooltipItem.index];
    return `Month: ${label}`;
  };

  const data = {
    labels: feedback.map((item) => item.month),
    datasets: [
      {
        label: "Total Feedbacks",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: feedback.map((item) => item.total_feedbacks),
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
        ticks: {
          callback: (value: any) => value,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Feedbacks",
        },
      },
    },
    tooltips: {
      callbacks: {
        label: getTooltipLabel,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default FeedbackBarGraph;
