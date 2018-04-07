// User Story: I can choose whether I want to play as X or O.

$(document).ready(function () {
    "use strict";
    var huPlayer = "x";
    var aiPlayer = "o";
    var game = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var turn_count = 0;
    
    // returns list of empty indexes
    function emptyIndexes(board) {
        return board.filter(function what(space) {
            return typeof space === "number";
        });
    }

    function aiChoice(game) {
        // get the game array with the available spaces
        var ai_choices = emptyIndexes(game);
        var max = ai_choices.length - 1;
        var result = Math.floor(Math.random() * (max + 1));
        return ai_choices[result];
    }

    function move(player, box_id, game) {
        turn_count += 1;
        if (player === "x") {
            $("#" + box_id).append("<span class='fa fa-times x-ingame'></span>");
            game[box_id] = "x";
        } else {
            $("#" + box_id).append("<span class='fa fa-circle-o o-ingame'></span>");
            game[box_id] = "o";
        }
        return game;
    }

    // check for winning combinations
    function winning(board, player) {
        if (
            (board[0] === player && board[1] === player && board[2] === player) ||
            (board[3] === player && board[4] === player && board[5] === player) ||
            (board[6] === player && board[7] === player && board[8] === player) ||
            (board[0] === player && board[3] === player && board[6] === player) ||
            (board[1] === player && board[4] === player && board[7] === player) ||
            (board[2] === player && board[5] === player && board[8] === player) ||
            (board[2] === player && board[4] === player && board[6] === player) ||
            (board[0] === player && board[4] === player && board[8] === player)
        ) {
            return true;
        } else {
            return false;
        }
    }

    function resetGame(time) {
            $(".game-box").empty();
            turn_count = 0;
            game = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            return game;
    }

    $(".game-box").click(function () {
        game = move(huPlayer, $(this).attr("id"), game);
        game = move(aiPlayer, aiChoice(game), game);
        if (turn_count >= 9){
            console.log('turn limit reached');
            resetGame();
        }
        if (winning(game, huPlayer)) {
            console.log('player wins');
            resetGame();
        }
        if (winning(game, aiPlayer)) {
            console.log('ai wins');
            resetGame();
        }

    });

    $("#reset").click(function () {
        resetGame();
    });

});