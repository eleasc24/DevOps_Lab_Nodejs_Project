/* eslint-disable no-console */
// make-postman.js: writes postman/Healthcare API Postman Collection.json
// Run once with: node make-postman.js (then import the file in Postman, run it, export it)
import { mkdirSync, writeFileSync } from 'node:fs'

const status = (code) => [
  `pm.test("Status code is ${code}", function () {`,
  `  pm.response.to.have.status(${code})`,
  '})'
]
const isArray = [
  'pm.test("Response is an array", function () {',
  '  pm.expect(pm.response.json()).to.be.an("array")',
  '})'
]
const hasId = [
  'pm.test("Response has an id", function () {',
  '  pm.expect(pm.response.json()).to.have.property("id")',
  '})'
]
const hasHospital = [
  'pm.test("Has hospital statistics", function () {',
  '  pm.expect(pm.response.json()).to.have.property("hospital")',
  '})'
]

function request (method, path, tests, body, label = '') {
  const item = {
    name: `${method} ${path}${label}`,
    request: {
      method,
      header: body ? [{ key: 'Content-Type', value: 'application/json' }] : [],
      url: { raw: `{{baseUrl}}${path}`, host: ['{{baseUrl}}'], path: path.split('/').filter(Boolean) }
    },
    event: [{ listen: 'test', script: { type: 'text/javascript', exec: tests } }]
  }
  if (body) {
    item.request.body = {
      mode: 'raw',
      raw: JSON.stringify(body, null, 2),
      options: { raw: { language: 'json' } }
    }
  }
  return item
}

const collection = {
  info: {
    name: 'Healthcare API Tests',
    description: 'Postman tests for the Healthcare API (Lab 5). Start the API with npm run dev first.',
    schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
  },
  variable: [{ key: 'baseUrl', value: 'http://localhost:3000' }],
  item: [
    request('GET', '/api/doctors', [...status(200), ...isArray]),
    request('POST', '/api/doctors', [...status(201), ...hasId], { name: 'Dr. Julie', specialty: 'Neurology' }),
    request('POST', '/api/doctors', status(400), { name: 'Dr. Nobody' }, ' (missing field)'),
    request('GET', '/api/patients', [...status(200), ...isArray]),
    request('POST', '/api/patients', [...status(201), ...hasId], { name: 'Marie', age: 29 }),
    request('GET', '/api/appointments', [...status(200), ...isArray]),
    request('POST', '/api/appointments', [...status(201), ...hasId], { doctorId: 1, patientId: 1, date: '2026-11-20' }),
    request('GET', '/api/metrics', [...status(200), ...hasHospital])
  ]
}

mkdirSync('postman', { recursive: true })
writeFileSync('postman/Healthcare API Postman Collection.json', JSON.stringify(collection, null, 2) + '\n')
console.log('Created postman/Healthcare API Postman Collection.json')
