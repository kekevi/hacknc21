import React from "react";
import { useEffect, useState } from "react";
import { Bars } from "./Bars";






export function Progress(props) {
    let [percentGro, setPercent1] = useState(0)
    let [percentEdu, setPercent2] = useState(0)
    let [percentLife, setPercent3] = useState(0)
    let [percentElse, setPercent4] = useState(0)
    let [percentInner, setPercentInner] = useState(0);
    let [count, setCount] = useState(0);



    let interval = 0;



    useEffect(() => {
        const intervalId = setInterval(() => {
            if (percentGro <= 100) setPercent1(percentGro => percentGro + 1);
            setCount(prevCount => prevCount + 1);
        }, 10);

        if (count == 100) { clearInterval(intervalId) };
    }, []);

    return (
        <div className="progress">
            <h3>My Spending</h3>
            <Bars name={"Progress"} percent={percentGro} percentInner={percentInner} ></Bars>



            <h1> {percentGro}</h1>
        </div>
    );



}