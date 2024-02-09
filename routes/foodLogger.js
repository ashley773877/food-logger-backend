import {Router} from 'express'
import foodLogger from '../models/foodLogger'

const router = new Router()

// Create a new food log
router.post('/foodlogs', async (req, res) => {
    try {
      const { meal, timeOfDay, calories } = req.body;
  
      // Create a new food log
      const newFoodLog = new foodLogger({ meal, timeOfDay, calories });
      await newFoodLog.save();
  
      res.status(201).json(newFoodLog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }); 