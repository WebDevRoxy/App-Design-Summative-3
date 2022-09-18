const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const ListingsModel = require("./models/Listings");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin:admin@cluster0.8cf6fj1.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});

//-----------CREATE LISTING---------------------
app.post("/insert", async (req, res) => {

    const title = req.body.title
    const description = req.body.description

    const listings = new ListingsModel({title: title, description: description});

    try {
        await listings.save();
        res.send("inserted data");
    } catch(err){
        console.log(err);
    }
});

//----------READ LISTING------------------------
app.get("/read", async (req, res) => {
    ListingsModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result);
    });
});

//-----------UPDATE LISTING---------------------
app.put("/update", async (req, res) => {

    const newListingTitle = req.body.newListingTitle
    const id = req.body._id;

    try {
        await ListingsModel.findById(id, (err, updatedTitle) => {
            updatedTitle.title = newListingTitle
            updatedTitle.save();
            res.send("update");
        });
    } catch(err){
        console.log(err);
    }
});

app.listen(3001, () => {
    console.log("Server running on port 3001...");
});