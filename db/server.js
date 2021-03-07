// Dependencies//
const express = require('express');
const path = require('path')
const fs = require('fs');


// Server Constants//
const app = express();
const port = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, () => {
    console.log(`App listening on PORT: ${port}`);
  });


//Routing 
app.get('/notes', (req,res) =>{res.sendFile(path.join(__dirname, '../public/notes.html'));});
app.get('/api/notes',(req,res)=>{fs.readFile('/db.json', (err,dat) => {res.send(dat)});});
app.get('*',(req,res)=>{res.sendFile(path.join(__dirname, '../public/index.html'));});

app.post('/api/notes', (req,res) => {
    const newNote = req.body;
    fs.readFile('/db.json', (err,dat)=>{
        const noteStore = JSON.parse(dat);
        noteStore.push(newNote);
    });
});

