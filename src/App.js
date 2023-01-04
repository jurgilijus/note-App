import "./App.css";
import Main from "./Components/Main/Main";
import Login from "./Components/Login/Login";
import Registration from "./Components/Regitration/Registration";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/notes" element={<Main />} />
      <Route path="/register" element={<Registration />} />
    </Routes>
  );
}

export default App;
