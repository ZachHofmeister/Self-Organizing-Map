CPSC 335-02 Project 3 - Self-Organizing Map

Members: Zach Hofmeister, Youssef Chahine, Jonathan Hana

Intro

	This project covers the Self-Organizing Map (SOM), a type of machine learning algorithm neural network grid. This works by training the machine by feeding it input vectors that recognizes classes/category, which nodes in the grid are then compared with the input to determine the best node. The overall picture is a mapping from 3D input vectors to 2D nodes of the grid.

	This is designed to run on your browser, so there is no need to install any programs for it to work.
	To get started, just double-click the "larks.html" file for it to run on your browser; you can also drag-and-drop it onto your browser.
	You also do not need to worry about building it, it will simply just run after any code changes.
	You do however need to refresh the page if you make any code changes while the page is open, in order to see active changes.
	
	This was programmed in HTML and JavaScript, and the library used is P5.js for drawing on the canvas.
	If you'd like to know more about these technologies, visit the following links:
		HTML: https://en.wikipedia.org/wiki/HTML
		JavaScript: https://en.wikipedia.org/wiki/JavaScript
		P5.js https://p5js.org/

Running Time Analysis

	Note: The runtime analysis does not include calls to external JS provided functions or accessing built-in JS objects (such as document). This will only cover the runtime analysis for what was implemented in code by the group, not including calls to renders (e.g. drawCellUpdate).

	if (g_epoch.current < g_epoch.max) {
		Time Complexity: T(N) = N * (5N^2 + 4 + 1 + (7N + 6N^2)) + 1
		- runTraining: N for running each iteration, to process the respective index.
		-- N*(5N)=5N^2, since running a for loop within a for loop (square matrix). nested for loop consists of 5 operations.
		-- 4, for adjustToward call that consists of 4 operations.
		-- 1, for call to neighbors function.
		-- N*(2+4+1+6N)=7N+6N^2:
		--- N for main loop, 2 operations, 4 for call to adjustToward, nested for loop consists of 6 operations.
		- 1, for incrementing g_trainingIndex.
		Big-O: O(N) = N^3
	} else if (g_testingIndex < g_testingData.length) {
		Time Complexity: T(N) = N * (1 + 5N^2 + 1) + 3
		- runTest: N for running each iteration, to process the respective index.
		-- 1 for the assignment to bestNode.
		-- 5N^2 for the loop with a nested loop. nested for loop consists of 5 operations.
		-- 1 for the return value.
		- 3, for if statement and assignments.
		Big-O: O(N) = N^3
	}

Zip Contents

	README.txt - This file.
	
	src/p5.js - The library file used for drawing.
	
	src/selfOrgMap.html - Run this file by either double clicking on it, or drag-and-drop it onto your preferred browser.
	
	src/selfOrgMap.js - The JavaScript file that contains the code for the SOM algorithm.
	
	testingData.txt, trainingData.txt - Data implemented in the code, used for SOM training/testing.
	
Bugs

	There are currently no known bugs found with the algorithm.
