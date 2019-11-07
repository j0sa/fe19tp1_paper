

// Get localstorage values
let notesList = JSON.parse(localStorage.getItem("note")).map(noteTemplate).join("");

// Push data into our html in order to display in dom
document.getElementById("scroll-notes").innerHTML = notes.map(noteTemplate).join("");

//console.log(notesList);
// The code that generates a hmtl table from the localstorage data
function noteTemplate(noted) {
  notes.push(noted);
  return `
  <table>
<tbody>
  <td>${noted.note.ops[0].insert}</td>
</tbody>
</table>


  `;
}
