//code by Jacynta
//code inspired by "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube
import bcrypt from 'bcryptjs';

const data = {

  users: [
    {
      name: 'ExampleAdmin',
      email: 'testemail@admin.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'ExampleUser',
      email: 'testemail@user.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  
  //sample products
  products: [
    {
      _id: '1',
      name: 'Blue Dress',
      slug: 'blue-dress', //slug is the last part of the url
      category: 'Fashion',
      image: '/images/placeholder.png', 
      price: 120,
      countInStock: 10, 
      rating: 4.5, 
      numReviews: 10, 
      description: 'Handmade blue dress',
    },
    {
      _id: '3',
      name: 'Green Dress',
      slug: 'green-dress',
      category: 'Fashion',
      image: '/images/placeholder.png',
      price: 120,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      description: 'Handmade green dress',
    },
    {
      _id: '4',
      name: 'Red Dress',
      slug: 'red-dress',
      category: 'Fashion',
      image: '/images/placeholder.png',
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
