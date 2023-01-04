import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase.js";
// CSS
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/notes");
      }
    });
  }, [navigate]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, console.log(email), password)
      .then(() => {
        navigate("/notes");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className="login-conteiner">
      <form className="login">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Your e-mail.."
          onChange={handleEmail}
          value={email}
        />
        <input
          type="password"
          placeholder="Your password.."
          onChange={handlePassword}
          value={password}
        />
        <button className="login-btn" onClick={handleLogin}>
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
