import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { sellVehicleThunk } from "../../store/slices/vehicles.slice";

const Sell = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, setValue, watch} = useForm()
    const valueDocument = watch("documento");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submit = data => {
      console.log(data);
      dispatch(sellVehicleThunk(id, data));
    }

    const handleTypeChange = (e) => {
      setValue(valueDocument, e.target.value);
    };

return (
<div>
<Button variant="primary" onClick={handleShow}>
        Sell
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sell</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit(submit)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{display : "block"}}>Identification</Form.Label>
                <select 
                className="form__selection" 
                style={{display : "inline-block", margin : 0, width:"20%" }} 
                name="#"
                value={valueDocument}
                onChange={handleTypeChange}
                required
                {...register("documento")}>
                    <option>C.C</option>
                    <option>Cedula de extranjeria</option>
                    <option>Pasaporte</option>
                </select>
                <Form.Control
                 style={{display : "inline-block", width: "80%"}} 
                 type="text" 
                 placeholder="1234567890" 
                 required 
                 {...register("numDocumento")}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Full Name</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Jonh Doe" 
                required 
                {...register("nombreCompleto")}/>
            </Form.Group>
            <Button type="submit" variant="primary" onClick={()=>navigate("/home")}>
              Sell
            </Button>
        </Form>
        </Modal.Body>
      </Modal>
</div>
)
};
export default Sell;