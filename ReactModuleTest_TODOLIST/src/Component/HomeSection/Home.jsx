import React, { useState, useEffect, useCallback } from "react";
import SideBar from "../SideBarSection/SideBar";
import NotesArea from "../NotesArea/NotesArea";
import "../HomeSection/Home.Module.css";
import CreateNote from "../CreateNote/CreateNote";
import NotesView from "../NotesSection/NotesView";

const Home = () => {
  const [showModel, setShowModel] = useState(false);
  const [notes, setNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

  // New state to manage sidebar visibility in mobile view
  const [showSideBar, setShowSideBar] = useState(true);

  // Retrieve notes from localStorage when component mounts
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever notes state changes
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  const openModal = useCallback(() => setShowModel(true), []);
  const closeModal = useCallback(() => setShowModel(false), []);

  const handleCreateNote = (color, text) => {
    if (!text.trim()) return;

    // Update notes with the new note
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, { color, text, messages: [] }];
      // Save updated notes immediately to localStorage
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });

    closeModal();
  };

  const handleSelectNote = (index) => {
    if (index >= 0 && index < notes.length) {
      setSelectedNoteIndex(index);

      // Hide the sidebar when a note is selected in mobile view
      if (isMobile) {
        setShowSideBar(false);
      }
    }
  };

  const handleAddMessage = (message) => {
    if (selectedNoteIndex !== null && message.trim()) {
      setNotes((prevNotes) => {
        const updatedNotes = [...prevNotes];
        updatedNotes[selectedNoteIndex].messages.push({
          text: message,
          timestamp: new Date(),
        });
        // Save updated notes immediately to localStorage
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        return updatedNotes;
      });
    }
  };

  // Handling mobile view:
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Function to check the window width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // You can adjust the breakpoint as needed
      if (window.innerWidth > 1024) {
        setShowSideBar(true); // Show sidebar if window is resized back to desktop
      }
    };

    // Set initial state
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <CreateNote show={showModel} setShowModel={setShowModel} onCreate={handleCreateNote} />
      <div className="homecontainer">
        {showSideBar && (
          <SideBar
            openModal={openModal}
            notes={notes}
            onSelectNote={handleSelectNote}
            show={showModel}
          />
        )}
        {selectedNoteIndex !== null && selectedNoteIndex < notes.length ? (
          <NotesView
            selectedNote={notes[selectedNoteIndex]}
            onAddMessage={handleAddMessage}
            show={showModel}
          />
        ) : (
          !isMobile && <NotesArea show={showModel} />
        )} 
      </div>
    </>
  );
};

export default Home;
