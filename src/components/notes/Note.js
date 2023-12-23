// Note.js
import React, { useState } from 'react';
import './Note.css';
import { MdDelete, MdOutlineEdit } from 'react-icons/md';

const Note = ({ note, onEdit, onDelete }) => {
  const [isEditingNote, setIsEditingNote] = useState(false);

  const handleEditClick = () => {
    setIsEditingNote(true);
  };

  const handleCancelEdit = () => {
    setIsEditingNote(false);
  };

  const handleUpdateNote = () => {
    setIsEditingNote(false);
    onEdit({ ...note, title: updatedTitle, content: updatedContent });
  };

  const [updatedTitle, setUpdatedTitle] = useState(note.title);
  const [updatedContent, setUpdatedContent] = useState(note.content);

  return (
    <div className="note-container">
      {isEditingNote ? (
        <>
          <input
            style={{
              width: '100%',
              padding: '0.5em',
              borderRadius: '1em',
              margin: '0 auto',
            }}
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            style={{
              width: '100%',
              padding: '0.5em',
              borderRadius: '1em',
              margin: '0 auto',
              minHeight: '12vh',
            }}
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
          <div style={{ display: 'flex' }}>
            {' '}
            <button
              style={{
                width: '100%',
                padding: '0.5em',
                borderRadius: '0.5em',
                margin: '0 1em',
                background: '#2684FC',
                color: '#fff',
                border: 'none',
              }}
              onClick={handleUpdateNote}
            >
              Update
            </button>
            <button
              style={{
                width: '100%',
                padding: '0.5em',
                borderRadius: '0.5em',
                margin: '0 1em',
                background: 'red',
                color: '#fff',
                border: 'none',
              }}
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxHeight: '29%',
            }}
          >
            <div
              style={{
                width: '2em',
                height: '2em',
                borderRadius: '50%',
                backgroundColor: note.color,
              }}
            ></div>
            <div
              style={{
                width: '5vw',
                fontSize: '1.7em',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}
            >
              <MdDelete onClick={onDelete} />
              <MdOutlineEdit onClick={handleEditClick} />
            </div>
          </div>
          <div
            style={{
              maxWidth: '100%',
              maxHeight: '20%',
              marginRight: '20px',
              flex: '1',
            }}
          >
            <h4 style={{ color: '#F9B35F' }}>{note.title}</h4>
            <p
              style={{
                wordWrap: 'break-word',
                overflowY: 'auto',
                maxHeight: '65%',
                padding: '0 1em',
                marginBottom: '0.5em',
              }}
            >
              {note.content}
            </p>
            <div style={{ height: '1vh', width: '100%' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
