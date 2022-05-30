import React, { FC, useState, useEffect } from 'react';
import './reproducibilitylist.scss'
import BarChart from "../barChart/BarChart"
import LineChart from "../lineChart/LineChart"
import InfoIcon from '@mui/icons-material/Info';
import InfoMenu from '../infoMenu/InfoMenu';

interface ReproducibilityListProps {
    reprList: number[];
    timeCostList: number[];
    reprMapOkay: Map<string, number>;
    reprMapNotOkay: Map<string, number>;
    isMobile: boolean;
}


const ReproducibilityList: FC<ReproducibilityListProps> = ({ reprList, timeCostList, reprMapOkay, reprMapNotOkay, isMobile}) => {
    const reprOkayLabels = Array.from(reprMapOkay.keys())
    const reprOkayValues = Array.from(reprMapOkay.values())
    const reprNotOkayValues = Array.from(reprMapNotOkay.values())

    const reprInfoContent = "Reproducibility shows how many developer actually try the content in this post,\
                and if they were able to reproduce the implementation.<br/><br/>\
                Reproducibility shows along with timeline, so reader can see if this post is outdated or not."

    const timeInfoContent = "Time cost shows how log it took for the developer to reproduce the implementation of this post.<br/> <br/>\
                Brief time range is, <br/><br/>Extremely low (< 1 hour)<br/>Low (< 3 hours)<br/>Medium (< 1 day)<br/>High (< 3 day)<br/>Extremely High (more than 3 days)\
    "

    const [isInfoShow, setIsInfoShow] = useState<boolean>(false);

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
        <div className={`${isMobile? "reproducibilityListContainerMobile" : "reproducibilityListContainer"}`}>
            <div className="header">
                <h3>Reproducibility Information</h3>
                <InfoMenu info={reprInfoContent} isMobile={isMobile}>
                    <div className="infoMark"><InfoIcon /></div>

                </InfoMenu>
            </div>
            <LineChart data={reprDataForLine} />
            <BarChart data={reprDataForBar} />
            <div className="header">
                <h3 className="secondH3">Time Cost Information</h3>
                <InfoMenu info={timeInfoContent} isMobile={isMobile}>
                    <div className="infoMark"><InfoIcon /></div>

                </InfoMenu>

            </div>
            <BarChart data={timeCostData} />

        </div>
    );
};

export default ReproducibilityList;