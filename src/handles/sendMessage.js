import React, { useState } from "react";

export default function SendMessage(props) {
  const [center, setCenter] = useState(false);
  //if date is differente write the date span (JS change class to active)
  let sender = "anon";
  if (props.values.sender) {
    sender = props.values.sender;
    if (sender === props.values.myname) {
      setCenter(true);
    }
  }

  return (
    <div className={"container  "}>
      <li>
        <p>{props.values.message}</p>
        <span className={"time-right"}>{props.values.time}</span>
        <span className={`${center ? "time-right" : " time-left"}`}>
          {sender}
        </span>
        {/*<span className={"time-left"}>{props.values.date}</span>*/}
      </li>
    </div>
  );
}
