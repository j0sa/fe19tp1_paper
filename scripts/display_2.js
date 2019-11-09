// Get localstorage values .map creates a new array.
let notesList = JSON.parse(localStorage.getItem("note")).map(noteTemplate).join();

/*
const isFavourite = () => {
  return false
}
*/

// Push data into our html in order to display in dom
document.getElementById("scroll-notes").innerHTML = notes.map(noteTemplate).join('');

//console.log(notesList);
// The code that generates a html table from the localstorage data
function noteTemplate(myNotes) {
  notes.push(myNotes);
  return `
  <table onclick='loadNote(${myNotes.id})'>
    <tbody>
      <td>${myNotes.text}</td>
    </tbody>
  </table>
  `;
}
// Load note into editor
const loadNote = (noteID) => {

  let { note } = notes.find(note => note.id === noteID)
    quill.setContents(note)

}