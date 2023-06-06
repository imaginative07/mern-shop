import { Card } from "react-bootstrap";

function Prodcut({prodcut}) {
  return (
    <Card>
        <a href={`/product/${prodcut._id}`}>
            <Card.Img src={prodcut.image} variant="top" />
        </a>

        <Card.Body>
            <a href={`/product/${prodcut._id}`}>
                <Card.Title as="div">
                    <strong>{prodcut.name}</strong>
                </Card.Title>
            </a>

            <Card.Text as="h3">
                ${prodcut.price}
            </Card.Text>
        </Card.Body>
    </Card>
  ) 

}

export default Prodcut