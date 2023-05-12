$(document).ready(onReady);

function onReady() {
  console.log("jquery is loaded!");
  $('#form').on('submit', postHistory);
  getHistory();
  getPlayerQuotes();
}

//add our input to the history array
function postHistory(event){
 event.preventDefault();

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

//getting player quotes from the server
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

//rendering player quotes to the DOM
function renderPlayerQuotes(quotes){
  $('#player-quotes').empty();
  let item = quotes[0];
  if(item.player1==="PLAYER 1 WINS!"){
    $('#player-quotes').append(`
  <div style = "font-size: 36px; font-weight: bold; background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: rainbow 2s linear infinite;">PLAYER ONE WINS!!!!!</div> <br> ${item.player2}
  `)
  } else if(item.player2==="PLAYER 2 WINS!"){
    $('#player-quotes').append(`
  <div style = "font-size: 36px; font-weight: bold; background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: rainbow 2s linear infinite;">PLAYER TWO WINS!!!!!</div> 
  <br> ${item.player1}
  `)
  } else {

  $('#player-quotes').append(`
  ${item.player1} and ${item.player2}
  `)
  console.log('Rendered player quotes to the DOM');
  }
}

//render's the player 1 and player 2 guessing history to the DOM
function renderToDom(array){
  $('#total-guesses').empty();
  for(item of array){
    $('#total-guesses').append(`
    <li>Player 1: ${item.p1}    Player2: ${item.p2}</li>
    `)
  }
}


