let notes = [];

let quill = new Quill('#editor', {
  theme: 'snow'
});

// Saves array to local storage
function saveNotes() {
  localStorage.setItem("note", JSON.stringify(notes));
}

// Creates note, pushes to array
const createNote = () => {
  let data = quill.getContents();
  const note  = {
    note: data,
    id: Date.now()
  }
  notes.push(note);
  saveNotes();
  // Redirects to index
  window.location.href = '../index.html';
}

// Check for unsaved data
window.onbeforeunload = function () {
  if (change.length() > 0) {
    return 'There are unsaved changes. Are you sure you want to leave?';
  }
}