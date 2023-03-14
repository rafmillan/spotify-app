import React from "react";
import { PIE_COLORS} from "../consts";
import { VictoryPie, VictoryTooltip, VictoryLegend } from 'victory';

import "../styles/tailwind.css"

function countData(arr) {
    const map = new Map();
  
    for (const str of arr) {
      if (map.has(str)) {
        map.set(str, map.get(str) + 1);
      } else {
        map.set(str, 1);
      }
    }
      
    const result = Array.from(map, ([x, y]) => ({ x, y, label: x }));
    console.log(result)
    // if (result.length > 10) {
    //    result = result.slice(0, 9)
    // }
    return result;
}

function getGenreData(artists) {
    try {
        let genreDict = [];
        let totalGenreList = [];
        for (let i = 0; i < artists.length; i++) {
            if (artists[i].genres.length === 0) {
                continue;
            }
            for (let j = 0; j < artists[i].genres.length; j++) {
                totalGenreList.push(artists[i].genres[j]);
            }
        }
        genreDict = countData(totalGenreList)
        return genreDict;
    } catch (error) {
        console.error("Error in getGenreData: ", error);
        return null;
    }
}

function getLegendData(data) {
    var legend = []
    for(let i = 0; i < data.length; i++) {
        legend.push({name: data[i].x})
    }
    return legend
}

const PieChart = ({ data }) => {
    let genreDict = [];
    let legend = []
    try {
        genreDict = getGenreData(data);
        legend = getLegendData(genreDict);
    } catch (error) {
        console.error("Error in data processing: ", error);
    }
    console.log(legend)

    return (
        <div className="flex flex-cols-2">
            <div className="w-1/3">
            <VictoryLegend
                y={-150}
                orienttion="vertical"
                data={legend}
                height={100}
                width={200}
                colorScale={PIE_COLORS}
                style={{ border: { stroke: "none" }, labels: { fontSize: 15, fill:"#F1E4CD"} }}
            />
            </div>
            <div className="w-2/3">
            <VictoryPie
                colorScale={PIE_COLORS}
                data={genreDict}
                innerRadius={100}
                padAngle={1}
                labelComponent={<VictoryTooltip/>}
            />
            </div>
        </div>
    )
}

export default PieChart