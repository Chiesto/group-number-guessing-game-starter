$(document).ready(onReady);

function onReady() {
  console.log("jquery is loaded!");
  $('#form').on('submit', postHistory);
  getHistory();
  getPlayerQuotes();
}
//add our input to the history array
function postHistory(){

 let playerOne = $('#player-one').val();
 let playerTwo = $('#player-two').val();

 $('#player-one').val('');
 $('#player-two').val('');

  $.ajax({
    method: 'POST',
    url: '/history',
    data:{
      p1:playerOne,
      p2:playerTwo
    }
  }).then(function(response){
    console.log('postHistory function works!');
    getHistory();
    getPlayerQuotes();
    }).catch(function(error){
    alert('Error in our addNumber function',error)
  })
}

//getting player history from the server
function getHistory(){
  $.ajax({
    method:'GET',
    url: '/history'
  }).then(function(response){
    console.log('getHistory function works!');
    renderToDom(response);
    console.log('rendered player history to DOM');
  }).catch(function(error){
    alert('problems in our getHistory function - error =>', error);
  })
}

function getPlayerQuotes(){
  $.ajax({
    method:'GET',
    url: '/playerQuotes'
  }).then(function(response){
    console.log('getPlayerQuotes function works!');
    renderPlayerQuotes(response);
  }).catch(function(error){
    alert('problems in our getPlayerHistory function - error =>', error);
  })
}

function renderPlayerQuotes(quotes){
  $('#player-quotes').empty();
  let item = quotes[0];
  if(item.player1==="PLAYER 1 WINS!"){
    $('#player-quotes').append(`
  <div class = "p1-wins"><b> PLAYER ONE WINS!!!!! </b></div> <br> ${item.player2}
  `)
  } else if(item.player2==="PLAYER 2 WINS!"){
    $('#player-quotes').append(`
  <div class = "p2-wins"><b> PLAYER TWO WINS!!!!! </b></div> <br> ${item.player1}
  `)
  } else {

  $('#player-quotes').append(`
  Player 1: ${item.player1}    Player2: ${item.player2}
  `)
  console.log('Rendered player quotes to the DOM');
  }
}

function renderToDom(array){
  $('#total-guesses').empty();
  for(item of array){
    $('#total-guesses').append(`
    <li>Player 1: ${item.p1}    Player2: ${item.p2}</li>
    `)
  }
}


// function getInput(){
//   $.ajax({
//     method:'GET',
//     url: '/history'
//   }).then(function(response){
//     $('#display').append(response);
//   }).catch(function(error){
//     alert('problems in our getInput function - error =>', error);
//   })
// }
// let counter = 0;
// function getHistory(){
//   counter++;
  
//   $.ajax({
//     method: 'GET',
//     url: '/history'
//   }).then(function(response){
//     $('#total-guesses').append(`
//     Here are your guesses ${response}. Total number of guesses ${counter}
//     `)
//   })
// }

