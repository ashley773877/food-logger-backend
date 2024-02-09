import {Router} from 'express'
import User from '../models/users'
import FoodLoogger from '../models/foodLogger'




Router.get('/', async (req, res) => {
    const users = await User.find()
    // user is from the import user from the model users
    // and .find is to find all the users you have in the database
    res.status(200).json(users); // then responding wtih all the users in there 
});