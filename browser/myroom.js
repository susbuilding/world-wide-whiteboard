//FRONT END

//making socket connection for that tab
var socket = io('/myroom')

//connect happening on browser
socket.on('connect', function(){
  console.log('our room!')
})

window.whiteboard.on('draw', function(start, end, strokeColor){
  var personDrawData = [start, end, strokeColor]
  //console.log(personDrawData)
  socket.emit('draw', personDrawData)
})



socket.on('draw', function(personDrawData){
  whiteboard.draw(...personDrawData);
})

