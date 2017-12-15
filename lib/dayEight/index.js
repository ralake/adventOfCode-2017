const _ = require('lodash')

module.exports = { execute }

function execute (input) {
  const instructions = parseInputToInstructions(input)
  const results = executeInstructions(instructions)
  const { highestValueDuringProcess } = results

  return {
    highestFinalValue: _.max(_.values(_.omit(results, ['highestValueDuringProcess']))),
    highestValueDuringProcess
  }
}

function executeInstructions (instructions) {
  return instructions.reduce((values, instruction) => {
    const { condition, calculation } = instruction
    const result = calculate(calculation, values)

    if (shouldCalculate(condition, values)) {
      values[calculation.register] = result
      if (result > values.highestValueDuringProcess) values.highestValueDuringProcess = result
    }

    return values
  }, { highestValueDuringProcess: 0 })
}

function calculate (calculation, values) {
  const { register, value, action } = calculation
  return calculations[action](register, value, values)
}

function shouldCalculate (condition, values) {
  const { register, value, operator } = condition
  return conditions[operator](register, value, values)
}

function parseInputToInstructions (input) {
  return input.map(instruction => {
    const [ rawCalculation, rawCondition ] = instruction.split(' if ')
    const [ calculationRegister, action, calculationValue ] = rawCalculation.split(' ')
    const [ conditionRegister, operator, conditionValue ] = rawCondition.split(' ')

    return {
      calculation: {
        register: calculationRegister,
        action,
        value: Number(calculationValue)
      },
      condition: {
        register: conditionRegister,
        operator,
        value: Number(conditionValue)
      }
    }
  })
}

function getValue (values, register) {
  return values[register] || 0
}

const calculations = {
  inc: (register, value, values) => getValue(values, register) + value,
  dec: (register, value, values) => getValue(values, register) - value
}

const conditions = {
  '<': (register, value, values) => getValue(values, register) < value,
  '<=': (register, value, values) => getValue(values, register) <= value,
  '>': (register, value, values) => getValue(values, register) > value,
  '>=': (register, value, values) => getValue(values, register) >= value,
  '!=': (register, value, values) => getValue(values, register) !== value,
  '==': (register, value, values) => getValue(values, register) === value
}
