import moment from 'moment'
import { getNotes, sortNotes} from './notes'
import { getFilters } from './filters'

const generateNoteDOM = (render) => {
    const divtag = document.createElement('a')
    const p1 = document.createElement('p')
    const status = document.createElement('p')

    if(render.title.length > 0){
        p1.textContent = render.title
    }else{
        p1.textContent = "Unnamed Note"
    }

    p1.classList.add('list-item__title')
    divtag.appendChild(p1)
    
    divtag.setAttribute('href',`/edit.html#${render.id}`)
    divtag.classList.add('list-item')

    status.textContent = generatedLastEdited(render.updatedAt)
    status.classList.add('list-item__subtitle')
    divtag.appendChild(status)

    return divtag
}


const renderNotes = () => {

    const filters = getFilters()

    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((notes) => notes.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    document.querySelector('#notes').innerHTML = ''

    if(filteredNotes.length > 0){
        filteredNotes.forEach(function(render){
            const p1 = generateNoteDOM(render)
            document.querySelector('#notes').appendChild(p1)
        })
    }else{
        const para = document.createElement('p')
        para.textContent = 'No notes to Show'
        para.classList.add('empty-message')
        document.querySelector('#notes').appendChild(para)
    }

}


const generatedLastEdited = function(timeStamp){
    return `Last edited ${moment(timeStamp).fromNow()}`   
}

const initializedEditPage = (noteId) =>{
    const titleElement = document.querySelector('#note-title')
    const titleBody = document.querySelector('#note-body')
    const dateElement = document.querySelector('#last-edited')
    const notes = getNotes()
    const note = notes.find((note) => noteId === note.id)
    
    if(!note){
        location.assign('/index.html')
    }
    
    titleElement.value = note.title
    titleBody.value = note.body
    dateElement.textContent = generatedLastEdited(note.updatedAt)
    
}

export { generateNoteDOM, renderNotes, generatedLastEdited,initializedEditPage}