import React, { useEffect, useState } from "react";
import "./style/Transactions.css"

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
const [currMonth, currYear] = [new Date().getMonth(), new Date().getFullYear()];

function Transactions ({id, goto}) {
  const [txns, setTxns] = useState([])
  useEffect(() => {
    async function getTransactions () {
      const json = await (await fetch(`http://localhost:5000/user/${id}/transactions`)).json();
      const transactions = json.map(txn => {
        return {
          ...txn,
          date: new Date(txn.date)
        }
      }).sort((a, b) => b.date.getTime() - a.date.getTime());
      setTxns(transactions);
    }
    getTransactions();
  }, []);
  
  const calcBalanceChange = () => {
    return money.format(txns
      .filter(t => t.date.getMonth() == currMonth && t.date.getFullYear() == currYear)
      .map(t => t.amount)
      .reduce((prev, curr) => prev+curr, 0)
    );
  }

  const txnComponents = txns.map((t, i) => {
    return (
      <tr key={i}>
        <td className="date">{t.date.toLocaleString()}</td>
        <td className={`amount ${t.amount < 0 ? "red" : "green"}`}>{money.format(t.amount)}</td>
        <td className="mcc">{t.MCC}</td>
      </tr>
    );
  });


  return (
    <div className="transactions-page">
      <div className="margin">
        <div className="paper">
          <h2>Transactions</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount ($)</th>
                <th>MCC Category</th>
              </tr>
            </thead>
            <tbody>
              {txnComponents}
            </tbody>
          </table>
          <p>Balance change since the start of the month: {calcBalanceChange()}</p>
          <button className="dark-button center" type="button" onClick={() => goto('dashboard')}>Back to Dashboard</button>
        </div>
      </div>
    </div>
  )
}

export default Transactions;