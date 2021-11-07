import React from "react";
import "./style/RequestForm.css";
import { useState } from "react";

export function RequestForm({id, goto}) {
  let amount;
  let type;
  const [errorMsg, setErrorMsg] = useState("");
  const [status, setStatus] = useState(null)

  const handleSubmit = async () => {
    if (amount <= 0 || !type) {
      setErrorMsg("Error - amount must be greater than zero and a type must be selected.");
      return;
    }  
    console.log("type", type);
    const response = await (await fetch(`http://localhost:5000/user/${id}/request`, {
      method: 'POST',
      body: {amount, category: type}
    }).catch(setErrorMsg("Failed to reach database. Try again in a couple seconds."))).json();
    console.log(response)
    // error in backend is that we should be passing a string and the backend looks up the MCC
    // but currently it is expecting the reverse
    if (response.approved && !response.prePayRequired) {
      setStatus(true);
    } else if (response.approved && response.prePayRequired) {
      setStatus(response.prePayAmount);
    } else {
      setStatus(false);
    }
  };

  const terminal = () => {
    switch(status) {
      case null:
        return (<section className="terminal" style={{visibility: 'hidden'}}/>);
      case true:
        return (
          <section className="terminal">
            <h2>Transaction Approved</h2>
          </section>
        )
      case false:
        return (
          <section className="terminal">
            <h2>Transaction Denied :(</h2>
          </section>
        )
      default:
        return (
          <section className="terminal">
            <h2>Prepay Required</h2>
          </section>
      )
    }
  }

  return (
    <div className="page request-page">
      {terminal()}
      <form className="request-form">
        <svg className="pagefold" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 7.62939e-06H90L0 90V7.62939e-06Z" fill="#FABB3D"/>
        <path d="M90 90L-1.49012e-06 90L90 6.91414e-06L90 90Z" fill="#C4C4C4"/>
        </svg>

        <h2>Request Spending</h2>
        <label>Amount $
          <input type="number" value={amount} onChange={e => amount = Number(e.target.value)} />
        </label>
        <label>Type
          <select value={type} onChange={e => type = e.target.value} name="transaction_type" id="transaction_type_dropdown">
            <option disabled selected value>-- Select an Option --</option>
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
        <button className="dark-button" type="button" onClick={handleSubmit}>Submit Request</button>
        <p>{errorMsg}</p>
        <button className="dark-button" type="button" onClick={() => goto('dashboard')}>Back to Dashboard</button>
      </form>
    </div>
  );
}

export default RequestForm;