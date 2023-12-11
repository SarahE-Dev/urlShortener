var littleid = require('./')
var tape     = require('tape')

tape('make some ids', function(t){

  var normal = littleid()
  var middle = littleid(16)
  var big = littleid(256)

  t.equal(normal.length, 6)
  t.equal(middle.length, 16)
  t.equal(big.length, 256)
  t.end()

})
