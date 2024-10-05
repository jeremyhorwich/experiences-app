import React, { useState } from "react";
import { DateTime } from "luxon";
import { Message } from "../dataTypes/messages";
import "./MessageBox.css"
import { v4 as uuidv4 } from "uuid";

type MessagesDisplayProps = {
    messages: Array<Message>,
    currentUser: string,
    currentUserName: string
}

function MessageBox(props: MessagesDisplayProps) {
    const [messagesToShow, setMessagesToShow] = useState<Array<Message>>(props.messages);
    const [inputValue, setInputValue] = useState<string>("");

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value)
    };

    function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            submitMessage();
        }
    };

    function submitMessage() {
        if (inputValue === "") {
            return;
        }
        const newMessage: Message = {
            id: uuidv4(),
            text: inputValue,
            sender: props.currentUser,
            senderName: props.currentUserName,
            timeSent: DateTime.now()
        }

        //Placeholder for sending the new message to the backend via API call

        setInputValue("");
        setMessagesToShow([...messagesToShow,newMessage]);
    }

   
    return (
        <div className="message-box">
            {messagesToShow.map((message) => (
                message.sender !== props.currentUser ? (
                    <div key={message.id} className="sent-by-other">
                        <span className="info">{message.senderName}</span>
                        <span>{message.text}</span>
                        <span className="info">{message.timeSent.toLocaleString(DateTime.DATETIME_SHORT)}</span>
                    </div>
                ) : (
                    <div key={message.id} className="sent-by-self">
                        <span className="info">You</span>
                        <span>{message.text}</span>
                        <span>{message.timeSent.toLocaleString(DateTime.DATETIME_SHORT)}</span>
                    </div>
                )
            ))}
            <div className="input-area">
                <input 
                    className="message-input"
                    value={inputValue}
                    placeholder={"Type new message..."} 
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
            </div>
        </div>
    )
}

export { MessageBox };