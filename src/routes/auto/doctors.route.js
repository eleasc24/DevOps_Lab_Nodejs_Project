import express from 'express'
import { doctors, nextId } from '../../data/store.js'

const router = express.Router()

// GET all doctors and return them as JSON
router.get('/api/doctors', (req, res) => res.status(200).json(doctors))

// GET one doctor by id
router.get('/api/doctors/:id', (req, res) => {
  const doctor = doctors.find((d) => d.id === Number(req.params.id))
  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' })
  }
  res.status(200).json(doctor)
})

// POST a new doctor after validating the required fields
router.post('/api/doctors', (req, res) => {
  const { name, specialty } = req.body ?? {}
  if (!name || !specialty) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  const newDoctor = { id: nextId(doctors), name, specialty }
  doctors.push(newDoctor)
  res.status(201).json(newDoctor)
})

export default router
