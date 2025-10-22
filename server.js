import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import './src/db.js'
import contentRoutes from './src/routes/contentRoutes.js'

dotenv.config()

const app = express()

app.use(cors({ origin: process.env.ORIGIN?.split(',') || ['http://localhost:5173'], credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'CMS Backend OK' })
})

app.use('/api/contents', contentRoutes)

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({ error: err.message || 'Server error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`))
