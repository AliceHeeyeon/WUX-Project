import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './css/App.min.css'

//import pages
import Home from './pages/Home'
//import Signup from './pages/Signup'
import AddProject from './pages/AddProject'
import ProjectDetails from './pages/ProjectDetails'
//import components
import Header from './components/Header'
import Login from './components/Login'


function App() {

  return (
    <div className='project-app'>
      <BrowserRouter>
        <Header/>
          <div className='pages'>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/addproject' element={<AddProject/>}/>
              {/*<Route path='/signup' element={<Signup/>}/> */}
            </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
