import React,{useState} from 'react'
import "../CSS/Login.css"
import { useNavigate } from 'react-router';

function Register() {
  const navigate = useNavigate();

    const [user, setUser] = useState({
        username:"",
        email:"",
        password:"",
    })

    const handleinput =(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setUser({...user,[name]:value});
    }
    const Handlesubmit =async(e)=>{
        e.preventDefault();
        const {username,email,password} = user;
        try{
            const res = await fetch('/api/login/register',{
                method : "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    username,email,password
                })
            })
            if(res.status===400 || !res){
                window.alert("Email or Username Alredy Registered")
            }else{
                window.alert("Register Success!")
                navigate('/Login')
            }
        }catch(err){
                console.log(err);
        }
    }

  return (
    <div className='login-container'>
<h1 className='h1'>Register Here<i class="fa-solid fa-right-to-bracket"></i></h1>
<form className='login-form' action="post">
<input className='login-input' placeholder='Email' value={user.email} onChange={handleinput} name="email" type="email"/>
  <input className='login-input' type="text" placeholder='username' value={user.username} onChange={handleinput} name="username"/>
 
  <input className='login-input' placeholder='password' type="password" value={user.password} onChange={handleinput} name="password"/>
  <button  class="btn1 btn btn-outline-dark" onClick={Handlesubmit}>Register</button>
  <div className='donthave'><p>Alredy have Account?</p>
  <a className='register' href="/Login">Login</a></div>
  
</form>

    </div>
  )
}

export default Register