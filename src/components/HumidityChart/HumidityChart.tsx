import ReactChart from "react-apexcharts";
import ReactLoading from "react-loading";
interface IHumidityChart {
  value: number | undefined;
}
export const HumidityChart = ({ value }: IHumidityChart) => {
  return value ? (
    <ReactChart
      style={{ flex: 1 }}
      options={{
        labels: ["Humidade"],
        noData: {
          text: undefined,
          align: "center",
          verticalAlign: "middle",
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: "22px",
            fontFamily: undefined,
          },
        },
      }}
      series={[value || 0]}
      type="radialBar"
      height={320}
      width={"100%"}
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
