import React from "react";
import { useEffect,useState } from "react";
import { Bars } from "./Bars";






export function Progress(props) {
   let [percentGro,setPercent1] =  useState(0)
   let [percentEdu,setPercent2] =  useState(0)
   let [percentLife,setPercent3] =  useState(0)
   let [percentElse,setPercent4] =  useState(0)
   let [percentInner,setPercentInner] = useState(0);

   let interval = 0;

    return (
        <div className = "progress">
        <h3>My Spending</h3>
       <Bars name = {"Progress"} percent = {percentGro} percentInner = {percentInner} ></Bars>  
      
       <button onClick = {()=>{
           let id = setInterval(()=>{
                
                if(interval > 100 ){
                    clearInterval(id);
                    console.log(interval);
                } else {
                    //while(percentGro <= props.percentGro){
                    if(percentGro <= props.percentGro) setPercent1(percentGro ++)
                    //if(percentEdu <= props.percentEdu) setPercent2(percentEdu ++)
                    //if(percentLife <= props.percentLife) setPercent3(percentLife ++)
                    //if(percentElse <= props.percentElse) setPercent4(percentElse ++)
                    if(percentInner <= props.percentInner) setPercentInner(percentInner ++)
                    

                    interval ++;
                    //}
                }

           },10);
           
           
           //while(percentGro != 101  ) setPercent(percentGro ++)
           }}>Test</button>
       <h1> {percentGro}</h1>
       </div>
    );



}