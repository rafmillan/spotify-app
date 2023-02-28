import React from "react";
import ButtonGroup from "./ButtonGroup";
import { COLORS } from "../consts";
import "../styles/Data.css"

import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis
} from "recharts";

function renderPieChart(data) {
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <PieChart width={900} height={800}>
            <Legend verticalAlign="top" iconSize={15} align="left" layout="vertical" />
            <Pie
                labelLine={false}
                dataKey="value"
                isAnimationActive={false}
                Legend
                label={renderCustomizedLabel}
                data={data}
                cx={400}
                cy={400}
                outerRadius={300}
                fill="#8884d8"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    )
}

function getGenreData(artists) {
    try {
        const genreDict = {};
        let totalGenreList = [];
        for (let i = 0; i < artists.length; i++) {
            if (artists[i].genres.length === 0) {
                continue;
            }
            for (let j = 0; j < artists[i].genres.length; j++) {
                totalGenreList.push(artists[i].genres[j]);
            }
        }

        for (let i = 0; i < totalGenreList.length; i++) {
            if (genreDict[totalGenreList[i]]) {
                genreDict[totalGenreList[i]]++;
            } else {
                genreDict[totalGenreList[i]] = 1;
            }
        }

        return genreDict;
    } catch (error) {
        console.error("Error in getGenreData: ", error);
        return null;
    }
}

function getPieChartData(genreDict) {
    try {
        let data = [];
        for (let [name, value] of Object.entries(genreDict)) {
            data.push({ name, value });
        }
        return data;
    } catch (error) {
        console.error("Error in getPieChartData: ", error);
        return null;
    }
}

function getRadarData(genreDict) {
    try {
        let max = 0;
        let data = [];
        Object.keys(genreDict).map(function (key) {
            if(genreDict[key] >= max) {
                max = genreDict[key] + 1;
            }
            return 0
        });

        data = Object.keys(genreDict).map(function (key) {
            return {
                subject: key,
                count: genreDict[key],
                fullMark: max,
            };
        });
        return data;
    } catch (error) {
        console.error("Error in getRadarData: ", error);
        return null;
    }
}
function Data({ title, artists, buttonHandler }) {
    const buttons = [
        { label: "short term" },
        { label: "medium term" },
        { label: "long term" },
    ];

    function handleButtonClick(button) {
        buttonHandler(button)
    }

    let genreDict = {};
    let pieData = []
    let radarData = [];

    function renderRadarChart(data) {
        return (
            <RadarChart
                width={900}
                height={800}
                cx={450}
                cy={400}
                outerRadius={300}
                data={data}
            >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, data[0].fullMark]}/>
                <Radar
                    dataKey="count"
                    stroke="#A56894"
                    fill="#A56894"
                    fillOpacity={0.8}
                />
            </RadarChart>
        )
    }

    try {
        genreDict = getGenreData(artists);
        pieData = getPieChartData(genreDict);
        radarData = getRadarData(genreDict);
    } catch (error) {
        console.error("Error in data processing: ", error);
    }

    return (
        <div>
            <h5 className="data-title">{title}</h5>
            <div className="button">
                <ButtonGroup buttons={buttons} onButtonClick={handleButtonClick} />
            </div>
            <div>
                {pieData && renderPieChart(pieData)}
                {radarData.length !== 0  && renderRadarChart(radarData)}
            </div>
        </div>
    )
}

export default Data