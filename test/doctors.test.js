import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'

describe('Doctors API', () => {
  it('GET /api/doctors should return an array', async () => {
    const res = await request(app).get('/api/doctors')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /api/doctors should add a new doctor', async () => {
    const res = await request(app)
      .post('/api/doctors')
      .send({ name: 'Dr. Lee', specialty: 'Neurology' })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.name).toBe('Dr. Lee')
  })

  it('POST /api/doctors should refuse a missing field', async () => {
    const res = await request(app).post('/api/doctors').send({ name: 'Dr. Nobody' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Missing required fields')
  })

  it('POST /api/doctors should refuse an empty request body', async () => {
    const res = await request(app).post('/api/doctors')
    expect(res.status).toBe(400)
  })

  it('GET /api/doctors/:id should return one doctor or 404', async () => {
    const found = await request(app).get('/api/doctors/1')
    expect(found.status).toBe(200)
    expect(found.body.id).toBe(1)

    const missing = await request(app).get('/api/doctors/999')
    expect(missing.status).toBe(404)
  })

  it('gives a new doctor an id that is not already used', async () => {
    const first = await request(app).post('/api/doctors').send({ name: 'Dr. A', specialty: 'ENT' })
    const second = await request(app).post('/api/doctors').send({ name: 'Dr. B', specialty: 'ENT' })
    expect(second.body.id).toBe(first.body.id + 1)
  })
})
