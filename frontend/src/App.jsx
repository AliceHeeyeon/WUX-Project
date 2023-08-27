import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './css/App.css'

//import pages
import Home from './pages/Home'
//import Signup from './pages/Signup'
import AddProject from './pages/AddProject'
import ProjectDetails from './pages/ProjectDetails'
//import components
import Header from './components/Header'
import Login from './components/Login'


function App() {
  const [isLoginVisible, setIsLoginVisible] = useState(false)

  const handleLoginClick = () => {
    setIsLoginVisible(true);
    console.log('login clicked');
  }

  const handleLoginModalClose = () => {
    setIsLoginVisible(false)
  }

  return (
    <div className='project-app'>
      <BrowserRouter>
        {/* custom event handler onLoginClick handle login modal */}
        <Header onLoginClick={handleLoginClick}/>
          <div className='pages'>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/addproject' element={<AddProject/>}/>
              {/*<Route path='/signup' element={<Signup/>}/> */}
            </Routes>
        </div>
        {isLoginVisible && <Login onClose={handleLoginModalClose}/>}
      </BrowserRouter>
    </div>
  )
}

export default App
