import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
  
    const [token, setToken] = useState(null);
  
    const handleLogin = async (user, password) => {
      const { data } = await axios.post('http://localhost:8000/account/login', {
        userId: user,
        password: password
      })
      const token = data.token
      if(token) {
        setToken(token);
        navigate("/landing");
        return true
      } else {
        return false
      }
    };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={{ value }}>
      {children}
    </AuthContext.Provider>
  );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);