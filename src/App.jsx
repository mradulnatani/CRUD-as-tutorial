import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
const App=()=>{
  const [notes, setNotes] = useState([])
    const[newNote,setNewnote] = useState()
  const[showAll,setShowAll] = useState(true)

  useEffect(() => {    console.log('effect')
     axios.get('http://localhost:3001/notes').then(response => {console.log('promise fulfilled')      
        setNotes(response.data)})}, [])  
        console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }
    axios.post('http://localhost:3001/notes',noteObject).then(response => {setNotes(notes.concat(response.data))      
    setNewnote('')})
  }

  const handleNoteChange=(event)=>{
    console.log(event.target.value)
    setNewnote(event.target.value)
  }

  return(
    <>
    <h1>Notes</h1>
    <div><button onClick={() => setShowAll(!showAll)}>show 
      {showAll ? 'important' : 'all' } </button></div>
    <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>Submit</button>
      </form>
    </>
  )

}

export default App 