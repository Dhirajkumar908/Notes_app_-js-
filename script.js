const noteContainer = document.querySelector(".main");
const noteTitle = document.querySelector(".note-tile");
const notesDesc = document.querySelector(".note-description");
const createAt = document.querySelector(".createAt");
const deleteBtn = document.querySelector(".delete");

const notes = JSON.parse(localStorage.getItem("notes")) || [];

function formateDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function saveNote() {
  console.log(notes);
  
  localStorage.setItem("notes", JSON.stringify(notes));
}

function AddNotes() {
  const note = {
    id: Date.now(),
    title: "Untitled Note...",
    content: "",
    date: new Date().toISOString(),
  };
  notes.unshift(note);
  saveNote();
  RenderNotes();
  document.querySelector(`#note-${note.id} .note-tile`).focus()
}

function RenderNotes() {
  if (notes.length === 0) {
    console.log("no notes");
    noteContainer.innerHTML = `
         <div>
            <h3>No Notes yet </h3>
            <p>Click the "new notes" button to create you first note!</p>
        </div>
        `;
    return;
  }
  noteContainer.innerHTML=""

  notes.forEach((note,inx) => {
    console.log(inx,note.id);
    
    const item=document.createElement("div")
    item.id=`note-${note.id}`
    item.innerHTML= `
     <div class="card" id="${note.id}">
            <div class="notes">
                <input class="note-tile" type="text" value="${note.title}" onchange="updateNote(${note.id}, this.value, this.nextElementSibling.value)">
                <textarea class="note-description" name="" id="" onchange="updateNote(${note.id}, this.previousElementSibling.value, this.value)"></textarea>
                <hr>
                <div class="note-footer">
                    <p>Last edited <span class="createAt">${formateDate( note.date)}</span></p>
                    <button class="delete" onclick={deleteNote(${inx})}>Delete</button>
                </div>
            </div>
         </div>
    `;
    noteContainer.appendChild(item);
  });
  
}

function updateNote(id, title, description){
   const note= notes.find((note)=>note.id===id)
   console.log(note);
   if(note){
    note.title=title;
    note.content=description;
    note.date=new Date().toISOString();
    saveNote()
    console.log(note);
   }
}


function deleteNote(id){
    console.log(notes[id]);
    notes.pop(notes[id])
    saveNote();
    RenderNotes();
}

RenderNotes();
