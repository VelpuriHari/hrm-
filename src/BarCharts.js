import { BarChart } from "@mui/x-charts/BarChart";

export default function BarCharts({ xAxisdata, seriesdata, label }) {
  return (
    <>
      <div className="ChartContainer">
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: xAxisdata,
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: seriesdata,
              label: label,
            },
          ]}
          width={500}
          height={300}
          barLabel="value"
        />
      </div>
    </>
  );
}
