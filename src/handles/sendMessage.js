import React, { useState } from "react";
import { useContext } from "react";
import { GetData } from "../values";

export default function SendMessage(props) {
  let center = false;
  const { userName, setUserName } = useContext(GetData);
  const { userId, setUserId } = useContext(GetData);

  //if date is differente write the date span (JS change class to active)
  let sender;
  if (props.values.sender) {
    sender = props.values.sender;
    if (sender === userName || userId === sender) {
      center = true;
    }
  } else {
    sender = "just fuck dont send";
  }

  return (
    <div className={center ? "message senderInput" : "message"}>
      <span className={center ? "text text-only" : "text"}>
        <p>{props.values.message}</p>
        <p className="time"> {props.values.time}</p>
      </span>
      {/*<p className="message">{sender}</p>*/}
    </div>
  );
}
