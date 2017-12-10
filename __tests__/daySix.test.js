const memoryReallocation = require('../lib/daySix')

describe('memoryReallocation', () => {
  describe('detectInfiniteLoop', () => {
    it('returns the amount of cycles needed before an infinite loop is detected', () => {
      expect(memoryReallocation.detectInfiniteLoop('0 2 7 0').cycles).toEqual(5)
      expect(memoryReallocation.detectInfiniteLoop('5 1 10 0 1 7 13 14 3 12 8 10 7 12 0 6').cycles).toEqual(5042)
    })
  })
})
