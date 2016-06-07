chai = require 'chai'
chaiIterator = require '../src'
polyfill = require './helpers/polyfill'

before ->
  polyfill()
  chai.use chaiIterator
  chai.should()

describe 'plugin: chai-iterator', ->

  it 'exports a function', ->
    chaiIterator.should.be.a 'function'
