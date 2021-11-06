import React from "react";
import { useEffect,useState } from "react";
import { Bars } from "./Bars";




export function Progress(props) {
   let [percentGro,setPercent] =  useState(20)

    return (
        <div>
       <Bars percent = {percentGro} ></Bars>   
       <button onClick = {()=>{setPercent(percentGro ++)}}>Test</button>
       <h1></h1>
       </div>
    );



}