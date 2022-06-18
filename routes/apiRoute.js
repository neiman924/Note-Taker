const { v4: uuidv4 } = require('../helpers/uuid');
const notes = require('express').Router();
const store = require('../db/db.json');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// --------------------DELETE Route for a specific tip
notes.delete('/:id', (req, res) => {
  const Id = req.params.id;
  readFromFile(store)
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((app) => app.id !== Id);

      // Save that array to the filesystem
      writeToFile(store, result);

      // Respond to the DELETE request
      res.json(`Item ${Id} has been deleted 🗑️`);
    });
});
//---------------------------------------------
notes.post('/notes', (req, res) => {
  //console.log(req.body);

  const { noteTitle, noteText } = req.body;

  if (req.body) {
    const newText = {
      noteTitle, 
      noteText
      //id: uuidv4,
    };
    console.log(newText);
    readAndAppend(newText, store);
    res.json(`Text added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});
//---------------------------------------------

module.exports = notes;
 