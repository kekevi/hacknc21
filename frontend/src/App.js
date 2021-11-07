import logo from './logo.svg';
import { Main } from './Main'
import { Progress } from './Progress';
import './App.css';
import { PieChartImpl } from './PieChart';
import { Login } from './Login';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {getPercentages} from './MathFunction'
import RequestForm from './RequestForm';
import Transactions from './Transactions';



function App() {
  const [route, setRoute] = useState('login');
  const [userId, setUserId] = useState(9);
  const [userBalance, setBalance] = useState([]);

  const page = () => {
    switch (route) {
      case "login":
        return (
          <Login login={(uid) => { setUserId(uid); setRoute('dashboard') }} update={(val) => {
            setBalance(getPercentages(val.currentBalance,val.initialOldBalance,val.totalPaidBalance));
          }} />
        )
      case "dashboard":
        return (
          <div>
            <Main id={userId}></Main>

            <Progress percentInner={userBalance[0]} percentGro={userBalance[1]} uid = {userId} ></Progress>
            <PieChartImpl></PieChartImpl>
            <button onClick={() => setRoute('transactions')}>See Transaction History</button>
            <button onClick={() => setRoute('request_spend')}>Spend Request</button>
          </div>
        )
      case "transactions":
        return (
          <Transactions id={userId} goto={setRoute}/>
        )
      case "request_spend":
        return (
          <RequestForm id={userId} goto={setRoute}/>
        )
    }
  }

  return (
    page()
  );
}

export default App;
