import logo from './logo.svg';
import {Main} from './Main'
import { Progress } from './Progress';
import './App.css';
import { PieChartImpl } from './PieChart';
import { Login } from './Login';
import { useEffect, useState } from 'react';
import axios from 'axios';



function App() {
  const [route, setRoute] = useState('login');
  const [userId,setUserId] = useState(9);
  
  const page = () => {
    switch (route) {
      case "login":
        return (
          <Login login={(uid) => {setUserId(uid); setRoute('dashboard')}} />
        )
      case "dashboard":
        return (
          <div>
            <Main id={userId}></Main>
            <Progress percentInner = {40}  percentGro= {20}  percentEdu={50} percentLife={70} percentElse = {25}></Progress>
            <PieChartImpl></PieChartImpl>
          </div>
        )
      case "transactions":
        return (
          <div>Page does not exist yet.</div>
        )
    }
  }

  return (
    page()
  );
}

export default App;
