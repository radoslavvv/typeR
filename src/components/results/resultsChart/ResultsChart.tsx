import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

import { RootState } from "../../../store/Store";

import StatisticsItem from "../../../models/StatisticsItem";
import KeyStrokePerSecond from "../../../models/KeyStrokesPerSecond";

import { generateStatisticsItems } from "../../../utils/Utilities";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const plugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = options.color || "#99ffff";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

function ResultsChart() {
  const keyStrokesPerSecond: KeyStrokePerSecond[] = useSelector(
    (state: RootState) => state.writer.keyStrokesPerSecond,
  );

  const statisticsData: StatisticsItem[] =
    generateStatisticsItems(keyStrokesPerSecond);

  const labels: number[] = [
    ...statisticsData.map((s: StatisticsItem) => s.second),
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "WPM",
        data: statisticsData.map((s: StatisticsItem) => s.wpm),
        borderColor: "#23a9d5",
        backgroundColor: "#23a9d5",
      },
    ],
  };

  const options = {
    // devicePixelRatio: 10,

    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
      customCanvasBackgroundColor: {
        color: "#151920",
      },
    },
  };

  return <Line options={options} data={data} plugins={[plugin]} />;
}

export default ResultsChart;
