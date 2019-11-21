let notes = [];

// Set up tool for Quill API
const toolbar = [
  [{ header: [1, 2, 3, 4, 5, , false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  [{ align: [] }],
  ["clean"]
];

// Set up editor
let Delta = Quill.import("delta");
let quill = new Quill("#editor", {
  modules: { toolbar: toolbar },
  theme: "snow",
  placeholder: "Write here..."
});

//Get items into local storage
let oldnotes = localStorage.getItem("note") ? JSON.parse(localStorage.getItem("note")) : [];
//console.log(oldnotes);
//notes.push(saved);

// Saves array to local storage
const saveNotes = () => {
  localStorage.setItem("note", JSON.stringify(notes));
};

// Creates note, pushes to array
const createNote = () => {
  let currentTime = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
  const note = {
    id: Date.now(),
    title: quill.getText(0, 10),
    content: quill.getContents(),
    created: currentTime,
    archived: false,
    favourite: false
  };
  console.log(notes)
  notes = oldnotes;
  notes.push(note);
  saveNotes();
  // Reloads page
  window.location.href = window.location.href;
  //console.log(notes);
  //alert("stoppa här");
};
/*
// Store accumulated changes
let change = new Delta();
quill.on('text-change', function (delta) {
  change = change.compose(delta);
});
/*
// Save periodically
setInterval(function () {
  if (change.length() > 0) {
    console.log('Saving changes', change);
    // Save the entire updated text to localStorage
    const data = JSON.stringify(quill.getContents())
    localStorage.setItem('data', data);
    change = new Delta();
  }
}, 5 * 1000);

*/
document.querySelector('#new').style.visibility = 'hidden';
document.querySelector('#save').style.visibility = 'hidden';

function editNote(e) {
  quill.enable(e);
}