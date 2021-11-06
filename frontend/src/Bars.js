import React from "react";
import { useEffect,useState } from "react";


export function Bars(props) {
 //  let [percent,setPercent] =  useState(20)
let percent = props.percent;
    return (
        <div className="progress">
            <h1>My Spending</h1>
            <div>
                <div  className="groceryBar">
                    <div style={{width: `${percent}%`}} className="groceryBarProg"></div>
                </div>

            </div>

        </div >

    );



}