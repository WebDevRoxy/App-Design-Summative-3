//code by Hunter

import React, { useContext, useState, useReducer } from 'react';
import { Store } from './Store';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';


export default function SellScreen() {

    return(
    <div className="container small-container">
     <h1>List an Item</h1>
     <p>to do</p>
    </div>
    );
}