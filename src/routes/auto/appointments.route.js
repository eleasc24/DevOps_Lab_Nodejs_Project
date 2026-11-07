import express from 'express'
import { appointments, doctors, patients, nextId } from '../../data/store.js'

const router = express.Router()

// True only for a "YYYY-MM-DD" string that is a real calendar date
function isValidDate (value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
}

// GET all appointments, optionally filtered by ?doctorId= and ?patientId=
router.get('/api/appointments', (req, res) => {
  const { doctorId, patientId } = req.query
  const result = appointments.filter((a) =>
    (doctorId === undefined || a.doctorId === Number(doctorId)) &&
    (patientId === undefined || a.patientId === Number(patientId))
  )
  res.status(200).json(result)
})

// GET one appointment by id
router.get('/api/appointments/:id', (req, res) => {
  const appointment = appointments.find((a) => a.id === Number(req.params.id))
  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found' })
  }
  res.status(200).json(appointment)
})

// POST a new appointment between an existing doctor and patient
router.post('/api/appointments', (req, res) => {
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
