/* eslint-disable no-console */
// main.js: imports the data and calls the functions. Run with: node main.js
import { doctors, addDoctor, findDoctor } from './hospitalData.js'

addDoctor('Dr. Smith')
console.log('Updated doctors:', doctors)
console.log(findDoctor('Dr. Smith')) // Doctor found
console.log(findDoctor('Dr. House')) // Doctor not found
