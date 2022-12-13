import React from "react";


export default function SendMessage(props){

    // console.log(props.values)
    return <div className={'msgInside'}>
        <li>{props.values.message}</li>
    </div>
}