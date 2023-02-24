import { useState,useEffect } from "react";
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
import '../styles/login.css'

const Login = () => {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [users,setUsers] = useState([])
    let navigate = useNavigate() 

    useEffect(() => {
        let fetchData = async () => {
            let response = await fetch('http://localhost:7000/userdata')
            let data = await response.json()
            console.log(users)
            setUsers(data)
        }
        fetchData()
    },[])
    
    
    let handleSubmit = (event) => {
        event.preventDefault()
        let data = { email, password }
        // console.log(data);
        // function Email(){
        //     let flag = false;
        //     for (let i = 0; i < users.length; i++){
        //       if (users[i].email==document.getElementById('email').value) {
        //         return true
        //       }
        //       else {
        //         flag = false
        //       }
        //     }
        //     return flag
        // }
        
        // function Password() {
        //     let flag = false
        //     for (let i = 0; i < users.length; i++){
        //       if (users[i].password==document.getElementById('input').value) {
        //         return true
        //       }
        //       else {
        //         flag = false
        //       }
        //     }
        //     return flag
        // }
        if (email && password) {
            navigate("/home")              //navigate is used to move the control to the admin page
        }
        else {
            alert("Invalid credentials")
        }
        fetch('http://localhost:9000/postSignUpDetails',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(data)
        })
    }
    
    let hide = () => {
        let x = document.getElementById('input')
        let y = document.getElementById('hide1')
        let z = document.getElementById('hide2')
        if (x.type === "password") {
            x.type = "text"
            y.style.display = "inline"
            z.style.display = "none"
        }
        else {
            x.type = "password"
            y.style.display = "none"
            z.style.display = "inline"
        }
    }

    return (
        <div className="login">
            <div className="form">
                <div className="form-input">
                    <h1>LOG IN</h1>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="email-input">
                            <label htmlFor="">USERNAME</label> <br />
                            <input type="email" id="email" placeholder="enter email address" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="password-input">
                            <label htmlFor="">PASSWORD</label> <br />
                            <input type="password" id="input"placeholder="enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <span className="eye" onClick={() => hide()}>
                                <Icon id="hide1" icon="ic:baseline-remove-red-eye" />
                                <Icon id="hide2" icon="mdi:eye-off" />
                            </span>
                        </div>
                        <button>Submit</button>
                    </form>
                </div>

            </div>
        </div>
    )
}
export default Login; 