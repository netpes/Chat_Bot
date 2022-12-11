import './userChat.css';
import { io } from "socket.io-client";
import {useEffect, useState} from "react";


export default function UserChat() {
    const [socket,setSocket] = useState()
    const [mes,setMes] = useState([]);
    const inputat = document.getElementById('input');
    // const form = document.getElementById('form');
    const [input,setInput] =useState();
    useEffect(() => {
        setSocket(io.connect('http://localhost:2000', { transports : ['websocket']}))
    },[])
    useEffect(() => {
        socket?.on('connect', ()=> {
            socket?.on('chat message', function(msg) {
                console.log(msg)
                setMes((prev) => [...prev, msg]);
                console.log(mes);
                window.scrollTo(0, document.body.scrollHeight);

            })
        })
    },[socket])

   function handleSub(event) {
        event.preventDefault();
        if (input) {
            socket?.emit('chat message', input);
            inputat.value = " ";
            setInput("  ")
        }
        console.log(input)
    };





    return <div className={'chats'}>
        <ul id="messages">
            {mes.map((message, index)=>
                <li key={index}>{message}</li>)}
        </ul>
        <form id="form" action="" onSubmit={handleSub}>
            <input id="input"  onChange={(e) => setInput(e?.target.value)} autoComplete="off"/>
            <button type={'submit'}>Send</button>
        </form>
    </div>

}

