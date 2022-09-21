import { useContext, useState } from "react";
import "./login.scss";
import {login} from "../../authContext/apiCalls";
import {AuthContext} from "../../authContext/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {dispatch} = useContext(AuthContext);
    
    const handleLogin = (e) =>{
        e.preventDefault();
        login({ email, password}, dispatch)  //"login()" is the function for authentication in the authContext apiCalls. I've passed in the user (email and password) and dispatch arguments as required.The "user" is necessary for the login from backend api (req.user.body) while dispatch is for the loginStart, loginSuccess and loginFailure.
    }
  return (
    <div className="login">
        <div className="top">
            <div className="wrapper">
            <img className="logo" 
            src="https://1000logos.net/wp-content/uploads/2017/05/Netflix-symbol-500x157.jpg" 
            alt="" 
            />
        </div>
        </div>
        <div className="container">
            <form>
                <h1>Sign In</h1>
                <input type="email" placeholder="Email or phone number" onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                <button className="loginButton" onClick={handleLogin}>Sign In</button>
                <span>New to Netflix? <b>Sign up now.</b></span>
                <small>
                    This page is protected by Google reCAPTCHA to ensure you're not a 
                    bot. <b>Learn more</b>.
                </small>
            </form>
        </div>
    </div>
  );
}
