// import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductQuery } from '../slices/productApiSlice';
// import axios from 'axios';

function HomeScreen() {

    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const { data } = await axios.get('/api/products');
    //         setProducts(data);
    //     }
    //     fetchProducts();
    // }, []);

    const { data:products, isLoading, error } = useGetProductQuery();

  return (
    <>

        {isLoading ? (<h2>Loading...</h2>) : error ? (<div>{error?.data?.message || error.error}</div>) : (<>
        <h1>Latest Products</h1>
        <Row>
            {products.map((product) => (
                <Col className='py-3' key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
        </>
        )}

        
    </>
  )
}

export default HomeScreen