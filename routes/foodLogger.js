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

  // Get all food logs
router.get('/foodlogs', async (req, res) => {
    try {
      const foodLogs = await foodLogs.find();
      res.status(200).json(foodLogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  // GET food log by ID
router.get('/foodlogs/:id', async (req, res) => {
  try {
    const foodLog = await FoodLogger.findById(req.params.id);
    
    if (!foodLog) {
      return res.status(404).json({ message: 'Food log not found.' });
    }

    res.status(200).json(foodLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});