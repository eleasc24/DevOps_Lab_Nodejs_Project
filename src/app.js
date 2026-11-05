/**
 * Express app configuration.
 * Responsibilities:
 *  - Base routes (/, /health)
 *  - Auto-mount all routers in src/routes/auto/*.route.js
 *  - Global error handler (consistent JSON for errors)
 */
import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { errorHandler } from './utils/errorHandler.js'
import doctorsRouter from './routes/doctors.route.js'
import patientsRouter from './routes/patients.route.js'
import appointmentsRouter from './routes/appointments.route.js'
import metricsRouter from './routes/metrics.route.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())

app.use('/api/doctors', doctorsRouter)
app.use('/api/patients', patientsRouter)
app.use('/api/appointments', appointmentsRouter)
app.use('/api/metrics', metricsRouter)
// Simple root + health endpoints
app.get('/', (_req, res) => res.json({ ok: true, message: 'Hello from CI/CD demo 👋' }))
app.get('/health', (_req, res) => res.status(200).send('OK'))

// Auto-mount all routers placed under src/routes/auto
const autoDir = path.join(__dirname, 'routes', 'auto')
if (fs.existsSync(autoDir)) {
  const files = fs.readdirSync(autoDir).filter(f => f.endsWith('.route.js'))
  for (const f of files) {
    const full = path.join(autoDir, f)
    // Dynamic import (not createRequire): the route files then go through the
    // normal ES module pipeline, so the test runner can measure their coverage.
    const mod = await import(pathToFileURL(full).href)
    const router = mod.default || mod
    if (router) app.use('/', router)
  }
}

// Global error middleware last
app.use(errorHandler)

export default app
