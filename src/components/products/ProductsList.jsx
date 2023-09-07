import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getVehiclesThunk } from "../../store/slices/vehicles.slice";


const ProductsList = () => {
  const dispatch = useDispatch()
  const vehicles = useSelector((state) => state.vehicles);

  useEffect(() => {
    dispatch(getVehiclesThunk())
  }, []);

  return (
    <div className="productsList">
      {vehicles.map((vehicle) => (
        <ProductCard vehicle={vehicle} key={vehicle.id} />
      ))}
    </div>
  );
};

export default ProductsList;
