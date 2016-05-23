noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
  c.inPorts.add 'in',
    datatype: 'string'
  c.outPorts.add 'out',
    datatype: 'string'
  #c.description = 'Shows output'

  c.process (input, output) ->
    data = input.get 'in'
    return unless data.type is 'data'
    console.log data.data
    output.sendDone
      out: data.data
