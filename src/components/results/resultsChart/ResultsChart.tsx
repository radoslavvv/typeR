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
import StatisticsItem from "../../../models/StatisticsItem";
import { RootState } from "../../../store/Store";
import { useSelector } from "react-redux";
import KeyStrokePerSecond from "../../../models/KeyStrokesPerSecond";
import { SECONDS_IN_MINUTE } from "../../../utils/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function ResultsChart() {
  const keyStrokesPerSecond: KeyStrokePerSecond[] = useSelector(
    (state: RootState) => state.words.keyStrokesPerSecond,
  );

  console.log(keyStrokesPerSecond);

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

  const generateStatisticsItems = (): StatisticsItem[] => {
    const statisticsItems: StatisticsItem[] = [];

    for (let i = 0; i < keyStrokesPerSecond.length; i++) {
      const current: KeyStrokePerSecond = keyStrokesPerSecond[i];

      if (current.second === 0) {
        continue;
      }

      const wordsPerMinute: number = Math.floor(
        current.keyStrokes / 5 / (current.second / SECONDS_IN_MINUTE),
      );

      const newStatisticsItem: StatisticsItem = new StatisticsItem(
        wordsPerMinute,
        current.second,
      );

      statisticsItems.push(newStatisticsItem);
    }

    return statisticsItems;
  };

  const statisticsData: StatisticsItem[] = generateStatisticsItems();

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
