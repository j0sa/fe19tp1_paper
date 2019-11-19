// Get localstorage data, after checking that localstorage isn't empty
// Push data into template in order to display in dom
const showFav = document.getElementById('show-fav');
let notesList = JSON.parse(localStorage.getItem("note"));
if (notesList != null) { document.getElementById("scroll-notes").innerHTML = notesList.map(noteTemplate).join("") }
else { console.log('noteslist är tom'); }

//The code that generates a html table from the localstorage data
console.log(notesList);
document.querySelector("#scroll-notes").addEventListener('click', function (e) {
  // event.target
  let n = e.target.closest('table').id;
  console.log(n)
  if (e.target.classList.contains("fav")) {
    let currentNote = notes.find(note => note.id === Number(n))
    console.table(currentNote)
    currentNote.favourite = !currentNote.favourite;
    localStorage.setItem("note", JSON.stringify(notes))
    e.target.innerText = !currentNote.favourite ? "☆" : "★";
  } else {
    // loadNote(n);
  }
});

function noteTemplate(myNote) {
  notes.push(myNote);
  console.log(myNote.id, myNote.favourite);
  // let noteString = myNote.content.ops[0].insert;
  // console.log(noteString);
  let favChar = !myNote.favourite ? "☆" : "★";
  return `
    <table id="${myNote.id}" class="my-notes" cellspacing="0" cellpadding="0"   onclick='loadNote(${myNote.id})'>
      <tbody class="note-cell"> 
        <tr><th class = "title">${myNote.title}</th><th class = "date">${myNote.created}</th></tr>
        <tr><td colspan="2">${myNote.content.ops[0].insert.slice(0, 30)}\n${myNote.content.ops[0].insert.slice(30, 60)}</tr>
        <td class = "fav"colspan="2">${favChar}</td></tr>
      </tbody>
    </table>
  `;
}

// Load note into editor
const loadNote = noteID => {
  console.log("loadNotes ran! notes: " + notes + " noteID: " + noteID)
  let { content } = notes.find(note => note.id === Number(noteID));
  quill.setContents(content);
  window.value = noteID
  document.querySelector('.btn--create').style.visibility = 'hidden';
  document.querySelector('#new').style.visibility = 'visible';
  document.querySelector('#save').style.visibility = 'visible';
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

function addFav() {
  let setFav = notes.find(note => note.id === noteID)
  // item is not favorite
  if (setFav.favourite != true) {
    setFav.favourite = true;
    console.log(" noteID: " + noteID + 'Is not a fav: ' + setFav.favourite)
    // item is already favorite
  }
  localStorage.setItem("note", JSON.stringify(notes))
  // window.location.href = window.location.href;
};

showFav.addEventListener('click', addFav);
const handleToggle = (element) => element.classList.toggle("hidden");
let f = notes.filter(note => note.favourite)
hideNote = document.querySelectorAll('.note-cell')
showFav.addEventListener('click', function () {
  hideNote.forEach(note => {
    let noteID = note.parentElement.id;
    let currentNote = notes.find(note => note.id === Number(noteID))
    if (!currentNote.favourite) {
      handleToggle(note);
      // console.log(f)
    } else {

    }
  })
});
