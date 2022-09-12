//code by Jacynta
//currently following "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube. Will make more tweaks for originality later on

//still need to add code for most of userRoutes
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { isAuth, generateToken } from '../utils.js';
import bcrypt from 'bcryptjs';

const userRouter = express.Router();

userRouter.post(
  '/signin', 
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email});
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.put(
  '/profile',
  isAuth,
  //gets user from data base
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    //if user exists, updates user's name and email. If input data is empty, update with previous data
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      //if password exists, updates and encrypt password
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      //sends back user information
      const updateUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

export default userRouter;
