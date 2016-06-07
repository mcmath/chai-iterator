{AssertionError} = require 'chai'

module.exports = (fn, msg) ->
  fn.should.throw AssertionError, msg
