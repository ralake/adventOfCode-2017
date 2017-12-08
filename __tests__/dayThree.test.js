const spiralNumbers = require('../lib/dayThree')

describe('spiralNumbers', async function () {
  describe('findSteps', () => {
    it('finds the number of steps required to return to 1', () => {
      expect(spiralNumbers.findSteps(1)).toEqual(0)
      expect(spiralNumbers.findSteps(12)).toEqual(3)
      expect(spiralNumbers.findSteps(23)).toEqual(2)
      expect(spiralNumbers.findSteps(1024)).toEqual(31)
      expect(spiralNumbers.findSteps(265149)).toEqual(438)
    })
  })

  describe('findFirstLargestNum', () => {
    it('finds the first largest number than the input as it builds the sequence', () => {
      expect(spiralNumbers.findFirstLargestNum(9)).toEqual(10)
      expect(spiralNumbers.findFirstLargestNum(265149)).toEqual(266330)
    })
  })
})
