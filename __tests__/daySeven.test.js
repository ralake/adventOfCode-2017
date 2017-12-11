const programTower = require('../lib/daySeven')
const { readInput } = require('../lib/helpers')

describe('programTower', () => {
  describe('findBottomProgram', () => {
    it('finds the name of the program at the bottom of the tower in the example case', () => {
      const bottomProgram = programTower.findBottomProgram([
        'pbga (66)',
        'xhth (57)',
        'ebii (61)',
        'havc (66)',
        'ktlj (57)',
        'fwft (72) -> ktlj, cntj, xhth',
        'qoyq (66)',
        'padx (45) -> pbga, havc, qoyq',
        'tknk (41) -> ugml, padx, fwft',
        'jptl (61)',
        'ugml (68) -> gyxo, ebii, jptl',
        'gyxo (61)',
        'cntj (57)'
      ])

      expect(bottomProgram.name).toEqual('tknk')
    })

    it('finds the name of the program at the bottom of the tower in the test case', () => {
      const programList = readInput('./inputs/daySeven/partOne.txt', { splitAtNewLine: true })
      const bottomProgram = programTower.findBottomProgram(programList)

      expect(bottomProgram.name).toEqual('wiapj')
    })
  })
})
