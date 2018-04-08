// TODO: prevent two symbols in same box

$(document).ready(function () {
    "use strict";
    var huPlayer;
    var aiPlayer;
    var game_started = false;
    var good_choice = false;
    var game = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var turn_count = 0;
    var player_score = 0;
    var ai_score = 0;

    function assignSymbol (choice){
        var roles;
        if (choice === 'x'){
            roles = {
                'huPlayer': 'x',
                'aiPlayer': 'o'
            }
        }
        else {
            roles = {
                'huPlayer': 'o',
                'aiPlayer': 'x'
            }
        }
        return roles
    }

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
        if (turn_count >= 9){
            $("#game_msg").text('Draw');
            game_started = false;
        }
        // check winning condition in here
        if (player == aiPlayer && winning(game, player)){
            $("#game_msg").text('ai wins');
            ai_score += 1;
            $("#ai-score").text(ai_score);
            game_started = false;
        }
        else if (player == huPlayer && winning(game, player)){
            $("#game_msg").text('player wins');
            player_score += 1;
            $("#player-score").text(player_score);
            game_started = false;
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

    function resetGame() {
            $(".game-box").empty();
            $("#game_msg").empty();

            turn_count = 0;
            game = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            game_started = true;
            return game;
    }

    function checkIfGoodChoice(game, box_id) {
        var good_choices = emptyIndexes(game);
        var condition = $.inArray(parseInt(box_id), good_choices);
        if (condition === -1){
            return false;
        } else {
            return true;
        }
    }

    $("#player-score").text(player_score);
    $("#ai-score").text(ai_score);

    $(".game-box").click(function () {
        if (game_started){
            good_choice = checkIfGoodChoice(game, $(this).attr("id"));
            if (good_choice && !winning(game, aiPlayer)){
                game = move(huPlayer, $(this).attr("id"), game);
            }
            if (good_choice && !winning(game, huPlayer)){
                game = move(aiPlayer, aiChoice(game), game);
            }
        }
    });

    $("#new-game").click(function(){
        resetGame();
        player_score = 0;
        ai_score = 0;
        $("#player-score").text(player_score);
        $("#ai-score").text(ai_score);
    });

    $("#reset").click(function () {
        resetGame();
        game_started = true;
    });

    $("#x, #o").click(function(){
        var player_roles = assignSymbol($(this).attr("id"));
        huPlayer = player_roles["huPlayer"];
        aiPlayer = player_roles["aiPlayer"];
        $("#playerModal").modal("hide");
        game_started = true;
    });

    $("#playerModal").modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    });

});