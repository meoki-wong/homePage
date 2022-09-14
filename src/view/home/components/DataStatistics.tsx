import React, { useEffect } from "react";
import { Chart } from "@antv/g2";
import "../assets/css/dataStatistics.less"
export default function DataStatistics() {
    useEffect(()=>{
        const chart = new Chart({
            container: "container",
            autoFit: true,
            height: 200,
            padding: [30, 20, 70, 30],
          });
          const data = [
            {
              "date": "2015-01-04",
              "lastYear": 0,
              "thisYears": 14
            },
            {
              "date": "2015-01-11",
              "lastYear": 1,
              "thisYears": 12
            },
            {
              "date": "2015-01-18",
              "lastYear": 2,
              "thisYears": 43
            },
            {
              "date": "2015-01-25",
              "lastYear": 13,
              "thisYears": 33
            },
          ]
          chart.data(data);
          chart.scale({
            lastYear: {
              min: 0,
              max: 100,
            },
            thisYears: {
              min: 0,
              max: 100,
            },
          });
        
          chart.axis("lastYear", false);
        
          chart.legend({
            custom: true,
            items: [
              {
                name: "thisYears",
                value: "thisYears",
                marker: { symbol: "line", style: { stroke: "#1890ff", lineWidth: 2 } },
              },
              {
                name: "lastYear",
                value: "lastYear",
                marker: { symbol: "line", style: { stroke: "#2fc25b", lineWidth: 2 } },
              },
            ],
          });
        
          chart.line().position("date*thisYears").color("#1890ff");
          chart.line().position("date*lastYear").color("#2fc25b");
        
          chart.annotation().dataMarker({
            top: true,
            position: ["2016-02-28", 9],
            text: {
              content: "今年 超过 去年",
              style: {
                textAlign: "left",
              },
            },
            line: {
              length: 30,
            },
          });
          chart.removeInteraction("legend-filter"); // 自定义图例，移除默认的分类图例筛选交互
          chart.render();
    }, [])
  

  return (
    <div className="cnzz-box">
      <div id="container"></div>
    </div>
  );
}