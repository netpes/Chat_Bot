import React from "react";

export default function SendMessage(props) {
  //if date is differente write the date span (JS change class to active)
  let sender = "anon";
  if (props.values.sender) {
    sender = props.values.sender;
  }
  return (
    <div className={"msgInside"}>
      <li>
        <span className={"senderInside"}>{sender}</span>
        {props.values.message}
        <span className={"timeInside"}>{props.values.time}</span>
        <span className={"dateInside"}>{props.values.date}</span>
      </li>
    </div>
  );
}
