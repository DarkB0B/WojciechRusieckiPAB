import { notStrictEqual } from 'assert'
import { Console } from 'console'
import express from 'express'
import { Request, Response } from 'express'
import { normalize } from 'path'
import { Note } from './note'




//let note = notes.find( note => note.id == 10)
const app = express()
app.use(express.json())
let notes: Note[] = []
const date = new Date()
const testNote: Note = new Note
  ({
    title: 'TestTitle',
    content: 'TestContent',
    createDate: date.toISOString(),
    tags: [],
    id: 2
  })
notes.push(testNote)



app.get('/note/all',function (req: Request, res: Response) //get all notes
{
  try{
  const allnotes: Note[] = []
   notes.forEach(function(Note){
  allnotes.push(Note)
  })
  res.status(200).send(allnotes)

}catch{
  res.status(400).send("Wymagane pola notatki są puste")
}

})
app.get('/note/test', function (req: Request, res: Response) { //get test note

  var x = notes.find(function (note: Note) {
    if (note.title == 'TestTitle'){
      console.log("test note was found")
      return true
    }
      else {
        console.log("test note wan't found")
      return false
    }
  })
  res.send(x)
})

app.get('/note/:id', function (req: Request, res: Response) { //get note by id
  var thisNoteId: number = +req.params.id
  const note = notes.find(note => note.id == thisNoteId)
  note ?? res.send(404)
  res.status(200).send(note)
})
app.post('/note', function (req: Request, res: Response) { //add new note
  if (req.body.title && req.body.content) {

    const date = new Date()
    const thisnote: Note = new Note
      ({
        title: req.body.title,
        content: req.body.content,
        createDate: date.toISOString(),
        tags: [],  //temp
        id: Date.now()
      })
    notes.push(thisnote)
    res.status(200).send(thisnote)
  }
  else {
    res.status(400).send("Wymagane pola notatki są puste")
  }

})
app.put('/note/:id', function (req: Request, res: Response)//change title of note
{
  var thisNoteId: number = +req.params.id
  let note = notes.find(note => note.id == thisNoteId)
  if(!note)
  return res.status(404)
  note.title = req.body.newtitle
  // note ?? res.send(404)
  res.status(200).send(note)
})
app.delete('/note/:id', function (req: Request, res: Response) // delete note
{
  var thisNoteId: number = +req.params.id
  let note = notes.find(note => note.id == thisNoteId)
  if(!note)
  return res.status(404)
  try 
  {
    const index = notes.map(object => object.id).indexOf(note.id)
    notes.splice(index,1)
    res.status(200).send('notatka została usunięta')
  }
  catch 
  {
  console.log("nie udało się znaleźć indexu notatki")
  note ?? res.status(400).send('Notatka nie istnieje')
  }
  
  
  
  
})

app.listen(3000)