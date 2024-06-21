const API_URL = 'https://notes.deolsugam.workers.dev/notes';

document.addEventListener('DOMContentLoaded', loadNotes);
document.getElementById('note-form').addEventListener('submit', addNote);

async function loadNotes() {
  const response = await fetch(API_URL);
  const notes = await response.json();
  const container = document.getElementById('notes-container');
  container.innerHTML = '';
  notes.forEach(note => {
    const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.innerHTML = `
      <h2>${note.title}</h2>
      <p>${note.content}</p>
    `;
    container.appendChild(noteElement);
  });
}

async function addNote(event) {
  event.preventDefault();
  const title = document.getElementById('note-title').value;
  const content = document.getElementById('note-content').value;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });

  document.getElementById('note-title').value = '';
  document.getElementById('note-content').value = '';

  if (response.ok) {
    loadNotes();
  } else {
    console.error('Failed to add note:', response.statusText);
  }
}
