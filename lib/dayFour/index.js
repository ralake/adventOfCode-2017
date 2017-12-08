const _ = require('lodash')

module.exports = { validPassphrase }

function validPassphrase (passphrase, options = {}) {
  const split = passphrase.split(' ')
  const valid = split.length === _.uniq(split).length
  if (options.increasedSecurity) return valid && extraValid(split)
  return valid
}

function extraValid (splitPassphrase) {
  const filtered = splitPassphrase.map(item => item.split('').sort().join(''))
  return filtered.length === _.uniq(filtered).length
}
