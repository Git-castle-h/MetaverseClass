import './App.css'
import Login,{ userNameAtom } from './Login';
import Talk from'./Talk';
import ServerConnector from './ServerConnector'
import {useAtom} from 'jotai';
 function App() {
  const[userName] = useAtom( userNameAtom);
 return (
  <>
    <ServerConnector/>
    {!userName && <Login/>}
    {userName&& <Talk/>}
  </>
 )
 }
 
 export default App