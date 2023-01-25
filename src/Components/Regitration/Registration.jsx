import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../Context/AuthContext";

// CSS
import "./Registration.css";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // if (password.length < ) {

      // }
      await createUser(email, password);
      navigate("/notes");
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  return (
    <section className="registration-conteiner">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Register</h2>
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
        <p className="err">{error}</p>
        <button className="login-btn" type="submit">
          Register
        </button>
        <Link to="/" className="login-link">
          Have an account?
        </Link>
      </form>
    </section>
  );
}

export default Registration;
