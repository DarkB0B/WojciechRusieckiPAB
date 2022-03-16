import express from 'express'
import {Request, Response} from 'express'
import {Note} from './note'

let notes: Note[] = []
//let note = notes.find( note => note.id == 10)
const app = express()

app.use(express.json())

app.get('/:id', function (req: Request, res: Response) {
  const note = {title: 'asd'}
  res.send(note)
})
app.post('/', function (req: Request, res: Response) {
 // console.log(req.body) // e.x. req.body.title 
 let lastnote: Note = notes.slice(-1)[0]
 let x: number = lastnote.id + 1
 let thisnote: Note = new Note({title : req.body.title, content : req.body.content, createDate : req.body.createDate, tags : req.body.tags,id : x})
  res.status(200).send('asd')
})

app.listen(3000)