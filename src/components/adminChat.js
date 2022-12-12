import './userChat.css';
import { io } from "socket.io-client";
import {useEffect, useState,useContext} from "react";
import React from "react";
import {GetData} from "../values";



export default function AdminChat() {
    const [socket,setSocket] = useState()
    const {userId,setUserId} = useContext(GetData);
    const [Bar,setBar] = useState();
    const [list,setList] = useState([]);
    //when possible get user id to room
    const [chats,setChats] = useState([]);
    const [mes,setMes] = useState([]);
    const inputat = document.getElementById('input');
    const inputRoom = document.getElementById('room');
    // const form = document.getElementById('form');
    const [input,setInput] = useState();
    useEffect(() => {
        setSocket(io.connect('http://localhost:2000', { transports : ['websocket']}))
    },[])
    useEffect(() => {
        socket?.on('connect', ()=> {
            socket?.on('chat message', function (msg, getusers) {
                // console.log(msg)
                setMes((prev) => [...prev, msg]);
                // console.log(getusers);
                window.scrollTo(0, document.body.scrollHeight);
            })
            socket.on("chat-list", (list) => {
                setList([...list])

            })
        })},[socket])

    function HandleSub(event) {
        event.preventDefault();
        setMes((prev) => [...prev, input]);
        if (input) {
            socket.emit('chat message', input, Bar, mes, list[inputRoom.value]);
            inputat.value = " ";
            setInput("  ")
        }
    };


    function ChangeRoom(props) {
        document.getElementById('room').value = props
        socket?.emit("join-room", list[props])
    }


    return <div className={'chats'}>
        <ul id="messages">
            {mes.map((message, index)=>
                <li key={index}>{message}</li>)}
        </ul>
        <div className={'chatList'}>
            {list.map((item,index)=>
                <button index={index} onClick={()=> ChangeRoom(index)}>{item}</button>
            )}
        </div>
        <form id="form" action="" onSubmit={HandleSub}>

            <input id="room" autoComplete="off"/>

            <input id="input"  onChange={(e) => setInput(e?.target.value)} autoComplete="off"/>
            <button type={'submit'}>Send</button>
        </form>
    </div>

}

