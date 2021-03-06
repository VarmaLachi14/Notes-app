import { createNotes } from "./notes";
import { setFilters } from "./filters";
import {renderNotes} from './views'


renderNotes()

document.querySelector('#create-note').addEventListener('click',function(e){
    const id = createNotes()
    location.assign(`/edit.html#${id}`)
})


document.querySelector('#search').addEventListener('input',function(e){
    setFilters({
        searchText : e.target.value
    })
    renderNotes()
})

document.querySelector('#dropdown').addEventListener('change',function(e){
    setFilters({
        sortBy : e.target.value
    })
    renderNotes()
})


window.addEventListener('storage',function(e){
    if(e.key === 'notes'){
        renderNotes()
    }
})
