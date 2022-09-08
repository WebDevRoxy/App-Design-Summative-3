const {MongoClient} = require('mongodb');

//-------------------Database connection--------------------
async function main() {
    const uri = "mongodb+srv://admin:admin@cluster0.8cf6fj1.mongodb.net/?retryWrites=true&w=majority"

    const client = new MongoClient(uri);

    try{
        await client.connect();

        //****Call functions here

        //CREATE
       // await createListing(client, {
       //     title: "Test Listing 2",
       //     description: "This listing was made via a js function"
       // })

       //FIND ONE
       //await findListing(client, "Test Listing");

       //UPDATE
       //await updateListing(client, "Test Listing", { description: "This is an UPDATED test listing"});

        //DELETE
        //await deleteListing(client, "Test Listing 2");

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
//----------------------End of DB connection------------------------



//CREATE LISTING IN "LISTINGS"
async function createListing(client, newListing){
    const result = await client.db("nifty").collection("listings").insertOne(newListing);

    console.log(`New listing created with ID: ${result.insertedId}`);
}

//GET ONE SPECIFIC LISTING
async function findListing(client, nameOfListing){
    const result = await client.db("nifty").collection("listings").findOne({title: nameOfListing});

    if (result) {
        console.log(`Found listing with the name'${nameOfListing}'`);
        console.log(result);
    } else {
        console.log(`None found with the name'${nameOfListing}'`);
    }
}

//UPDATE LISTING
async function updateListing(client, nameOfListing, updatedListing){
    const result = await client.db("nifty").collection("listings").updateOne({ title: nameOfListing}, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched query`);
    console.log(`${result.modifiedCount} documents updated`);
}

//DELETE LISTING
async function deleteListing(client, nameOfListing){
    const result = await client.db("nifty").collection("listings").deleteOne({title: nameOfListing});

    console.log(`${result.deletedCount} document(s) deleted`);
}