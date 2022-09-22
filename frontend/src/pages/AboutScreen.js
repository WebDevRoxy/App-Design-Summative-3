//code and text by Natasha
//text edits by Hunter

import React from 'react';

export default function AboutScreen() {
    
        return(
        <div className="container small-container">
            <h1> Kia ora from New Zealand! </h1>
            <h2> Want to know more about us? </h2>

            <p>Nifty does their best to benifit New Zealanders by offering the best e-commerce platform possible</p>
            <p><i>Te whai hua ki nga tangata o Aotearoa ma te tuku pakihi pai</i></p>

            <p> Business sustainability is our priority. Let's make a difference </p>
            <p> <i>Ko te oranga tonutanga o te pakihi te kaupapa matua. Kia hanga e tatou he rereketanga</i></p>
            <br></br>
            <p>Nifty aims to be a safe and trustworthy e-commerce market app. We do our best to keep our platform as reliable as possible to help protect Nifty customers and sellers.</p><p>If you have any questions or concerns regarding a sale or customer, do not hesitate to reach out to us</p>
            <p><strong>Nifty - &copy;{new Date().getFullYear()} </strong></p>
        </div>
        );
    }