import { Chart } from "react-google-charts";
import ReactLoading from "react-loading";
interface ITemperatureChart {
  value: number | undefined;
}
export const TemperatureChart = ({ value }: ITemperatureChart) => {
  return value ? (
    <Chart
      chartType="Gauge"
      data={[["Temperatura"], [value || 0]]}
      legendToggle
      options={{
        redFrom: 90,
        redTo: 100,
        yellowFrom: 75,
        yellowTo: 90,
        minorTicks: 5,
        legend: {
          position: "none",
        },
      }}
      height={320}
    />
  ) : (
    <div>
      <ReactLoading
        className="spinner"
        type={"spinningBubbles"}
        color={"#1870d5"}
        height={50}
        width={50}
      />
      <label>Nenhum valor encontrado, inicie uma conexão</label>
    </div>
  );
};
