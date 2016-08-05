module.exports = function(io) {
    io.sockets.on('connection', function(socket) {
        console.log('A client is connected!');
        
        socket.on('disconnect',function(){
            console.log('Client disconnected.');
        })
    });
}