import mongoose from 'mongoose';

// creates relationship between user doc and foodlogging data
const foodLoggerSchema = new mongoose.Schema({
    //this user_id object will always be the same 
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    meal: {
        type: String,
        required: true
    },
    timeOfDay: {
        type: String,
        enum: ['Breakfeast', 'Lunch', 'Dinner', 'Snack']
    },
    calories: {
        type: Number,
        required: true
    },
   

}, {timestamps: true});

export default mongoose.model('FoodLogger', foodLoggerSchema);