import React, { useState } from "react";
import './CSS/LoginSignup.css';
const LoginSignup = () => {
    const [state,setState] = useState("Signup");
    const [formdata,setFormdata] = useState({
        username:"",
        password:"",
        email:""
    });
    const changeHandler = (e)=>{
        setFormdata({...formdata,[e.target.name]:e.target.value})
    }
    const login = async()=>{
        console.log('Login Function Executed',formdata);
        let responseData;
        await fetch('https://shopperbackend-nr5z.onrender.com/login',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                "Content-Type":"application/json",
            },
            body:JSON.stringify(formdata),
        }).then((response)=>response.json()).then((data)=>responseData=data);
        if (responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace('/');
        }
        else{
            alert(responseData.errors)
        }
    }
    const signup = async ()=>{
        console.log("Signup Function Executed",formdata);
        let responseData;
        await fetch('https://shopperbackend-nr5z.onrender.com/signup',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                "Content-Type":"application/json",
            },
            body:JSON.stringify(formdata),
        }).then((response)=>response.json()).then((data)=>responseData=data);
        
        if (responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace('/');
        }
        else{
            alert(responseData.errors)
        }
    }
    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Signup"?<input name = "username" value={formdata.username} onChange={changeHandler} type="text" placeholder="Your Name"/>:<></>}
                    <input name = "email" value={formdata.email} onChange={changeHandler} type="email" placeholder="Email Address"/>
                    <input name = "password" value = {formdata.password} onChange={changeHandler} type="password" placeholder="Password"/>
                </div>
                <button onClick={()=>{state === "Login"?login():signup()}}>Continue</button>
                {state === "Signup"?<p className="loginsignup-login" >Already have an account? <span onClick={()=>{setState('Login')}}>Login here</span></p>:<></>}
                {state === "Login"?<p className="loginsignup-login" >Create an account? <span onClick={()=>{setState('Signup')}}>Signup here</span></p>:<></>}
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id=""></input>
                    <p>By continuing, i agree to the terms of use & privacy policy. </p>
                </div>
            </div>

        </div>
    )
}

export default LoginSignup;