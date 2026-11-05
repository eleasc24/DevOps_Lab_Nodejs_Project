/* eslint-disable no-console */
// js-practice.js: JavaScript exercises (Lab 5, section 2)
// Run with: node js-practice.js
// (Exercise 2.5 is in hospitalData.js and main.js)

// ---------- 2.1 Variables and data types ----------
console.log('--- 2.1 Variables and data types ---')
const hospitalName = 'Central Hospital'
const numberOfDoctors = 12
let isOpen = true

if (isOpen) {
  console.log(`Welcome to ${hospitalName}! We have ${numberOfDoctors} doctors currently available.`)
}

isOpen = false
if (!isOpen) {
  console.log(`Sorry, ${hospitalName} is closed. Please come back tomorrow.`)
}

// ---------- 2.2 Arrays and loops ----------
console.log('\n--- 2.2 Arrays and loops ---')
const doctors = ['Dr. Lee', 'Dr. Khan', 'Dr. Martin', 'Dr. Silva', 'Dr. Nguyen']

for (const [index, name] of doctors.entries()) {
  console.log(`Doctor #${index + 1}: ${name}`)
}

doctors.push('Dr. Brown')
console.log(`Updated number of doctors: ${doctors.length}`)

function findDoctor (name) {
  return doctors.includes(name) ? 'Doctor found' : 'Doctor not found'
}

console.log(findDoctor('Dr. Khan')) // Doctor found
console.log(findDoctor('Dr. House')) // Doctor not found

// ---------- 2.3 Objects and nested data ----------
console.log('\n--- 2.3 Objects and nested data ---')
const patient = {
  name: 'Alice Martin',
  age: 34,
  conditions: ['diabetes', 'hypertension'],
  doctor: { name: 'Dr. Lee', specialty: 'Cardiology' }
}

console.log(`Doctor: ${patient.doctor.name}`)
console.log(`Number of conditions: ${patient.conditions.length}`)
console.log(`${patient.name} is treated by ${patient.doctor.name} (${patient.doctor.specialty}).`)

patient.conditions.push('anxiety')
console.log('Updated patient:', patient)

// ---------- 2.4 Functions and array filtering ----------
console.log('\n--- 2.4 Functions and array filtering ---')
const patients = [
  { id: 1, name: 'Alice', age: 34 },
  { id: 2, name: 'John', age: 45 },
  { id: 3, name: 'Marie', age: 29 }
]

// Returns all patients older than minAge
function filterByAge (minAge) {
  return patients.filter((p) => p.age > minAge)
}

// Adds a new patient object to the array
function addPatient (name, age) {
  const newPatient = { id: patients.length + 1, name, age }
  patients.push(newPatient)
  return newPatient
}

console.log('Patients older than 30:', filterByAge(30))
addPatient('Paul', 52)
console.log('Updated list:', patients)

// ---------- 2.6 Error handling and validation ----------
console.log('\n--- 2.6 Error handling and validation ---')

// Throws an error if a field is missing, otherwise returns the appointment
function createAppointment (doctor, patientName, date) {
  if (!doctor || !patientName || !date) {
    throw new Error('Missing required fields')
  }
  return { doctor, patient: patientName, date }
}

try {
  console.log(createAppointment('Dr. Lee', 'Alice', '2026-03-15'))
  console.log(createAppointment('Dr. Lee')) // should trigger an error
} catch (err) {
  console.error('Error:', err.message)
}

// ---------- 2.7 Asynchronous code ----------
console.log('\n--- 2.7 Asynchronous code ---')

// Simulates a database call: the promise is resolved after 1 second
function getHospitalData () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'Central Hospital', uptime: 1234 })
    }, 1000)
  })
}

async function showData () {
  console.log('Fetching hospital data...')
  const data = await getHospitalData()
  console.log('Data loaded:', data)
}

showData()
