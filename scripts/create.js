let quill = new Quill('#editor', {
  theme: 'snow'
});

function saveNote() {
  console.log(quill.root.innerHTML);
}