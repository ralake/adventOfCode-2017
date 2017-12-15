const _ = require('lodash')

module.exports = { findBottomProgram, findUnbalancedWeight }

function findBottomProgram (programList) {
  const programMap = getProgramMap(programList)
  const programsWithDependencies = _.reduce(programMap, (map, program) => {
    if (program.dependencies) map.push(program)
    return map
  }, [])

  return _.find(programsWithDependencies, program => {
    const without = _.without(programsWithDependencies, program)
    return without.every(prg => !_.find(prg.dependencies, dep => dep === program.name))
  })
}

function getProgramMap (programList) {
  return buildProgram(programList)
}

function findUnbalancedWeight (programList) {
  const programMap = getProgramMap(programList)
  const bottomProgram = findBottomProgram(programList)
  const { oddProgram, parent } = findOddProgram(bottomProgram.name, programMap)
  const parentLoads = programMap[parent].dependencies.map(dep => getTotalLoad(dep, programMap))
  const [ highest, lowest ] = _.sortBy(parentLoads, load => -load)

  return oddProgram.weight - (highest - lowest)
}

function buildProgram (programList) {
  return _.reduce(programList, (map, program) => {
    const parts = program.match(/(\w+)/g)
    const [ name, weight ] = parts
    const dependencies = parts.slice(2).length ? parts.slice(2) : null

    map[name] = { name, weight: Number(weight), dependencies }
    return map
  }, {})
}

function findOddProgram (progName, programMap, parent) {
  const program = programMap[progName]
  const { dependencies } = program
  const loads = dependencies.map(dep => getTotalLoad(dep, programMap))

  if (_.uniq(loads).length === 1) return { oddProgram: programMap[progName], parent }
  const nextProgramToCheck = findProgramByOddLoad(loads, dependencies, programMap)

  return findOddProgram(nextProgramToCheck, programMap, progName)
}

function findProgramByOddLoad (loads, deps, programMap) {
  const oddLoad = _.find(loads, load => loads.filter(l => l === load).length === 1)
  const oddDep = _.find(deps, dep => getTotalLoad(dep, programMap) === oddLoad)
  return oddDep
}

function getTotalLoad (programName, programMap) {
  const { weight, dependencies } = programMap[programName]
  if (!dependencies) return weight

  return weight + _.reduce(dependencies, (memo, dep, index, progMap) => {
    return memo + getTotalLoad(dep, programMap)
  }, 0)
}
