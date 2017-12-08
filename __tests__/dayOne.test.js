const captcha = require('../lib/dayOne')
const { readInput } = require('../lib/helpers')

describe('captcha', async function () {
  describe('nextValue', () => {
    it('returns a sum of all digits that match the next digit in the list', () => {
      const input = readInput('./inputs/dayOne/partOne.txt')

      expect(captcha.sumNextValue('1122')).toEqual(3)
      expect(captcha.sumNextValue('1111')).toEqual(4)
      expect(captcha.sumNextValue('1234')).toEqual(0)
      expect(captcha.sumNextValue('91212129')).toEqual(9)
      expect(captcha.sumNextValue(input)).toEqual(1034)
    })
  })

  describe('nextValue', async function () {
    it('returns a sum of all digits that match the halfway digit in the list relative to the current value', () => {
      const input = readInput('./inputs/dayOne/partTwo.txt')

      expect(captcha.sumHalfWayValue('1212')).toEqual(6)
      expect(captcha.sumHalfWayValue('1221')).toEqual(0)
      expect(captcha.sumHalfWayValue('123425')).toEqual(4)
      expect(captcha.sumHalfWayValue('123123')).toEqual(12)
      expect(captcha.sumHalfWayValue('12131415')).toEqual(4)
      expect(captcha.sumHalfWayValue(input)).toEqual(1356)
    })
  })
})
