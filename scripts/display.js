const list = document.querySelector('.Noteslist ul');

var notes = JSON.parse(localStorage.getItem('note'));
console.log(notes);

for (i = 0; i < notes.length; i++) {
    var a = (notes[i].note.ops[0].insert)
    

    //create elements
    const item = document.createElement('span');
    const li = document.createElement('li');

    //add content to the page
    item.textContent = a;

    // append to DOM
    li.appendChild(item);
    list.appendChild(li);
}


//if a == "" { alert("Det finns inga anteckningar sparade!") }
