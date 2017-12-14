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
    return without.every(prg => !_.find(prg.dependencies, dep => dep.name === program.name))
  })
}

function getProgramMap (programList) {
  const programMap = buildProgram(programList)
  const withLoads = addLoads(programMap)
  return addBalances(withLoads)
}

function findUnbalancedWeight (programList) {
  const programMap = getProgramMap(programList)
  const unbalanced = _.reduce(programMap, (map, program) => {
    if (!program.balanced) map.push(program)
    return map
  }, [])
  console.log(unbalanced[0].dependencies)
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

function addLoads (programMap) {
  return _.reduce(programMap, (map, program, name) => {
    const clone = _.assign({}, program, { load: getTotalLoad(name, programMap) })

    if (clone.dependencies) {
      clone.dependencies = clone.dependencies.map(dep => ({ name: dep, load: getTotalLoad(dep, programMap) }))
    }

    map[name] = clone
    return map
  }, {})
}

function addBalances (programMap) {
  return _.reduce(programMap, (map, program, name, progMap) => {
    const { dependencies } = program

    if (!dependencies) {
      map[name] = _.assign({}, program, { balanced: true })
    } else {
      const weights = dependencies.map(dep => progMap[dep.name].weight)
      const balanced = _.uniq(weights).length === 1
      map[name] = _.assign({}, program, { balanced })
    }

    return map
  }, {})
}

function getTotalLoad (programName, programMap) {
  const { weight, dependencies } = programMap[programName]
  if (!dependencies) return weight

  return weight + _.reduce(dependencies, (memo, dep, index, progMap) => {
    return memo + getTotalLoad(dep, programMap)
  }, 0)
}
