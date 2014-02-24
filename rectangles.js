//   - page respects the w/h of rectangle area and each rectangle
//   - drag-n-drop rectangles

(function() {
	"use strict";

	var timer = null;

	window.onload = function() {
		setUpRectangles();

		var button = document.getElementById("move");
		button.onclick = moveitmoveit;

		var colorbutton = document.getElementById("color");
		colorbutton.onclick = startTimer;

		moveitmoveit(); // Pick random location on page load
	};

	// Dynamically create rectangles on the page
	function setUpRectangles() {
		var rectanglearea = document.getElementById("rectanglearea");

		for (var i = 0; i < 60; i++) {
			var rectangle = document.createElement("div");
			rectangle.className = "rectangle";
			rectanglearea.appendChild(rectangle);
			rectangle.onclick = kill;
			rectangle.onmousedown = rectMouseDown;
			rectangle.onmouseup   = rectMouseUp;
			rectangle.onmousemove = rectMouseMove;
		}
	}

	// Called when the mouse button is pressed down on a rectangle.
	// Begins dragging of that rectangle.
	function rectMouseDown(event) {
		console.log("mouse down! " + this);
		this.dragging = true;
		this.prevX = parseInt(event.clientX);   // remember mouse position
		this.prevY = parseInt(event.clientY);
	}

	// Called when the mouse cursor moves around on a rectangle.
	// If this is done while the mouse button is held down, drags a rectangle.
	function rectMouseMove(event) {
		// console.log("rectMove was called! " + event.clientX + ", " + event.clientY);
		if (this.dragging) {
			// compute difference in old mouse position and current position;
			// move the rectangle by that amount
			var dx = event.clientX - this.prevX;
			var dy = event.clientY - this.prevY;
			var oldX = parseInt(window.getComputedStyle(this).left);
			var oldY = parseInt(window.getComputedStyle(this).top);
			this.style.left = oldX + dx + "px";
			this.style.top  = oldY + dy + "px";
			this.prevX = parseInt(event.clientX);
			this.prevY = parseInt(event.clientY);
		}
	}

	// Called when the mouse button is released on a rectangle.
	// Stops any rectangle-dragging action that is in progress.
	function rectMouseUp(event) {
		console.log("mouse up! " + this);
		this.dragging = false;
	}

	// Randomly position all the rectangles
	function moveitmoveit() {
		var area = document.getElementById("rectanglearea");
		var areaStyles = window.getComputedStyle(area);
		var width = parseInt(areaStyles.width);
		var height = parseInt(areaStyles.height);

		var rects = document.querySelectorAll("#rectanglearea .rectangle");
		for (var i = 0; i < rects.length; i++) {
			rects[i].style.position = "absolute";
			rects[i].style.top  = Math.round(Math.random() * (height - 50)) + "px";
			rects[i].style.left = Math.round(Math.random() * (width - 50)) + "px";
		}
	}

	// Start a timer to change all rectangle's color every 20ms
	function startTimer() {
		// Start timer
		if (timer == null) {
			timer = setTimeout(colorRects, 20);
		} else {
			clearInterval(timer);
			timer = null;
		}
	}

	// Color all of the rectangles
	function colorRects() {
		//moveitmoveit();
		var arrayRects = document.querySelectorAll("#rectanglearea .rectangle");
		for (var i = 0; i < arrayRects.length; i++) {
			var r = Math.round(Math.random() * 256);
			var g = Math.round(Math.random() * 256);
			var b = Math.round(Math.random() * 256);
			arrayRects[i].style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
		}
	}

	// Remove clicked rectangle
	function kill(event) {
		if (event.button != 0) {
			this.parentNode.removeChild(this);   // the rectangle I want murder.  HULK SMASH
		}
	}
})();