'use strict';

var evaluate = function (b) {
	var player = 1; // max
	var opponent = -1; // min

	// Checking for Rows for X or O victory. 
	for (var row = 0; row < 3; row++) {
		if (b[row][0] == b[row][1] &&
			b[row][1] == b[row][2]) {
			if (b[row][0] == player)
				return { v: +1, i: row };
			else if (b[row][0] == opponent)
				return { v: -1, i: row };
		}
	}

	// Checking for Columns for X or O victory. 
	for (var col = 0; col < 3; col++) {
		if (b[0][col] == b[1][col] &&
			b[1][col] == b[2][col]) {
			if (b[0][col] == player)
				return { v: +1, i: 3 + col };

			else if (b[0][col] == opponent)
				return { v: -1, i: 3 + col };
		}
	}

	// Checking for Diagonals for X or O victory. 
	if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
		if (b[0][0] == player)
			return { v: +1, i: 6 };
		else if (b[0][0] == opponent)
			return { v: -1, i: 6 };
	}

	if (b[0][2] == b[1][1] && b[1][1] == b[2][0]) {
		if (b[0][2] == player)
			return { v: +1, i: 7 };
		else if (b[0][2] == opponent)
			return { v: -1, i: 7 };
	}

	// Else if none of them have won then return 0 
	return { v: 0, i: -1 };
}

var minimax = function (board, depth, a, b, isMax) {
	var score = evaluate(board).v;
	var count = 9 - depth;

	if (score == 1)
		return score + count;

	if (score == -1)
		return score - count;

	if (depth === 9)
		return 0;

	if (isMax) {
		var max = -1000;
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (board[i][j] === 0) {
					board[i][j] = 1;
					max = Math.max(max, minimax(board, depth + 1, a, b, false));
					a = Math.max(max, a);
					board[i][j] = 0;

					if (a >= b)
						break;
				}
			}
		}
		return max;
	}
	else {
		var min = 1000;
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (board[i][j] === 0) {
					board[i][j] = -1;
					min = Math.min(min, minimax(board, depth + 1, a, b, true));
					b = Math.min(b, min);
					board[i][j] = 0;

					if (a >= b)
						break;
				}
			}
		}
		return min;
	}
}

var getBestMove = function (board, depth) {
	var best = 0;
	var bestMove;
	var moves = [];
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (board[i][j] !== 0)
				continue;

			board[i][j] = 1;
			var value = minimax(board, depth + 1, -1000, +1000, false);
			board[i][j] = 0;

			if (value > best) {
				best = value;
				bestMove = { row: i, col: j };
			} else if (value === 0) {
				moves.push({ row: i, col: j });
			}
		}
	}

	if (best > 0) {
		return bestMove;
	}

	return moves[Math.floor(Math.random() * moves.length)];
}