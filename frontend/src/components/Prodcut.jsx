import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

function Prodcut({prodcut}) {
  return (
    <Card>
        <Link to={`/product/${prodcut._id}`}>
            <Card.Img src={prodcut.image} variant="top" />
        </Link>

        <Card.Body>
            <Link to={`/product/${prodcut._id}`}>
                <Card.Title as="div">
                    <strong>{prodcut.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as="h3">
                ${prodcut.price}
            </Card.Text>
        </Card.Body>
    </Card>
  ) 

}

export default Prodcut