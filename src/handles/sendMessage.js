import React from "react";

export default function SendMessage(props) {
  return (
    <div className={"msgInside"}>
      <li>
        {props.values.message}
        <span>{props.values.time}</span>
        <span>{props.values.date}</span>
      </li>
    </div>
  );
}
