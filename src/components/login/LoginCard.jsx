import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loading } from "../../store/slices/loader.slice";

function LoginCard() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = (data) => {
    axios
      .post(
        `https://concesionarioback-production.up.railway.app/api/v1/auth/login`,
        data
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(loading(true));
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <Form className="login-form" onSubmit={handleSubmit(submit)}>
      <img
        src="https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14044.jpg?w=2000"
        alt="user"
      />
      <Form.Group className="login__input mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          required
          {...register("email")}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="login__input mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          required
          {...register("password")}
        />
      </Form.Group>

      <Button className="login__botton" variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}

export default LoginCard;
