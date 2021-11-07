import React from "react";
import { useEffect, useState } from "react";
import { Bars } from "./Bars";






export function Progress(props) {
    //let [percentGro, setPercent1] = useState(props.percentGro)
    let [percentEdu, setPercent2] = useState(0)
    let [percentLife, setPercent3] = useState(0)
    let [percentElse, setPercent4] = useState(0)
    //let [percentInner, setPercentInner] = useState(props.percentInner);
    let [count, setCount] = useState(0);

   
    let percentGro = props.percentGro;
    let percentInner = props.percentInner;  

    let interval = 0;





    return (
        <div className="progress">
            <h3>You have {props.amount} left to paid</h3>
            <Bars name={"Progress"} percent={percentGro} percentInner={percentInner} ></Bars>



           
        </div>
    );



}