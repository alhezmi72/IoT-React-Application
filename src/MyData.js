import { useState, createContext } from "react";

export const DataContext = createContext();

function MyData() {
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
    alert(inputs.label);
    setChartData([...chartData, inputs]);
  }
  
  return (
    <DataContext.Provider value={chartData}>
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
    </DataContext.Provider>
  );

}
export default MyData;