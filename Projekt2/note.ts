export class Note{
    title:string 
    content:string
    createDate: string
    tags: string[]
    id: number
    constructor(x: Note)
    {
        this.title = x.title
        this.content = x.content
        this.createDate = x.createDate
        this.tags = x.tags
        this.id = x.id
    }
}