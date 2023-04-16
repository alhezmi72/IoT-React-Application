import { useState} from "react";

// STEP 1 - Include Dependencies
// Include react
// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


function MyChart(){
  const [inputs, setInputs] = useState({});
  const [chartData, setChartData] = useState([
    {
      label: "Venezuela",
      value: "290"
    },
    {
      label: "Saudi",
      value: "260"
    }
  ]);
  
  const handleChange = (event) => {
    const label = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [label]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //alert(inputs.label);
    setChartData([...chartData, inputs]);
  }
  
  // STEP 3 - Creating the JSON object to store the chart configurations
  const chartConfigs = {
    type: "column2d", // The chart type
    // You can change the type to line 
    // type: "line", // The chart type
    width: "700", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
    // Chart Configuration
    chart: {
        //Set the chart caption
        caption: "Countries With Most Oil Reserves [2017-18]",
        //Set the chart subcaption
        subCaption: "In MMbbl = One Million barrels",
        //Set the x-axis name
        xAxisName: "Country",
        //Set the y-axis name
        yAxisName: "Reserves (MMbbl)",
        numberSuffix: "K",
        //Set the theme for your chart
        theme: "fusion"
    },
    // Chart Data
    data: chartData
    }
  };

  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Enter Country:
        <input 
            type="text" 
            name="label" 
            value={inputs.label || ""} 
            onChange={handleChange}
        />
        </label>
        <label>Enter country value:
        <input 
            type="text" 
            name="value" 
            value={inputs.value || ""} 
            onChange={handleChange}
        />
        </label>
        <input type="submit" />
      </form>
      <ReactFC {...chartConfigs} />;
    </>
  );
}
export default MyChart;
