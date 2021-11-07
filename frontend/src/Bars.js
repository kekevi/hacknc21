import React from "react";
import { useEffect,useState } from "react";


export function Bars(props) {
 //  let [percent,setPercent] =  useState(20)
let percent = props.percent;
let percentInner = props.percentInner;
    return (
        <div className="progress">
            <h4>{props.name}</h4>
            <div>
                <div  className="groceryBar">
                    <div style={{width: `${percent}%`}} className="groceryBarProg">
                    
                          <div style={{width: `${percentInner}%`}} className="groceryBarProgInner"><p>{percentInner+"%"}</p>
                          </div>
     
                    </div>
                </div>

            </div>

        </div >

    );



}