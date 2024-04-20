import React from "react";
import { Bar } from "react-chartjs-2";

interface FeedbackBarGraphProps {
  feedback: {
    createdat: string;
    month: string;
    total_feedback: number;
  }[];
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const FeedbackBarGraph: React.FC<FeedbackBarGraphProps> = ({ feedback }) => {
  const getTooltipLabel = (tooltipItem: any, data: any) => {
    const label = data.labels[tooltipItem.index];
    return `Month: ${label}`;
  };

  const data = {
    labels: feedback.map(
      (item) =>
        `${monthNames[parseInt(item.month) - 1]} ${new Date(item.createdat).getFullYear()}`,
    ),
    datasets: [
      {
        label: "Total Feedbacks",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: feedback.map((item) => item.total_feedback),
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
          callback: (value: any) => value + 1,
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
