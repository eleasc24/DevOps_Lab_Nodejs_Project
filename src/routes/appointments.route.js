import express from 'express'
import { appointments, doctors, patients, nextId } from '../data/store.js'

const router = express.Router()

// "YYYY-MM-DD" and a real calendar date (2026-02-30 is refused)
function isValidDate (value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }
  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value)
}

// GET all appointments
router.get('/', (req, res) => res.status(200).json(appointments))

// POST a new appointment between a doctor and a patient
router.post('/', (req, res) => {
  const { doctorId, patientId, date } = req.body ?? {}
  if (!doctorId || !patientId || !date) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  if (!isValidDate(date)) {
    return res.status(400).json({ error: 'Date must be a valid YYYY-MM-DD date' })
  }
  if (!doctors.some((d) => d.id === doctorId)) {
    return res.status(404).json({ error: 'Doctor not found' })
  }
  if (!patients.some((p) => p.id === patientId)) {
    return res.status(404).json({ error: 'Patient not found' })
  }
  const newAppointment = { id: nextId(appointments), doctorId, patientId, date }
  appointments.push(newAppointment)
  res.status(201).json(newAppointment)
})

export default router
