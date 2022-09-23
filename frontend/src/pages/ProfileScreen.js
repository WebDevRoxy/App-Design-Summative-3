//code by Jacynta
//CRUD code by Hunter
//code inspired by "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube

import React, { useContext, useState, useReducer, useEffect } from 'react';
import { Store } from './Store';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import Axios from 'axios';

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

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const [productList, setProductList] = useState ([])

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  //Read entries (Hunter)
  useEffect(() => {
    Axios.get('http://localhost:5000/read').then((response) => {
    console.log(response)
    setProductList(response.data)
    })
  }, [])

  //updates user profile on submit
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.put(
        '/api/users/profile',
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      });
      toast.success('Your info has been updated!');
    }
  };

  //Update Listings (Hunter)
  const updateProduct = (val, id) => {

    Axios.put("http://localhost:5000/update", {
      id: id, 
      newName: newName,
      newDesc: newDesc,
      newPrice: newPrice
    }) 

    toast.success("Updated successfully")
  };

  function errorCheck (val, id) {

    if(newName === ""){
      toast.warning("Please fill out name");
     } else if(newDesc === ""){
      toast.warning("Please fill out description");
    } else if(newPrice === ""){
      toast.warning("Please fill out price"); 
    } else updateProduct(val, val._id)
  }

  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}`);
    toast.success("Deleted successfully")
  }

  //display user profile
  return (
    <div className="container small-container">
      <Helmet>
        <title>User Profile</title>
      </Helmet>

      {/* Update Listings (Hunter)*/} 
      <h1 className="my-3">Update listings</h1>

      {productList.map((val, key) => {
        return ( 
        <div key={key} className = "products"> 

        <div className="title-container">
        <h2>
          <strong>{val.name}</strong>
          <p>"{val.description}"  ${val.price}</p>
        </h2>
        </div>
      
        <input type = "text" placeholder="New Name.."
          onChange = {(event) => {
          setNewName(event.target.value); }}/>
 
        <input type = "text" placeholder="New Description.."
          onChange = {(event) => {
          setNewDesc(event.target.value); }}/>

         <input type = "number" placeholder="New Price.."
          onChange = {(event) => {
          setNewPrice(event.target.value); }}/>
        
        <button className="btn btn-primary" onClick={() => errorCheck(val, val._id)}>Update</button>
        
        <button className="btn btn-primary" onClick={() => deleteProduct(val._id)}>Delete</button>
        </div>
        );
      })}
      


      {/* Update Account */}
      <h1 className="my-3">Update account details</h1>
      <form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
}
