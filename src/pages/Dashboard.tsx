import React, { useState, useEffect, useMemo } from "react";
import { Header, TemperatureChart } from "../components";
import { HumidityChart } from "../components/HumidityChart";
import { TemperatureAndHumidityChart } from "../components/TemperatureAndHumidityChart";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080", {
  transports: ["websocket"],
  reconnection: false,
});

const TIME_TO_REFRESH = 10000;
interface IReceivedValues {
  time: Date;
  values: {
    id: number;
    value: number;
  }[];
}
export const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [receivedValues, setReceivedValues] = useState<IReceivedValues | null>(
    null
  );
  const temperature = useMemo(() => {
    return Number(
      receivedValues?.values?.find((value) => value.id === 1)?.value?.toFixed(2)
    );
  }, [receivedValues]);
  const humidity = useMemo(() => {
    return Number(
      receivedValues?.values?.find((value) => value.id === 2)?.value?.toFixed(2)
    );
  }, [receivedValues]);
  const time = useMemo(() => {
    return receivedValues?.time;
  }, [receivedValues]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isConnected) {
        socket.emit("stream");
      }
    }, TIME_TO_REFRESH);
    return () => clearInterval(interval);
  }, [isConnected]);

  const connectSocketServer = () => {
    socket.connect();
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("updateValues", (values: IReceivedValues) => {
      setReceivedValues(values);
    });
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    setIsConnected(true);
  };

  const disconnectServer = () => {
    socket.disconnect();
    setIsConnected(false);
  };

  return (
    <main className="container">
      <Header
        isConnected={isConnected}
        connectServer={connectSocketServer}
        disconnectServer={disconnectServer}
      />
      <div className="row">
        <div className="column">
          <div className="card">
            <TemperatureChart value={temperature} />
          </div>
        </div>
        <div className="column">
          <div className="card">
            <HumidityChart value={humidity} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <div className="card">
            <TemperatureAndHumidityChart
              temperature={temperature}
              humidity={humidity}
              time={time}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
