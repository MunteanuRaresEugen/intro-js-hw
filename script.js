let addBtn = document.getElementById('add-btn');
let addTitle = document.getElementById('note-title');
let addText = document.getElementById('note-text');

addBtn.addEventListener("click", (e) => {
    if (addTitle.value === "" || addText.value === ""){
        return alert("Try write sth on title and details");
    }
    let notes = localStorage.getItem("notes");
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addText.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTitle.value = "";
    addText.value = "";

    showNotes();
}) 

// Function to show notes 

const showNotes = () => {
    let notes = localStorage.getItem("notes");
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let html = "";
    notesObj.forEach(function(elements, index) {
        html += `
        <div id="note">
        <p class="note-counter">Note ${index + 1}</p>
        <h3 class="note-title">${elements.title}</h3>
        <p class="note-text">${elements.text}</p>
        <button id="${index}" onclick="deleteNote(this.id)" class="note-btn">Delete Note</button>
        <button id="${index}" onclick="editNote(this.id)" class="note-btn edit-btn">Edit Note</button>
        <p>Date of note ${index + 1}:${day}/${month}/${year}</p>
        </div> 
        `;
        //html += `<br>Date is ${day}/${month}/${year}`;
    });

    let noteElm = document.getElementById("notes");
    if (notesObj.length !== 0) {
        noteElm.innerHTML = html;
    } else {
        noteElm.innerHTML = "Not Notes Yet.Add a note using the form above"; 
    }
}

// Fumction to delete notes

const deleteNote = (index) => {
    let confirmDel = confirm("Are you sure you want to delete this note");
    
    if (confirmDel == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
}

// Function to edit notes 

const editNote = (index) => {
    let notes = localStorage.getItem("notes");
    if (addTitle.value !== "" || addText.value !== "") {
        return alert("Please clear the form before editing a notes");
    }
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    // console.log(notesObj);
    notesObj.findIndex((elements, index) => {
        addTitle.value = elements.title;
        addText.value = elements.text;
    })
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

showNotes();