import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../Context/AuthContext";

// CSS
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = UserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/notes");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  return (
    <section className="login-conteiner">
      <form onSubmit={handleSubmit} className="login">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Your e-mail.."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your password.."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-btn">
          Login
        </button>
        <Link to="register" className="login-link">
          Not register?
        </Link>
      </form>
    </section>
  );
}

export default Login;
