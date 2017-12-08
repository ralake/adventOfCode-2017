const fs = require('fs')

module.exports = { readInput }

function readInput (path, options = {}) {
  const output = fs.readFileSync(path, 'utf8')
  return options.splitAtNewLine ? output.split(/\n/) : output
}