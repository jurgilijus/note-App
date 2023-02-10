import "./App.css";
import Main from "./Components/Main/Main";
import Login from "./Components/Login/Login";
import Registration from "./Components/Regitration/Registration";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";
import Settings from "./Components/Main/Settings/Settings";
// import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/notes" element={<Main />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/notes/settings" element={<Settings />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
