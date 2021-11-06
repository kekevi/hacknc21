import logo from './logo.svg';
import {Main} from './Main'
import { Progress } from './Progress';
import './App.css';
import { PieChartImpl } from './PieChart';

function App() {
  return (
    <div className="App">
      <header>
      
      </header>
      <body>
        <Main></Main>
        <Progress percentInner = {40}  percentGro= {20}  percentEdu={50} percentLife={70} percentElse = {25}></Progress>
        <PieChartImpl></PieChartImpl>
      </body>
    </div>
  );
}

export default App;
