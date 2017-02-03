//FRONT END

//making socket connection for that tab
var socket = io(window.location.origin);

//connect happening on browser
socket.on('connect', function(){
  console.log('i have made a persistent 2-way connection to server!')
})

window.whiteboard.on('draw', function(start, end, strokeColor){
  var personDrawData = [start, end, strokeColor]
  //console.log(personDrawData)
  socket.emit('draw', personDrawData)
})



socket.on('draw', function(personDrawData){
  whiteboard.draw(...personDrawData);
})

//for the persistence on refresh
socket.on('initialDrawing', function(draws){
  console.log('wehere!')
  draws.forEach((data) => {
    whiteboard.draw(...data)
  })

})
