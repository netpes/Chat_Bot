import {Route, Routes} from "react-router-dom";
import './App.css';
import Signup from "./components/signup";
import Login from "./components/login";
import UserChat from "./components/userChat";
import AdminChat from "./components/adminChat";

function App() {
  return <Routes>
    <Route path="/signup" element={<Signup />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/userChat" element={<UserChat />} />
    <Route path="/adminChat" element={<AdminChat />} />


  </Routes>

}

export default App;
