import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './firebase'

function Login() {

    const navigate = useNavigate() ;
    const [email,setEmail] = useState('') ;
    const [password, setPassword] = useState('') ;
    
    const signIn = e => {
        e.preventDefault()
        //firebase login stuff
        auth
        .signInWithEmailAndPassword(email,password)
        .then( auth => {
            navigate('/')
        })
        .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault() ;
        //firebase registration
        auth
        .createUserWithEmailAndPassword(email,password)
        .then( (auth) => {
            console.log(auth) ;
            if(auth){
                navigate('/')
            }
        })
        .catch( error => alert(error.message)) 

    }

  return (
    <div className='login'>
        <Link to='/'>
            <img 
            src='https://i.imgur.com/flBE5j3.png'
            className='login-logo' />
        </Link>
        <div className='login-container'>
            <h1>
                Sign-In
            </h1>
            <form>
                <h5>
                    E-mail
                </h5>
                <input 
                type='text' 
                value={email} 
                onChange= {
                    e => setEmail(e.target.value)
                }
                />
                <h5>Password</h5>
                <input 
                type='password'
                value={password} 
                onChange={
                    e => setPassword(e.target.value)
                }
                />
                <button 
                className='login-signInButton'
                onClick={signIn}
                type='submit'>
                    Sign In
                </button>
            </form>
            <p>
                By signing-in you agree to AMAZON CLONE'S 
                Condition of Use and Sale. Please see our 
                Privacy Notice, our Cookies Notice and our 
                Interest-based Ads Notice.
            </p>
            <button className='login-registerButton' onClick={register}>
                Create your Amazon Account
            </button>
        </div>
    </div>
  )
}

export default Login