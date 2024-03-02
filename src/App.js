import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import ShoppingCart from "./components/ShoppingCart";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import Order from "./pages/Order";
// import io from 'socket.io-client'
import { useEffect } from "react";
import CreateRoll from "./components/CreateRoll";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TestComponent from "./components/TestComponent";
import Monitor from "./pages/Monitor";
import Contacts from "./pages/Contacts";

// const socket = io.connect("http://localhost:3001")
// const socket = io.connect("https://e1304fb0b766af.lhr.life")

function App() {
//   const sendMessage = () => {
//     socket.emit("send_message", {message: "hello"})
//   }

//   const joinAdministration = () => {
//     console.log("now you are an admin")
//     socket.emit("join_administration")
//   }

// useEffect(() => {
//   socket.on("receive_message", (data) => {
//     console.log(data)
//   })
// }, [socket])

  return (
    <div className="App">
      {/* <button onClick={sendMessage}>Send message</button>
      <button onClick={joinAdministration}>Join Administration</button> */}
      <BrowserRouter>
      
      <div className="header">
        <Header/>
      </div>

      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/create" element={<CreateRoll/>}/>
        <Route path="/shoppingCart" element={<ShoppingCart/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/test" element={<TestComponent/>}/>
        <Route path="/myOrders" element={<MyOrders/>}/>
        <Route path="/order/:id" element={<Order/>}/>
        {/* <Route path="/monitor" element={<Monitor socket={socket}/>}/> */}
        <Route path="/monitor" element={<Monitor/>}/>
        <Route path="/contacts" element={<Contacts/>}/>
      </Routes>
      
      <div className='footer'>
        <Footer/>
      </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
