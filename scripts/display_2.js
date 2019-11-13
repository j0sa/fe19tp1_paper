// Get localstorage data.
// Push data into template in order to display in dom
let notesList = JSON.parse(localStorage.getItem("note"));
document.getElementById("scroll-notes").innerHTML = notesList.map(noteTemplate).join("");

//console.log(notesList);
// The code that generates a html table from the localstorage data
function noteTemplate(myNotes) {
  notes.push(myNotes);
  console.log(myNotes);
  let noteString = myNotes.content.ops[0].insert;
  console.log(noteString);
  return `
    <table class="find-note" cellspacing="0" cellpadding="0" onclick='loadNote(${myNotes.id})'>
      <tbody class="notecell">
        <tr><th>${myNotes.title}</th><th>${myNotes.created}</th></tr>
        <tr><th colspan="2">${myNotes.content.ops[0].insert.slice(0, 25)}...</th></tr>
      </tbody>
    </table>
  `;
}

// Load note into editor
const loadNote = noteID => {
  //console.log("loadNotes ran! notes: " + notes + " noteID: " + noteID)
  let { content } = notes.find(note => note.id === noteID);
  quill.setContents(content);
};
