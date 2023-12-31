import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';


const Login = () => {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const {setUserInfo} = useContext(UserContext);

  async function login(ev){
    ev.preventDefault()
    // const response =
      await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
     })
    
    // if(response.ok){
    //   setRedirect(true)
    // }else{
    //   alert('invalid credentials')
    // }
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle successful response here
      else {
        response.json().then(userInfo => {
          setUserInfo(userInfo)
          setRedirect(true);
        });
        
      }
    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }



  return (
    <form className='login' onSubmit={login}>
      <h1>Login</h1>
      <input type="text" placeholder='Username' value={username} onChange={e=>setUsername(e.target.value)} />
      <input type="password" placeholder='Password' value={password} onChange={e=> setPassword(e.target.value)}/>
      <button>Login</button>
    </form>
  )
}

export default Login