let notes = [];

const toolbar = [
  [{ header: [1, 2, 3, 4, 5, , false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  [{ align: [] }],
  ["clean"]
];

var Delta = Quill.import("delta");
let quill = new Quill("#editor", {
  modules: { toolbar: toolbar },
  theme: "snow"
});
//Get items in local storage
var oldnotes = JSON.parse(localStorage.getItem('note'));
//notes.push(saved);

// Saves array to local storage
function saveNotes() {
  localStorage.setItem("note", JSON.stringify(notes));
}

// Creates note, pushes to array
const createNote = () => {
  let data = quill.getContents();
  const note = {
    note: data,
    id: Date.now()
  };
  notes = oldnotes;
  notes.push(note);
  saveNotes();

  // Redirects to index
  window.location.href = "../Display.html";
  console.log(notes)
  alert("stoppa här");

};
// Check for unsaved data
window.onbeforeunload = function () {
  if (change.length() > 0) {
    return "There are unsaved changes. Are you sure you want to leave?";
  }
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
