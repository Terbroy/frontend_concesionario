import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
// import Arrays from "../../../public/arrays.json";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateVehicleThunk } from "../../store/slices/vehicles.slice";
import { useNavigate, useParams } from "react-router-dom";

const Edit = ({ vehicle }) => {
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = (data) => {
    const fillData = {};
    for (const element in data) {
      if (data[element]) {
        fillData[element] = data[element];
      }
    }

    dispatch(updateVehicleThunk(id, fillData)).then(() => {
      window.location.reload();
    });
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            onSubmit={handleSubmit(submit)}
            className="form-edit"
            id="edit-form"
          >
            {!vehicle?.esNuevo && (
              <Form.Group className="mb-3">
                <Form.Label>Kilometer</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={`${vehicle?.kilometraje}`}
                  min={vehicle?.kilometraje}
                  {...register("kilometraje")}
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                placeholder={`${vehicle?.color}`}
                {...register("color")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder={`${vehicle?.precio}`}
                max="250000000"
                min={vehicle?.precio}
                {...register("precio")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                {...register("img")}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Edit;
