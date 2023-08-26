import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
//react-icons
import { ImCancelCircle } from 'react-icons/im'

const Login = ({ onClose }) => {
    // state for visiability
    const [isVisible, setIsvisible] = useState(true)
    // state for login
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLoading, error} = useLogin()
    // Bring userdata from localstorage
    const userData = localStorage.getItem('user')

    // if there's userdata in localstorage, close modal
    if(userData) {
      onClose()
    }

    const handleSubmit = async(e) => {
      e.preventDefault()

      await login(username, password)
    }

    const handleCancelClick = () => {
      setIsvisible(false)
      onClose()
    }
  
  return isVisible ? (
    <form className='login-modal' onSubmit={handleSubmit}>
      <div className='login'>
        {/* cancel */}
        <ImCancelCircle className='cancel-login' onClick={handleCancelClick}/>

        <h3>Log In</h3>

        <label>Username</label>
        <input 
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
        />

        <label>Password</label>
        <input 
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
        />

        <p>Not registered? <span>Sign Up</span></p>
        <button disabled={isLoading}>Log In</button>
        {error && <div className='login-error'>{error}</div>}
      </div>
    </form>
  ) : null
}

export default Login
