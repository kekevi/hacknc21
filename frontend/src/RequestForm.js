import React from "react";
import "./style/RequestForm.css";
import { useEffect,useState } from "react";

export function RequestForm(props) {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const handleSubmit = async () => {
    if (amount <= 0 || type === "") {
      console.log("ERROR, invalid request values");
      return;
    }
    
    const response = fetch(`http://localhost:5000/user/${props.userId}/request`, {
      method: 'POST',
      body: {amount, category: type}
    });
    // waiting for backend to specify how this works
  };
  return (
    <div>
      <h1>Request an Essential Purchase</h1>
      <form className="request-form">
        <label>Amount 
          <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
        </label>
        <label>Type
          <select value={type} onChange={e => setType(e.target.value)} name="transaction_type" id="transaction_type_dropdown">
            <option value="groceries">Groceries</option>
            <option value="restaurants">Restaurants</option>
            <option value="clothing">Clothing and Fashion</option>
            <option value="electronics">Groceries</option>
            <option value="fuel">Fuel and Gas</option>
            <option value="transportation">Transportation</option>
            <option value="utilities">Utility Bills</option>
            <option value="home_improvement">Home Improvement</option>
          </select>
        </label>
        <button type="button" onClick={handleSubmit}>Submit Request</button>
      </form>
    </div>
  );
}

export default RequestForm;