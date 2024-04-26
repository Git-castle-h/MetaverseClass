import "./TalkOverlay.css"

import{ useEffect, useRef} from"react"
 import"./TalkOverlay.css"
 import{ socket} from"./ServerConnector"
 export default function TalkOverlay(){
    const refInput=useRef()
    const refTalkLast = useRef(false);

    
    let timer; 

    const talk=() =>{

            if(timer){
                clearTimeout(timer);
            }

            console.log(refTalkLast.current);
            const talk=refInput.current.value.trim()
            if(talk.length>0) {
                refTalkLast.current = true;
            console.log(refTalkLast.current);
                socket.emit("talk",[talk, refTalkLast.current ]);
                refInput.current.select();
            }

            timer = setTimeout(()=>{
                refTalkLast.current = false;
                socket.emit("talk",[talk, refTalkLast.current ]);
                console.log("end");
            },2000)
    }



    const keydown = (event) =>{
        if(event.code === "Enter"){
            talk();
        }
    }
        return<>
            <div className="talk-layout">
            <input ref={refInput} onKeyDown={keydown}/>
            <div className="send"onClick={talk}>SEND</div>
            </div>
        </>
 }