import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";
import "./Chart.css";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

function CustomTooltip({ payload, label, active, currency = "eur" }) {
  if (active && payload) {
    return (
      <div className='custom-tooltip'>
        <p className='label'>{`${label}: ${new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currency,
        }).format(payload[0].value)}`}</p>
      </div>
    );
  }
}

const ChartComponent = ({ data, currency }) => {
  return (
    <ResponsiveContainer height={"90%"} width={"100%"}>
      <LineChart width={400} height={400} data={data}>
        <Line
          type='monotone'
          dataKey='prices'
          stroke='#7cb953'
          stroke-width='1px'
        />
        <CartesianGrid stroke='#3d3b3b' />
        <XAxis dataKey='date' hide />
        <YAxis dataKey='prices' hide domain={["auto", "auto"]} />
        <Tooltip
          content={<CustomTooltip />}
          currency={currency}
          cursor={false}
        />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

const Chart = ({ id }) => {
  const [chartData, setChartData] = useState();
  const { currency } = useGlobalContext();
  const getChartData = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=eur&days=7&interval=daily`
      );
      let convertedData = response.data.prices.map((item) => {
        return {
          date: new Date(item[0]).toLocaleDateString(),
          prices: item[1],
        };
      });
      setChartData(convertedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChartData();
  }, [id]);

  return (
    <>
      <ChartComponent data={chartData} currency={currency} />
    </>
  );
};

export default Chart;
