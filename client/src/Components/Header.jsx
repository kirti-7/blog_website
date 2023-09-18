import {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext';


// const Header = () => {
// require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);
    
export default function Header() {
    const {userInfo, setUserInfo } = useContext(UserContext);
    useEffect( () => {
        // async function fetchData() {
        //     try {
        //         const response = await fetch('http://localhost:4000/profile', {
        //             credentials: 'include',
        //         })
        //         if (!response.ok) {
        //             const userInfo = await response.json();
        //             setUsername(userInfo.username);
        //         }
                
        //     } catch (error) {
        //         console.log('An error occurred:', error)
        //     }
            
        // }

        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
        
        // fetchData();
        // console.log(username);
        

    }, [setUserInfo]);

    function logout() {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);
    }

    const username = userInfo?.username;


    return (
        <header>
            <Link to='/' className='logo'>SH10001</Link>
            <nav>
                {username &&(
                    <>
                        <Link to={'/create'}>Add Post</Link>
                        <Link onClick={logout}>Logout</Link>
                        
                    </>
                )}
                {!username &&         
                    (<>
                        <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                   
                    </>
                    )}
                
            </nav>

        </header>
    )
}