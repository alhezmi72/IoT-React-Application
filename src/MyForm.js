import { useState, useContext } from "react";


function MyForm() {

    const [inputs, setInputs] = useState({});
  
    const handleChange = (event) => {
      const country = event.target.country;
      const value = event.target.value;
      setInputs(values => ({...values, [country]: value}))
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      alert(inputs);
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label>Enter country:
        <input 
          type="text" 
          name="country" 
          value={inputs.label || ""} 
          onChange={handleChange}
        />
        </label>
        <label>Enter value:
          <input 
            type="text" 
            name="value" 
            value={inputs.value || ""} 
            onChange={handleChange}
          />
          </label>
          <input type="submit" />
      </form>
    )
  }
  export default MyForm;