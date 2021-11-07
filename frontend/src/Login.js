import React from "react";
import ladderlogo from "./images/ladder.png";


export function Login(props) {

    return (
        <div>
            <div className="login-title">
                <img src={ladderlogo} width="128px"/>
                <h1>Welcome to LadderCard</h1>
            </div>
            <h2>Login</h2>
            <form>
                <label>UserID</label>
                <input id="loginForm" type="number" />
            </form>
        </div>
    )


}