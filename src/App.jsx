import "remixicon/fonts/remixicon.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Product from "./components/Admin/Product";

import NotFound from "./components/NotFound";
import Order from "./components/Admin/Order";
import Payment from "./components/Admin/Payment";
import Setting from "./components/Admin/Setting";
import Dashboard from "./components/Admin/Dashboard";
import Customers from "./components/Admin/Customers";
 
import Home from "./components/Home";
import Products from "./components/Products";
import Category from "./components/Category";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Contactus from "./components/Contactus";
import PreGuard from "./components/Guard/PreGuard";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
// import Layout from './components/Admin/Layout'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin">
       
          <Route path="product" element={<Product />} />
          <Route path="customer" element={<Customers />} />

          <Route path="order" element={<Order />} />

          <Route path="payment" element={<Payment />} />

          <Route path="setting" element={<Setting />} />

          <Route path="dashboard" element={<Dashboard />} />
        </Route>


        <Route path="/" element={<Home/>}  />
        <Route path="/products" element={<Products/>}  />
        <Route path="/category" element={<Category/>}  />
        <Route path="/cart" element={<Cart/>}  />
        <Route path="/profile" element={<Profile/>}  />

        <Route path="/contactus" element={<Contactus/>}  />

        <Route element={<PreGuard/>} >
        <Route path="/login" element={<Login/>}  />
        <Route path="/signup" element={<Signup/>}  />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
