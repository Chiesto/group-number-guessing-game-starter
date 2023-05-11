const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
const randomNumber = require('/Users/chris/Desktop/workspace/Tier2/week7/group-number-guessing-game-starter/server/public/scripts/randomNumber.js')

let winner; 

let history = [];

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

//sending the winner results to the client
app.get('/game', function(req, res){
  console.log('/game req was made');
  res.send(winner);
})

//receiving the full history of all inputs on the server
app.post('/history', function(req,res){

  history.push(req.body);
  console.log(history);

})

//sending the full UPDATED history of all inputs
app.get('/history',function(req,res){
  res.send(history);
 
console.log('/history ',)
})


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})


//  if([history.length-1].p1===randomNumber(1,25)){
//   console.log('BIG MONEY', randomNumber(1,25));
// }