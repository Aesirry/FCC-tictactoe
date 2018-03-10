// User Story: I can play a game of Tic Tac Toe with the computer.
// User Story: My game will reset as soon as it's over so I can play again.
// User Story: I can choose whether I want to play as X or O.

// TODO: make the main ai engine. The mighty random function
// TODO: it should pick a number from the ones that are available. randomly.
// TODO: save the state of the board in an array
// TODO: turn mechanism
// TODO: game reset mechanism upon endgame
// TODO: winning mechanism

$(document).ready(function (){
  // display modal for player selection upon click
  // select player
  //   $(".game-box").click(function(){
  //   if (huPlayer === undefined || aiPlayer === undefined){
  //     $("#playerModal").modal('show');
  //     return 0;
  //   }
  //   box_id = $(this).attr('id');
  //   if(typeof game[box_id] != "number"){
  //     return 0;
  //   }
  //   move(huPlayer, box_id);
  //   console.log("Game:" + game);
  // });
  //   // if you click the x or x then you are assigned the character, and the ai the other
  // $("#x").click(function(){
  //   $("#playerModal").modal('hide');
  //   huPlayer = "x";
  //   aiPlayer = "o";
  // });
  // $("#o").click(function(){
  //   $("#playerModal").modal('hide');
  //   huPlayer = "o";
  //   aiPlayer = "x";
  // });
  huPlayer = "x";
  aiPlayer = "o";

  // while the winning state isn't true keep setting the 

});

function move(player, box_id){
  if (player === "x"){
    $("#" + box_id).append('<span class="fa fa-times x-ingame"></span>');
    return game[box_id] = "x";
  }
  else  {
    $("#" + box_id).append('<span class="fa fa-circle-o o-ingame"></span>');
    return game[box_id] = "o";
  }
}

var game = [0,1,2,3,4,5,6,7,8];
var huPlayer;
var aiPlayer;
var box_id;

// saves all the move objects: the 'moves' are actually game states
var moves = [];
// go through each available spot and record index and score

// returns list of empty indexes
function emptyIndexes(board){
  return board.filter(function what(space){return typeof space == 'number'});
}

// check for winning combinations
function winning(board, player){
  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player) ||
    (board[0] == player && board[4] == player && board[8] == player)
  ) {
    return true;
  }
  else {
    return false;
  }
}
