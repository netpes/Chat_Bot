import './userChat.css';
import { io } from "socket.io-client";
import {useEffect, useState,useContext} from "react";
import React from "react";
import {GetData} from "../values";
import SendMessage from "../handles/sendMessage";



export default function AdminChat() {
    const [socket,setSocket] = useState()
    const {userId,setUserId} = useContext(GetData);
    // console.log(userId)
    // const {userName, setUserName} = useContext(GetData);
    const [Bar,setBar] = useState();
    const [list,setList] = useState([]);
    const [name, setName] = useState([]);
    const [sender,setSender] = useState([]);
    //when possible get user id to room
    const [admin,setAdmin] = useState(userId);
    const [mes,setMes] = useState([]);
    const inputat = document.getElementById('input');
    const inputRoom = document.getElementById('room');
    const [input,setInput] = useState();
    const [giveChat,setGiveChat] = useState([])
    let datea = "";
    // let d = "";
    useEffect(() => {
        setSocket(io.connect('http://localhost:2000', { transports : ['websocket']}))
    },[])
    useEffect(() => {
        socket?.on('connect', ()=> {
            socket.on('message room', (msg) => {
                msg = `joined to room ${msg}`
                setMes((prev) => [...prev, msg]);
            })
            socket?.on('chat message', function (msg, senderId) {
                // console.log("yeah"+senderId)
                setGiveChat((prev) => [...prev, msg]);
                setSender((prev) => [...prev, senderId]);
                datea = this.date;
                // window.scrollTo(0, document.body.scrollHeight);
            })
            socket?.on('send-chats', (chats) => {
                // console.log(chats.message)
                // chats_data = chats_data.toString()
                // let p2 = Object.assign({}, );
                setGiveChat([...chats])
                console.log(giveChat)
                // chats.forEach((a, index) => {
                //     console.log(a.message)
                // })
            })


            socket?.on("chat-list", (list) => {
                setList([...list])
            })
            socket?.on("name-list", (name) => {
                setName([...name])
            })
        })},[socket])

    function HandleSub(event) {
        event.preventDefault();
        setMes((prev) => [...prev, input]);
        if (input !== null) {
            socket?.emit('chat message', input, Bar, mes, list[inputRoom.value], userId, admin);
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
            {giveChat.map((a,index)=> {
               return <SendMessage values={{message: a.message, index}}/>
            })}
        </ul>
        <form id="form" action="" onSubmit={HandleSub}>

            <input id="room" autoComplete="off"/>

            <input id="input"  onChange={(e) => setInput(e?.target.value)} autoComplete="off"/>
            <button type={'submit'}>Send</button>
        </form>
        <div className={'chatList'}>
            {list.map((item,index)=>
                <button index={index} onClick={()=> ChangeRoom(index)}>{item}</button>
            )}
        </div>

    </div>

}

