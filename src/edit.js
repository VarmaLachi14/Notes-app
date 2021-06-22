import { initializedEditPage,generatedLastEdited } from "./views"
import { updateNote,removeNote } from "./notes"

const titleElement = document.querySelector('#note-title')
const titleBody = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')
const noteId = location.hash.substring(1)

initializedEditPage(noteId)

titleElement.addEventListener('input',(e) => {
    const note = updateNote(noteId,{
        title : e.target.value
    })
    dateElement.textContent = generatedLastEdited(note.updatedAt)
})

titleBody.addEventListener('input',(e) => {
    const note = updateNote(noteId,{
        body : e.target.value
    })
    dateElement.textContent = generatedLastEdited(note.updatedAt)
})

removeElement.addEventListener('click',(e) => {
    removeNote(noteId)
    location.assign('/index.html')
})

window.addEventListener('storage',function(e){
    if(e.key === 'notes'){
        initializedEditPage(noteId)
    }
})