import React, { useState } from "react";
import "../NotesSection/Input.Module.css";
import enterbtn from '../../Assests/Enterbtn.svg';

const Input = ({ onAddMessage }) => {
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && message.trim()) {
      onAddMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="input-container">
      <textarea
        className="message-area"
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter your text here..........."
      />
      <img src={enterbtn} alt="Enter button" className="enter-btn" onClick={() => {
        if (message.trim()) {
          onAddMessage(message);
          setMessage("");
        }
      }} />
    </div>
  );
};

export default Input;
