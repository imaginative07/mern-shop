import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Paginate from "../../components/Paginate";
import { useGetProductQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productApiSlice';


function ProductListScreen() {

    const { pageNumber } = useParams();

    const { data, isLoading, error, refetch } = useGetProductQuery({ pageNumber }); 

    const [createProduct, { isLoading: LoadingCreate }] = useCreateProductMutation();

    const [deleteProduct, { isLoading: LoadingDelete }] = useDeleteProductMutation();

    const deleteHandler = async (id) => {
        if(window.confirm('Are you sure?')) {
            try {
                await deleteProduct(id);
                toast.success("Product deleted successfully");
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error);
            }
        }
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

            {LoadingDelete && <Loader />}

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
                        {data.products.map((product) => (
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
                <Paginate pages={data.pages} page={data.page} isAdmin={true} />
                </>
            )}
        </>
    )
}

export default ProductListScreen;