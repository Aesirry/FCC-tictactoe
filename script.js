$(document).ready(function (){
  // display modal for player selection upon click
  // select player
  $("#x").click(function(){
    $("#playerModal").modal('hide');
    huPlayer = "x";
    aiPlayer = "o";
  });
  $("#o").click(function(){
    $("#playerModal").modal('hide');
    huPlayer = "o";
    aiPlayer = "x";
  });
  $(".game-box").click(function(){
    box_id = $(this).attr('id');
    move(huPlayer, box_id);
    console.log(minmax(game, aiPlayer));
    // move(aiPlayer, minmax(game, aiPlayer));
  });

});

function move(player, box_id){
  if (player === "x"){
    $("#" + box_id).append('<span class="fa fa-times x-ingame"></span>');
    game[box_id] = "x";
  }
  else  {
    $("#" + box_id).append('<span class="fa fa-circle-o o-ingame"></span>');
    game[box_id] = "o";
  }
}

var game = [0,1,2,3,4,5,6,7,8];
var huPlayer;
var aiPlayer;
var box_id;

// returns list of empty indexes
function emptyIndexes(board){
  return board.filter(function(){typeof space == 'number';});
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

// minmax function
function minmax(newBoard, player){
  var availSpots = emptyIndexes(newBoard);
  // player wins
  if (winning(newBoard, aiPlayer)){
    return {score: 10};
  }
  // computer wins
  else if (winning(newBoard, huPlayer)) {
    return {score: -10};
  }
  // draw
  else if (availSpots.length === 0){
    return {score: 0};
  }

  // saves all the move objects
  var moves = [];
  // go through each available spot and record index and score
  for (var i=0; i < availSpots.length; i++){
    // create new object and store index
    var move = {};
    // saves the index on the board. Now you have a board with the empty spot
    move.index = newBoard[availSpots[i]];
    // assign empty spot to Player
    player = newBoard[availSpots[i]];

    // call minmax on both players
    if (player == aiPlayer){
      var result = minmax(newBoard, huPlayer);
      move.score = result.score;
    }
    else {
      var result = minmax(newBGoard, aiPlayer);
      move.score = result.score;
    }

    newBoard[availSpots] = move.index;
    moves.push(move);
  }
  // get the best move for the ai
  if (player == aiPlayer){
    var bestScore = -10000;
    for (var i = 0; i < moves.lenght; i++){
      if(moves[i] > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  // get the best move for the player
  else{
    var bestScore = 10000;
    for(var i=0; i < moves.lenght; i++){
      if(moves[i] < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  // return the bestMove object from the moves array
  return moves[bestMove];
}
