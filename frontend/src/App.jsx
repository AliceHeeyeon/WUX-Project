import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";

//import pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import AddProject from "./pages/AddProject";
import DetailPage from "./pages/DetailPage";
//import components
import Header from "./components/Header";
import Login from "./components/Login";
// import context hook
import { useLoginModalContext } from "./hooks/useLoginModalContext";

function App() {
  const { isLoginVisible, dispatch } = useLoginModalContext();

  const handleLoginModalClose = () => {
    // Dispatch the action to close the modal
    dispatch({ type: "LOGIN_CLOSE" });
  };

  return (
    <div className="project-app">
      <BrowserRouter>
        {/* custom event handler onLoginClick handle login modal */}
        <Header />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addproject" element={<AddProject />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/:id" element={<DetailPage />} />
          </Routes>
        </div>
        {isLoginVisible && <Login onClose={handleLoginModalClose} />}
      </BrowserRouter>
    </div>
  );
}

export default App;
