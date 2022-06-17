const notes = require('express').Router();
const express = require('express');

// GET Route for retrieving all the tips
notes.use(express.static('./public'));

notes.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname,'/public/notes.html'))
);
// POST Route for a new UX/UI tip
notes.post('/notes', (req, res) => {
  console.log(req.body);

  const { noteTitle, noteText } = req.body;

  if (req.body) {
    const newText = {
      noteTitle, 
      noteText,
      tip_id: uuidv4(),
    };

    readAndAppend(newText, './db/db.json');
    res.json(`Text added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;
 