module.exports = {
  incrementByOne: createStepsToJumpOut(incrementByOne),
  checkGreaterThanThree: createStepsToJumpOut(checkGreaterThanThree)
}

function createStepsToJumpOut (getOffset) {
  return function (input) {
    const sequence = input.map(Number)
    let currentPoint = 0
    let steps = 0

    while (currentPoint < sequence.length) {
      steps++
      currentPoint = jump(currentPoint, sequence, getOffset)
    }

    return steps
  }
}

function jump (currentPosition, sequence, getOffset) {
  const jumpDistance = sequence[currentPosition]
  const newCurrentPoint = currentPosition + jumpDistance

  sequence[currentPosition] = jumpDistance + getOffset(jumpDistance)
  return newCurrentPoint
}

function checkGreaterThanThree (currentPosition) {
  return currentPosition >= 3 ? -1 : 1
}

function incrementByOne () { return 1 }
