import uuidv4 from 'uuid/v4'
import moment from 'moment'

let notes = []

const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    
    if(notesJSON != null){
    return JSON.parse(notesJSON)
    }else{
        return []
    }
}

notes = loadNotes()

const getNotes = () => notes

const createNotes = () => {
    const id =  uuidv4()
    const timeStamp = moment().valueOf()
    notes.push({
        id : id,
        title : '',
        body : '',
        createdAt : timeStamp,
        updatedAt : timeStamp
    })
    saveNotes()

    return id
}



const saveNotes = () => {
    localStorage.setItem('notes',JSON.stringify(notes))
}

const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id )
    if(noteIndex > -1)
    {
        notes.splice(noteIndex,1)
    }
    saveNotes(notes)
}

const sortNotes = function(sortBy){
    if(sortBy === 'by-edited'){
        return notes.sort(function(a , b){
            if(a.updatedAt > b.updatedAt){
                return -1
            }else if(a.updatedAt < b.updatedAt){
                return 1
            }else{
                return 0
            }
        })
    }else if(sortBy === 'by-created'){
        return notes.sort(function(a,b){
            if(a.createdAt > b.createdAt){
                return -1
            }else if(a.createdAt < b.createdAt){
                return 1
            }else{
                return 0
            }
        })
    }else if(sortBy === 'by-alphabet'){
        return notes.sort(function(a,b){
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }else if(a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            }else{
                return 0
            }
        })
    }else{
        return notes
    }
}

const updateNote = (id,updates) => {
    const note = notes.find((note) => note.id === id)
    if(!note){
        return
    }
    
    if(typeof updates.title === 'string'){
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    }

    if(typeof updates.body === 'string'){
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }

    saveNotes()

    return note
}

export {getNotes,createNotes,removeNote ,sortNotes, updateNote}

