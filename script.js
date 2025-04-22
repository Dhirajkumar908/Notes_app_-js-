const noteContainer=document.querySelector('.main')
const noteTitle=document.querySelector('.note-tile')
const notesDesc=document.querySelector('.note-description')
const createAt=document.querySelector('.createAt')
const deleteBtn=document.querySelector('.delete')

const notes=JSON.parse(localStorage.getItem("notes")) || [];

function formateDate(date){
    return new Date(date).toLocaleDateString("en-US", {
        month:"short",
        day:"numeric",
        hour:"2-digit",
        minute:"2-digit"
    })
}

const date=Date.now()
console.log(formateDate(date));

function AddNotes(){
    const note={
        id:Date.now(),
        title:"Untitle Note",
        content:"",
        date:new Date().toISOString()
    };
    notes.unshift(note)
}
