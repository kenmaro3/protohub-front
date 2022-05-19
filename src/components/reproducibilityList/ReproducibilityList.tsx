import React, { FC, useState, useEffect } from 'react';
import './reproducibilitylist.scss'
import BarChart from "../barChart/BarChart"
import LineChart from "../lineChart/LineChart"

interface ReproducibilityListProps{
    reprList: number[];
    timeCostList: number[];
    reprMapOkay: Map<string, number>;
    reprMapNotOkay: Map<string, number>;
}


const ReproducibilityList: FC<ReproducibilityListProps> = ({reprList, timeCostList, reprMapOkay, reprMapNotOkay}) => {
    const reprOkayLabels = Array.from(reprMapOkay.keys())
    const reprOkayValues = Array.from(reprMapOkay.values())
    const reprNotOkayValues = Array.from(reprMapNotOkay.values())

    const reprLabels = ['Reproducible', 'Not Reproducible']

    const reprDataForLine = {
        labels: reprOkayLabels,
        datasets: [
            {
                label: 'Reproducible',
                data: reprOkayValues,
                backgroundColor: 'rgba(99, 224, 255, 0.5)',
            },
            {
                label: 'Not Reproducible',
                data: reprNotOkayValues,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    const reprDataForBar = {
        labels: reprLabels,
        datasets: [
            {
                label: 'Reproducibility',
                data: reprList,
                backgroundColor: 'rgba(99, 224, 255, 0.5)',
            },
        ],
    };

    const timeCostLabels = ['Extremely Low', 'Low', "Medium", "High", "Extremely High"]
    const timeCostData = {
        labels: timeCostLabels,
        datasets: [
            {
                label: 'Time Cost',
                data: timeCostList,
                backgroundColor: 'rgba(99, 219, 255, 0.5)',
            },
        ],
    };

    return (
        <div className="reproducibilityListContainer">
            <h3>Reproducibility Information</h3>
            <LineChart data={reprDataForLine} />
            <BarChart data={reprDataForBar} />
            <h3 className="secondH3">Time Cost Information</h3>
            <BarChart data={timeCostData} />

        </div>
    );
};

export default ReproducibilityList;