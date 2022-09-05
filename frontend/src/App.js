//code by Jacynta
//currently following "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube. Will make more tweaks for originality later on

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./pages/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { CardTravel } from "@material-ui/icons";
import { useContext } from "react";
import { Store } from "./pages/Store";
import CartScreen from "./pages/CartScreen";
import ShippingAddressScreen from "./pages/ShippingAddressScreen";
import PaymentMethodScreen from "./pages/PaymentMethodScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import ProfileScreen from "./pages/ProfileScreen";

function App() {
  const { state, dispatch: cxtDispatch } = useContext(Store);
  const { cart } = state;

  //for signout when that is made
  /*const signoutHandler = () => {
    cxtDispatch({type:"USER_SIGNOUT"});
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  }*/

  return (
    //browser router links to different pages in the site
    //uses elements from React Bootstrap like Navbar and Container
    //Link to links to home screen
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Nifty</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {CardTravel.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/placeOrder" element={<PlaceOrderScreen />} />
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

//early attempt at making a navbar. Ignore this for now
/*
import React from "react";

import Navbar from "./navbar/Navbar";

//OR!

import { Navbar } from "./";

const App = () => {
  return (
    <div>
      <Form />
    </div>
  );
};

export default App;
*/
