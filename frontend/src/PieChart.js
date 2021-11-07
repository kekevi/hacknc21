import { PieChart } from "react-minimal-pie-chart";
import React from "react";
import CanvasJSReact from './Assets/Graphs/canvasjs.react'
// CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 


export function PieChartImpl(props) {
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        
        title:{
            text: "Trip Expenses",
            fontFamily: "calibri"
        },
        subtitles: [{
            text: "Duc Anh",
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true,
            fontFamily: 'calibri',
        }],
        height: 300,
       
        data: [{
            type: "doughnut",
           
            indexLabelFontFamily: "calibri",
            
                //shownInLegend : true,
            indexLabel: "{label}: {y}%",
          
            // indexLabelPlacement: "inside",
            
            
            startAngle: -90,
            labelFontFamily:'calibri',
            dataPoints: [
              
                { y: props.spent[1], label: "Utilities" },
                { y: props.spent[2], label: "Fuel" },
                { y: props.spent[3], label: "Home Improvement" },
                { y: props.spent[4], label: "Electronics" },
             
            ]
        }]
    }
    
    return (
    <div className="pie">
        <CanvasJSChart  options = {options} 
            /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
    );

}

