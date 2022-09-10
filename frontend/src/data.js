//code by Jacynta
//code inspired by "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube

const data = {
  //products on discover page
  //just using placeholder products for now
  products: [
    {
      _id: "1",
      name: "Blue Dress,",
      slug: "blue-dress", //slug is the last part of the url
      category: "Fashion",
      image: "####", //need images for each item. Lisa, I'll leave this to you
      price: 120,
      countInStock: 10, //could remove to make app simpler?
      rating: 4.5, //could remove to make app simpler?
      numReviews: 10, //could remove to make app simpler?
      description: "Handmade blue dress",
    },
    {
      _id: "3",
      name: "Green Dress,",
      slug: "green-dress",
      category: "Fashion",
      image: "####",
      price: 120,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      description: "Handmade green dress",
    },
    {
      _id: "4",
      name: "Red Dress,",
      slug: "red-dress",
      category: "Fashion",
      image: "####",
      price: 120,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      description: "Handmade red dress",
    },
  ],
};
//exports data so App.js can render it
export default data;
