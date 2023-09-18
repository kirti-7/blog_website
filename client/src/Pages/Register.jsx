
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // e stands for event
  async function register(e) {
    e.preventDefault();
    // try {
    //   await fetch('http://localhost:4000/register', {
    //     method: 'POST',
    //     body: JSON.stringify({ username, password }),
    //     headers: { 'Content-Type': 'application/json' }
    //   }).then(e => e.text())
    // } catch (error) {
    //   toast("Registration failed. Try again later!")
    // }


    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });
       
    //  .then(e => e.text())

    console.log(response);
    if (response.status === 200) {
      toast.success("Registration successful.")      
    }
    else {
      toast.error("Registration failed",)
    }
  }
  

  // function register(e) {
  //   console.log("registered");
  // }

  return (
    <>
    <form className='register' onSubmit={register}>
      <h1>Register</h1>
      <input type="text" placeholder='Username' value={username} onChange={e=> setUsername(e.target.value)} />
      <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
      <button>Register</button>
      </form>
      < ToastContainer style={{ width: 330 }} closeButton={false}/>
    </>
  )
}

export default Register