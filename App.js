import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './App.css';

function App() {

  const[title, setTitle] = useState("");
  const[description, setDescription] = useState("");
  const [newListingTitle, setListingTitle] = useState("");
  const[listingsList, setListingsList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/read').then((response)=>{
      setListingsList(response.data);
    })
  }, [])
  
  const addToList = () => {
    Axios.post("http://localhost:3001/insert", 
    {title: title, 
    description: description
    //add other fields
  });
  };

  const updateListing = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newListingTitle: newListingTitle
      //add other fields
    })
  }

  return (
    <div className="App">
     <h1>CRUD Functions</h1>

    <label>Title</label>
    <input type="text" 
       onChange={(event) => {
       setTitle(event.target.value);
      }}
    />

    <label>Description</label>
    <input type ="text"
        onChange={(event) => {
        setDescription(event.target.value);
      }}
    />
    <button onClick={addToList}>Add Listing</button>

      <h1>Listings</h1>

      {listingsList.map((val, key) => {
        return (
          <div key={key} className="food">

            <p>{val.title}</p>
            <p>{val.description}</p>

            <input type="text" placeholder="New name..."
              onChange={(event) => {
                setListingTitle(event.target.value);
              } } />

            <button onClick={() => updateListing(val.id)}>Update</button>
            <button>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
