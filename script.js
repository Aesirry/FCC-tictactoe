// User Story: I can play a game of Tic Tac Toe with the computer.
// User Story: My game will reset as soon as it's over so I can play again.
// User Story: I can choose whether I want to play as X or O.

// TODO the game doesn't finish
  // TODO the game resets at 9 or more turns
  // TODO the game ends when a player with and resets
// TODO: symbols can be entered twice.. both the same or different
// TODO: symbols can be out of the game box

// try passing the game to the move function. 

var game;
var huPlayer;
var aiPlayer;
var box_id;
var turn_count;
var choices;
var max;
var min;
var result;

$(document).ready(function(){
  resetGame();
  huPlayer = "x";
  aiPlayer = "o";
  game = [0,1,2,3,4,5,6,7,8];

  $(".game-box").click(function(){
    move(huPlayer, $(this).attr('id'));
    move(aiPlayer, aiChoice(game));
    if (turn_count >= 9){
      console.log('board full');
      resetGame();
    }
    if (winning(game, huPlayer)){
      console.log('player wins');
        resetGame(1000);
    }
    if (winning(game, aiPlayer)){
      console.log('ai wins');
      resetGame(1000);
    }
  });

  $("#reset").click(function(){
    resetGame();
  });
});

function resetGame(time){
  setTimeout(function(){
    $(".game-box").empty();
    turn_count = 0;
    game = [0,1,2,3,4,5,6,7,8];
    return game;
  }, time);
}

function aiChoice(board){
  // get the game array with the available spaces
  choices = emptyIndexes(game);
  console.log(choices);
  max = choices.length;
  min = 0;
  result = Math.floor(Math.random() * (max + 1));
  return result;
}

function move(player, box_id){
  turn_count += 1;
  if (player == aiPlayer){
      setTimeout(function(){
        if (player === "x"){
          $("#" + box_id).append('<span class="fa fa-times x-ingame"></span>');
          return game[box_id] = "x";
        }
        else  {
          $("#" + box_id).append('<span class="fa fa-circle-o o-ingame"></span>');
          return game[box_id] = "o";
        }
      }, 200)
    }
  else {
    if (player === "x"){
      $("#" + box_id).append('<span class="fa fa-times x-ingame"></span>');
      return game[box_id] = "x";
    }
    else  {
      $("#" + box_id).append('<span class="fa fa-circle-o o-ingame"></span>');
      return game[box_id] = "o";
    }
  }
}

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
  ){
    return true;
  }
  else {
    return false;
  }
}
