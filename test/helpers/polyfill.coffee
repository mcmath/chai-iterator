{lt} = require 'semver'

module.exports = ->
  if lt(process.version, '4.0.0')
    require 'core-js/es6/symbol'
    require 'core-js/fn/symbol/iterator'
