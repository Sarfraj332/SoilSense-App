import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { NutrientData } from '../types/analysis';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AnalysisChartProps {
  data: NutrientData[];
  title: string;
}

const statusColors = {
  good: 'rgba(34, 197, 94, 0.8)',
  warning: 'rgba(234, 179, 8, 0.8)',
  critical: 'rgba(239, 68, 68, 0.8)',
};

export default function AnalysisChart({ data, title }: AnalysisChartProps) {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Current Level',
        data: data.map(item => item.value),
        backgroundColor: data.map(item => statusColors[item.status]),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar options={options} data={chartData} />;
}