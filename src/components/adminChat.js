import "./userChat.css";
import { io } from "socket.io-client";
import { useEffect, useState, useContext } from "react";
import React from "react";
import { GetData } from "../values";
import SendMessage from "../handles/sendMessage";

export default function AdminChat() {
  const [socket, setSocket] = useState();
  const { userId, setUserId } = useContext(GetData);
  const [msgDate, setMsgDate] = useState([]);
  // const {userName, setUserName} = useContext(GetData);
  const [Bar, setBar] = useState();
  const [list, setList] = useState([]);
  const [name, setName] = useState([]);
  const [sender, setSender] = useState([]);
  //when possible get user id to room
  const [admin, setAdmin] = useState(userId);
  const [connected, setConnected] = useState([]);
  const [mes, setMes] = useState([]);
  const inputat = document.getElementById("input");
  const inputRoom = document.getElementById("room");
  const [input, setInput] = useState();
  const [giveChat, setGiveChat] = useState([]);

  useEffect(() => {
    setSocket(
      io.connect("http://localhost:2000", { transports: ["websocket"] })
    );
  }, []);
  useEffect(() => {
    socket?.on("connect", () => {
      socket.on("message room", (msg) => {
        msg = `joined to room ${msg}`;
        setGiveChat((prev) => [...prev, msg]);
      });
      socket?.on("chat message", function (msg, senderId) {
        // console.log("yeah"+senderId)
        console.log("why not? " + msg);
        setGiveChat((prev) => [...prev, msg]);
        console.log(giveChat);
        setSender((prev) => [...prev, senderId]);
        // window.scrollTo(0, document.body.scrollHeight);
      });

      //getting chats from server
      socket?.on("send-chats", (chats) => {
        setGiveChat([...chats]);
        console.log("this is chats", chats);
      });
      socket.on("who-is-connected", (user) => {
        setConnected((prev) => [...prev, user]);
        console.log(user + " connected");
      });

      socket?.on("chat-list", (list) => {
        setList([...list]);
      });
      socket?.on("name-list", (name) => {
        setName([...name]);
      });
    });
  }, [socket]);
  useEffect(() => {
    console.log("updates");
  }, []);

  function HandleSub(event) {
    event.preventDefault();

    setMes((prev) => [...prev, input]);
    if (input !== null) {
      socket?.emit(
        "chat message",
        input,
        Bar,
        list[inputRoom.value],
        userId,
        admin
      );
      inputat.value = " ";
      setInput("  ");
    }
  }

  function ChangeRoom(props) {
    document.getElementById("room").value = props;
    socket?.emit("join-room", list[props]);
    setBar(list[props]);
  }

  return (
    <div className={"chats"}>
      <ul id="messages">
        {giveChat.map((a, index) => {
          if (a.message) {
            console.log(a.message);
            return (
              <SendMessage
                values={{
                  message: a.message,
                  index,
                  time: a.time,
                  date: a.date,
                }}
              />
            );
          }
        })}
      </ul>
      <form id="form" action="" onSubmit={HandleSub}>
        <input id="room" autoComplete="off" />

        <input
          id="input"
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
        <button type={"submit"}>Send</button>
      </form>
      <div className={"chatList"}>
        {list.map((item, index) => (
          <button index={index} onClick={() => ChangeRoom(index)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
