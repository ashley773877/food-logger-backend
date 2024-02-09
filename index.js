import express from 'express';
import cors from 'cors';
import morgan from 'morgan'; 
import { conn } from './db/conn.js';conn();
import './load.Env.js'
import userRouter from './routes/users.js'
import foodRouter from './routes/foodLogger.js'




//console.log(process.env.ATLAS_URI);
const app = express()
const PORT = process.env.PORT || 4000;

//middlewears 
app.use(cors()); // allows frontend to connect to backend
app.use(morgan('dev')); // logger so you can see whats coming in 
app.use(express.json()); // to receive data in the body 
app.use(express.urlencoded({extended: true})); // allow data in url string

app.use('/api/users', userRouter); 
app.use('/api/foodlogs', foodRouter);


// GET to test route 
app.get('/', (req, res) => {
    res.send('is it working!!!')
})





app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})


