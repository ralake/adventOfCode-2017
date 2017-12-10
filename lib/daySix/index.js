const _ = require('lodash')

module.exports = { detectInfiniteLoop }

function detectInfiniteLoop (memoryBank, options = {}) {
  if (options.secondLoop) {
    const firstPass = reallocate(memoryBank)
    return reallocate(firstPass.state, [], 0)
  }
  return reallocate(memoryBank)
}

function reallocate (memoryBank, history = [], cycles = 1) {
  const bank = memoryBank.split(/\s/g).map(Number)
  let max = _.max(bank)
  const indices = findIndices(bank, max)
  let currentCheckPoint = getCurrentCheckpoint(indices[0], bank)
  const output = bank.map((num, index) => indices[0] === index ? 0 : num)

  while (max) {
    output[currentCheckPoint] = output[currentCheckPoint] + 1
    max--
    currentCheckPoint = getCurrentCheckpoint(currentCheckPoint, bank)
  }

  const state = output.join(' ')

  if (history.includes(state)) {
    return { cycles, state }
  } else {
    history.push(state)
    return reallocate(state, history, cycles + 1)
  }
}

function findIndices (array, value) {
  return array.reduce((indices, item, index) => {
    if (value === item) indices.push(index)
    return indices
  }, [])
}

function getCurrentCheckpoint (num, bank) {
  return num + 1 >= bank.length ? 0 : num + 1
}
