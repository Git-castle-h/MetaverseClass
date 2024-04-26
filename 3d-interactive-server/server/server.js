import { Server } from "socket.io"

const io = new Server({
    cors:{
        origin: "https://r3f-learning-client-abab.run.goorm.site"
        // origin : "*"
    }
});

io.listen(3001);

const characters =[];

io.on("connection",(socket)=>{
    console.log(`connected ${socket.id}`);
        // characters.push({
        //     key:socket.id,
        //     name:"Unknown",
        //     animationName : "Idle",
        //     position:[Math.random()*10-5,1,Math.random()*10-5],
        //     rotationY:(Math.PI/180)*(Math.random()*360)

        // });

    socket.on("join",(name)=>{
        characters.push({
            key: socket.id,
            name: name,
            animationName : "Idle",
            position:[Math.random()*10-5,1,Math.random()*10-5],
            rotationY:(Math.PI/180)*(Math.random()*360),
            talk: "",
            talkLast: false
        })
        io.emit("characters",characters);
        console.log(characters);
    });  
    
    socket.on("talk",(arr)=>{
        const character = characters.find(item => item.key === socket.id);
        character.talk = arr[0];
        character.talkLast = arr[1];
        io.emit("characters",characters);
    })


    //i.emit : 모든 클라이언트에게 메시지를 보내는 메서드
    

    console.log(characters);

    socket.on("update",(data)=>{
        const character = characters.find(item => item.key === socket.id);
        character.animationName = data.animationName;
        character.position = data.position;
        character.rotationY = data.rotationY;

        socket.broadcast.emit("characters",characters);
    })

    socket.on("disconnect",()=>{
        console.log(`bye~ ${socket.id}`);

        characters.splice(
            characters.findIndex((item)=>item.key === socket.id),1
        )
        io.emit("characters",characters);
    });
});
