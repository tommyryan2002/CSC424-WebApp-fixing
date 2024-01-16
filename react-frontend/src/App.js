import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Home } from "./Home";
import { Landing } from "./Landing";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";
import { SignUp } from "./SignUp";

const App = () => {

    return (
        <AuthProvider>
          <Navigation />
         
          <h1>React Router</h1>
      
          <Routes>
            <Route index element={<Home />} />
            <Route path="landing" element={
                <ProtectedRoute>
                    <Landing />
                </ProtectedRoute>
            }
            />
            <Route path="home" element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </AuthProvider>
    );
};

const Navigation = () => {
    const { value } = useAuth();
    return (
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/landing">Landing</NavLink>
        <NavLink to="signup">Sign Up</NavLink>
        {value.token && (
          <button type="button" onClick={value.onLogout}>
            Sign Out
            </button>
        )}
    </nav>
  );
}
  
export default App;