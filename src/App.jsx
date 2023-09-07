/*** D E P E N D E N C I E S *********** */
import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

/************ S T Y L E S ***************/
import "./assets/css/app.css";

/**************** P A G E S************ */
// import ProtectedRoutes from "./components/ProtectedRoutes"
import Register from "./pages/Register";
import Purchases from "./pages/Purchases";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

/******** C O M P O N E N T S *********** */
import Loader from "./components/login/Loader";
import ProtectedRoutes from "./components/ProtectedRoutes"

function App() {
  const loader = useSelector((state) => state.loader);

  return (
    <div className="app">
      <HashRouter>
        {/* {loader && <Loader />} */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoutes/>}>
            <Route path="/home" element={<Home />} />
            <Route path="/home/products/:id" element={<ProductDetail />} />
            <Route path="/home/register" element={<Register />} />
            <Route path="/home/purchases" element={<Purchases />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
