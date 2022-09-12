//code by Jacynta
//code inspired by "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube
<<<<<<< HEAD

const data = {
=======
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
>>>>>>> 9b2ee12f7431617a3a2cc3ebe20e3e72e9b1177c
  //products on discover page
  //just using placeholder products for now
  products: [
    {
<<<<<<< HEAD
      _id: "1",
      name: "Blue Dress,",
      slug: "blue-dress", //slug is the last part of the url
      category: "Fashion",
      image: "/images/p1.jpg", //need images for each item. Lisa, I'll leave this to you
=======
      _id: '1',
      name: 'Blue Dress,',
      slug: 'blue-dress', //slug is the last part of the url
      category: 'Fashion',
      image: '####', //need images for each item. Lisa, I'll leave this to you
>>>>>>> 9b2ee12f7431617a3a2cc3ebe20e3e72e9b1177c
      price: 120,
      countInStock: 10, //could remove to make app simpler?
      rating: 4.5, //could remove to make app simpler?
      numReviews: 10, //could remove to make app simpler?
<<<<<<< HEAD
      description: "Handmade blue dress",
    },
    {
      _id: "3",
      name: "Green Dress,",
      slug: "green-dress",
      category: "Fashion",
      image: "/images/p2.jpg",
=======
      description: 'Handmade blue dress',
    },
    {
      _id: '3',
      name: 'Green Dress,',
      slug: 'green-dress',
      category: 'Fashion',
      image: '####',
>>>>>>> 9b2ee12f7431617a3a2cc3ebe20e3e72e9b1177c
      price: 120,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
<<<<<<< HEAD
      description: "Handmade green dress",
    },
    {
      _id: "4",
      name: "Red Dress,",
      slug: "red-dress",
      category: "Fashion",
      image: "/images/p3.jpg",
=======
      description: 'Handmade green dress',
    },
    {
      _id: '4',
      name: 'Red Dress,',
      slug: 'red-dress',
      category: 'Fashion',
      image: '####',
>>>>>>> 9b2ee12f7431617a3a2cc3ebe20e3e72e9b1177c
      price: 120,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
<<<<<<< HEAD
      description: "Handmade red dress",
=======
      description: 'Handmade red dress',
>>>>>>> 9b2ee12f7431617a3a2cc3ebe20e3e72e9b1177c
    },
  ],
};
//exports data so App.js can render it
export default data;
