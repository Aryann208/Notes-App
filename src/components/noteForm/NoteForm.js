import React, { useState } from 'react';
import './NoteForm.css';
const NoteForm = ({
  newNote,
  onAdd,
  onEdit,
  onTitleChange,
  onContentChange,
  onColorChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleAddOrUpdate = () => {
    if (isEditing) {
      // Handle update logic
      onEdit(newNote);
      setIsEditing(false);
    } else {
      // Handle add logic
      if (newNote.title.trim() !== '' || newNote.content.trim() !== '') {
        onAdd(newNote);
      }
    }
  };

  return (
    <div className="note-form">
      <input
        style={{
          width: '100%',
          padding: '0.5em',
          borderRadius: '1em',
          margin: '0 auto',
        }}
        type="text"
        placeholder="Title"
        value={newNote.title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <textarea
        style={{
          width: '100%',
          padding: '0.5em',
          borderRadius: '1em',
          margin: '0 auto',
          minHeight: '30vh',
          overflow: 'auto',
        }}
        placeholder="Content"
        value={newNote.content}
        onChange={(e) => onContentChange(e.target.value)}
      />
      <input
        type="color"
        value={newNote.color}
        onChange={(e) => onColorChange(e.target.value)}
      />
      <button
        style={{
          width: '100%',
          padding: '0.5em',
          borderRadius: '1em',
          margin: '0 auto',
          background: '#2684FC',
          color: '#fff',
          border: 'none',
        }}
        onClick={handleAddOrUpdate}
      >
        {isEditing ? 'Update' : 'Add'}
      </button>
    </div>
  );
};

export default NoteForm;
