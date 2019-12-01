let notes = [];
// specify the fonts you would 
let fonts = ['Open Sans' ,'Roboto Mono', 'Playfair Display' ];
function getFontName(font) {
  return font.toLowerCase().replace(/\s/g, "-");
}
let fontNames = fonts.map(font => getFontName(font));
// add fonts to style
let fontStyles = "";
fonts.forEach(function (font) {
  var fontName = getFontName(font);
  fontStyles += ".ql-bubble .ql-picker.ql-font .ql-picker-label[data-value=" + fontName + "]::before, .ql-bubble .ql-picker.ql-font .ql-picker-item[data-value=" + fontName + "]::before {" +
    "content: '" + font + "';" +
    "font-family: '" + font + "', sans-serif;" +
    "}" +
    ".ql-font-" + fontName + "{" +
    " font-family: '" + font + "', sans-serif;" +
    "}";
});

let node = document.createElement('style');
node.innerHTML = fontStyles;
document.body.appendChild(node);
// Set up tool for Quill API
const toolbar = [
  [{ 'font': fontNames }],
  [{ header: [1, 2, 3, 4, 5, , false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  [{ align: [] }],
  ['link', 'image', 'video', 'formula'],
  ["clean"]
];
// Add fonts to whitelist
var Font = Quill.import('formats/font');
Font.whitelist = fontNames;
Quill.register(Font, true);


// Set up editor
let Delta = Quill.import("delta");
let quill = new Quill("#editor", {
  modules: { toolbar: toolbar },
  theme: "bubble",
  placeholder: "Highlight to format the text."
});
quill.focus()
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
    favorite: false
  };
  notes = oldnotes;
  notes.push(note);
  saveNotes();
  // Reloads page
  window.location.href = window.location.href;
};
function success() {
  if (document.getElementById("editor").value === "") {
    document.querySelector('.btn--create').disabled = true;
  } else {
    document.querySelector('.btn--create').disabled = false;
  }
}
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
document.querySelector('#new').style.display = "none";
document.querySelector('#save').style.display = "none";
document.querySelector('#delete').style.display = "none";
document.querySelector('#print').style.display = "none";

function editNote(e) {
  quill.enable(e);
}

/* Printer function */
function printNote() {
  quill.getModule('toolbar').container.hidden = true;
  document.querySelector('.ql-tooltip').hidden = true;
}