import jwt from 'jsonwebtoken'
export class User
{
    token :string
    id:number =  Date.now()
    constructor(token: string)
    {
        this.token = token
    }

    static tokengenerator(login:string, haslo:string):string
    {
        const token = jwt.sign(login + haslo,'secret')
        return token
    }
}