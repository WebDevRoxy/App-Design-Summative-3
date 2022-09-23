//code by Hunter

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Axios from 'axios';


export default function SellScreen() {

const [name, setName] = useState('');
const [price, setPrice] = useState(0);
const [countInStock, setCount] = useState(0);
const [description, setDesc] = useState('');
const [category, setCat] = useState('');

const addToDb = () => {
    Axios.post("http://localhost:5000/insert", {name: name, price: price, countInStock: countInStock, description: description, category:category})
    toast.success("Successfully created listing for "+name);
    window.location.href = "http://localhost:3000/";

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
            <option value="" selected disabled hidden>Choose here</option>
            <option value="Fashion">Fashion</option>
            <option value="Jewelery">Jewelery</option>
            <option value="Home Decor">Home Decor</option>
            <option value="Toys">Toys</option>
            <option value="Art">Art</option>
        </select>

        <button class="btn btn-primary" onClick ={addToDb}>Create Listing</button>

    </div>
    );
}


