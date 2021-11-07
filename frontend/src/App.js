import logo from './logo.svg';
import {Main} from './Main'
import { Progress } from './Progress';
import './App.css';
import { PieChartImpl } from './PieChart';
import { Login } from './Login';
import { useEffect, useState } from 'react';
import axios from 'axios';



function App() {
  let [hasLogin,setLogin] = useState('false');
  let [userId,setUserId] = useState(0);
  let [wrongLogin, setWrongLogin] = useState(false);

  const doSome = async () => {
    console.log(await axios.get('http://127.0.0.1:5000/user/0'))
  }
  return (
    <div className="App">
      {hasLogin ? <div>
        <Login></Login>
        <button onClick = {()=>{
          doSome()
          let id = parseFloat(document.getElementById('loginForm').value);
          setWrongLogin(true);

          //hard code check for demo
          if(!Number.isInteger(id) || id < 0 || id > 3){
            setWrongLogin(true);
            return;
          }
          
          setUserId(id);
          setWrongLogin(false);
          setLogin(!hasLogin)}}>Sign in</button>
          
          {wrongLogin ? <h3>No User found or Invalid input</h3> : <div></div>}

      </div> :
      <div>

      <Main id={userId}></Main>
      <Progress percentInner = {40}  percentGro= {20}  percentEdu={50} percentLife={70} percentElse = {25}></Progress>
      <PieChartImpl></PieChartImpl>
      </div>}
    </div>
  );
}

export default App;
