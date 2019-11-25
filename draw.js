'use strict';

var lineColor = "#ddd";

var canvas = document.getElementById('tic-tac-toe-board');
var context = canvas.getContext('2d');

var canvasSize = 500;
var sectionSize = canvasSize / 3;
canvas.width = canvasSize;
canvas.height = canvasSize;
context.translate(0.5, 0.5);

function addPlayingPiece(x, y, piece) {
	var xCordinate = x * sectionSize;
	var yCordinate = y * sectionSize;
	clearPlayingArea(xCordinate, yCordinate);

	if (piece === 'x') {
		drawX(xCordinate, yCordinate);
	} else {
		drawO(xCordinate, yCordinate);
	}

	drawLines(10, lineColor);
}

function clearBoard () {
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawLines(10, lineColor);
}

function clearPlayingArea(xCordinate, yCordinate) {
	context.fillStyle = "#fff";
	context.fillRect(
		xCordinate,
		yCordinate,
		sectionSize,
		sectionSize
	);
}

function drawO(xCordinate, yCordinate) {
	var halfSectionSize = (0.5 * sectionSize);
	var centerX = xCordinate + halfSectionSize;
	var centerY = yCordinate + halfSectionSize;
	var radius = (sectionSize - 100) / 2;
	var startAngle = 0 * Math.PI;
	var endAngle = 2 * Math.PI;

	context.lineWidth = 10;
	context.strokeStyle = "#01bBC2";
	context.beginPath();
	context.arc(centerX, centerY, radius, startAngle, endAngle);
	context.stroke();
}

function drawX(xCordinate, yCordinate) {
	context.strokeStyle = "#f1be32";

	context.beginPath();

	var offset = 50;
	context.moveTo(xCordinate + offset, yCordinate + offset);
	context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);

	context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
	context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);

	context.stroke();
}

function drawHorizontalLine (y) {
	context.strokeStyle = "#c9eb34";

	var yCordinate = y * sectionSize + sectionSize / 2;
	var lineStart = 5;
	var lineLenght = canvasSize - 5;

	context.beginPath();

	context.moveTo(lineStart, yCordinate);
	context.lineTo(lineLenght, yCordinate);

	context.stroke();
}

function drawVerticalLine (x) {
	context.strokeStyle = "#c9eb34";

	var xCordinate = x * sectionSize + sectionSize / 2;
	var lineStart = 5;
	var lineLenght = canvasSize - 5;

	context.beginPath();

	context.moveTo(xCordinate, lineStart);
	context.lineTo(xCordinate, lineLenght);

	context.stroke();
}

function drawDiagonalLine (main) {
	var xCordinate;
	var yCordinate;
	var xCordinate1;
	var yCordinate1;

	if (main) {
		var xCordinate = 5;
		var yCordinate = canvasSize - 5;
		var xCordinate1 = canvasSize - 5;
		var yCordinate1 = 5;
	} else {
		var xCordinate = 5;
		var yCordinate = 5;
		var xCordinate1 = canvasSize - 5;
		var yCordinate1 = canvasSize - 5;
	}

	context.strokeStyle = "#c9eb34";

	context.beginPath();

	context.moveTo(xCordinate, yCordinate);
	context.lineTo(xCordinate1, yCordinate1);

	context.stroke();
}

function drawLines(lineWidth, strokeStyle) {
	var lineStart = 5;
	var lineLenght = canvasSize - 5;
	context.lineWidth = lineWidth;
	context.lineCap = 'round';
	context.strokeStyle = strokeStyle;
	context.beginPath();

	/*
	 * Horizontal lines 
	 */
	for (var y = 1; y <= 2; y++) {
		context.moveTo(lineStart, y * sectionSize);
		context.lineTo(lineLenght, y * sectionSize);
	}

	/*
	 * Vertical lines 
	 */
	for (var x = 1; x <= 2; x++) {
		context.moveTo(x * sectionSize, lineStart);
		context.lineTo(x * sectionSize, lineLenght);
	}

	context.stroke();
}

drawLines(10, lineColor);

function getBoardPosition(event) {
	var rect = canvas.getBoundingClientRect();

	// canvas mouse position
	var mouse = {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top,
	};

	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++) {
			var xCordinate = x * sectionSize;
			var yCordinate = y * sectionSize;

			if (
				mouse.x >= xCordinate && mouse.x <= xCordinate + sectionSize &&
				mouse.y >= yCordinate && mouse.y <= yCordinate + sectionSize
			) {
				return { row: y, col: x };
			}
		}
	}

	return undefined;
}
