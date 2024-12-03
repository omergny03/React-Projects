import { useEffect, useState } from 'react';
import './App.css'
import Anasayfa from './components/Anasayfa';

function App() {

  const [command, setCommand] = useState('CHECK');  // Kullanıcının girdiği komut
    const [response, setResponse] = useState(''); // Sunucudan alınan yanıt
    const[newpart,setNewpart]=useState([]);

    useEffect(()=>{
     try{
      sendCommand();
      setNewpart(response.split(' '))
      if(response=='True' || response=='False'|| response=='Invalid'){
        setCommand('CHECK')
      }
      
     }catch(e){
      console.log(e.message)
     }
    },[response])

    // Komut gönderme işlemi
    const sendCommand = async () => {
        const res = await fetch('http://localhost:3000/send-command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ command: command }), // Komut gönderiliyor
        });

        const data = await res.json();
        setResponse(data.message); // Sunucudan gelen yanıt React'ta görüntüleniyo
        console.log(response)
        /* setNewpart(data.message.split(' ')) */
       
        
    };
    const updateCommand = (newCommand)=>{
        setCommand(newCommand)
    }
    const send = ()=>{
      sendCommand()
    }

  return (
    <div>
          {/*             <h1>TCP Command Sender</h1>
            <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Enter command"
            />
            <button onClick={sendCommand}>Send Command</button>
            <p>Response: {response}</p> */}
    
       <Anasayfa array={newpart} updateCommand={updateCommand} send={send}/>
    </div>
  )
}

export default App
