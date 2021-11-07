import React from "react";
import { useState, useEffect} from "react";
import "./style/Login.css";
import ladderlogo from "./images/ladder.png";
import { usePlaidLink } from "react-plaid-link";


export function Login({ login, update }) {
    const [errorMsg, setErrorMsg] = useState("");

    const [linkToken, setLinkToken] = useState(null);
    const generateToken = async () => {
        const response = await fetch('/api/create_link_token', {
        method: 'POST',
        });
        const data = await response.json();
        setLinkToken(data.link_token);
    };
    useEffect(() => {
        generateToken();
    }, []);

    let user;
    const handleLoginClick = async () => {
        if (user == 0) {
            getInfo(user).then(val => {return val.json()}).then((val) => {update(val)});
            login(user);

        } else {
            setErrorMsg("Invalid user id. Please contact your bank for more information.");
        }



    }

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
                        <button className="dark-button" type="button" onClick={generateToken}>Sign Up</button>
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

  const Link= (props) => {
    const onSuccess = React.useCallback((public_token, metadata) => {
      // send public_token to server
      const response = fetch('/api/set_access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_token }),
      });
      // Handle response ...
    }, []);
    const config = {
      token: props.linkToken,
      onSuccess,
    };
    const { open, ready } = usePlaidLink(config);
    return (
      <button onClick={() => open()} disabled={!ready}>
        Link account
      </button>
    );

// function SignupModal () {
//     return {

}

function getInfo(user) {
    const response = fetch(`http://localhost:5000/user/${user}`, {
        method: 'GET',

    })
    

    return response;

}