import express from 'express'
import { patients, nextId } from '../data/store.js'

const router = express.Router()

// GET all patients
router.get('/', (req, res) => res.status(200).json(patients))

// GET one patient by id
router.get('/:id', (req, res) => {
  const patient = patients.find((p) => p.id === Number(req.params.id))
  if (!patient) {
    return res.status(404).json({ error: 'Patient not found' })
  }
  res.status(200).json(patient)
})

// POST a new patient
router.post('/', (req, res) => {
  const { name, age } = req.body ?? {}

  if (typeof name !== 'string' || !name.trim() || age === undefined) {
    return res.status(400).json({ error: 'Valid name and age are required' })
  }

  if (!Number.isInteger(age) || age <= 0) {
    return res.status(400).json({ error: 'Age must be a positive integer' })
  }

  const newPatient = {
    id: nextId(patients),
    name: name.trim(),
    age
  }

  patients.push(newPatient)
  res.status(201).json(newPatient)
})

export default router
