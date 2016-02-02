"use strict";

const express = require('express');
const  app = express();
const PORT = process.env.PORT ||  3000;

app.get('/hello', (req, res) => {
  const name = req.query.name;
  const message = '<h1>Hello ${ name }!</h1>';
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

  console.log('node.js server started. Listening on port ${PORT}');
});

