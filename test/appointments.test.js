import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'

describe('Appointments API', () => {
  it('GET /api/appointments should return an array', async () => {
    const res = await request(app).get('/api/appointments')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /api/appointments should create an appointment', async () => {
    const res = await request(app)
      .post('/api/appointments')
      .send({ doctorId: 1, patientId: 1, date: '2026-11-20' })
    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({ doctorId: 1, patientId: 1, date: '2026-11-20' })
    expect(res.body).toHaveProperty('id')
  })

  it('POST /api/appointments should refuse a missing field', async () => {
    const res = await request(app).post('/api/appointments').send({ doctorId: 1 })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Missing required fields')
  })

  it('POST /api/appointments should refuse an invalid date', async () => {
    const badFormat = await request(app)
      .post('/api/appointments')
      .send({ doctorId: 1, patientId: 1, date: '20/11/2026' })
    expect(badFormat.status).toBe(400)

    const impossible = await request(app)
      .post('/api/appointments')
      .send({ doctorId: 1, patientId: 1, date: '2026-02-30' })
    expect(impossible.status).toBe(400)
  })

  it('POST /api/appointments should answer 404 for an unknown doctor or patient', async () => {
    const noDoctor = await request(app)
      .post('/api/appointments')
      .send({ doctorId: 999, patientId: 1, date: '2026-11-20' })
    expect(noDoctor.status).toBe(404)
    expect(noDoctor.body.error).toBe('Doctor not found')

    const noPatient = await request(app)
      .post('/api/appointments')
      .send({ doctorId: 1, patientId: 999, date: '2026-11-20' })
    expect(noPatient.status).toBe(404)
    expect(noPatient.body.error).toBe('Patient not found')
  })

  it('POST /api/appointments should refuse an empty request body', async () => {
    const res = await request(app).post('/api/appointments')
    expect(res.status).toBe(400)
  })
})
