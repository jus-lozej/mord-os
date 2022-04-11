import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);

  const { signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const login = () => {
    try {
      signin(email, pass, () => {
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      });
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="sign-in">
      <h1>Mord-OS</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      {error ? <div className="error-message">{error}</div> : null}
      <button onClick={login}>Login</button>
    </div>
  );
};

export default SignIn;
