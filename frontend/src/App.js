import logo from './logo.svg';
import {Main} from './Main'
import { Progress } from './Progress';
import './App.css';
import { PieChartImpl } from './PieChart';
import { Login } from './Login';
import { useEffect, useState } from 'react';



function App() {
  let [hasLogin,setLogin] = useState('false');
  let [userId,setUserId] = useState(0);
  let [wrongLogin, setWrongLogin] = useState(false);

  return (
    <div className="App">
      <header>
      
      </header>
      <body>
        {hasLogin ? <div>
          <Login></Login>
          <button onClick = {()=>{
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
      </body>
    </div>
  );
}

export default App;
