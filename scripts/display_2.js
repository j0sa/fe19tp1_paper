// Get localstorage data, after checking that localstorage isn't empty
// Push data into template in order to display in dom
let notesList = JSON.parse(localStorage.getItem("note"));
if (notesList != null) { document.getElementById("scroll-notes").innerHTML = notesList.map(noteTemplate).join("") }
else { console.log('noteslist är tom'); }

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
        <tr><td align="center" colspan="2">${myNotes.content.ops[0].insert.slice(0, 30)}\n${myNotes.content.ops[0].insert.slice(30, 60)}</td></tr>
      </tbody>
    </table>
  `;
}

// Load note into editor
const loadNote = noteID => {
  //console.log("loadNotes ran! notes: " + notes + " noteID: " + noteID)
  let { content } = notes.find(note => note.id === noteID);
  quill.setContents(content);
  window.value = noteID;
};

function editNote(e) {
  quill.enable(e);

  console.log("inside editnote")
  if (e == false) {
    // loop through all and update the paticular object
    for (i = 0; i < notesList.length; i++) {
      if (notesList[i].id === window.value) {
        notesList[i].title = quill.getText(0, 10)
        notesList[i].content = quill.getContents()
        console.log(notesList[i].title, notesList[i].content)
        localStorage.setItem("note", JSON.stringify(notesList));
        console.log('saveNotes ran')
        // Reloads page
        window.location.href = window.location.href
        break; //skip further iterations at match
      };
    }
  }
}
