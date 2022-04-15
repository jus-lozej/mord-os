import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../providers/auth";
import "./style.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);

  const { signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const login = (e) => {
    e.preventDefault();
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
      <div className="sign-in-container">
        <h1>Mord-OS</h1>
        <form onSubmit={login}>
          <Input
            fluid
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            fluid
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          {error ? <div className="error-message">{error}</div> : null}
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
