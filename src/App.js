import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./components/signup";
import Login from "./components/login";
import UserChat from "./components/userChat";
import AdminChat from "./components/adminChat";
import Inactive from "./handles/inactive";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/userChat" element={<UserChat />} />
      <Route path="/adminChat" element={<AdminChat />} />
      <Route path="/test" element={<Inactive />} />
    </Routes>
  );
}

export default App;
