import React from "react";
import { useState, useEffect} from "react";
import "./style/Login.css";
import ladderlogo from "./images/ladder.png";
import {
    PlaidLink,
    usePlaidLink,
    PlaidLinkOptions,
    PlaidLinkOnSuccess,
  } from 'react-plaid-link';
import axios from "axios";
const plaid = require("plaid");


export function Login({ login, update }) {
    const [errorMsg, setErrorMsg] = useState("");

    const [linkToken, setLinkToken] = useState(null);
    const [transactions, setTransactions] = useState(null);
    const handleOnSuccess = function (public_token, metadata) {
        // send token to client server
        axios.post("/auth/public_token", {
          public_token: public_token
        });
      }
    
    const handleOnExit = function () {
    // handle the case when your user exits Link
    // For the sake of this tutorial, we're not going to be doing anything here.
    }

    const handleClick = function (res) {
        axios.get("/transactions").then(res => {
            setTransactions(res.data);
        });
    }

    let user;
    const handleLoginClick = async () => {
        if (user == 0) {
            login(user);
            // getInfo(user).then(val => {return val.json()}).then((val) => {update(val)});
        } else {
            setErrorMsg("Invalid user id. Please contact your bank for more information.");
        }
    }

    const link = <PlaidLink
        clientName="React Plaid Setup"
        env="sandbox"
        product={["auth", "transactions"]}
        publicKey="add your public key here"
        onExit={handleOnExit}
        onSuccess={handleOnSuccess}
        className="test"
    >
        Open Link and connect your bank!
    </PlaidLink>;

    return (
        <div className="page">
            <div className="login-header">
                <img className="logo" src={ladderlogo} />
                <h1>Ladder</h1>
            </div>
            <section className="login-body">
                <h2>Sign In</h2>
                <form>
                    <div className="formobj">
                        <label for="userid">User ID: </label>
                        <input id="userid" type="number" onChange={(e) => user = Number(e.target.value)}/>
                    </div>
                    <div className="formobj">
                        <label for="password">Password: </label>
                        <input id="password" type="password" />
                    </div>
                    <div className="row">
                        <button className="dark-button" type="button" onClick={handleLoginClick}>Log In</button>
                        <button className="dark-button" type="button" onClick={handleClick}>Sign Up</button>
                    </div>
                </form>
                <p>{errorMsg}</p>
            </section>
            <section className="about-body">
                <p>
                    Ladder is the number one way to get your credit card debt back on track. We partner with your banks to provide you an alternative to debt collectors.
                </p>
                <p>
                    We know it can be stressful when you have to worry if you can have food on the table tomorrow, if you have options in the case of an emergency.
                    That's why we let you get the essentials you need, even if your current balance might not allow it.
                </p>
            </section>
        </div>
    )
}


// var PLAID_CLIENT_ID = "your client ID here";
// var PLAID_SECRET = "your secret key here";
// var PLAID_PUBLIC_KEY = "your public key here";
// var PLAID_ENV = "sandbox";

// var client = new plaid.Client(
//     PLAID_CLIENT_ID,
//     PLAID_SECRET,
//     PLAID_PUBLIC_KEY,
//     plaid.environments[PLAID_ENV],
//     { version: "2019-05-29", clientApp: "Plaid Quickstart" }
//   );

// let startDate = "2021-10-01";
// let endDate = "2021-11-08";
//   console.log("made it past variables");
//   client.getTransactions(
//     ACCESS_TOKEN,
//     startDate,
//     endDate,
//     {
//       count: 250,
//       offset: 0
//     },
//     function(error, transactionsResponse) {
//         // TRANSACTIONS LOGGED BELOW! 
//         // They will show up in the terminal that you are running nodemon in.
//         console.log(transactionsResponse);
//       return transactionsResponse;
//     }
// );