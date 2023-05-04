import "./userChat.css";
import { io } from "socket.io-client";
import React, { useContext, useEffect, useState } from "react";
import { GetData } from "../values";
import SendMessage from "../handles/sendMessage";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {
  AppBar,
  Divider,
  Drawer,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  Toolbar,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
export default function UserChat() {
  const [socket, setSocket] = useState();
  const { userId, setUserId } = useContext(GetData);
  const [giveChat, setGiveChat] = useState([]);
  const inputat = document.getElementById("filled-adornment-amount");
  const [input, setInput] = useState();
  const drawerWidth = 240;
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

  let prevMsg = "";
  useEffect(() => {
    setSocket(
      io.connect("https://chat-bot-backend-iyvz.onrender.com", {
        transports: ["websocket"],
      })
    );
  }, []);

  useEffect(() => {
    socket?.on("connect", () => {
      socket.emit("join-room", userId);
      //convert to obj
      socket?.on("chat message", (msg) => {
        console.log("why not? ", msg);
        if (prevMsg !== msg) {
          setGiveChat((prev) => [...prev, msg]);
          console.log(giveChat);
          window.scrollTo(0, document.body.scrollHeight);
          prevMsg = msg;
        }
      });

      //getting chats from server
      socket.on("send-chats", (chats) => {
        setGiveChat([...chats]);
        console.log("this is chats", chats);
      });
    });
  }, [socket]);

  function HandleSub(event) {
    event.preventDefault();
    const message = { message: input, sender: userId };
    setGiveChat((prev) => [...prev, message]);

    if (input !== null) {
      socket?.emit("chat message", input, userId, userId);
      socket?.emit("answer_bot", input);
      inputat.value = " ";
    }
    // console.log(input);
  }

  return (
    <div className={"fixed top-0 left-0"}>
      <div className="row">
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
                  Chats with Customer Service
                </Typography>
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
              <Divider />
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
          <div className={"fixed bottom-0 left-0 object-bottom w-[100vw]"}>
            <form action="adminChat" onSubmit={HandleSub}>
              <input id="room" autoComplete="off" />
              <div className="footer-chat ">
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-amount">
                    Type Your Message Here
                  </InputLabel>
                  <FilledInput
                    onChange={(e) => setInput(e.target.value)}
                    id="filled-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                  />
                  <Button type={"submit"} variant="contained" color="success">
                    Success
                  </Button>
                </FormControl>
              </div>
            </form>
          </div>
        </section>
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
          <Divider />
        </Drawer>
      </div>
    </div>
  );
}
