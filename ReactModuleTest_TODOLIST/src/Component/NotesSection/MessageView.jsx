import React from "react";
import "../NotesSection/Message.Module.css";

const MessageView = ({ messages }) => {
  return (
    <div className="message-container">
      {messages.map((msg, index) => {
        const date = new Date(msg.timestamp);
        const formattedDate = date.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });
        return (
          <div key={index} className="message-item">
            <p>{msg.text}</p>
            <div className="dateTime"><span className="timestamp">{`${formattedDate} . ${formattedTime}`}</span></div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageView;
