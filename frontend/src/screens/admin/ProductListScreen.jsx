import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useGetProductQuery, useCreateProductMutation } from '../../slices/productApiSlice';


function ProductListScreen() {

    const { data: products, isLoading, error, refetch } = useGetProductQuery(); 

    const [createProduct, { isLoading: LoadingCreate }] = useCreateProductMutation();

    const deleteHandler = async (id) => {
        console.log(id);
    }

    const createProductHandler = async () => {
        if(window.confirm("Are you sure you want to create a new product?")) {
        
            try {
                await createProduct();
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error);
            }
        }

        // const product = {
        //     name: `Product ${products.length + 1}`,
        //     price: Math.floor(Math.random() * 1000),
        //     category: "test",
        //     brand: "test",
        //     countInStock: Math.floor(Math.random() * 100),
        //     rating: Math.floor(Math.random() * 5),
        //     numReviews: Math.floor(Math.random() * 100),
        //     description: "test",
        // }
    }

    return (
        <>
            <Row>
                <Col>
                <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="btn-sm my-3" onClick={ createProductHandler }>
                        <FaEdit /> Create Product
                    </Button>
                </Col>
            </Row>

            {LoadingCreate && <Loader />}

            {isLoading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <>
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant="light" className="btn-sm mx-2">
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm " onClick={ () => deleteHandler(product._id) }>
                                        <FaTrash style={{color: "white"}}/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </>
            )}
        </>
    )
}

export default ProductListScreen;