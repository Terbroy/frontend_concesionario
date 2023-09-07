
import Navbar from "../components/home/Navbar";
import ProductsList from "../components/products/ProductsList";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loading } from "../store/slices/loader.slice";

const Home = () => {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(loading(false))
  },[])

  return (

    <div className="home">
      <Navbar />
      <div className="home__sect">
        <ProductsList /> 
      </div>
    </div>
  );
};

export default Home;
