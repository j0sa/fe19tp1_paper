// Get localstorage values
let notesList = JSON.parse(localStorage.getItem("note")).map(noteTemplate).join("");

/*
const isFavourite = () => {
  return false
}
*/

// Load note into editor
const loadNote = (noteID) => {
  if (!noteID) {
    console.log("No ID given.")
  } else {
    let { note } = notes.find(note => note.id === noteID)
    quill.setContents(note)
  }
}

// Push data into our html in order to display in dom
document.getElementById("scroll-notes").innerHTML = notes.map(noteTemplate).join("");

//console.log(notesList);
// The code that generates a hmtl table from the localstorage data
function noteTemplate(noted) {
  notes.push(noted);
  return `
  <table onclick='loadNote(${noted.id})'>
    <tbody>
      <td>${noted.note.ops[0].insert}</td>
    </tbody>
  </table>
  `;
}