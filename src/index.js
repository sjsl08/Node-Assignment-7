const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

//? import the studentArray
let studentArray = require('./InitialData');
const e = require('express');
// console.log(studentArray);

let id = studentArray.length

app.get('/api/student/:id', async (req, res) => {

    const { id } = req.params

    // console.log(id);
    let idx = -1

    for (let i = 0; i < studentArray.length; i++) {
        if (Number(id) === studentArray[i].id) {
            idx = i
            break
        }
    }
    if (idx != -1) {
        res.status(200).json(studentArray[idx])
    } else {
        res.status(404).end('Invalid ID')
    }

})


app.get('/api/student', async (req, res) => {

    res.status(200).json(studentArray)

})


app.post('/api/student', (req, res) => {

    const { name, currentClass, division } = req.body

    if (name && currentClass && division) {
        id++
        studentArray.push({
            id: id,
            name: name,
            currentClass: currentClass,
            division: division
        })
        res.json({ 'id': id }
        )
    } else {
        res.status(400).end('Incomplete Data')
    }
    console.log(studentArray);

})


app.put('/api/student/:id', (req, res) => {

    const { id } = req.params

    let idx = -1

    if (Number(id) > 0) {

        for (let i = 0; i < studentArray.length; i++) {
            if (Number(id) === studentArray[i].id) {
                idx = i
                break
            }
        }
    }

    if (idx != -1) {

        const { name, currentClass, division } = req.body
        let student = studentArray[idx]

        if (name) {
            student.name = name
        }
        if (currentClass) {
            student.currentClass = currentClass
        }
        if (division) {
            student.division = division
        }

        res.status(200).json(student)
        //    console.log(student);
        console.log(studentArray);
    }
    else {
        res.status(400).end('Invalid Update')
    }
})


app.delete('/api/student/:id', (req, res) => {

    const { id } = req.params
    // console.log(id);

    let idx = -1

    if (Number(id) > 0) {

        for (let i = 0; i < studentArray.length; i++) {
            if (Number(id) === studentArray[i].id) {
                idx = i
                break
            }
        }
    }

    if (idx != -1) {
        res.status(200).json(studentArray.splice(idx, 1))
    } else {
        res.status(400).end('Invalid Id')
    }


    console.log(studentArray);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   