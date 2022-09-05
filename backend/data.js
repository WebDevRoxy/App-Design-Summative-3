//code by Jacynta
//currently following "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube. Will make more tweaks for originality later on

const data = {
  //products on discover page
  products: [
    {
      name: "Blue Dress,",
      slug: "blue-dress",
      category: "Fashion",
      image: "####",
      price: 120,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      description: "Handmade blue dress",
    },
    {
      name: "Green Dress,",
      slug: "green-dress",
      category: "Fashion",
      image: "####",
      price: 120,
      countInStock: 0,
      rating: 4.5,
      numReviews: 10,
      description: "Handmade green dress",
    },
    {
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
