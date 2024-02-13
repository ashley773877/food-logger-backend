import {Router} from 'express'
import foodLogger from '../models/foodLogger.js'

const router = new Router()


// POST for creating a foodlog and associate with user 
router.post('/', async (req, res) => {
  try {
    const { meal, timeOfDay, calories, date, user_id} = req.body;
    // const userId = getUserIdFromRequest(req.user_id); 

    // create new foodlog associated with user
    const newFoodLog = new foodLogger({
      user_id,
      meal,
      timeOfDay,
      calories,
      date,
    });
    await newFoodLog.save();
    res.status(201).json(newFoodLog);
  } catch (error) {
    console.error('Error creating food log:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





// Create a new food log
// router.post('/', async (req, res) => {
//     try {
//       const {user_id, meal, timeOfDay, calories } = req.body;
  
//       // Create a new food log
//       const newFoodLog = new foodLogger({ user_id, meal, timeOfDay, calories });
//       await newFoodLog.save();
//       res.status(201).json(newFoodLog);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }); 

  // Get all food logs
router.get('/', async (req, res) => {
    try {
      const foodLogs = await foodLogger.find();
      res.status(200).json(foodLogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

// Update a food log by ID
router.put('/:id', async (req, res) => {
  try {
    const { meal, timeOfDay, calories } = req.body;

    const updatedFoodLog = await foodLogger.findByIdAndUpdate(
      req.params.id,
      { meal, timeOfDay, calories },
      { new: true } // Return the updated document
    );

    if (!updatedFoodLog) {
      return res.status(404).json({ message: 'Food log not found.' });
    }

    res.status(200).json(updatedFoodLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a food log by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedFoodLog = await foodLogger.findByIdAndDelete(req.params.id);

    if (!deletedFoodLog) {
      return res.status(404).json({ message: 'Food log not found.' });
    }

    res.status(200).json({ message: 'Food log deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// // GET food logs by date
// router.get('/by-date'), async (req, res) => {
//   try {
//     const {date} = req.query

// if (date === 'by-date') {
//     const [month, day, year] = date.split('/');
    
//     const parsedDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);

//     const foodLogs = await foodLogger.find({
//       date: {
//         $gte: parsedDate,
//         $lt: new Date(parsedDate.getTime() + 24 * 60 * 60 * 1000), // Add 1 day to include the entire day
//       },
//     });
//     res.status(200).json(foodLogs)
//   }
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({message: 'Internal server error'})
//     res.status(400).json({ message: 'Invalid date parameter' });
//   }
// }
 // GEt foodlogs by date pt.2 
 router.post('/by-date', async (req, res) => {
  try {
    const { date, meal, timeOfDay, calories } = req.body;
console.log(date)
    if (!date) {
      return res.status(400).json({ message: 'Date parameter is required' });
    }

    const [month, day, year] = date.split('/');
   // const parsedDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    const parsedDate = new Date(date);
    console.log(parsedDate);
  
    const foodLogs = await foodLogger.find({
      Date: {
        $gte: parsedDate,
        $lt: new Date(parsedDate.getTime() + 24 * 60 * 60 * 1000), // Add 1 day to include the entire day
      },
      // meal: meal,
      // timeOfDay: timeOfDay,
      // calories: calories,
    });

    res.status(200).json(foodLogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const foodLog = await foodLogger.findById(req.params.id);
    
    if (!foodLogger) {
      return res.status(404).json({ message: 'Food log not found.' });
    }

    res.status(200).json(foodLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});







export default router