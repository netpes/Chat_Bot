import React from "react";


export default function SendMessage(props){

    return <div className={'msgInside'}>
        <li>{props.values.message}</li>
    </div>
}