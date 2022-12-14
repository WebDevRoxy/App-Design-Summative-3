//code by Jacynta
//images, descriptions and details by Natasha
//edits by Hunter
//code inspired by "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube

import React from 'react';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from './components/Product';

//first parameter is current state, second parameter changes state and creates new state
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }; //shows loading box in UI
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false }; //doesn't show loading box in UI
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }; //shows error in UI
    default:
      return state;
  }
};

function HomeScreen() {
 
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    //accepts two parameters, a function and an array
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      //try catch to get error if loading doesn't work
      try {
        const result = await axios.get('/api/products'); //puts result of axios request into result const
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Nifty</title>
      </Helmet>

      <h1><strong>Featured Items</strong></h1> 

      <div className="products">
        {loading ? ( //if loading is true sets loading message else renders products.
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          //row from bootstrap.
          //currently responsive using sm, md and lg, but this functionality could be removed
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>

    </div>
  );
}

export default HomeScreen;
