noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
  c.inPorts.add 'in',
    datatype: 'string'
  c.outPorts.add 'out',
    datatype: 'string'

  c.description = 'Say hello'

  c.process (input, output) ->
    data = input.get 'in'
    return unless data.type is 'data'
    output.sendDone
      out: "Hello #{data.data}"
