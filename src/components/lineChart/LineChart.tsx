import React, { FC, useState, useEffect } from 'react';
import './linechart.scss'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    ChartData
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
interface LineChartProps{
    data: ChartData<"line", number[], unknown>;

}


const LineChart: FC<LineChartProps> = ({data}) => {
    return (
        <div className="barChartContainer">
            <Line options={options} data={data} />

        </div>
    );
};

export default LineChart;