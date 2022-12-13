import './userChat.css';
import { io } from "socket.io-client";
import {useEffect, useState,useContext} from "react";
import React from "react";
import {GetData} from "../values";



export default function UserChat() {
    const [socket,setSocket] = useState()
    const {userId,setUserId} = useContext(GetData);
    const [Bar,setBar] = useState();


    const [mes,setMes] = useState([]);
    const inputat = document.getElementById('input');
    // const form = document.getElementById('form');
    const [input,setInput] =useState();




    useEffect(() => {
        setSocket(io.connect('http://localhost:2000', { transports : ['websocket']}))
    },[])

    useEffect(() => {
        socket?.on('connect', ()=> {
            console.log(userId)
            socket.emit("join-room", userId)
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
       setMes((prev) => [...prev, input]);
        if (input) {
            socket.emit('chat message', input, Bar);
            inputat.value = " ";
            setInput("")
        }
        console.log(input)
    };


    return <div className={'chats'}>
        <ul id="messages">
            {mes.map((message, index)=>
                <li key={index}>{message}</li>)}
        </ul>
        <form id="form" action="" onSubmit={handleSub}>
            {/*<input id="room" onChange={(e) => setBar(e?.target.value)} autoComplete="off"/>*/}
            {/*<button onClick={CreateRoom}>make a room</button>*/}
            <input id="input"  onChange={(e) => setInput(e?.target.value)} autoComplete="off"/>
            <button type={'submit'}>Send</button>
        </form>
    </div>

}

