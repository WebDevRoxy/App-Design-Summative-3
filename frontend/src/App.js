//code by Jacynta
//code inspired by "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './pages/Store';
import CartScreen from './pages/CartScreen';
import ShippingAddressScreen from './pages/ShippingAddressScreen';
import PaymentMethodScreen from './pages/PaymentMethodScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';
import ProfileScreen from './pages/ProfileScreen';
import SearchBox from './pages/components/SearchBox';
import SearchScreen from './pages/SearchScreen';
import SigninScreen from './pages/SigninScreen';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { getError } from './utils';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    //localStorage.removeItem('shippingAddress');
    //localStorage.removeItem('paymentMethod');
    //window.location.href = 'signin';
  };

  //categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    //browser router links to different pages in the site
    //uses elements from React Bootstrap like Navbar and Container
    //Link to links to home screen
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <img src="/images/nifty-logo-small.png" />
                </Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
        </header>
        <main>
          {/* have a look at this */}
          <Container className="mt-3">
            {categories.map((category) => (
              <Nav.Item key={category}>
                <SearchBox />
                <LinkContainer to={`/search?category=${category}`}>
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/placeOrder" element={<PlaceOrderScreen />} />
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              <Route path="/" element={<HomeScreen />} />
            </Routes>
            <Nav className="me-auto">
              <Link to="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                    className="dropdown-item"
                    to="#signout"
                    onClick={signoutHandler}
                  >
                    Sign Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link className="nav-link" to="/signin">
                  Sign In
                </Link>
              )}
            </Nav>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
