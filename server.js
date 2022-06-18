const express = require('express');
const store = require('./db/db.json');
const path = require('path');
const uuidv4 = require('./helpers/uuid');

const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('./helpers/fsUtils');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/notes',(req, res) => {
  res.sendFile(path.join(__dirname,'./public/notes.html'));
});

app.get('/api/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => 
    res.json(JSON.parse(data))
  )
);
// --------------------DELETE Route for a specific tip
app.delete('/api/notes/:id', (req, res) => {

  const Id = req.params.id;
  console.log(Id);
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((app) => app.id !== Id);
      writeToFile('./db/db.json', result);
      res.json(`Item ${Id} has been deleted 🗑️`);
    });
});
//---------------------------------------------
app.post('/api/notes', (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;
  if (req.body) {
    const newText = {
      title, 
      text,
      id: uuidv4()
    };
    console.log(newText);
    readAndAppend(newText, './db/db.json');
    res.json(`Text added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});
//---------------------------------------------
app.get('*',(req, res) => {
  res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
