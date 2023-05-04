import "./chat.css";
import { io } from "socket.io-client";
import { useEffect, useState, useContext, createRef } from "react";
import React from "react";
import { GetData } from "../values";
import SendMessage from "../handles/sendMessage";
import CommentIcon from "@mui/icons-material/Comment";
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Switch,
  Toolbar,
} from "@mui/material";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SubForm from "./handle/subform";

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
  const [input, setInput] = useState("");
  const [prevList, setprevList] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [Bar, setBar] = useState();
  const searchRef = createRef();
  const inputat = document.getElementById("filled-adornment-amount");

  useEffect(() => {
    setSocket(
      io.connect("https://chat-bot-backenc.onrender.com", {
        transports: ["websocket"],
      })
    );
  }, []);
  useEffect(() => {
    socket?.on("connect", () => {
      setInput(input.toString());
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
  useEffect(() => {
    const chat = document.querySelectorAll(".message");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entries) => {
          entries.target.classList.toggle("show", entries.isIntersecting);
        });
      },
      {
        rootMargin: "-50px",
      }
    );
    chat.forEach((chats) => {
      observer.observe(chats);
    });
  }, [giveChat]);

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
    socket?.emit("active-action", bar);
    socket?.emit("refresh");
    if (toggle === true) {
      setToggle(false);
    } else {
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
  const drawerWidth = 240;

  return (
    <div className={"fixed top-0 left-0"}>
      <div className="row w-[100vw]">
        <section className="discussions">
          <div className="discussion search"></div>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
              }}
            >
              <Toolbar>
                <Typography variant="h6" noWrap component="div">
                  Chats with {chatter}
                </Typography>
                <Switch
                  sx={{ position: "absolute", right: "0", float: "right" }}
                  onChange={() => DeActive(Bar)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                  scrollbarWidth: "0",
                },
              }}
              variant="permanent"
              anchor="left"
            >
              <Button variant="outlined" onClick={ChangeList} disableElevation>
                Change List
              </Button>

              <Divider />

              <ul id="myUL">
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {list.map((user, index) => {
                    const labelId = `checkbox-list-label-${index}`;

                    return (
                      <li>
                        <ListItem
                          key={index}
                          secondaryAction={
                            <IconButton edge="end" aria-label="comments">
                              <CommentIcon />
                            </IconButton>
                          }
                          disablePadding
                        >
                          <ListItemButton
                            role={undefined}
                            onClick={() => ChangeRoom(user.id, user.name)}
                            dense
                          >
                            <ListItemText
                              id={labelId}
                              primary={user.name}
                              value={user.name}
                            />
                          </ListItemButton>
                        </ListItem>
                      </li>
                    );
                  })}
                </List>
              </ul>
            </Drawer>
          </Box>
        </section>
        <section className="chat">
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
        </section>
      </div>
      <form action="adminChat" onSubmit={HandleSub}>
        <SubForm setInput={setInput} />
      </form>
    </div>
  );
}
