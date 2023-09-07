import { useEffect, useState } from "react";
import Navbar from "../components/home/Navbar";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createVehicleThunk, getVehiclesThunk } from "../store/slices/vehicles.slice";
import { getPricesThunk } from "../store/slices/price.slice";

const Register = () => {

  /************LLAMADAS DE HOOKS******************************** */
  const prices = useSelector(state => state.price)
  const vehicles = useSelector(state => state.vehicles)
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [defaultPrice, setDefaultPrice] = useState(0)
  const dispatch = useDispatch();

  /*************CONTROLAR VALORES*************** */
  const valueType = watch("tipo");
  const valueIsNew = watch("esNuevo");
  const valueModel = watch("modelo");


  useEffect(()=>{
    dispatch(getPricesThunk())
    dispatch(getVehiclesThunk())
  },[])

  useEffect(()=>{
    const priceModel = prices.find(e=> e.modelo === valueModel) || 0
    setDefaultPrice(priceModel.precio * 0.85)
  },[valueModel])
  
  

/************ FUNCIONES DE VALIDACIONES *********/

  function validateCuantity(type){
    const vehiclesType = vehicles.filter(e => e.tipo == type)
    if(type === "carro"){
      return vehiclesType.length <= 10
    }else{
      return vehiclesType.length <= 15
    }
  }

/******** ENVIO DE FORMULARIO ******************* */

  const submit = (data) => {
    if(validateCuantity(data.tipo)){
        const precio = parseInt(data.precio);
        const kilometraje = parseInt(data.kilometraje);
        const numCilindraje = parseInt(data.cilindraje);
        const numVelocidades = parseInt(data.numVelocidades);
        data.precio = precio;
        data.kilometraje = kilometraje;
        data.cilindraje = numCilindraje;
        data.numVelocidades = numVelocidades;
        const newData = {
          tipo: data.tipo,
          modelo: data.modelo,
          color: data.color,
          esNuevo: data.esNuevo === "Nuevo" && true,
          img: data.img,
          kilometraje: valueIsNew === "Usado" ? data.kilometraje : 0,
          cilindraje: data.cilindraje,
          numVelocidades: data.numVelocidades,
          precio: data.precio,
          fechaRegistro: data.fechaRegistro,
        };
        dispatch(createVehicleThunk(newData));
    }else{
      console.log("maximo de vehiculos");
    }
  };

  const handleTypeChange = (e) => {
    setValue(valueType, e.target.value);
  };
  const handleStateChange = (e) => {
    setValue(valueIsNew, e.target.value);
  };
  const handleModelChange = (e) => {
    setValue(valueModel, e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="register">
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group
            style={{ display: "flex", width: "max-content" }}
            controlId="formBasicEmail"
          >
            <Form.Label>Type</Form.Label>
            <select
              style={{ display: "inline-block" }}
              value={valueType}
              onChange={handleTypeChange}
              className="form__selection"
              {...register("tipo")}
            >
              <option value="Carro">Carro</option>
              <option value="Moto">Moto</option>
            </select>
            <select
              style={{ display: "inline-block" }}
              value={valueIsNew}
              onChange={handleStateChange}
              className="form__selection"
              {...register("esNuevo")}
            >
              <option value={"Nuevo"}>Nuevo</option>
              <option value={"Usado"}>Usado</option>
            </select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Model</Form.Label>
            <select
              style={{ display: "inline-block" }}
              value={valueModel}
              onChange={handleModelChange}
              className="form__selection"
              {...register("modelo")}>
                {
                  prices.map(price=>(
                    <option key={price.modelo} value={price.modelo}>{price.modelo}</option>
                  ))
                }
            </select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Color</Form.Label>
            <Form.Control
              placeholder="Enter color"
              type="text"
              {...register("color")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              min={defaultPrice}
              max="250000000"
              {...register("precio")}
            />
          </Form.Group>
          {valueType === "Moto" && (
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Cylinder capacity</Form.Label>
                <Form.Control
                  max="400"
                  type="number"
                  placeholder="Enter capacity"
                  {...register("cilindraje")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Velocity number</Form.Label>
                <Form.Control
                  max="6"
                  min="0"
                  type="number"
                  placeholder="Enter number"
                  {...register("numVelocidades")}
                />
              </Form.Group>
            </div>
          )}
          {valueIsNew === "Usado" && (
            <Form.Group className="mb-3">
              <Form.Label>Kilometer</Form.Label>
              <Form.Control
                min="1"
                type="number"
                placeholder="km"
                {...register("kilometraje")}
              />
            </Form.Group>
          )}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              {...register("img")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Register Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter Date"
              {...register("fechaRegistro")}
            />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Register;
