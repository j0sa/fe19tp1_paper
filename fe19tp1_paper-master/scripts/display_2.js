// Get localstorage data, after checking that localstorage isn't empty
// Push data into template in order to display in dom
const showFav = document.getElementById('show-fav');
let notesList = JSON.parse(localStorage.getItem("note"));
if (notesList != null) { document.getElementById("scroll-notes").innerHTML = notesList.map(noteTemplate).join("") }
else { console.log('noteslist är tom'); }

//The code that generates a html table from the localstorage data
document.querySelector("#scroll-notes").addEventListener('click', function (e) {
  // event.target
  let iD = e.target.closest('table').id;
  console.log(iD)
  if (e.target.classList.contains("fav")) {
    let currentNote = notes.find(note => note.id === Number(iD))
    // console.table(currentNote)
    currentNote.favorite = !currentNote.favorite;
    localStorage.setItem("note", JSON.stringify(notes))
    e.target.innerText = !currentNote.favorite ? "☆" : "★";
  } else {
    // loadNote(n);
  }
});

function noteTemplate(myNote) {
  notes.push(myNote);
  console.log(myNote.id, myNote.favorite);
  // let noteString = myNote.content.ops[0].insert;
  // console.log(noteString);
  let favChar = !myNote.favorite ? "☆" : "★";
  return `
    <table id="${myNote.id}" class="my-notes" cellspacing="0" cellpadding="0"   onclick='loadNote(${myNote.id})'>
      <tbody class="note-cell"> 
        <tr><th class = "title">${myNote.title}</th><td colspan = "6" class = "date">${myNote.created}</td></tr>
        <td colspan = "6">${myNote.content.ops[0].insert.slice(0, 30)}\n${myNote.content.ops[0].insert.slice(30, 60)}</td>
        <td class ="fav">${favChar}</td>
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
  toggleModal()
};

document.querySelector("#new").addEventListener('click', function (e) {
  quill.setContents([])
  document.querySelector('.btn--create').style.visibility = 'visible';
  document.querySelector('#new').style.visibility = 'hidden';
  document.querySelector('#save').style.visibility = 'hidden';
})

function editNote(e) {
  quill.enable(e);
  console.log("inside editnote")
  if (e == false) {
    // loop through all and update the particular object
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
  localStorage.setItem("note", JSON.stringify(notes))
};

showFav.addEventListener('click', addFav);
const handleToggle = (element) => element.classList.toggle("hidden");
let f = notes.filter(note => note.favorite)
hideNote = document.querySelectorAll('.note-cell')
showFav.addEventListener('click', function () {
  hideNote.forEach(note => {
    let noteID = note.parentElement.id;
    let currentNote = notes.find(note => note.id === Number(noteID))
    if (!currentNote.favorite) {
      handleToggle(note);
      // console.log(f)
    } else {

    }
  })
});

// Quill Modal View
let modal = document.querySelector(".modal");
let trigger = document.querySelector(".trigger");
let closeButton = document.querySelector('#close-button');

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(e) {
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

// Settings Modal View