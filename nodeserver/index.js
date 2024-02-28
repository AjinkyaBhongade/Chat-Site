//node server which will handel socket.io
const io = require('socket.io')(8000,{cors:{origin:"*"}});
const users = {};

io.on('connection' , socket =>{
    //if any new user join, it will know by another user;
    socket.on ('new-user-joined', name =>{
        // console.log("New User" , name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined' , name);
        
    } )
    //IF SOMEONE SEND MSG, BROADCAST IT TO OTHER PEOPLE
    socket.on ('send', message =>{
        socket.broadcast.emit('receive' , {message: message, name: users[socket.id]})
    });
    // IF SOMEONE LEAVE THE CHAT IT WILL KNOWN TO OTHER
    socket.on ('disconnect', message =>{
        socket.broadcast.emit('left' ,users[socket.id]);
        delete users[socket.id]
    });
    
})
