import { notStrictEqual } from 'assert'
import { Console } from 'console'
import express from 'express'
import { Request, Response } from 'express'
import { normalize } from 'path'
import { Note } from './note'



let notes: Note[] = []
//let note = notes.find( note => note.id == 10)
const app = express()
const date = new Date()
const testNote: Note = new Note
   ({
    title : 'TestTitle',
    content : 'TestContent',
    createDate : date.toISOString(),
    tags : [],
    id : 2
  })

app.use(express.json())

app.get('/',function (req: Request, res: Response)
{
  try{
  const allnotes: Note[] = []
   notes.forEach(function(Note){
  allnotes.push(Note)
  })
  res.status(200).send(allnotes)
  
}catch(e){
res. status(500).send(e.message)
}

})

app.get('/note/:id', function (req: Request, res: Response) { //get note by id
  var thisNoteId: number = +req.params.id
  const note = notes.find(note => note.id === thisNoteId)
  note ?? res.send(404)
  res.status(200).send(note)
})
app.post('/note', function (req: Request, res: Response) { //dodanie nowej notatki
 if (req.body.title && req.body.content)
 {
  
  const date = new Date()
  const thisnote: Note = new Note
   ({
    title : req.body.title,
    content : req.body.content,
    createDate : date.toISOString(),
    tags : req.body.tags,
    id : Date.now()
  })
  notes.push(thisnote)
  res.status(200).send(thisnote)
}
else
{
  res.status(400).send("Wymagane pola notatki są puste")
}
  
})
app.put('/note/:id', function (req: Request, res: Response)
{
  var thisNoteId: number = +req.params.id
  let note = notes.find(note => note.id == thisNoteId)
  note.title = 'ChangedTitle'
  note ?? res.status(404)
  res.status(204)
})
// app.delete('/note/:id', function (req: Request, res: Response)
// {
//   var thisNoteId: number = +req.params.id
//   let note = notes.find(note => note.id == thisNoteId)
//   const index = notes.findIndex(object => {return object.id === note.id})
//   notes.splice(index,1)
//   note ?? res.status(400).send('Notatka nie istnieje')
//   res.status(204)
// })

app.listen(3000)