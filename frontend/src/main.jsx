import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ProjectsContextProvider } from './context/ProjectContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProjectsContextProvider>
        <App />
      </ProjectsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
