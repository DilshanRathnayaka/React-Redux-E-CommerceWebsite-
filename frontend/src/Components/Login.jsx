import React,{useState}from 'react'
import "../CSS/Login.css"
import { useNavigate } from 'react-router';

function Login() {
  const [user, setUser] = useState({
    username: '',
    password: '',
});
const navigate = useNavigate();

const handlechange = (e) => {
    let name = e.target.name;
    let value = e.target.value

    setUser({ ...user, [name]: value })
}


const handlesubmit = async (e) => {
    e.preventDefault();
    const { username, password } = user;
    try {
        const res = await fetch('/api/login/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, password
            })
        });
        if (res.status === 401 || !res) {
            window.alert("Invalid Credentials")
        } else {
            navigate('/')
            window.location.reload();
            localStorage.setItem('username', username);
            
        }
    } catch (err) {
     
    }
}

  return (
    <div className='login-container'>
<h1 className='h1'>Login<i class="fa-solid fa-right-to-bracket"></i></h1>
<form className='login-form' action="">
 
  <input className='login-input' type="text" placeholder='username' value={user.username} onChange={handlechange} name="username"/>
 
  <input className='login-input' type="password" placeholder='password'  name="password" value={user.password} onChange={handlechange}/>
  <button  class="btn1 btn btn-outline-dark" onClick={handlesubmit}>Login</button>
  <div className='donthave'><p>Don't have Account?</p>
  <a className='register' href="/Register">Register</a></div>
  
</form>

    </div>
  )
}

export default Login