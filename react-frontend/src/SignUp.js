import { useState } from "react";
import { useAuth } from "./context/AuthProvider";
import axios from "axios";

export const SignUp = () => {
  const { value } = useAuth();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleUserChange = (event) => {
        setUser(event.target.value)
  }

  const handlePasswordChange = (event) => {
        setPassword(event.target.value)
  }

  const handleConfirmedPasswordChange = (event) => {
    setConfirmedPassword(event.target.value)
}

  const signup = async () => {
    const { data } = await axios.post('https://localhost:8000/account/signup', {
        userId: user,
        password: password,
        confirmedPassword: confirmedPassword
    })
    setMessage(data.message)
  }

  return (
    <>
      <h2>Sign Up (Public)</h2>
      <form onSubmit={signup}>
        <label>
            Username
            <input type="text" name="username" onChange={handleUserChange}></input>
        </label>
        <label>
            Password
            <input type="text" name="password" onChange={handlePasswordChange}></input>
        </label>
        <label>
            Confirm Password
            <input type="text" name="password" onChange={handleConfirmedPasswordChange}></input>
        </label>
        <button type="button" onClick={signup}>
          Sign Up
        </button>
      </form>
      <p>{message}</p>
    </>
  );
  };