import React, { FC, useState, useEffect } from 'react';
import './barchart.scss'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart',
        },
    },
};

interface BarChartProps {
    data: ChartData<"bar", number[], unknown>;

}


const BarChart: FC<BarChartProps> = ({ data }) => {
    return (
        <div className="barChartContainer">
            <Bar options={options} data={data} />

        </div>
    );
};

export default BarChart;