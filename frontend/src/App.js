import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from "./Components/Navbar";
import Homescreen from "./screens/Homescreen";
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import Product from "./screens/Product";
import Cart from "./screens/Cart";
import Admin from "./screens/Admin";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Protected from "./Protected"
import Logout from "./Components/Logout";


function App() {

  const [isLoggedIn, setisLoggedIn] = useState(true);
  const [isnotLoggedIn, setisnotLoggedIn] = useState(false);

 

  const LoginRoute = async () => {
    try {
      const res = await fetch('/api/auth/', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (res.status === 200) {
        setisLoggedIn(false)
        setisnotLoggedIn(true)
      } if (res.status === 401) {
        setisLoggedIn(true)
        setisnotLoggedIn(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
   
    LoginRoute();
   
  }, []);


  return (
    <div className="App">

      <Navbar isLoggedIn={isLoggedIn} />
      <ToastContainer />
      <Routes>

        <Route
          path="/Login"
          element={
            <Protected isnotLoggedIn={isnotLoggedIn}>
              <Login />
            </Protected>
          }
        />

        <Route
          path="/Register"
          element={
            <Protected isnotLoggedIn={isnotLoggedIn}>
              <Register />
            </Protected>
          }
        />

       
         <Route
        path="/Logout"
        element={
          <Protected isLoggedIn={isLoggedIn} >
            <Logout />
          </Protected>
        }
      />
 <Route path="/Admin" exact element={<Admin />}></Route>
        <Route path="/" exact element={<Homescreen />}></Route>
        <Route path="/Product/:id" element={<Product />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>



      </Routes>
    </div>
  );
}

export default App;
