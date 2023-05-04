//Require necessary modules
    const express = require('express');
    const path = require('path');
    const fs = require('fs');

//Set up the default port or use the port from the environment variable
    const PORT = process.env.PORT || 3001;

//Initialize the Express application
    const app = express();

//Middleware setup
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static('public'));

//Routes

//Home page route
    app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
    );

//Notes page route
    app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
    );

//API Routes

//GET route for fetching notes
    app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to read notes from the file.' });
      } else {
        res.json(JSON.parse(data));
      }
    });
    });

//POST route for saving new notes
    app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to read notes from the file.' });
      } else {
        const notes = JSON.parse(data);
        const newNote = req.body;
        newNote.id = Date.now(); // Assign a unique ID to the new note
        notes.push(newNote);
  
        fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to save the new note.' });
          } else {
            res.json(newNote);
          }
        });
      }
    });
    });

//Start the server
    app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
    );
