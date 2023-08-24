import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ProjectsContextProvider } from './context/ProjectContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProjectsContextProvider>
      <App />
    </ProjectsContextProvider>
  </React.StrictMode>,
)
