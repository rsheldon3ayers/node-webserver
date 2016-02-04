"use strict";

const express = require('express');
const  app = express();
const path = require('path');
const imgur = require('imgur');
const PORT = process.env.PORT ||  3000;

// const bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, 'tmp/uploads')},

  filename: (req, file, cb) => {
    cb(null, file.originalname)
    console.log(file);
    }
  });
const upload = multer({ storage: storage})

app.set('view engine', 'jade');
app.locals.title= "Not So Cool App";

// app.use(bodyParser.urlencoded({extended: false}))


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {

  res.render('index', {
    date: new Date()
  });

});
app.get('/contact', (req, res) => {
    res.render('contact');
});



app.post('/contact', (req, res) =>{
    const name = req.body.name;
    res.send(`<h1>Thanks for contacting us ${name}</h1>`)

})
app.get('/sendPhoto', (req, res) => {

  res.render('sendPhoto');
});

app.post('/sendPhoto', upload.single('image'), (req, res) => {
  console.log(req.file);
  const path = req.file.path

  imgur.uploadFile(path)
    .then(function (json) {
        console.log(json.data.link);
    })
    .catch(function (err) {
        console.error(err.message);
    });


  res.send('<h1>Thanks for that</h1>');
});



app.get('/hello', (req, res) => {
  const name = req.query.name;
  const message = `<h1>Hello ${ name }!</h1>`;
  console.log('PARAMS>>>>>', req.query)
  res.writeHead(200, {
  'Content-Type': 'text/html'
});


message.split('').forEach((char, i) => { setTimeout(
  () => {
    res.write(char)
  }, 100 * i);
});

  setTimeout(()=> {
    res.end();
  }, 20000);

});
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
app.get('/random/:min/:max', (req, res) => {
  const min = req.params.min;
  const max = req.params.max;
  console.log('PARAMS ', req.params);
  res.send(getRandomInt(+min, +max).toString());
});

app.get('/secret', (req, res) => {
    res
    .status(403)
    .send('Denied!');

});
app.get('/cal/:month/:year', (req,res) => {

const cal = require('./node_modules/node-cal/cal.js');
console.log("Function?>>>>", cal);
const month = req.params.month;
const year = req.params.year;

const display = cal(month, year);
console.log("display>>>", month, year, display)
res.send('<h1>' + display + '</h1>');


});

app.listen(PORT, () => {

  console.log(`node.js server started. Listening on port ${PORT}`);
});

