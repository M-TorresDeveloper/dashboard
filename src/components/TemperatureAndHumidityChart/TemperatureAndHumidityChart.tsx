import { useEffect, useState } from "react";
import ReactChart from "react-apexcharts";
import ReactLoading from "react-loading";
interface ITemperatureAndHumidityChart {
  temperature: number | undefined;
  humidity: number | undefined;
  time: Date | undefined;
}
export const TemperatureAndHumidityChart = ({
  temperature,
  humidity,
  time,
}: ITemperatureAndHumidityChart) => {
  const [temperatures, setTemperatures] = useState([temperature || 0]);
  const [humidities, setHumidities] = useState([humidity || 0]);
  const [times, setTimes] = useState([time || new Date()]);

  useEffect(() => {
    if (temperature) {
      setTemperatures([...temperatures, temperature]);
    }
    if (humidity) {
      setHumidities([...humidities, humidity]);
    }

    if (time) {
      setTimes([...times, time]);
    }
  }, [temperature, humidity, time, temperatures, humidities, times]);

  return temperature || humidity ? (
    <ReactChart
      type="line"
      height={350}
      width={"100%"}
      style={{ flex: 1 }}
      options={{
        chart: {
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: "zoom",
          },
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 2000,
            },
          },
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "straight",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        xaxis: {
          type: "datetime",
          categories: times,
        },
        yaxis: {
          min: 60,
          max: 100,
        },
        legend: {
          show: true,
        },
      }}
      series={[
        {
          name: "Temperatura",
          data: temperatures,
        },
        {
          name: "Humidade",
          data: humidities,
        },
      ]}
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
