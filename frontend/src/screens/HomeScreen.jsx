// import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductQuery } from '../slices/productApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
// import axios from 'axios';

function HomeScreen() {

    const { pageNumber, keyword } = useParams();

    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const { data } = await axios.get('/api/products');
    //         setProducts(data);
    //     }
    //     fetchProducts();
    // }, []);

    const { data, isLoading, error } = useGetProductQuery({ keyword, pageNumber });

  return (
    <>

        {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light mb-4'>Go Back</Link>}

        {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (<>
        <Meta/>
        <h1 className='mt-5'>Latest Products</h1>
        <Row>
            {data.products.map((product) => (
                <Col className='py-3' key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
        <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
        </>
        )}

        
    </>
  )
}

export default HomeScreen