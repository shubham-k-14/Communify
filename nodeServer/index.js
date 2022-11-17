// node server which will handle io connections
//  const httpServer = require("http").createServer();

const io = require("socket.io")(8000, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  
  
//   httpServer.listen(8000);

// redundant code for this context of code

// const hasDuplicate = (arrayObj, colName) => {
//     var hash = Object.create(null);
//     return arrayObj.some((arr) => {
//        return arr[colName] && (hash[arr[colName]] || !(hash[arr[colName]] = true));
//     });
//  };


const users={};

io.on('connection',(socket)=>{
    socket.on('new-user-joined',(name)=>{
        console.log("New user : " + name);
        users[socket.id] = name;
        console.log(users)
        socket.broadcast.emit('user-joined',name);
 
    });

    socket.on('send',(message)=>{
        socket.broadcast.emit('receive',{message : message , name:users[socket.id]})
    });


    socket.on('disconnect',()=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
})

