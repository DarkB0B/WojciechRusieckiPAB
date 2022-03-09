const express = require('express') 
const app = express()

 app.get('/:operation/:num1/:num2', function (req, res)
 { 
    
    var num1 = parseInt(req.params.num1)
    var num2 = parseInt(req.params.num2)
    
    if(req.params.operation == "dodaj" || req.params.operation == "add")
    {
    var output = num1 + num2
    res.send("wynik =" + output)   
    }
    else if(req.params.operation == "odejmij" || req.params.operation == "substract")
    {
    var output = num1 - num2
    res.send("wynik =" + output) 
    }
    else if(req.params.operation == "pomnoz" || req.params.operation == "times")
    {   
        var output = num1 * num2
        res.send("wynik =" + output)  
    }
    else if(req.params.operation == "podziel" || req.params.operation == "divide")
    {
        var output = num1 / num2
        res.send("wynik =" + output)    
    }
 }) 
 app.listen(3000)