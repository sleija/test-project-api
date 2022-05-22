import { isUUID, isDefinedUserId } from '../utils'

describe('isUUID', () => {
  const valid = '7be83e38-5d8d-4b0f-8e3b-ca086658110d'
  const invalid = '1'

  it('should return true for valid uuid', () => {
    expect(isUUID(valid)).toBe(true)
  })
  it('should return false for invalid uuid', () => {
    expect(isUUID(invalid)).toBe(false)
  })

  it('should return false for undefined uuid', () => {
    expect(isUUID(undefined)).toBe(false)
  })
})

describe('isDefinedUserId', () => {
  it('should return true when it defined', () => {
    expect(isDefinedUserId('text')).toBeDefined()
  })
  it('should return false when it undefined', () => {
    expect(isDefinedUserId(undefined)).toBeUndefined()
  })
})
