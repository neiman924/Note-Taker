const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('./helpers/fsUtils');

const PORT = process.env.port || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.get('/notes', (req, res) =>
  (res.sendFile(path.join(__dirname,'/public/notes.html')))
);


app.get('/api/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => 
    res.json(JSON.parse(data))
  )
);


// app.get('/:title', (req, res) => {
//   const tipId = req.params.title;
//   readFromFile('./db/db.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       const result = json.filter((app) => app.title === tipId);
//       return result.length > 0
//         ? res.json(result)
//         : res.json('No tip with that ID');
//     });
// });

app.post('/notes', (req, res) => {
  //console.log(req.body);

  const { noteTitle, noteText } = req.body;

  if (req.body) {
    const newText = {
      noteTitle, 
      noteText
    };
    console.log(newText);
    readAndAppend(newText, './db/db.json');
    res.json(`Text added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});


// GET Route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/404.html'))
);


// GET Route for feedback page
// app.get('/feedback', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
// );

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
