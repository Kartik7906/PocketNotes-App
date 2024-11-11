import React, { useEffect, useRef, useState } from "react";
import "../CreateNote/CreateNote.Module.css";

const CreateNote = ({ show, setShowModel, onCreate }) => {
  const createRef = useRef(null);
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const [text, setText] = useState("");
  const [accessColor, setAccessColor] = useState("");

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (createRef.current && !createRef.current.contains(event.target)) {
        setShowModel(false);
      }
    };
    if (show) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show, setShowModel]);

  const handleInputText = (e) => setText(e.target.value);
  const handleColor = (index) => setAccessColor(colors[index]);

  const handleCreate = () => {
    if (text && accessColor) {
      onCreate(accessColor, text); // Send data back to Home
      setText(""); // Clear input after creation
      setAccessColor(""); // Clear selected color
    }
  };

  return (
    <>
      {show && (
        <div className="popupcontainer">
          <div ref={createRef} className="Popup-content">
            <p>Create New Group</p>
            <div className="groupinput">
              <label>Group Name</label>
              <input
                type="text"
                value={text}
                placeholder="Enter group name"
                onChange={handleInputText}
              />
            </div>
            <div className="groupcolor">
              <label>Choose Colour</label>
              <div style={{ display: "flex", gap: "10px" }}>
                {colors.map((color, index) => (
                  <button
                    key={index}
                    style={{
                      backgroundColor: color,
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleColor(index)}
                  />
                ))}
              </div>
            </div>
            <div className="createbtn">
              <button onClick={handleCreate} disabled={!text || !accessColor}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateNote;
