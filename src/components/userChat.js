import "./userChat.css";
import { io } from "socket.io-client";
import React, { useContext, useEffect, useState } from "react";
import { GetData } from "../values";
import SendMessage from "../handles/sendMessage";

export default function UserChat() {
  const [socket, setSocket] = useState();
  const { userId, setUserId } = useContext(GetData);
  const [Bar, setBar] = useState();
  const [mes, setMes] = useState([{}]);
  const inputat = document.getElementById("input");
  // const form = document.getElementById('form');
  const [input, setInput] = useState();

  useEffect(() => {
    setSocket(
      io.connect("http://localhost:2000", { transports: ["websocket"] })
    );
  }, []);

  useEffect(() => {
    socket?.on("connect", () => {
      // console.log(userId)
      socket.emit("join-room", userId);
      socket?.on("chat message", function (msg) {
        setMes((prev) => [...prev, msg]);

        window.scrollTo(0, document.body.scrollHeight);
      });
      socket?.on("send-chats", (chats) => {
        setMes([...chats]);
      });
    });
  }, [socket]);

  function handleSub(event) {
    event.preventDefault();
    setMes((prev) => [...prev, input]);
    if (input) {
      socket.emit("chat message", input, userId, userId);
      inputat.value = " ";
      setInput("");
    }
    console.log(input);
  }

  return (
    <div className={"chats"}>
      <ul id="messages">
        {mes.map((a, index) => {
          return (
            <SendMessage
              values={{
                message: a.message,
                index,
                sender: a.sender,
                time: a.time,
                date: a.date,
              }}
            />
          );
        })}
      </ul>
      <form id="form" action="" onSubmit={handleSub}>
        {/*<input id="room" onChange={(e) => setBar(e?.target.value)} autoComplete="off"/>*/}
        {/*<button onClick={CreateRoom}>make a room</button>*/}
        <input
          id="input"
          onChange={(e) => setInput(e?.target.value)}
          autoComplete="off"
        />
        <button type={"submit"}>Send</button>
      </form>
    </div>
  );
}
