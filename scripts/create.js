let array = [];

let quill = new Quill('#editor', {
  theme: 'snow'
});

function saveNote() {
  console.log(quill.root.innerHTML);
  array.push(quill.root.innerHTML);
}

function displayNote() {
  array.forEach(element => {
    document.getElementById('noteList').innerHTML = element;
  });
}