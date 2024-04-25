import { io } from "socket.io-client"
import { useEffect } from "react";
import { atom, useAtom} from"jotai"

 export const socket = io("http://localhost:5173");

 export const charactersAtom =atom([]);
 export default function ServerConnector() {
    const[ characters, setCharacters] = useAtom(charactersAtom);
    useEffect(() => {
        const onConnect=() => {
        console.log("connected");
    };
    const onDisconnect = () =>{
        console.log("disconnected");
    };
    const onCharacters = (value) =>{
    console.log(value);
    setCharacters(value);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("characters", onCharacters);
    return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.off("characters", onCharacters);
    }
    })
 }