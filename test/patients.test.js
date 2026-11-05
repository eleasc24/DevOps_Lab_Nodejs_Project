import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'

describe('Patients API', () => {
  it('GET /api/patients should return an array', async () => {
    const res = await request(app).get('/api/patients')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /api/patients should add a new patient', async () => {
    const res = await request(app).post('/api/patients').send({ name: 'Marie', age: 29 })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.age).toBe(29)
  })

  it('POST /api/patients should refuse a missing field', async () => {
    const res = await request(app).post('/api/patients').send({ name: 'Marie' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Missing required fields')
  })

  it('POST /api/patients should refuse an invalid age', async () => {
    const res = await request(app).post('/api/patients').send({ name: 'Marie', age: -4 })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Age must be a positive integer')
  })

  it('POST /api/patients should refuse an empty request body', async () => {
    const res = await request(app).post('/api/patients')
    expect(res.status).toBe(400)
  })

  it('GET /api/patients/:id should return one patient or 404', async () => {
    const found = await request(app).get('/api/patients/1')
    expect(found.status).toBe(200)
    expect(found.body.name).toBe('Alice')

    const missing = await request(app).get('/api/patients/999')
    expect(missing.status).toBe(404)
  })
})
