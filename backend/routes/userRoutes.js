//code by Jacynta
//currently following "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube. Will make more tweaks for originality later on

//still need to add code for most of userRoutes

import { isAuth, generateToken } from '../utils';

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
