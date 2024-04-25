import{ useAtom} from"jotai";
import{ charactersAtom, socket} from"./ServerConnector";
import"./Talk.css"
import { useRef } from "react";
 export default function Talk() {
 const[characters] =useAtom(charactersAtom);
 const refInput = useRef();
 const refMessageID = useRef(0);
 const talk = () =>{
  const talk = refInput.current.value.trim();
  if(talk.length > 0){
    console.log(talk);
    socket.emit("talk", talk);
    refInput.current.select();
  }
 }
 const keydown = (event)=>{
    event.stopPropagation()
    if(event.code === "Enter"){
        talk();
    }
 }

 return <>
    <div className="characters-list">
        <div>접속자</div>
        {
            characters.map(
            (item, idx) =><div key={refMessageID.current++}className="character-name">{item.name}</div>
            )
        }
    </div>
    <div className="message">
        <div>메세지</div>
        <input ref={refInput} onKeyDown={keydown} />
    </div>
    
    <div className="receive-messages">
        {
        characters.map(
        (item) => item.talk ? <div key={refMessageId.current++}
        >{item.name} : {item.talk}</div>: null
        )
        }
    </div>

 </>
}