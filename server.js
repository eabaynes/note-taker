//bring in necessary dependencies
const express = require('express');
const path = require('path');
const notesData= require('./db/db.json');
const uuid= require('./public/assets/js/uuid')
const fs = require('fs');
const { json } = require('express');
// create app as an instance of express
const app = express();
// notesjson reads the db.json file
let notesjson = fs.readFileSync("./db/db.json", "utf-8")
// convert notesjson to a javascript array
const notes = Array.from(JSON.parse(notesjson))


app.use(express.json());
app.use(express.static('public'));

// homepage route
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'public/index.html'))}
);

// notes route
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))}
);

// route to retrieve saved notescd
app.get('/api/notes', (req,res) => res.json(notesData))



// route to save a new note
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received`)
    // destructure the title and text from the request body
    const { title, text } = req.body
    // if both are present
    if (title && text) {
        const currentNewNote = {
            title,
            text,
            id: uuid()
        };
        // log the currentNewNote
        const response = {
            status: 'success',
            body: currentNewNote,
        };
        // push the currentNewNote to the notes array
        notes.push(currentNewNote);
        // convert the notes array to a string and write it to the db.json file
        notesjson = (JSON.stringify(notes));
        // write the notesjson to the db.json file
        fs.writeFileSync("./db/db.json", notesjson, "utf-8");
        // send the response
        res.status(201).json(response);
    } else {
        // if the title or text are not present, send an error
        res.status(500).json("error")
    }
});

app.listen(process.env.PORT || 5000)

console.log(`App listening on port ${PORT}`);
