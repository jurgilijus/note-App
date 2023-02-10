import React from "react";
import { UserAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

import "./Settings.css";

function Settings() {
  const { logout } = UserAuth();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      alert("User is now logged out");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleClose = () => {
    navigate("/notes");
  };

  return (
    <section className="conteiner">
      <div className="settings-conteiner">
        <a
          href="/notes"
          className="close-settings"
          onClick={handleClose}
          to={"notes"}
        >
          <AiOutlineCloseCircle />
        </a>
        <input type="email" placeholder="Your e-mail.." />
        <input type="password" placeholder="Your password.." />
        <button
          onClick={handleLogout}
          title="Logout from account"
          className="logout"
        >
          Logout
        </button>
      </div>
    </section>
  );
}

export default Settings;
