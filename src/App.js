import {Route, Routes} from "react-router-dom";
import './App.css';
import Signup from "./components/signup";
import Login from "./components/login";
import UserChat from "./components/userChat";

function App() {
  return <Routes>
    <Route path="/signup" element={<Signup />}/>
    <Route path="/login" element={<Login />}/>
      <Route path="/userChat" element={<UserChat />} />


  </Routes>

}

export default App;
