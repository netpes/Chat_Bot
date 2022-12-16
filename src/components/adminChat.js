import "./userChat.css";
import { io } from "socket.io-client";
import { useEffect, useState, useContext } from "react";
import React from "react";
import { GetData } from "../values";
import SendMessage from "../handles/sendMessage";
import { useRef } from "react";

export default function AdminChat() {
  const [socket, setSocket] = useState();
  const { userId, setUserId } = useContext(GetData);
  const { userName, setUserName } = useContext(GetData);
  const [Bar, setBar] = useState();
  const [list, setList] = useState([{}]);
  const [sender, setSender] = useState([]);
  //when possible get user id to room
  const [admin, setAdmin] = useState(userId);
  const [connected, setConnected] = useState([]);
  const [input, setInput] = useState();
  const [giveChat, setGiveChat] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const ref = useRef();
  const inputat = document.getElementById("input");
  const inputRoom = document.getElementById("room");
  useEffect(() => {
    setSocket(
      io.connect("http://localhost:2000", { transports: ["websocket"] })
    );
  }, []);
  useEffect(() => {
    socket?.on("connect", () => {
      setIsConnected(true);
      // socket?.on("message room", (msg) => {
      //   msg = `joined to room ${msg}`;
      //   setGiveChat((prev) => [...prev, msg]);
      // });
      socket?.on("chat message", function (msg, senderId) {
        setGiveChat((prev) => [...prev, msg]);
        setSender((prev) => [...prev, senderId]);
        window.scrollTo(0, document.body.scrollHeight);
      });
      //getting chats from server
      socket.on("send-chats", (chats) => {
        setGiveChat([...chats]);
        // console.log("this is chats", chats);
      });
      // socket.on("who-is-connected", (user) => {
      //   setConnected((prev) => [...prev, user]);
      //   console.log(user + " connected");
      // });
      socket?.on("chat-list", (userdata) => {
        setList(userdata);
      });
    });
  }, [isConnected, socket]);

  function HandleSub(event) {
    event.preventDefault();
    ref.current.scrollIntoView({ behavior: "smooth" });
    console.log(admin);

    if (input) {
      socket?.emit(
        "chat message",
        input,
        Bar,
        admin, //who send the message?
        inputRoom.value,
        admin
      );
      inputat.value = " ";
      setInput("  ");
    }
  }

  function ChangeRoom(props, e) {
    e.preventDefault();
    ref.current.scrollIntoView({ behavior: "smooth" });
    document.getElementById("room").value = props;
    socket.emit("join-room", props);
    setBar(props);
    // console.log(list[props]);
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
                  sender: a.sender,
                  time: a.time,
                  date: a.date,
                  myname: userName,
                }}
              />
            );
          }
        })}
        <div ref={ref}></div>
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
        {list.map((user, index) => (
          <button index={index} onClick={(e) => ChangeRoom(user.id, e)}>
            {user.name}
          </button>
        ))}
      </div>
    </div>
  );
}
