import { notStrictEqual } from 'assert'
import { Console } from 'console'
import express from 'express'
import { Request, Response } from 'express'
import { normalize } from 'path'
import { Note } from './note'
import { Tag } from './tag'
import { User } from './user'



const app = express()
app.use(express.json())
let notes: Note[] = []
let tags: Tag[] = []
let users: User[] = []
const date = new Date()
const testTag: Tag = new Tag('test')
tags.push(testTag)

const testNote: Note = new Note
  ({
    title: 'TestTitle',
    content: 'TestContent',
    tags: tags,
    createDate: date.toISOString(),
    id: 2
  })
notes.push(testNote)



app.get('/notes', function (req: Request, res: Response) //get list all notes
{
  try {
    const allnotes: Note[] = []
    notes.forEach(function (Note) {
      allnotes.push(Note)
    })
    res.status(200).send(allnotes)

  } catch {
    res.status(400).send("Wymagane pola notatki są puste")
  }

})
app.get('/note/test', function (req: Request, res: Response) { //get test note

  var x = notes.find(function (note: Note) {
    if (note.title == 'TestTitle') {
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
        tags: tags,  //temp
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
  if (!note)
    return res.status(404)
  note.title = req.body.newtitle
  // note ?? res.send(404)
  res.status(200).send(note)
})
app.delete('/note/:id', function (req: Request, res: Response) // delete note
{
  var thisNoteId: number = +req.params.id
  let note = notes.find(note => note.id == thisNoteId)
  if (!note)
    return res.status(404)
  try {
    const index = notes.map(object => object.id).indexOf(note.id)
    notes.splice(index, 1)
    res.status(200).send('notatka została usunięta')
  }
  catch
  {
    console.log("nie udało się znaleźć indexu notatki")
    note ?? res.status(400).send('Notatka nie istnieje')
  }




})



//////////////////// TAGS //////////////////////////
app.get('/tags', function (req: Request, res: Response) //get list all tags
{
  try {
    const alltags: Tag[] = []
    tags.forEach(function (Tag) {
      alltags.push(Tag)
    })
    res.status(200).send(alltags)

  } catch {
    res.status(400).send("Wymagane pola notatki są puste")
  }

})
app.get('/tag/test', function (req: Request, res: Response) { //get test tag

  var x = tags.find(function (tag: Tag) {
    if (tag.name == 'TestName') {
      console.log("test tag was found")
      return true
    }
    else {
      console.log("test tag wasn't found")
      return false
    }
  })
  res.send(x)
})

app.get('/tag/:id', function (req: Request, res: Response) { //get tag by id
  var thisTagId: number = +req.params.id
  const tag = tags.find(tag => tag.id == thisTagId)
  tag ?? res.send(404)
  res.status(200).send(tag)
})
app.post('/tag', function (req: Request, res: Response) { //add new tag
  if (req.body.name) {

    const date = new Date()
    const thistag: Tag = new Tag(req.body.name)
    tags.push(thistag)
    res.status(200).send(thistag)
  }
  else {
    res.status(400).send("Wymagane pola tagu są puste")
  }

})
app.put('/tag/:id', function (req: Request, res: Response)//change name of tag
{
  var thisTagId: number = +req.params.id
  let tag = tags.find(tag => tag.id == thisTagId)
  if (!tag)
    return res.status(404)
  tag.name = req.body.newname
  // note ?? res.send(404)
  res.status(200).send(tag)
})
app.delete('/tag/:id', function (req: Request, res: Response) // delete tag
{
  var thisTagId: number = +req.params.id
  let tag = tags.find(tag => tag.id == thisTagId)
  if (!tag)
    return res.status(404)
  try {
    const index = tags.map(object => object.id).indexOf(tag.id)
    notes.splice(index, 1)
    res.status(200).send('tag został usunięty')
  }
  catch
  {
    console.log("nie udało się znaleźć indexu tagu")
    tag ?? res.status(400).send('Tag nie istnieje')
  }
})
///////////////// USER //////////////
app.post('/login', function(req: Request, res: Response){
  
})
app.listen(3000)
