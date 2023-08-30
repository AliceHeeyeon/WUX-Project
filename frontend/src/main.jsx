import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ProjectsContextProvider } from "./context/ProjectContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { LoginModalContextProvider } from "./context/LoginModalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProjectsContextProvider>
        <LoginModalContextProvider>
          <App />
        </LoginModalContextProvider>
      </ProjectsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
