const express = require('express')
const app = express()

app.use(express.json())
const courses = [
    {id: 1, name: 'java'},
    {id: 2, name: 'python'},
    {id: 3, name: 'node'},
    {id: 4, name: 'express'},
]
app.get('/', (req,res)=>{
    res.send("hello")
})

app.get('/api/courses', (rerq,res) =>{
    res.send(courses)
})

app.get('/api/courses/:year/:month', (req,res) =>{
    res.send(req.params)
})

app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course with the given ID was not found')
    res.send(course)
})

app.post('/api/courses',(req,res)=>{
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    }
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id', (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course with the given ID was not found')
    course.name = req.body.name
    res.send(course)    
})

app.delete('/api/courses/:id', (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    console.log("test1",course)
    if(!course) res.status(404).send('The course with the given ID was not found')
    const index = courses.indexOf(course)
    console.log("index testing",index)
    courses.splice(index, 1)
    console.log(courses)
    res.send(courses)
})


const port = process.env.PORT || 3000
app.listen(port, () =>
    console.log(`Server running on ${port}`))