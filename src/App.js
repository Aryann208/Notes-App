import React, { useState, useEffect } from 'react';
import './App.css';
import Note from './components/notes/Note';
import NoteForm from './components/noteForm/NoteForm';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '', color: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const saveNotesToLocalStorage = (updatedNotes) => {
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const addNote = () => {
    if (newNote.title.trim() !== '' || newNote.content.trim() !== '') {
      setNotes((prevNotes) => {
        const updatedNotes = [newNote, ...prevNotes];
        saveNotesToLocalStorage(updatedNotes);
        return updatedNotes;
      });
      setNewNote({ title: '', content: '', color: '' });
    }
  };

  const editNote = (index, updatedNote) => {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes];
      updatedNotes[index] = updatedNote;
      saveNotesToLocalStorage(updatedNotes);
      return updatedNotes;
    });
  };

  const deleteNote = (index) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes((prevNotes) => {
        const updatedNotes = [...prevNotes];
        updatedNotes.splice(index, 1);
        saveNotesToLocalStorage(updatedNotes);
        return updatedNotes;
      });
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="main-container">
        <div className="notes-creation">
          <div className="header">
            <h2 style={{ color: '#F9B35F' }}>Notes Maker</h2>
            <input
              style={{
                width: '100%',
                padding: '0.5em',
                borderRadius: '1em',
                margin: '0 auto',
              }}
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <h3>Create Notes</h3>
          <NoteForm
            newNote={newNote}
            onAdd={addNote}
            onEdit={(updatedNote) =>
              editNote(notes.indexOf(newNote), updatedNote)
            }
            onTitleChange={(value) => setNewNote({ ...newNote, title: value })}
            onContentChange={(value) =>
              setNewNote({ ...newNote, content: value })
            }
            onColorChange={(value) => setNewNote({ ...newNote, color: value })}
          />
        </div>
        <div className="notes-section">
          <h3>Notes</h3>
          <div className="notes-collection">
            {filteredNotes.length ? (
              <>
                {filteredNotes.map((note, index) => (
                  <Note
                    key={index}
                    note={note}
                    onEdit={(updatedNote) => editNote(index, updatedNote)}
                    onDelete={() => deleteNote(index)}
                  />
                ))}
              </>
            ) : (
              <h3>No notes to view</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
