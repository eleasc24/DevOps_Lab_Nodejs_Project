import { describe, it, expect } from 'vitest'
import { formatStatus } from '../../src/utils/status.js'

describe('formatStatus', () => {
  it('throws on negative uptime', () => {
    expect(() => formatStatus(-1)).toThrow('invalid uptime')
  })

  it('returns warming-up below 60 seconds', () => {
    expect(formatStatus(0)).toBe('warming-up')
    expect(formatStatus(59)).toBe('warming-up')
  })

  it('returns healthy from 60 seconds to below one hour', () => {
    expect(formatStatus(60)).toBe('healthy')
    expect(formatStatus(3599)).toBe('healthy')
  })

  it('returns steady at or after one hour', () => {
    expect(formatStatus(3600)).toBe('steady')
    expect(formatStatus(3601)).toBe('steady')
  })
})
