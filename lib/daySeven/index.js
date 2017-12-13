const _ = require('lodash')

module.exports = { findBottomProgram, findUnbalancedWeight }

function findBottomProgram (programList) {
  const programMap = getProgramMap(programList)
  const programsWithDependencies = programMap.filter(program => _.get(program, 'dependencies', []).length)

  return _.find(programsWithDependencies, program => {
    const without = _.without(programsWithDependencies, program)
    return without.every(prg => !prg.dependencies.includes(program.name))
  })
}

function getProgramMap (programList) {
  return programList.map(program => {
    const parts = program.match(/(\w+)/g)
    const [name, weight] = parts
    const dependencies = parts.slice(2)

    return { name, weight: Number(weight), dependencies }
  })
}

function findUnbalancedWeight (programList) {

}
