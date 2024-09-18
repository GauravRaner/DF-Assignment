import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/connection.js'
import cors from 'cors'
import stateRoutes from './routes/stateRoutes.js'
import cityRoutes from './routes/cityRoutes.js'
import wearhouseRoutes from './routes/wearhouseRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app=express()
dotenv.config()
const PORT=process.env.PORT || 5000

app.use(express.json())
app.use(cors());




app.use('/api/user',userRoutes)
app.use('/api/states', stateRoutes);
app.use('/api/cities', cityRoutes); 
app.use('/api/wearhouses',wearhouseRoutes);


connectDB()

app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`);
  
})