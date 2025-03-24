import React, { useState, useEffect } from "react";

const Card = ({ children }) => <div className="border p-4 rounded shadow">{children}</div>;
const Button = ({ children, onClick }) => (
  <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded">
    {children}
  </button>
);

const NoteTakingApp = () => {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });
  const [note, setNote] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addOrUpdateNote = () => {
    if (note.trim()) {
      if (editIndex !== null) {
        const updatedNotes = [...notes];
        updatedNotes[editIndex] = note;
        setNotes(updatedNotes);
        setEditIndex(null);
      } else {
        setNotes([...notes, note]);
      }
      setNote("");
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const editNote = (index) => {
    setNote(notes[index]);
    setEditIndex(index);
  };

  return (
    <div className="p-4">
      <input
        className="border p-2 w-full mb-2 text-black"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write a note..."
      />
      <Button onClick={addOrUpdateNote}>{editIndex !== null ? "Update Note" : "Add Note"}</Button>
      <div className="mt-4">
        {notes.map((n, index) => (
          <Card key={index} className="mb-2 p-2 flex justify-between">
            <div>{n}</div>
            <div className="flex gap-2">
              <Button onClick={() => editNote(index)}>Edit</Button>
              <Button onClick={() => deleteNote(index)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NoteTakingApp;
