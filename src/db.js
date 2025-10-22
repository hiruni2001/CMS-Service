import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cms_demo'

mongoose.set('strictQuery', true)

mongoose.connect(uri, {
  autoIndex: true
}).then(() => {
  console.log('MongoDB connected')
}).catch((err) => {
  console.error('MongoDB connection error', err)
  process.exit(1)
})
