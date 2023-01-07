//bring in necessary dependencies
const express = require('express');
const path = require('path');
const notesData= require('./db/db.json');
const uuid= require('./public/assets/js/uuid')
const fs = require('fs')
// create app as an instance of express
const app = express();
// notesjson reads the db.json file
const notesjson = fs.readFileSync("./db/db.json", "utf-8")
// convert notesjson to a javascript array
const notes = Array.from(JSON.parse(notesjson))
// declares the port to be used
const PORT = 3001;


app.use(express.static('public'));

// homepage route
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'public/index.html'))}
);

// notes route
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))}
);

// route to retrieve saved notes
app.get('/api/notes', (req,res) => res.json(notesData))


app.listen(PORT, () => console.log(`App listening on port ${PORT}`));


// todo: post request handler. send data to db.json with fs?
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request was recieved`);
    const currentNewNote = {
        ...req.body,
        id: uuid(),
    }
    console.log(currentNewNote)
    res.json("done")
})



// todo: delete request handler. grab note title, check id, remove from db.json (with fs?)

// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page
// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column