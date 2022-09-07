//code by Jacynta
//code inspired by "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube

const data = {
  users: [
    {
      name: 'ExampleName',
      email: 'testemail@admin.com',
      password: bcrypt.hashSync('123456'),
    },
    {},
  ],
  //products on discover page
  //remember to change products to match what's actually on the app
  products: [
    {
      //ids are assigned automatically by mongo db
      name: 'Blue Dress,',
      slug: 'blue-dress',
      category: 'Fashion',
      image: '####',
      price: 120,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      description: 'Handmade blue dress',
    },
    {
      name: 'Green Dress,',
      slug: 'green-dress',
      category: 'Fashion',
      image: '####',
      price: 120,
      countInStock: 0,
      rating: 4.5,
      numReviews: 10,
      description: 'Handmade green dress',
    },
    {
      name: 'Red Dress,',
      slug: 'red-dress',
      category: 'Fashion',
      image: '####',
      price: 120,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      description: 'Handmade red dress',
    },
  ],
};
//exports data so App.js can render it
export default data;
