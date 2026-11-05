// Shared in-memory data of the healthcare API (it replaces a database in this lab)
export const doctors = [
  { id: 1, name: 'Dr. Sarah Lee', specialty: 'Cardiology' },
  { id: 2, name: 'Dr. Amir Khan', specialty: 'Pediatrics' }
]

export const patients = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'John', age: 45 }
]

export const appointments = []

// Next free id of a list (1 if the list is empty)
export function nextId (list) {
  return list.length === 0 ? 1 : Math.max(...list.map((item) => item.id)) + 1
}
