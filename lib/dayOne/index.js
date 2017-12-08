module.exports = {
  sumNextValue: createCaptcha(sumNextValue),
  sumHalfWayValue: createCaptcha(sumHalfWayValue)
}

function createCaptcha (getValueToCheck) {
  return function captcha (list) {
    return list.split('').map(Number).reduce((sum, value, index, arr) => {
      const valueToCheck = getValueToCheck(index, arr)

      if (value === valueToCheck) sum += value
      return sum
    }, 0)
  }
}

function sumNextValue (index, arr) {
  const isLastItem = index === arr.length - 1
  return isLastItem ? arr[0] : arr[index + 1]
}

function sumHalfWayValue (index, arr) {
  const length = arr.length 
  const steps = length / 2
  const nextStep = index + steps
  return  nextStep >= length ? arr[nextStep - length] : arr[nextStep]
}
