const stepsToJumpOut = require('../lib/dayFive')
const { readInput } = require('../lib/helpers')

describe('stepsToJumpOut', () => {
  it('counts the amount of steps needed to jump out of the sequence', () => {
    const input = readInput('./inputs/dayFive/partOne.txt', { splitAtNewLine: true })

    expect(stepsToJumpOut.incrementByOne(['0', '3', '0', '1', '-3'])).toEqual(5)
    expect(stepsToJumpOut.incrementByOne(input)).toEqual(388611)
  })

  it('counts the amount of steps needed to jump out of the sequence with more complex offsets', () => {
    const input = readInput('./inputs/dayFive/partOne.txt', { splitAtNewLine: true })

    expect(stepsToJumpOut.checkGreaterThanThree(['0', '3', '0', '1', '-3'])).toEqual(10)
    expect(stepsToJumpOut.checkGreaterThanThree(input)).toEqual(27763113)
  })
})
