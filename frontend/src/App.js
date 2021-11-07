import logo from './logo.svg';
import { Main } from './Main'
import { Progress } from './Progress';
import './App.css';
import { PieChartImpl } from './PieChart';
import { Login } from './Login';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getPercentages, getSpent } from './MathFunction'
import RequestForm from './RequestForm';
import Transactions from './Transactions';



function App() {
  const [route, setRoute] = useState('login');
  const [userId, setUserId] = useState(9);
  const [userBalance, setBalance] = useState([]);
  const [userLimit, setLimit] = useState([]);
  const [userSpent, setSpent] = useState([]);

  const page = () => {
    switch (route) {
      case "login":
        return (
          <Login login={(uid) => { setUserId(uid); setRoute('dashboard') }} update={(val) => {
            setBalance(getPercentages(val.currentBalance, val.initialOldBalance, val.totalPaidBalance));

          }} update2={(val1, val2) => {
            setLimit((val1))
            setSpent(getSpent(val2))
          }} />
        )
      case "dashboard":
        return (
<<<<<<< HEAD
          <div >
            <Main id={userId}></Main>

            <Progress percentInner={userBalance[0]} percentGro={userBalance[1]} uid={userId} amount={userBalance[2]} ></Progress>
            <PieChartImpl spent = {userSpent}></PieChartImpl>
            <button onClick={() => setRoute('transactions')}>See Transaction History</button>
            <button onClick={() => setRoute('request_spend')}>Spend Request</button>
            
=======
          <div className="dashboard">
            <div style={{'background-color': 'white'}}>
              <Main id={userId}></Main>
            </div>
            <div>
              <Progress percentInner={userBalance[0]} percentGro={userBalance[1]} uid={userId} amount={userBalance[2]} ></Progress>
              <PieChartImpl spent = {userSpent}></PieChartImpl>
            </div>
              <button className="light-button" onClick={() => setRoute('transactions')}>See Transaction History</button>
              <button className="light-button" onClick={() => setRoute('request_spend')}>Spend Request</button>
>>>>>>> 20a0256937a9a7dcba3257b96562f6b75ca5da07
          </div>
        )
      case "transactions":
        return (
          <Transactions id={userId} goto={setRoute} />
        )
      case "request_spend":
        return (
          <RequestForm id={userId} goto={setRoute} />
        )
    }
  }

  return (
    page()
  );
}

export default App;
