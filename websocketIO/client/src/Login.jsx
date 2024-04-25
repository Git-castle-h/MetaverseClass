import{ useRef} from"react"
 import"./Login.css"
 import{ atom, useAtom} from"jotai"
 import{ socket} from"./ServerConnector";

 export const userNameAtom=atom();
 
 export default function Login() {
    const refInput=useRef();
    const[userName, setUserName] =useAtom(userNameAtom);
    const login=() =>{
    const userName=refInput.current.value.trim();
        if(userName.length>0) {
            setUserName(userName);
            socket.emit("join", userName);
        }
    }
 return<>
    <div className="login-layout">
    <div className="name">YOUR NAME</div>
    <input ref={refInput}/>
    <button onClick={login}>JOIN</button>
    </div>
 </>
 }