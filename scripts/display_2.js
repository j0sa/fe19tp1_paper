let notesList = JSON.parse(localStorage.getItem("note"));
if (notesList != null) { document.getElementById("scroll-notes").innerHTML = notesList.map(noteTemplate).join("") }
else { console.log('No notes!'); }

document.querySelector("#scroll-notes").addEventListener('click', function (e) {
  let iD = e.target.closest('table').id;
  if (e.target.classList.contains("fav")) {
    let currentNote = notes.find(note => note.id === Number(iD))
    currentNote.favorite = !currentNote.favorite;
    localStorage.setItem("note", JSON.stringify(notes))
    e.target.innerText = !currentNote.favorite ? "☆" : "★";
  }
});
function noteTemplate(myNote) {
  notes.push(myNote);
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
  let { content } = notes.find(note => note.id === Number(noteID));
  quill.setContents(content);
  window.value = noteID
  document.querySelector('.btn--create').style.display = "none";
  document.querySelector('#new').style.display = "block";
  document.querySelector('#save').style.display = "block";
  document.querySelector('#print').style.display = "block";
  document.querySelector('#delete').style.display = "block";
  toggleModal();
};
/*  New note clear editor */
document.querySelector("#new").addEventListener('click', function () {
  quill.setContents([])
  document.querySelector('.btn--create').style.display = "block";
  document.querySelector('#new').style.display = "none";
  document.querySelector('#save').style.display = "none";
  document.querySelector('#delete').style.display = "none";
  document.querySelector('#print').style.display = "none";
});

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

function deleteNote() {
  // id på vald note ligger i value (?)
  if (confirm('Are you sure you want to delete this note?')) {
    if (value) {
      notes = notes.filter(note => note.id !== value);
      document.getElementById(value).remove();
      saveNotes();
      location.reload();
      document.querySelector('.btn--create').style.display = "block";
      document.querySelector('#new').style.display = "none";
      document.querySelector('#save').style.display = "none";
      document.querySelector('#delete').style.display = "none";
      document.querySelector('#print').style.display = "none";
    } else {
      // do nothing
    }




  }
}
const showFav = document.getElementById('show-fav');
function addFav() {
  localStorage.setItem("note", JSON.stringify(notes))
};

showFav.addEventListener('click', addFav);
const handleToggle = (element) => element.classList.toggle("hidden");
hideNote = document.querySelectorAll('.note-cell')
showFav.addEventListener('click', function () {
  hideNote.forEach(note => {
    let noteID = note.parentElement.id;
    let currentNote = notes.find(note => note.id === Number(noteID))
    if (!currentNote.favorite) {
      handleToggle(note);
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
  if (e.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

// Settings Modal View