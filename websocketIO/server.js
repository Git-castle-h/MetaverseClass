import{ Server} from"socket.io";
 const io =new Server({
    cors: {
    origin:"http://localhost:5173"
    }
 });
 io.listen(3001);

const characters =[];

 io.on("connection", (socket) =>{
    console.log(`connected ${socket.id}`);
    socket.on("join", (userName) => {
        characters.push({
        key: socket.id,
        name: userName
    });
        io.emit("characters", characters);
    });

    socket.on("talk", (msg) => {
        const character = characters.find(item => item.key === socket.id)
        character.talk = msg;
        io.emit("characters", characters);
    });

    socket.on("disconnect", () =>{
        console.log(`disconnected ${socket.id}`);

        characters.splice(
            characters.findIndex((item) => item.key === socket.id), 1
            );
            io.emit("characters", characters);
    });
 });