const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;


const randomNumber = Math.floor(Math.random() * 25) + 1;
let winner1 = "";
let winner2 = "";
const playerQuotes = [{
    player1:winner1,
    player2:winner2
}];

let history = require('./public/historyList');

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

//receiving the full history of all inputs on the server X
app.post('/history', function(req,res){

  history.push(req.body);
  console.log('Received player history on server',history);

})
//send history to another server side file 'history.js' X
module.exports = history;

//sending the full UPDATED history of all inputs X
app.get('/history',function(req,res){
  res.send(history);
 
  console.log('Player history being sent from server', history);
})

// app.post('/playerQuotes', function(req,res){

//   history.push(req.body);
//   console.log('Received player history on server',history);

// })

function updatePlayerQuotes() {
  playerQuotes[0].player1 = winner1;
  playerQuotes[0].player2 = winner2;
}

//sending the quotes (if player's guess was too high, too low, or right on) to the client
app.get('/playerQuotes', function(req, res){
  console.log('/playerQuotes req was made');


  let item = history[history.length-1];
  console.log('here is our item', item);
    if (Number(item.p1)===randomNumber){
        winner1 = "PLAYER 1 WINS!";
    } else if (Number(item.p1)>randomNumber){
        winner1 = "Player 1 guessed too high";
    } else if(item.p1<randomNumber){
        winner1 = "Player 1 guessed too low";
    } 

    if (Number(item.p2)===randomNumber){
        winner2 = "PLAYER 2 WINS!";
    } else if (Number(item.p2)>randomNumber){
        winner2 = "Player 2 guessed too high";
    } else if(Number(item.p2)<randomNumber){
        winner2 = "Player 2 guessed too low";
    } 
    updatePlayerQuotes();
  
  res.send(playerQuotes);

  console.log('Player quotes', playerQuotes);
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})


