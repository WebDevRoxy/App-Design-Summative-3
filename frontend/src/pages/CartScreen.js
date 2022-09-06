//code by Jacynta
//code inspired by "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube

import { useContext } from 'react';
import { Store } from './Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from './components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems }, //lists cart items
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/$item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock'); //if quantity exceeds what's in stock comes up with message
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity }, //updates cart with item and quantity
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item }); //removes item from cart
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping'); //redirects to checkout page
  };

  //cart layout
  //icons from font awesome
  return (
    <div>
      <Helmet>
        <title>Basket</title>
      </Helmet>
      <h1>Basket</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>Cart is empty.</MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.img}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variants="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        variants="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>{' '}
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disable={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </ListGroup>
          </Card.Body>
        </Col>
      </Row>
    </div>
  );
}
