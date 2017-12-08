const _ = require('lodash')

module.exports = {
  maxMin: createCheckSum(maxMin),
  evenlyDivisible: createCheckSum(evenlyDivisible)
}

function createCheckSum (fn) {
  return function checkSum (input) {
    return input
      .map(line => _.compact(line.split(' ')).map(Number))
      .reduce(fn, 0)
  }
}

function maxMin (checkSum, numList) {
  return checkSum + (_.max(numList) - _.min(numList))
}

function evenlyDivisible (checkSum, numList) {
  return checkSum + _.reduce(numList, (memo, num, index, arr) => {
    const without = _.filter(arr, (item, i) => i !== index)
    const found = _.first(_.filter(without, number => isWholeNumber(num / number)))

    return found ? memo + (num / found) : memo
  }, 0)
}

function isWholeNumber (num) {
  return Math.floor(num) === num
}
