import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from "../slices/cartSlice";

function ShippingScreen() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, SetAddress] = useState(shippingAddress?.address || '');
    const [city, SetCity] = useState(shippingAddress?.city || '');
    const [postalCode, SetPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, SetCountry] = useState(shippingAddress?.country || '');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    }

    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address" className="my-2">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => SetAddress(e.target.value)}>                            
                    </Form.Control>
                </Form.Group>   

                <Form.Group controlId="city" className="my-2">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => SetCity(e.target.value)}>                            
                    </Form.Control>
                </Form.Group>   

                <Form.Group controlId="postCode" className="my-2">
                    <Form.Label>postalCode</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter postal Code"
                        value={postalCode}
                        onChange={(e) => SetPostalCode(e.target.value)}>                            
                    </Form.Control>
                </Form.Group>   

                <Form.Group controlId="country" className="my-2">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => SetCountry(e.target.value)}>                            
                    </Form.Control>
                </Form.Group>   

                <Button type="submit" variant="primary" className="my-2">
                    Continue
                </Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingScreen;
