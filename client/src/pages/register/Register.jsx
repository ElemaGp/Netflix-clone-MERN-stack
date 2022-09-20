import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./register.scss";

export default function Register() {
    const [email, setEmail] = useState(""); //for holding the value of the email typed by the user, on frontend. It'll be passed in using the ref as seen below.
    const [password, setPassword] = useState(""); //for holding the value of the password typed by the user, on frontend. It'll be passed in using the ref as seen below.
    const [username, setUsername] = useState(""); //for holding the value of the password typed by the user, on frontend. It'll be passed in using the ref as seen below.

    const emailRef = useRef(); //i've passed this ref into the email input tag. So it holds the value of whatever is typed into the email input field. It's an alternative to "e.taget.value".
    const passwordRef = useRef(); //i've passed this ref into the password input tag. So it holds the value of whatever is typed into the password input field. It's an alternative to "e.taget.value".
    const usernameRef = useRef(); //i've passed this ref into the password input tag. So it holds the value of whatever is typed into the password input field. It's an alternative to "e.taget.value".
    const history = useHistory();

    const handleStart = ()=>{
        setEmail(emailRef.current.value);
    };
    const handleFinish = async (e)=>{
        e.preventDefault();
        setPassword(passwordRef.current.value);
        setUsername(usernameRef.current.value);
        try{
            await axios.post("auth/register", { email, username, password });
            history.push("/login")
        }catch(err){}
    };




    
  return (
    <div className="register">
        <div className="top">
            <div className="wrapper">
            <img className="logo" 
            src="https://1000logos.net/wp-content/uploads/2017/05/Netflix-symbol-500x157.jpg" 
            alt="" 
            />
            <button className="loginButton">Sign in</button>
        </div>
        </div>
        <div className="container">
            <h1>Unlimited movies, TV shows, and more. </h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>
                Ready to watch? Enter your email to create or restart your membership.
            </p>{
                !email ? (
                    <div className="input">
                    <input type="email" placeholder="email address" ref={emailRef}/>
                    <button className="registerButton" onClick={handleStart}>Get Started</button>

            </div>
                ) : (
                    <form className="input">
                    <input type="username" placeholder="username" ref={usernameRef}/>
                    <input type="password" placeholder="password" ref={passwordRef}/>
                    <button className="registerButton" onClick={handleFinish}>
                    Start
                    </button>
                    </form>
                )}
            
        </div>
    </div>
  );
}
