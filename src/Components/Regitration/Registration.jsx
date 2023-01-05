import React from "react";
import { Link } from "react-router-dom";

// CSS
import "./Registration.css";

function Registration() {
  return (
    <section className="registration-conteiner">
      <form className="registration-form">
        <h2>Register</h2>
        <input type="email" placeholder="Your e-mail.." />
        <input type="password" placeholder="Your password.." />
        <button className="login-btn">Register</button>
        <Link to="/" className="login-link">
          Have an account?
        </Link>
      </form>
    </section>
  );
}

export default Registration;
