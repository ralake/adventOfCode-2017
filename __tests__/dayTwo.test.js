const checksum = require('../lib/dayTwo')
const { readInput } = require('../lib/helpers')

describe('checksum', async function () {
  describe('maxMin', () => {
    it('sums the result of max - min of each line', () => {
      const input = readInput('./inputs/dayTwo/partOne.txt', { splitAtNewLine: true })

      expect(checksum.maxMin(['5 1 9 5', '7 5 3', '2 4 6 8'])).toEqual(18)
      expect(checksum.maxMin(input)).toEqual(42378)
    })
  })

  describe('evenlyDivisble', () => {
    it('sums the result of evenly divisible numbers in each line', () => {
      const input = readInput('./inputs/dayTwo/partTwo.txt', { splitAtNewLine: true })

      expect(checksum.evenlyDivisible(['5 9 2 8', '9 4 7 3', '3 8 6 5'])).toEqual(9)
      expect(checksum.evenlyDivisible(input)).toEqual(246)
    })
  })
})
