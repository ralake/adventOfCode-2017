const registerInstructions = require('../lib/dayEight')
const { readInput } = require('../lib/helpers')

describe('registerInstructions', () => {
  describe('execute', () => {
    it('can find the largest value in the register after executing all instructions in the example case', () => {
      const exampleInput = readInput('./inputs/dayEight/testInput.txt', { splitAtNewLine: true })
      expect(registerInstructions.execute(exampleInput).highestFinalValue).toEqual(1)
    })

    it('can find the largest value in the register after executing all instructions in the test case', () => {
      const input = readInput('./inputs/dayEight/partOne.txt', { splitAtNewLine: true })
      expect(registerInstructions.execute(input).highestFinalValue).toEqual(5075)
    })

    it('can find the largest value iduring the process n the register after executing all instructions in the example case', () => {
      const exampleInput = readInput('./inputs/dayEight/testInput.txt', { splitAtNewLine: true })
      expect(registerInstructions.execute(exampleInput).highestValueDuringProcess).toEqual(10)
    })

    it('can find the largest value during the process in the register after executing all instructions in the test case', () => {
      const input = readInput('./inputs/dayEight/partOne.txt', { splitAtNewLine: true })
      expect(registerInstructions.execute(input).highestValueDuringProcess).toEqual(7310)
    })
  })
})
