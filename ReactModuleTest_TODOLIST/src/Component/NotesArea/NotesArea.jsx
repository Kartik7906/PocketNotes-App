import React from "react";
import "../NotesArea/Note.Module.css";
import bgimage from "../../Assests/backgroundimg.svg";
import lockimg from "../../Assests/Vector.svg";

const NotesArea = ({ show }) => {
  return (
    <div className={show ? "blureside" : "NoteareaWidth"}>
      <div className="titlecontainer">
        <div className="bgimagesection">
          <img src={bgimage} alt="Background" />
        </div>
        <div className="titletext">
          <h1>Pocket Notes</h1>
        </div>
        <div className="defaulttext">
          <p>
            Send and receive messages without keeping your phone online. Use
            Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
        </div>
      </div>
      <div className="encrypteddesign">
        <img src={lockimg} alt="Lock Icon" />
        <p>end-to-end encrypted</p>
      </div>
    </div>
  );
};

export default NotesArea;