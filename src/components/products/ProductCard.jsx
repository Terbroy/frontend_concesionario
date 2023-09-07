import { Button, Card } from "react-bootstrap";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import

// vi que lo intentaste, no sé que fué lo que te faltba pero e aquí el resultado
const ProductCard = (vehicle) => {
  const navigate = useNavigate();
  const productInfo = vehicle.vehicle;
  return (
    // <div className="productCard">
    <Card onClick={() => navigate(`/home/products/${productInfo.id}`)}>
      <Card.Img variant="top" src={productInfo?.img} />
      <Card.Body>
        <Card.Title className="card-body__title">
          {productInfo.modelo}
        </Card.Title>
        <Card.Text
          style={{ color: productInfo.esNuevo ? "#09ba41" : "#954809" }}
        >{`${productInfo.esNuevo ? "Nuevo" : "Usado"}`}</Card.Text>

        {!productInfo.esNuevo && (
          <p>
            <b>{productInfo.kilometraje}</b> km
          </p>
        )}
        {productInfo.tipo.toLowerCase() === "moto" && (
          <>
            <p>
              Cilindraje: <b>{productInfo.cilindraje}</b>
            </p>
            <p>
              Velocidades: <b>{productInfo.numVelocidades}</b>
            </p>
          </>
        )}
        <Card.Text className="card-body__registerDate">{`${productInfo.fechaRegistro}`}</Card.Text>
        <Card.Text className="card-body__price">
          <b>$</b>
          {productInfo.precio}
        </Card.Text>
      </Card.Body>
    </Card>
    // </div>
  );
};
export default ProductCard;
