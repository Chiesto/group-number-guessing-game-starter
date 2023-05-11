$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#form').on('submit', addInput)
  // getInput()
}
let count = 0
function addInput(event){
  event.preventDefault()

 let playOne = $('#player-one').val()
 let playTwo = $('#player-two').val()

 $('#player-one').val('')
 $('#player-two').val('')

$.ajax({
  method: 'POST',
  url: '/history',
  data:{
    p1:playOne,
    p2:playTwo
  }
}).then(function(response){
  console.log('POST pushInput function works!');
  getHistory();
}).catch(function(error){
alert('Error in our pushInput function',error)
})
count++
 


}
function getHistory(){
  $.ajax({
    method:'GET',
    url: '/history'
  }).then(function(response){
    $('#display').append(response);
  }).catch(function(error){
    alert('problems in our getInput function - error =>', error);
  })
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

