// hospitalData.js: data and functions, exported so that main.js can import them
export const doctors = ['Dr. Lee', 'Dr. Khan']

export function addDoctor (name) {
  doctors.push(name)
}

export function findDoctor (name) {
  return doctors.includes(name) ? 'Doctor found' : 'Doctor not found'
}
