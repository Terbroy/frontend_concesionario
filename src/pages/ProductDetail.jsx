import { DropdownButton, Image, ListGroup } from "react-bootstrap";
import Navbar from "../components/home/Navbar";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import ProductCard from "../components/products/ProductCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sell from "../components/product detail/Sell";
import Edit from "../components/product detail/Edit";
import { useDispatch, useSelector } from "react-redux";
import { getVehiclesThunk } from "../store/slices/vehicles.slice";

const ProductDetail = () => {
  useEffect(()=>{
    dispatch(getVehiclesThunk())
  },[])
  
  const dispatch = useDispatch()
  const vehicles = useSelector(state => state.vehicles)
  const { id } = useParams()
  const vehicle = vehicles.find(element => element.id == id)
  const navigate = useNavigate()
  const vehiclesFiltered = vehicles.filter(e => vehicle.tipo == e.tipo)
  
  return (
    <>
    <Navbar/> 
    <div className="product-detail">
      <Image className="product-detail__carimage" src={vehicle?.img} fluid />
      <div className="background">
          <h1 className="product-detail__title">{vehicle?.modelo}</h1>
          <p className="product-detail__brand">Honda</p>
          <div className="product-detail__containerinfo">
              <ListGroup className="product-detail__info">
                  <ListGroup.Item className="info__list">Type : {vehicle?.tipo}</ListGroup.Item>
                  <ListGroup.Item className="info__list">State: {vehicle?.esNuevo ? "Nuevo" : "Usado"}</ListGroup.Item>
                  <ListGroup.Item className="info__list">Color: {vehicle?.color}</ListGroup.Item>
                  <ListGroup.Item className="info__list">Register Date: {vehicle?.fechaRegistro}</ListGroup.Item>
                  {vehicle?.tipo === "moto" && <ListGroup.Item className="info__list">Cylinder Capacity: {vehicle?.cilindraje}cc</ListGroup.Item>}
                  {vehicle?.tipo === "moto" && <ListGroup.Item className="info__list">Velocity Number: {vehicle?.numVelocidades}</ListGroup.Item>}
                  <ListGroup.Item className="info__list">Price: ${vehicle?.precio}</ListGroup.Item>
              </ListGroup>
              <DropdownButton id="dropdown-basic-button" title="Options">
                    <Edit vehicle={vehicle}/>
                    <Sell vehicle={vehicle}/> 
              </DropdownButton>
          </div>
  </div> 
      <div className="product-detail__carrousel"> 
           <div className="carrousel__products">
            {
               vehiclesFiltered.map(vehicle => (
                 <ProductCard key={vehicle.id} vehicle={vehicle}/>
               ))
            }
           </div>
       </div>
  </div> 
  </>
)

};
  

export default ProductDetail;
