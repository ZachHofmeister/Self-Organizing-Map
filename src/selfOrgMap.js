//CS335-02 Project 3 Self Organizing Map - Team YZJ
//Authors: 
//	Youssef Chahine	- ykchahine@csu.fullerton.edu
//	Zach Hofmeister	- zachhof@csu.fullerton.edu
//	Jonathan Hana	- hanaj97@csu.fullerton.edu
//File Name: selfOrgMap.js
//File Description: The source code and algorithms of the selfOrgMap program.

var g_canvas = { cell_size:20, wid:21, hgt:21 }; // JS Global var, w canvas size info.
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 1; // Update every 'mod' frames.
var g_stop = 0; // Go by default.

var g_classColors = {1:"#FF0000", 2:"#00FF00", 3:"#0000FF"} //class 1: red, class 2: green, class 3: blue

var g_nodeData = []; //Stores data about the vector, class, and color of each cell.

var g_epoch = {max:50, current:0}; //The number of epochs to run and the current epoch number
var g_trainingIndex = 0;

var g_trainingData = [ //Array of given training vectors / classes
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


function setup() { // P5 setup function
    let width = g_canvas.cell_size * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = g_canvas.cell_size * g_canvas.hgt;
    createCanvas(width, height);  // Make a P5 canvas.
	noStroke();
	populateNodeData();
	background("black");
	drawGridUpdate();
}

function draw() { // P5 frame re-draw function, called for every frame.	
    ++g_frame_cnt;
    if (0 == g_frame_cnt % g_frame_mod && !g_stop) {
		//Uncomment to run epochs automatically, currently runs once per right arrow press
        if (g_epoch.current < g_epoch.max) {
			if (g_trainingIndex < g_trainingData.length) { //train
				runTraining(g_nodeData, g_trainingData[g_trainingIndex]);
				++g_trainingIndex;
			} else {
				++g_epoch.current;
				g_trainingIndex = 0;
			}
		} else {
			console.log("Done training!")
		}
    }
}

function populateNodeData() { // Give each cell random vector and class values
	for (let x = 0; x < g_canvas.wid; ++x) {
		g_nodeData[x] = [];
		for (let y = 0; y < g_canvas.hgt; ++y) {
			let P = random(-5,5);
			let Q = random(-5,5);
			let R = random(-60, 60);
			let nodeClass = int(random(1, 4)); // really 1-3, 4 not included
			let nodeColor = color(100, 100, 100);
			g_nodeData[x][y] = [[P, Q, R], nodeClass, nodeColor];
			// console.log(g_nodeData[x][y]);
		}
	}
}

function drawGridUpdate() {
	for (let x = 0; x < g_canvas.wid; ++x) {
		for (let y = 0; y < g_canvas.hgt; ++y) {
			drawCellUpdate(x, y);
		}
	}
}

function drawCellUpdate(x, y) {
	let node = g_nodeData[x][y];

	let sz = g_canvas.cell_size;
    let rectX = x*sz; // Set x one pixel inside the sz-by-sz cell.
    let rectY = y*sz;

	fill(node[2]);
	rect(rectX, rectY, sz, sz);
}

function runTraining(nodes, trainData) { //Find and train a winning node in "nodes" based on "trainData" array
	//Find the best / winning node
	let bestNode = {x:0, y:0, dist:distance(nodes[0][0][0], trainData[1])}; //Start with best node at 0,0 w/ its distance
	for (let x = 0; x < nodes.length; ++x) {
		for (let y = 0; y < nodes[x].length; ++y) {
			newDist = distance(nodes[x][y][0], trainData[1]); //Get distance between node and training coordinate
			if (newDist < bestNode.dist) {
				bestNode.x = x;
				bestNode.y = y;
				bestNode.dist = newDist;
			}
		}
	}
	console.log("Epoch: " + g_epoch.current + " Training: " + g_trainingIndex + " Winner: " + bestNode.x + ", " + bestNode.y);
	//Adjust the best node and its neighbors
	//TODO
}

function distance(vec1, vec2) { //return the euclidian distance between two 3d vector arrays
	return Math.sqrt(Math.pow(vec1[0] - vec2[0], 2) + Math.pow(vec1[1] - vec2[1], 2) + Math.pow(vec1[2] - vec2[2], 2));
}

function neighbors(x, y) { //return array of coordinates right, left, below, above cell
	return [[x+1, y], [x-1, y], [x, y+1], [x, y-1]];
}

function adjustToward(node, targetVector, targetClass) { //takes a node [array with vector, class, color] and adjusts it towards other vector and class
	//TODO
}

function keyPressed() {
	// console.log(`keyPressed: ${keyCode}`);
	switch(keyCode) {
		case 32: //Spacebar
			g_stop = !g_stop; //Pause
			break;
		// case 37:{ //Left Arrow
		// 	let len = inputs.length;
		// 	g_raceObj.index = (((g_raceObj.index - 1) % len) + len) % len; //decrement race index
		// 	startRace();
		// 	break;
		// }
		// case 39: { //Right Arrow THIS IS NOT INTENDED TO STAY
		// 	for (g_trainingIndex = 0; g_trainingIndex < g_trainingData.length; ++g_trainingIndex) { //Run epoch
		// 		runTraining(g_nodeData, g_trainingData[g_trainingIndex]);
		// 	}
		// 	++g_epoch.current;
		// }
	}
}