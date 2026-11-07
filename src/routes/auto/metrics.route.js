import express from 'express'
import { appointments, doctors, patients } from '../../data/store.js'

const router = express.Router()

// GET system and hospital statistics
router.get('/api/metrics', (req, res) => {
  res.status(200).json({
    system: {
      node: process.version,
      uptime: Math.round(process.uptime()),
      memoryMb: Math.round(process.memoryUsage().rss / 1024 / 1024)
    },
    hospital: {
      doctors: doctors.length,
      patients: patients.length,
      appointments: appointments.length
    },
    timestamp: new Date().toISOString()
  })
})

export default router
