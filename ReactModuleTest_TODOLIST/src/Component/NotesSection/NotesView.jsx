import React from "react";
import "../NotesSection/NotesView.Module.css";
import Header from "./Header";
import Input from "./Input";
import MessageView from "./MessageView";

const NotesView = ({ selectedNote, onAddMessage}) => {
  return (
    <div className="NoteView-container">
      <Header selectedNote={selectedNote} />
      <MessageView messages={selectedNote.messages} />
      <Input onAddMessage={onAddMessage} />
    </div>
  );
};

export default NotesView;
