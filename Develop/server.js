const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    fs.readFile('db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});




app.post('/api/notes', (req, res) => { 
    fs.readFile('db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNote = req.body;
        newNote.id = Date.now();
        notes.push(newNote);

        fs.writeFile('db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
            console.log(err);
            res.json(newNote);
        });
    });
});








app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


