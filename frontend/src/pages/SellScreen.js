//code by Hunter

import React, { useContext, useState, useReducer } from 'react';
import { Store } from './Store';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import Axios from 'axios';


export default function SellScreen() {

const [name, setName] = useState('');
const [price, setPrice] = useState(0);
const [countInStock, setCount] = useState(0);
const [description, setDesc] = useState('');
const [category, setCat] = useState('');

const addToDb = () => {
    Axios.post("http://localhost:5000/insert", {name: name, price: price, countInStock: countInStock, description: description, category:category})
    alert ("Successfully created listing for "+name);

}

    return(
    <div className="container small-container">
     <h1>List an Item</h1>
     
        <label>Item Name</label><br></br>
        <input type="text" onChange={(event) => {
            setName(event.target.value); }} /> <br></br>

        <label>Price</label><br></br>
        <input type="number" onChange={(event) => {
            setPrice(event.target.value); }} /><br></br>

        <label>Count in stock (optional)</label><br></br>
        <input type="number"onChange={(event) => {
            setCount(event.target.value); }} /><br></br>

        <label>Description</label><br></br>
        <input type="text" onChange={(event) => {
            setDesc(event.target.value); }} /><br></br>

        <label>Category</label><br></br>
        <select id="category" name="category" onChange={(event) => {
            setCat(event.target.value); }}>
            <option value="Fashion">Fashion</option>
            <option value="Jewelery">Jewelery</option>
            <option value="Home Decor">Home Decor</option>
            <option value="Toys">Toys</option>
            <option value="Art">Art</option>
        </select>

        <button onClick ={addToDb}>Create Listing</button>

    </div>
    );
}


/* name: "Test", 
image: "/images/placeholder.png", 
countInStock: 10,
price: 10,
description: "this is a test",
category: "Fashion",
slug:"test"}); */