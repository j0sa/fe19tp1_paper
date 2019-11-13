// Get localstorage values .map creates a new array.
let notesList = JSON.parse(localStorage.getItem("note")).map(noteTemplate).join();

// Push data into our html in order to display in dom
document.getElementById("scroll-notes").innerHTML = notes.map(noteTemplate).join('');

//console.log(notesList);
// The code that generates a html table from the localstorage data
function noteTemplate(myNotes) {
  notes.push(myNotes);
  console.log(myNotes);
  let noteString = myNotes.content.ops[0].insert;
  console.log(noteString);
  return `
  <table cellspacing="0" cellpadding="0" onclick='loadNote(${myNotes.id})'>
   <tbody>
    <tr><th>${myNotes.title}</th><th>${myNotes.created}</th></tr>
    <tr><th colspan="2">${myNotes.content.ops[0].insert.slice(0, 25)}...</th></tr>
    </tbody>
  </table>
  `;
}

// Load note into editor
const loadNote = (noteID) => {
  //console.log("loadNotes ran! notes: " + notes + " noteID: " + noteID)
  let { content } = notes.find(note => note.id === noteID)
  quill.setContents(content)
}