import {Router} from 'express'
import User from '../models/users.js'
import bcrypt from 'bcrypt'
//import foodLogger from '../models/foodLogger.js';


const router = new Router()

// GET returns all the users
router.get('/', async (req, res) => {
    const users = await User.find()
    // user is from the import user from the model users
    // and .find is to find all the users you have in the database
    res.status(200).json(users); // then responding wtih all the users in there 
});

 
 // GET returns a user by id 
 router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({msg: "Resource not found!"});
    else res.json(user);
});

// PUT update user 
router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
  
      const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
      res.json(updatedUser);
  
    } catch (error) {
      console.log(error);
      res.json({msg: 'User Not found!'})
    }
  });

  //DELETE user by the id 
  router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.json({msg: "User deleted", deletedUser});
    } catch (error) {
        console.log(error);
    }
});

  // POST for user SIGN IN (authentication)
  router.post('/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log('Recieved email', email);
      // making sure username and pass requirements are met
      if (password.length < 6 || password.length > 50) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      
      // if user exist verfiy password
      const user = await User.findOne({ email });
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // POST for user SIGN UP
  router.post('/signup', async (req, res) => {
    try {
      const { username, email, password, age, gender } = req.body;
      // checks if user with email already exist
      const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }
// create a new user
      const newUser = new User({ username, email, password, age, gender });
        await newUser.save();
        res.status(201).json({ user: newUser });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    // POST to LOGOUT 
    router.post('/logout', (req, res) => {
      res.json({ message: 'Logout successful' });
});


  






  export default router;


