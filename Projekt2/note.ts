import { Tag } from './tag'
export class Note{
    title:string 
    content:string
    createDate: string
    tags: Tag[]
    id: number
    constructor(x: Note,tags: Tag[])
    {
        this.title = x.title
        this.content = x.content
        this.createDate = x.createDate
        this.tags = tags
        this.id = x.id
    }
}