import {useState} from 'react'

const Login = () => {
  return (
    <div className='login-modal'>
      <h3>Log In</h3>
      <label>Username</label>
      <input></input>
      <label>Password</label>
      <input></input>

      <p>Not registered? <span>Sign Up</span></p>
      <button>Log In</button>
    </div>
  )
}

export default Login
