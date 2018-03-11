// User Story: I can play a game of Tic Tac Toe with the computer.
// User Story: My game will reset as soon as it's over so I can play again.
// User Story: I can choose whether I want to play as X or O.

// TODO: symbols can be entered twice.. both the same or different
// TODO: symbols can be out of the game box

$(document).ready(function(){
  huPlayer = "x";
  aiPlayer = "o";

  $(".game-box").click(function(){
    move(huPlayer, $(this).attr('id'));
    move(aiPlayer, aiChoice(game));
    if (winning(game, huPlayer)){
        resetGame();
    }
    console.log(game);
  });

  $("#reset").click(function(){
    resetGame();
  });
  // while the winning state isn't true keep setting the 

});

function resetGame(){
  $(".game-box").empty();
  game = [0,1,2,3,4,5,6,7,8];
}

function aiChoice(board){
  // get the game array with the available spaces
  let choices = emptyIndexes(game);
  let max = board.length;
  let min = 0;
  return Math.floor(Math.random() * (max + 1));
}

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
