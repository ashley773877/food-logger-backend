import {Router} from 'express'
import User from '../models/users'
import FoodLoogger from '../models/foodLogger'



// GET returns all the users
Router.get('/', async (req, res) => {
    const users = await User.find()
    // user is from the import user from the model users
    // and .find is to find all the users you have in the database
    res.status(200).json(users); // then responding wtih all the users in there 
});

Router.post('/signup', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // to Check if user already exists by checking email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
      }
  
      // to Create a new user
      const newUser = new User({ username, email, password });
      await newUser.save();
  
      // Generate and send JWT token for authentication
      const token = newUser.generateAuthToken();
      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

 
 // GET returns a user by id 
 
Router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({msg: "Resource not found!"});
    else res.json(user);
});











export default Router;