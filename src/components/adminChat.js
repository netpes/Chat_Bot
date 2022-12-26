import "./chat.css";
import { io } from "socket.io-client";
import { useEffect, useState, useContext, createRef } from "react";
import React from "react";
import { GetData } from "../values";
import SendMessage from "../handles/sendMessage";

export default function AdminChat() {
  const { userName, setUserName } = useContext(GetData);
  const [giveChat, setGiveChat] = useState([]);
  const { userId, setUserId } = useContext(GetData);
  const [list, setList] = useState([]);
  const [admin, setAdmin] = useState(userId);
  const [inactive, setInactive] = useState([]);
  const [chatter, setChatter] = useState();
  const [search, setSearch] = useState();
  const [socket, setSocket] = useState();
  const [input, setInput] = useState();
  const [prevList, setprevList] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [Bar, setBar] = useState();
  const searchRef = createRef();

  const inputat = document.getElementById("input");
  // const inputRoom = document.getElementById("room");

  useEffect(() => {
    setSocket(
      io.connect("http://localhost:2000", { transports: ["websocket"] })
    );
  }, []);
  useEffect(() => {
    socket?.on("connect", () => {
      socket.on("inactive-chats", (inactiveList) => {
        setInactive(inactiveList);
      });
      //getting chats from server
      socket?.on("send-chats", (chats) => {
        setGiveChat([...chats]);

        // sort list by last message
        console.log("this is chats", chats);
      });
      socket?.on("chat-list", (userdata) => {
        setList(userdata);
        setprevList(userdata);
      });
    });
  }, [socket]);

  function Search(e) {
    let filter, ul, li, a, i, txtValue, input;
    input = document.getElementById("myInput");
    setSearch(e.target.value);
    console.log(search);
    filter = searchRef.current.value;
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("button")[0];
      txtValue = a.textContent || a.value;
      if (txtValue.indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  //for bot
  function LastChat(chat) {
    let i = chat.length - 1;
    while (chat[i].sender === userName) {
      if (chat[i].message) {
        console.log(chat[i].sender);
      }
      i = i - 1;
    }
    return chat[i].message;
  }
  function DeActive(bar) {
    console.log(bar);
    socket.emit("active-action", bar);
    socket.emit("refresh");
    if (toggle == true) {
      document.getElementById("archiveButton").innerText = "Open";
      setToggle(false);
    } else {
      document.getElementById("archiveButton").innerText = "Close";
      setToggle(true);
    }
  }
  function HandleSub(event) {
    event.preventDefault();
    const message = { message: input, sender: admin };
    setGiveChat((prev) => [...prev, message]);

    if (input && admin && userName != null) {
      //need to get user last message before input
      console.log(LastChat(giveChat, chatter));
      socket.emit("send-bot", LastChat(giveChat, chatter), input, userName);
      if (userId) {
        socket?.emit(
          "chat message",
          input,
          Bar,
          userId, //who send the message?
          admin
        );
      }
      inputat.value = " ";
      setInput("  ");
    }
  }

  function ChangeRoom(id, name) {
    document.getElementById("room").value = id;
    socket.emit("join-room", id);
    setBar(id);
    setChatter(name);
    // console.log(list[props]);
  }
  function ChangeList() {
    if (prevList == list) {
      setList(inactive);
    } else {
      setList(prevList);
    }
  }
  function OpenNav() {
    document.getElementById("mySidenav").style.width = "35%";
  }

  function CloseNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  return (
    <div className="container">
      <div className="row">
        <nav className="menu">
          <ul className="items">
            <li className="item">
              <button onClick={OpenNav}>&#9776; open</button>
            </li>
            <li className="item">
              <button
                className="fa fa-user"
                aria-hidden="true"
                onClick={ChangeList}
              >
                View Inactive Chats
              </button>
            </li>
            <li className="item">
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </li>
            <li className="item item-active">
              <i className="fa fa-commenting" aria-hidden="true"></i>
            </li>
            <li className="item">
              <i className="fa fa-file" aria-hidden="true"></i>
            </li>
            <li className="item">
              <i className="fa fa-cog" aria-hidden="true"></i>
            </li>
          </ul>
        </nav>
        <div id="mySidenav" className="sidenav">
          <a className="closebtn" onClick={CloseNav}>
            &times;
          </a>
        </div>
        <section className="discussions">
          <div className="discussion search">
            <div className="searchbar">
              <i className="fa fa-search" aria-hidden="true"></i>
              <input
                ref={searchRef}
                id={"myInput"}
                type="text"
                onChange={Search}
                placeholder="Search..."
              ></input>
            </div>
          </div>
          <ul id="myUL">
            {list.map((user, index) => (
              <li index={index}>
                <div className="discussion message-active">
                  <div className="desc-contact">
                    <button onClick={() => ChangeRoom(user.id, user.name)}>
                      <p className="name">{user.name}</p>
                      <p className="message">Enter Here Last Message</p>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="chat">
          <div className="header-chat">
            <button id={"archiveButton"} onClick={() => DeActive(Bar)}>
              Close
            </button>
            <p className="name">{chatter}</p>
            <i
              className="icon clickable fa fa-ellipsis-h right"
              aria-hidden="true"
            ></i>
          </div>
          <div className="messages-chat">
            {/* eslint-disable-next-line array-callback-return */}
            {giveChat.map((a, index) => {
              if (a.message) {
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
              }
            })}
          </div>
          <form action="adminChat" onSubmit={HandleSub}>
            <input id="room" autoComplete="off" />
            <div className="footer-chat">
              <button
                className="icon fa fa-smile-o clickable mysub"
                type={"submit"}
              ></button>
              <input
                type="text"
                className="write-message"
                placeholder="Type your message here"
                id="input"
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
              ></input>
              <i
                className="icon send fa fa-paper-plane-o clickable"
                aria-hidden="true"
              ></i>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
