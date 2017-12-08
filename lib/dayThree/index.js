const _ = require('lodash')

module.exports = { findSteps, findFirstLargestNum }

const directions = {
  up: {
    nextDirection: 'left',
    updateCoords: (coords) => Object.assign({}, coords, { y: coords.y - 1 })
  },
  down: {
    nextDirection: 'right',
    updateCoords: (coords) => Object.assign({}, coords, { y: coords.y + 1 })
  },
  left: {
    nextDirection: 'down',
    updateCoords: (coords) => Object.assign({}, coords, { x: coords.x - 1 })
  },
  right: {
    nextDirection: 'up',
    updateCoords: (coords) => Object.assign({}, coords, { x: coords.x + 1 })
  }
}

function findSteps (num) {
  const roundedUpSqrt = Math.ceil(Math.sqrt(num))
  const dimension = roundedUpSqrt % 2 === 0 ? roundedUpSqrt + 1 : roundedUpSqrt
  const grid = buildGrid(dimension, { strategy: 'increment' })
  const startCoords = getStartCoords(dimension)
  const numCoords = getCoords(num, grid)
  const { x, y } = getDiffs(startCoords, numCoords)

  return x + y
}

function findFirstLargestNum (num) {
  const roundedUpSqrt = Math.ceil(Math.sqrt(num))
  const dimension = roundedUpSqrt % 2 === 0 ? roundedUpSqrt + 1 : roundedUpSqrt
  const number = buildGrid(dimension, {
    strategy: 'sumNeighbours',
    input: num
  })

  return number
}

function getDiffs (startCoords, numCoords) {
  const { x: startX, y: startY } = startCoords
  const { x: numX, y: numY } = numCoords
  const xDiff = findDiff(startX, numX)
  const yDiff = findDiff(startY, numY)

  return { x: xDiff, y: yDiff }
}

function findDiff (num, otherNum) {
  return num > otherNum ? (num - otherNum) : (otherNum - num)
}

function getCoords (num, grid) {
  return grid.reduce((coords, row, yIndex) => {
    const xIndex = row.indexOf(num)
    if (xIndex > -1) {
      coords.y = yIndex
      coords.x = xIndex
    }
    return coords
  }, {})
}

function getStartCoords (dimension) {
  const coord = Math.floor(dimension / 2)
  return { x: coord, y: coord }
}

function buildGrid (dimension, options) {
  const { strategy, input } = options
  const grid = []
  let firstLargestNumber
  let currentDirection = 'down'
  let coords = getStartCoords(dimension)

  _.times(dimension, () => buildRow(grid, dimension))

  _.times(dimension * dimension, (index) => {
    let value
    if ((index === 0 && strategy === 'sumNeighbours') || strategy === 'increment') {
      value = index + 1
    } else if (index > 0 && strategy === 'sumNeighbours') {
      value = sumNeighBours(grid, coords)
    }

    const { nextDirection } = directions[currentDirection]
    grid[coords.y][coords.x] = value

    if (!firstLargestNumber && value > input) {
      firstLargestNumber = value
      return
    }

    if (nextDirectionIsEmpty(grid, nextDirection, coords)) {
      coords = move(nextDirection, coords)
      currentDirection = nextDirection
    } else {
      coords = move(currentDirection, coords)
    }
  })

  return strategy === 'increment' ? grid : firstLargestNumber
}

function sumNeighBours (grid, coords) {
  const upper = getNeighboursFromRow(grid, coords.y - 1, coords)
  const same = getNeighboursFromRow(grid, coords.y, coords)
  const lower = getNeighboursFromRow(grid, coords.y + 1, coords)

  return upper + same + lower
}

function getNeighboursFromRow (grid, rowNum, coords) {
  const row = grid[rowNum]
  if (!row) return 0

  const sameRow = coords.y === rowNum
  const start = coords.x - 1 < 0 ? 0 : coords.x - 1
  const end = coords.x + 1 > row.length ? row.length - 1 : coords.x + 1
  let range = _.range(start, end + 1)

  if (sameRow) range = _.without(range, coords.x)

  return range.reduce((memo, num) => memo + (row[num] || 0), 0)
}

function buildRow (grid, dimension) {
  const row = _.fill(Array(dimension), 0)
  grid.push(row)
}

function nextDirectionIsEmpty (grid, nextDirection, coords) {
  const testCoords = directions[nextDirection].updateCoords(coords)
  return !grid[testCoords.y][testCoords.x]
}

function move (direction, coords) {
  return directions[direction].updateCoords(coords)
}
