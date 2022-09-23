//code by Jacynta
//comments code by Lisa and Natasha
//edits by Hunter
//code inspired by "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube

import React from 'react';
import {
  createRoutesFromElements,
  useNavigate,
  useParams,
} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useReducer, useContext, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Card } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import { Store } from './Store';
import Comments from './Sections/Comments';

//loading state
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const onClickHandler = () => {
    setComments((comments) => [...comments, ...comments]);
  };

  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`); //sets url
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data }); //loads page
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message }); //error message if page doesn't load
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: cxtDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id); //add item to cart
    const quantity = existItem ? existItem.quantity + 1 : 1; //if item is already in cart, increase quantity by one
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    cxtDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart'); //redirects to cart
  };
  //if loading page doesn't work shows error, else lists product information
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}></Col>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>${product.price}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>
                  {product.countInStock > 0 ? (
                    <Badge bg="success">In Stock</Badge>
                  ) : (
                    <Badge bg="danger">Unavailable</Badge>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
            {product.countInStock > 0 && (
              <ListGroup.Item>
                <div className="d-grid">
                  <Button onClick={addToCartHandler} variant="primary">
                    Add to Cart
                  </Button>
                </div>
              </ListGroup.Item>
            )}
          </ListGroup>

          <ListGroup variant="flush">
            {/* COMMENTS */}
            <ListGroup.Item>
              <div className="main-container">
                {comments.map((text) => (
                  <div className="comment-container"> {text} </div>
                ))}

                <div className="comment-flexbox">
                  <h1 className="comment-text">Add comment</h1>
                  <textarea
                    value={comment}
                    onChange={onChangeHandler}
                    className="input-box"
                  />
                  <button onClick={onClickHandler} className="btn btn-primary">
                    {' '}
                    Submit{' '}
                  </button>
                  <Comments />
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Row>
    </div>
  );
}

export default ProductScreen;
