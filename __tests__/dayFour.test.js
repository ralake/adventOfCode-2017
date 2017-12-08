const { validPassphrase } = require('../lib/dayFour')
const { readInput } = require('../lib/helpers')

describe('validPassphrase', () => {
  describe('standard security', () => {
    it('detects valid and invalid passphrases based on repeated phrases', () => {
      const input = readInput('./inputs/dayFour/partOne.txt', { splitAtNewLine: true })

      expect(validPassphrase('aa bb cc dd aa')).toEqual(false)
      expect(validPassphrase('aa bb cc dd ee')).toEqual(true)
      expect(validPassphrase('aa bb cc dd aaa')).toEqual(true)

      const validPassphrases = input.reduce((validCount, passphrase) => {
        return validPassphrase(passphrase) ? validCount + 1 : validCount
      }, 0)

      expect(validPassphrases).toEqual(455)
    })
  })

  describe('increased security', () => {
    it('detects valid and invalid passphrases based on repeated phrases and anagrams', () => {
      const input = readInput('./inputs/dayFour/partOne.txt', { splitAtNewLine: true })

      expect(validPassphrase('abcde fghij', { increasedSecurity: true })).toEqual(true)
      expect(validPassphrase('abcde xyz ecdab', { increasedSecurity: true })).toEqual(false)
      expect(validPassphrase('a ab abc abd abf abj', { increasedSecurity: true })).toEqual(true)
      expect(validPassphrase('iiii oiii ooii oooi oooo', { increasedSecurity: true })).toEqual(true)
      expect(validPassphrase('oiii ioii iioi iiio', { increasedSecurity: true })).toEqual(false)

      const validPassphrases = input.reduce((validCount, passphrase) => {
        return validPassphrase(passphrase, { increasedSecurity: true }) ? validCount + 1 : validCount
      }, 0)

      expect(validPassphrases).toEqual(186)
    })
  })
})
