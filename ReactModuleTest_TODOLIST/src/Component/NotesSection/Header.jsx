import React from "react";
import "../NotesSection/Header.Module.css";
import backbtn from "../../Assests/backbtn.svg"

const Header = ({ selectedNote }) => {
  // Extracts the first two words and takes the first letter from each
  const getInitials = (text) => {
    const words = text.split(" ").slice(0, 2); // Get the first two words
    return words.map(word => word.charAt(0).toUpperCase()).join(""); // Get the first letter of each word in uppercase
  };

  const char = getInitials(selectedNote.text);

  return (
    <div className="header-container">
      <div className="notes-title-bar">
        <img src={backbtn} alt="" className="backbtn"/>
        <div className="notes-title-profile" style={{ backgroundColor: selectedNote.color }}>
          {char}
        </div>
        <p className="notes-title-text">{selectedNote.text}</p>
      </div>
    </div>
  );
};

export default Header;
