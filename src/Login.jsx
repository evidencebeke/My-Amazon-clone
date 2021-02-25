import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Login.css'
import { auth } from './firebase'



function Login() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const signIn = (e) => {
        e.preventDefault()
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
            history.push('./')
            })
        .catch(error=>setError(error.message))
    }
    const register = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                console.table(auth, 'auth');
                if (auth) {
                    history.push('/')
                }
            })
        .catch(error=>setError(error.message))
    }

    return (
        <div className='login'>
            <Link to='./' >
            <img src="https://pngimg.com/uploads/amazon/amazon_PNG24.png" alt="" className="login__logo"/>
           </Link>
            <div className="login__container">
                <h1>Sign in</h1>
                {error && <div className="login__error">{ error}</div> }
                <form>
                    <h5>Email</h5>
                    <input type="text" value = {email} onChange = {e=>setEmail(e.target.value)} />
                    
                    <h5>Password</h5>
                    <input type="password" value = {password} onChange= {e=>setPassword(e.target.value)} />

                    <button type = 'submit' className = 'login__signInButton' onClick = {signIn} >Sign in</button>
                    
                </form>
                <p>By signing-in, you agree to Amazon's Conditions of Use & Sale. Please see our Private Notice, our Cookies Notice and our Interest-based Ads Notice. Of course this is all fake. There is no terms and conditions anywhere.</p>
                <button className='login__registerButton' onClick={register}  >Create Account</button>
               
            </div>
           
        </div>
    )
}

export default Login
