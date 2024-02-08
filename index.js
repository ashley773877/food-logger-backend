import express from 'express';
import cors from 'cors';
import morgan from 'morgan'; 
import './load.Env.js'





const app = express()
const PORT = process.env.PORT || 4000;

//middlewears 
app.use(cors()); // allows frontend to connect to backend
app.use(morgan('dev')); // logger so you can see whats coming in 
app.use(express.json()); // to receive data in the body 
app.use(express.urlencoded({extended: true})); // allow data in url string





app.get('/', (req, res) => {
    res.send('backend...')
})





app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})


