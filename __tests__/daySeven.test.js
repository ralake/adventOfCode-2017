const programTower = require('../lib/daySeven')
const { readInput } = require('../lib/helpers')

const testInput = readInput('./inputs/daySeven/testInput.txt', { splitAtNewLine: true })

describe('programTower', () => {
  describe('findBottomProgram', () => {
    it('finds the name of the program at the bottom of the tower in the example case', () => {
      const bottomProgram = programTower.findBottomProgram(testInput)
      expect(bottomProgram.name).toEqual('tknk')
    })

    it('finds the name of the program at the bottom of the tower in the test case', () => {
      const programList = readInput('./inputs/daySeven/partOne.txt', { splitAtNewLine: true })
      const bottomProgram = programTower.findBottomProgram(programList)

      expect(bottomProgram.name).toEqual('wiapj')
    })
  })

  describe('findUnbalancedWeight', () => {
    it('finds the actual weifght a program would need to be to balance it correctly', () => {
      const weight = programTower.findUnbalancedWeight(testInput)
      expect(weight).toEqual(60)
    })
  })
})
