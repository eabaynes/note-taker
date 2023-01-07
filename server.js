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
// declares the port to be used
const PORT = 3001;

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



// todo: post request handler. send data to db.json with fs?
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received`)

    const { title, text } = req.body

    if (title && text) {
        const currentNewNote = {
            title,
            text,
            id: uuid()
        };

        const response = {
            status: 'success',
            body: currentNewNote,
        };

        notes.push(currentNewNote);

        notesjson = (JSON.stringify(notes));
        
        fs.writeFileSync("./db/db.json", notesjson, "utf-8");
        
        res.status(201).json(response);
    } else {
        res.status(500).json("error")
    }
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));


// todo: delete request handler. grab note title, check id, remove from db.json (with fs?)
