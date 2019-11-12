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
  console.log(myNotes);
  return `
 

  <table onclick='loadNote(${myNotes.id})'>
   <tbody>
      <td>${myNotes.title}<td>
      <td>${myNotes.text}</td>
    </tbody>
  </table>
  `;
}
// Load note into editor
const loadNote = (noteID) => {
  console.log("loadNotes ran! notes: " + notes + " noteID: " + noteID)
  let { content } = notes.find(note => note.id === noteID)
  console.log(text)
  quill.setContents(content)

}