import { findObjectKey } from './object'

describe('object', () => {
  describe('findObjectKey', () => {
    it('should return the first key that is compliant with the predicate', () => {
      const obj = { a: 1, b: 2, c: 3 }
      const result = findObjectKey(obj, (v) => v === 2)
      expect(result).toBe('b')
    })
  })
})
