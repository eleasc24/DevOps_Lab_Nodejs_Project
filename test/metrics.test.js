import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'

describe('Metrics API', () => {
  it('GET /api/metrics should return system and hospital statistics', async () => {
    const res = await request(app).get('/api/metrics')
    expect(res.status).toBe(200)
    expect(res.body.system.node).toMatch(/^v\d+/)
    expect(typeof res.body.system.uptime).toBe('number')
    expect(res.body.hospital.doctors).toBe(2)
    expect(res.body.hospital.patients).toBe(2)
    expect(res.body.hospital.appointments).toBe(0)
  })

  it('counts the appointments that were created', async () => {
    await request(app)
      .post('/api/appointments')
      .send({ doctorId: 2, patientId: 2, date: '2026-12-01' })
    const res = await request(app).get('/api/metrics')
    expect(res.body.hospital.appointments).toBe(1)
  })
})
