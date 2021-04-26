//CS335-02 Project 3 Self Organizing Map - Team YZJ
//Authors: 
//	Youssef Chahine	- ykchahine@csu.fullerton.edu
//	Zach Hofmeister	- zachhof@csu.fullerton.edu
//	Jonathan Hana	- hanaj97@csu.fullerton.edu
//File Name: selfOrgMap.js
//File Description: The source code and algorithms of the selfOrgMap program.

var g_canvas = { cell_size:20, wid:21, hgt:21 }; // JS Global var, w canvas size info.
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 8; // Update every 'mod' frames.
var g_stop = 0; // Go by default.

var cellData = [];

var trainingData = [
	[1, [5, 5, -53.5], 1],
	[2, [5, 4, -18.8], 2],
	[3, [5, 3, -6.9], 2],
	[4, [5, 2, -15.6], 1],
	[5, [5, 1, 19.3], 3],
	[6, [5, 0, 0.0], 2],
	[7, [5, -1, -11.3], 1],
	[8, [5, -2, -0.4], 3],
	[9, [5, -3, -14.1], 1],
	[10, [5, -4, 0.8], 3],
	[11, [5, -5, -12.5], 2],
	[12, [4, 5, -22.0], 3],
	[13, [4, 4, -14.2], 3],
	[14, [4, 3, -7.8], 2],
	[15, [4, 2, -4.6], 1],
	[16, [4, 1, 0.6], 2],
	[17, [4, 0, 0.0], 2],
	[18, [4, -1, 6.8], 3],
	[19, [4, -2, 11.2], 3],
	[20, [4, -3, -6.6], 2],
	[21, [4, -4, -6.4], 2],
	[22, [4, -5, -3.0], 2],
	[23, [3, 5, -17.5], 3],
	[24, [3, 4, -29.8], 1],
	[25, [3, 3, -8.1], 2],
	[26, [3, 2, -2.2], 2],
	[27, [3, 1, 0.1], 2],
	[28, [3, 0, 0.0], 2],
	[29, [3, -1, -1.3], 2],
	[30, [3, -2, 5.3], 3],
	[31, [3, -3, -2.7], 2],
	[32, [3, -4, 10.5], 3],
	[33, [3, -5, -10.5], 1],
	[34, [2, 5, -28.0], 3],
	[35, [2, 4, -17.6], 2],
	[36, [2, 3, -7.8], 2],
	[37, [2, 2, -2.4], 2],
	[38, [2, 1, 7.8], 3],
	[39, [2, 0, -11.0], 1],
	[40, [2, -1, -15.6], 1],
	[41, [2, -2, -0.8], 2],
	[42, [2, -3, -1.4], 1],
	[43, [2, -4, 15.8], 3],
	[44, [2, -5, 13.0], 2],
	[45, [1, 5, -29.5], 2],
	[46, [1, 4, -10.6], 3],
	[47, [1, 3, -8.9], 1],
	[48, [1, 2, -2.2], 2],
	[49, [1, 1, -0.3], 2],
	[50, [1, 0, 10.0], 3],
	[51, [1, -1, -0.1], 2],
	[52, [1, -2, 0.6], 2],
	[53, [1, -3, 3.3], 2],
	[54, [1, -4, -3.7], 1],
	[55, [1, -5, 34.5], 3],
	[56, [0, 5, -30.0], 1],
	[57, [0, 4, -6.8], 3],
	[58, [0, 3, 13.6], 3],
	[59, [0, 2, 12.4], 3],
	[60, [0, 1, -0.2], 2],
	[61, [0, 0, 0.0], 2],
	[62, [0, -1, 0.2], 2],
	[63, [0, -2, -5.4], 1],
	[64, [0, -3, 5.4], 2],
	[65, [0, -4, 12.8], 2],
	[66, [0, -5, 25.0], 2],
	[67, [-1, 5, -19.5], 2],
	[68, [-1, 4, -23.2], 1],
	[69, [-1, 3, -3.3], 2],
	[70, [-1, 2, -0.6], 2],
	[71, [-1, 1, 0.1], 2],
	[72, [-1, 0, 9.0], 3],
	[73, [-1, -1, -1.7], 1],
	[74, [-1, -2, 19.2], 3],
	[75, [-1, -3, 6.9], 2],
	[76, [-1, -4, 15.6], 2],
	[77, [-1, -5, 29.5], 2],
	[78, [-2, 5, -9.0], 3],
	[79, [-2, 4, -4.8], 2],
	[80, [-2, 3, -16.6], 1],
	[81, [-2, 2, 0.8], 2],
	[82, [-2, 1, -13.4], 1],
	[83, [-2, 0, 0.0], 2],
	[84, [-2, -1, 0.2], 2],
	[85, [-2, -2, -2.5], 1],
	[86, [-2, -3, 18.8], 3],
	[87, [-2, -4, 17.6], 2],
	[88, [-2, -5, 25.0], 1],
	[89, [-3, 5, -5.4], 2],
	[90, [-3, 4, 0.4], 2],
	[91, [-3, 3, 2.7], 2],
	[92, [-3, 2, 6.6], 3],
	[93, [-3, 1, 13.3], 3],
	[94, [-3, 0, -4.0], 1],
	[95, [-3, -1, -0.1], 2],
	[96, [-3, -2, -13.8], 1],
	[97, [-3, -3, 25.1], 3],
	[98, [-3, -4, 18.8], 2],
	[99, [-3, -5, 35.5], 2],
	[100, [-4, 5, -2.0], 1],
	[101, [-4, 4, 1.4], 1],
	[102, [-4, 3, 6.6], 2],
	[103, [-4, 2, -9.2], 1],
	[104, [-4, 1, 2.2], 2],
	[105, [-4, 0, -8.0], 1],
	[106, [-4, -1, 14.4], 3],
	[107, [-4, -2, 7.6], 3],
	[108, [-4, -3, -4.1], 1],
	[109, [-4, -4, 19.2], 2],
	[110, [-4, -5, 24.0], 1],
	[111, [-5, 5, 23.5], 3],
	[112, [-5, 4, 13.2], 2],
	[113, [-5, 3, 1.0], 1],
	[114, [-5, 2, 7.4], 2],
	[115, [-5, 1, 19.3], 3],
	[116, [-5, 0, -18.0], 1],
	[117, [-5, -1, 10.7], 3],
	[118, [-5, -2, 0.6], 2],
	[119, [-5, -3, 6.9], 2],
	[120, [-5, -4, 18.8], 2],
	[121, [-5, -5, 35.5], 1]
]

var g_raceObj = {index:0, currentStr:"", racing:false}

var g_newStrColor = "white";

var g_algoSS = {col:2, lineNum:0, color:"red", str:"", rotation:0, passes:0, unsortedIndex:0}
var g_algoGP = {col:20, lineNum:0, color:"gold", str:"", rotation:0, passes:0, parity:0}
var g_algoMS = {col:38, lineNum:0, color:"deepskyblue", str:"", rotation:0, passes:0, pIndex:0, partitions:[]}
var g_algoQS = {col:56, lineNum:0, color:"magenta", str:"", rotation:0, passes:0, pivot:0, end:15, sIndex:1, pIndex:-1, partitions:[]}

var width;
var height;

function setup() { // P5 setup function
    let sz = g_canvas.cell_size;
    width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    height = sz * g_canvas.hgt;
    createCanvas(width, height);  // Make a P5 canvas.
	populateCellData();
	background(color(100, 100, 100));
}

function draw() { // P5 frame re-draw function, called for every frame.	
    ++g_frame_cnt;
    if (0 == g_frame_cnt % g_frame_mod) {
        if (!g_stop && g_raceObj.racing) {

		}
    }
}

function populateCellData() { //Give each cell random vector and class values
	for (let x = 0; x < g_canvas.wid; ++x) {
		cellData[x] = [];
		for (let y = 0; y < g_canvas.hgt; ++y) {
			let P = random(-5,5);
			let Q = random(-5,5);
			let R = random(-60, 60);
			let nodeClass = int(random(1, 4)); //really 1-3, 4 not included
			cellData[x][y] = [[P, Q, R], nodeClass];
			// console.log(cellData[x][y]);
		}
	}
}

function startRace() {
	//Reset display
	background("#000"); // set canvas to black
	let sz = g_canvas.cell_size;
	textAlign(LEFT, CENTER);
	textSize(sz);
	fill("#FFF");
	text("Selection Sort", g_canvas.cell_size * g_algoSS.col, 20);
	text("Gold's Pore Sort", g_canvas.cell_size * g_algoGP.col, 20);
	text("Mergesort", g_canvas.cell_size * g_algoMS.col, 20);
	text("Quicksort", g_canvas.cell_size * g_algoQS.col, 20);
	//Update raceObj
	g_raceObj.currentStr = inputs[g_raceObj.index];
	g_raceObj.racing = true;
	//Write string to HTML
	document.getElementById("sortingString").innerHTML = g_raceObj.currentStr;
	//Reset algo objects
	g_algoSS.lineNum = 0;
	g_algoSS.str = g_raceObj.currentStr;
	g_algoSS.rotation = 0;
	g_algoSS.passes = 0;
	g_algoSS.unsortedIndex = 0;

	g_algoGP.lineNum = 0;
	g_algoGP.str = g_raceObj.currentStr;
	g_algoGP.rotation = 0;
	g_algoGP.passes = 0;
	g_algoGP.parity = 0;

	g_algoMS.lineNum = 0;
	g_algoMS.str = g_raceObj.currentStr;
	g_algoMS.rotation = 0;
	g_algoMS.passes = 0;
	g_algoMS.pIndex = 0;
	g_algoMS.partitions = [];

	g_algoQS.lineNum = 0;
	g_algoQS.str = g_raceObj.currentStr;
	g_algoQS.rotation = 0;
	g_algoQS.passes = 0;
	g_algoQS.pivot = 0;
	g_algoQS.end = 15;
	g_algoQS.sIndex = 1;
	g_algoQS.pIndex = -1;
	g_algoQS.partitions = [];
}

function replaceChar(str, index, char) {
	return str.substr(0,index) + char + str.substr(index+1);
}

function swap(obj, i, j) { //Swaps the characters at indices i and j
	let oi = obj.str[i];
	obj.str = replaceChar(obj.str, i, obj.str[j]);
	obj.str = replaceChar(obj.str, j, oi);
}

function rotateString(str, offset) { //Rotates a string so that the first characters moves to the back, rest move over.
	offset %= str.length;
	return str.substr(offset) + str.substr(0, offset);
}

function sorted(str) { //Takes a string of hexidecimal characters and returns true if it is in sorted order (L to G)
	let sorted = true;
	for (let i = 0; i < str.length - 1; ++i) {
		if (parseInt(str[i], 16) > parseInt(str[i+1], 16)) {
			sorted = false;
			break;
		}
	}
	return sorted;
}

function drawString(algoObject, overrideColor) {
	// var currentColor = color(random(0, 255), random(0,255), random(0,255));
	// Uncomment the following to display pass number
	// let x = algoObject.col - 1.5;
	// let y = (algoObject.lineNum % (g_canvas.hgt - 2)) + 2; //0 - 62
	// drawCell(x, y, "#000", algoObject.lineNum, "#fff");
	colorMode(HSB, 256, 256, 256);
	for (var i = 0; i < 16; ++i) {
		var cellColor;
		if (typeof overrideColor === "undefined")
			cellColor = color(hue(algoObject.color), parseInt(algoObject.str[i], 16)*12, brightness(algoObject.color));
		else cellColor = overrideColor;

		let x = algoObject.col + i;
		let y = (algoObject.lineNum % (g_canvas.hgt - 2)) + 2; //2-48
		drawCell(x, y, cellColor, algoObject.str[i], "black");
		drawCell(x, y+1, "black", "", "black"); //Black-out the next line, for easier wrap-around visibility
	}
	++algoObject.lineNum;
}

function drawCell(x, y, cellColor, char, charColor) {
	let sz = g_canvas.cell_size;
    let rectX = 1+ x*sz; // Set x one pixel inside the sz-by-sz cell.
    let rectY = 1+ y*sz;

	fill(cellColor);
	rect(rectX, rectY, sz, sz);
	
	textAlign(CENTER, CENTER);
	fill(charColor);
	text(char, rectX + (sz / 2), rectY + (sz / 2) + 2);
}

function drawIterationNum(algoObject) {
	let sz = g_canvas.cell_size;
	fill("black");
	rect(sz * (algoObject.col + 12), 0, 4*sz, 2*sz);
	textAlign(RIGHT, CENTER);
	fill("white");
	text(algoObject.passes, sz * (algoObject.col + 16), 20);
}

function keyPressed() {
	// console.log(`keyPressed: ${keyCode}`);
	switch(keyCode) {
		case 32: //Spacebar
			g_stop = !g_stop; //Pause
			break;
		case 37:{ //Left Arrow
			let len = inputs.length;
			g_raceObj.index = (((g_raceObj.index - 1) % len) + len) % len; //decrement race index
			startRace();
			break;
		}
		case 39: { //Right Arrow
			let len = inputs.length;
			g_raceObj.index = (((g_raceObj.index + 1) % len) + len) % len; //increment race index
			startRace();
			break;
		}
	}
}