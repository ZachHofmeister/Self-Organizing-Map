//CS335-02 Project 3 Self Organizing Map - Team YZJ
//Authors: 
//	Youssef Chahine	- ykchahine@csu.fullerton.edu
//	Zach Hofmeister	- zachhof@csu.fullerton.edu
//	Jonathan Hana	- hanaj97@csu.fullerton.edu
//File Name: selfOrgMap.js
//File Description: The source code and algorithms of the selfOrgMap program.

var g_canvas = { cell_size:20, wid:21, hgt:21 }; // JS Global var, w canvas size info.
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 5; // Update every 'mod' frames.
var g_stop = 0; // Go by default.

var g_classColors = {1:"#F", 2:"#00FF00", 3:"#0000FF"} //class 1: red, class 2: green, class 3: blue

var g_nodeData = []; //Stores data about the vector, class, and color of each cell.

var g_learningRate = 0.2; //0.2 = 20%
var g_colorRate = 0.05; //5%

var g_epoch = {max:20, current:0}; //The number of epochs to run and the current epoch number

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

var g_testingIndex = 0;
var g_testingCorrect = 0;
var g_testingData = [
	[201, [4.5, 4.5, -27.3], 2],
	[202, [4.5, 3.5, -12.5], 2],
	[203, [4.5, 2.5, 6.3], 3],
	[204, [4.5, 1.5, 17.3], 3],
	[205, [4.5, 0.5, -5.2], 1],
	[206, [4.5, -0.5, -1.2], 2],
	[207, [4.5, -1.5, 11.6], 3],
	[208, [4.5, -2.5, -24.6], 1],
	[209, [4.5, -3.5, -17.5], 1],
	[210, [4.5, -4.5, -1.1], 3],
	[211, [3.5, 4.5, -33.9], 1],
	[212, [3.5, 3.5, -5.9], 3],
	[213, [3.5, 2.5, -6.4], 1],
	[214, [3.5, 1.5, 14.6], 3],
	[215, [3.5, 0.5, 16.4], 3],
	[216, [3.5, -0.5, 2.2], 3],
	[217, [3.5, -1.5, -2.7], 2],
	[218, [3.5, -2.5, 2.7], 3],
	[219, [3.5, -3.5, -4.3], 2],
	[220, [3.5, -4.5, 10.5], 3],
	[221, [2.5, 4.5, -32.5], 1],
	[222, [2.5, 3.5, -20.5], 1],
	[223, [2.5, 2.5, 4.3], 3],
	[224, [2.5, 1.5, -0.9], 2],
	[225, [2.5, 0.5, 0.2], 2],
	[226, [2.5, -0.5, 11.6], 3],
	[227, [2.5, -1.5, 15.6], 3],
	[228, [2.5, -2.5, -14.6], 1],
	[229, [2.5, -3.5, 14.3], 3],
	[230, [2.5, -4.5, -8.7], 1],
	[231, [1.5, 4.5, -18.3], 3],
	[232, [1.5, 3.5, -11.5], 2],
	[233, [1.5, 2.5, -4.4], 2],
	[234, [1.5, 1.5, -1.0], 2],
	[235, [1.5, 0.5, 9.0], 3],
	[236, [1.5, -0.5, -11.2], 1],
	[237, [1.5, -1.5, 17.7], 3],
	[238, [1.5, -2.5, -7.3], 1],
	[239, [1.5, -3.5, 6.1], 3],
	[240, [1.5, -4.5, 20.1], 3],
	[241, [0.5, 4.5, -27.1], 1],
	[242, [0.5, 3.5, -17.7], 1],
	[243, [0.5, 2.5, -19.7], 1],
	[244, [0.5, 1.5, -9.9], 1],
	[245, [0.5, 0.5, -15.0], 1],
	[246, [0.5, -0.5, 13.0], 3],
	[247, [0.5, -1.5, -5.6], 1],
	[248, [0.5, -2.5, 5.4], 3],
	[249, [0.5, -3.5, 7.3], 2],
	[250, [0.5, -4.5, 20.1], 3],
	[251, [-0.5, 4.5, -16.1], 2],
	[252, [-0.5, 3.5, -21.3], 1],
	[253, [-0.5, 2.5, 14.6], 3],
	[254, [-0.5, 1.5, -0.4], 2],
	[255, [-0.5, 0.5, 0.0], 2],
	[256, [-0.5, -0.5, 11.0], 3],
	[257, [-0.5, -1.5, 0.9], 2],
	[258, [-0.5, -2.5, -3.3], 1],
	[259, [-0.5, -3.5, 7.7], 1],
	[260, [-0.5, -4.5, 20.1], 2],
	[261, [-1.5, 4.5, -11.1], 2],
	[262, [-1.5, 3.5, -23.1], 1],
	[263, [-1.5, 2.5, 8.3], 3],
	[264, [-1.5, 1.5, 14.3], 3],
	[265, [-1.5, 0.5, 0.2], 2],
	[266, [-1.5, -0.5, 0.0], 2],
	[267, [-1.5, -1.5, -3.0], 1],
	[268, [-1.5, -2.5, -5.6], 1],
	[269, [-1.5, -3.5, 23.5], 3],
	[270, [-1.5, -4.5, 6.3], 1],
	[271, [-2.5, 4.5, -8.3], 1],
	[272, [-2.5, 3.5, -6.3], 1],
	[273, [-2.5, 2.5, 1.6], 2],
	[274, [-2.5, 1.5, 20.4], 3],
	[275, [-2.5, 0.5, 0.4], 2],
	[276, [-2.5, -0.5, 7.8], 3],
	[277, [-2.5, -1.5, 0.9], 2],
	[278, [-2.5, -2.5, -8.3], 1],
	[279, [-2.5, -3.5, 22.5], 3],
	[280, [-2.5, -4.5, 17.5], 1],
	[281, [-3.5, 4.5, -5.5], 1],
	[282, [-3.5, 3.5, -0.7], 1],
	[283, [-3.5, 2.5, 19.3], 3],
	[284, [-3.5, 1.5, -16.3], 1],
	[285, [-3.5, 0.5, 10.8], 3],
	[286, [-3.5, -0.5, 6.6], 3],
	[287, [-3.5, -1.5, 11.4], 3],
	[288, [-3.5, -2.5, 4.4], 2],
	[289, [-3.5, -3.5, 19.9], 3],
	[290, [-3.5, -4.5, 10.9], 1],
	[291, [-4.5, 4.5, 4.1], 1],
	[292, [-4.5, 3.5, -4.5], 1],
	[293, [-4.5, 2.5, -9.4], 1],
	[294, [-4.5, 1.5, 4.4], 2],
	[295, [-4.5, 0.5, -8.8], 1],
	[296, [-4.5, -0.5, 6.2], 3],
	[297, [-4.5, -1.5, 3.7], 3],
	[298, [-4.5, -2.5, 3.7], 2],
	[299, [-4.5, -3.5, 12.5], 2],
	[300, [-4.5, -4.5, 41.3], 3],
	[301, [4.3, 4.3, -9.9], 3],
	[302, [4.3, 3.3, -10.5], 2],
	[303, [4.3, 2.3, -2.7], 2],
	[304, [4.3, 1.3, -15.5], 1],
	[305, [4.3, 0.3, 0.5], 2],
	[306, [4.3, -0.7, 12.4], 3],
	[307, [4.3, -1.7, -4.6], 2],
	[308, [4.3, -2.7, -7.3], 2],
	[309, [4.3, -3.7, -8.5], 2],
	[310, [4.3, -4.7, 10.1], 3],
	[311, [3.3, 4.3, -23.4], 2],
	[312, [3.3, 3.3, -7.8], 3],
	[313, [3.3, 2.3, -3.4], 2],
	[314, [3.3, 1.3, -13.1], 1],
	[315, [3.3, 0.3, 0.3], 2],
	[316, [3.3, -0.7, 14.0], 3],
	[317, [3.3, -1.7, 2.2], 3],
	[318, [3.3, -2.7, -21.8], 1],
	[319, [3.3, -3.7, 10.1], 3],
	[320, [3.3, -4.7, 1.1], 2],
	[321, [2.3, 4.3, -22.1], 2],
	[322, [2.3, 3.3, -10.5], 2],
	[323, [2.3, 2.3, -6.7], 1],
	[324, [2.3, 1.3, -17.5], 1],
	[325, [2.3, 0.3, 0.1], 2],
	[326, [2.3, -0.7, -0.5], 2],
	[327, [2.3, -1.7, -8.2], 1],
	[328, [2.3, -2.7, 7.2], 3],
	[329, [2.3, -3.7, 18.9], 3],
	[330, [2.3, -4.7, 12.1], 3],
	[331, [1.3, 4.3, -20.0], 2],
	[332, [1.3, 3.3, -9.5], 2],
	[333, [1.3, 2.3, -3.4], 2],
	[334, [1.3, 1.3, 5.3], 3],
	[335, [1.3, 0.3, 0.0], 2],
	[336, [1.3, -0.7, 13.8], 3],
	[337, [1.3, -1.7, -0.1], 2],
	[338, [1.3, -2.7, 1.6], 2],
	[339, [1.3, -3.7, 5.9], 2],
	[340, [1.3, -4.7, 14.2], 2],
	[341, [0.3, 4.3, -21.0], 1],
	[342, [0.3, 3.3, 8.2], 3],
	[343, [0.3, 2.3, 10.3], 3],
	[344, [0.3, 1.3, 4.5], 3],
	[345, [0.3, 0.3, 0.0], 2],
	[346, [0.3, -0.7, -17.0], 1],
	[347, [0.3, -1.7, 0.8], 2],
	[348, [0.3, -2.7, 3.5], 2],
	[349, [0.3, -3.7, 9.3], 2],
	[350, [0.3, -4.7, 3.4], 1],
	[351, [-0.7, 4.3, -13.1], 2],
	[352, [-0.7, 3.3, -5.5], 2],
	[353, [-0.7, 2.3, -1.6], 2],
	[354, [-0.7, 1.3, -10.1], 1],
	[355, [-0.7, 0.3, 18.0], 3],
	[356, [-0.7, -0.7, -2.9], 1],
	[357, [-0.7, -1.7, 1.3], 2],
	[358, [-0.7, -2.7, 20.8], 3],
	[359, [-0.7, -3.7, 11.9], 2],
	[360, [-0.7, -4.7, 18.6], 1],
	[361, [-1.7, 4.3, -22.4], 1],
	[362, [-1.7, 3.3, -2.5], 2],
	[363, [-1.7, 2.3, 0.0], 2],
	[364, [-1.7, 1.3, -4.5], 1],
	[365, [-1.7, 0.3, 0.1], 2],
	[366, [-1.7, -0.7, -9.0], 1],
	[367, [-1.7, -1.7, 17.5], 3],
	[368, [-1.7, -2.7, 24.6], 3],
	[369, [-1.7, -3.7, 11.7], 1],
	[370, [-1.7, -4.7, 7.9], 1],
	[371, [-2.7, 4.3, 15.2], 3],
	[372, [-2.7, 3.3, 8.1], 3],
	[373, [-2.7, 2.3, 2.1], 2],
	[374, [-2.7, 1.3, -7.6], 1],
	[375, [-2.7, 0.3, 5.3], 3],
	[376, [-2.7, -0.7, -18.2], 1],
	[377, [-2.7, -1.7, 1.3], 2],
	[378, [-2.7, -2.7, 11.9], 3],
	[379, [-2.7, -3.7, 14.8], 2],
	[380, [-2.7, -4.7, 23.3], 1],
	[381, [-3.7, 4.3, 3.7], 2],
	[382, [-3.7, 3.3, 5.4], 2],
	[383, [-3.7, 2.3, 4.6], 2],
	[384, [-3.7, 1.3, 21.6], 3],
	[385, [-3.7, 0.3, 12.5], 3],
	[386, [-3.7, -0.7, 1.5], 3],
	[387, [-3.7, -1.7, 0.8], 2],
	[388, [-3.7, -2.7, 16.6], 3],
	[389, [-3.7, -3.7, 15.2], 2],
	[390, [-3.7, -4.7, 30.7], 2],
	[391, [-4.7, 4.3, 17.0], 3],
	[392, [-4.7, 3.3, 10.3], 2],
	[393, [-4.7, 2.3, 7.6], 2],
	[394, [-4.7, 1.3, -8.0], 1],
	[395, [-4.7, 0.3, -17.3], 1],
	[396, [-4.7, -0.7, -1.0], 2],
	[397, [-4.7, -1.7, -0.1], 2],
	[398, [-4.7, -2.7, -4.2], 1],
	[399, [-4.7, -3.7, 12.8], 1],
	[400, [-4.7, -4.7, 36.1], 3]
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
        if (g_epoch.current < g_epoch.max) {
			// if (g_trainingIndex < g_trainingData.length) { //train
			// 	runTraining(g_nodeData, g_trainingData[g_trainingIndex]);
			// 	++g_trainingIndex;
			// } else {
			// 	++g_epoch.current;
			// 	g_trainingIndex = 0;
			// }
			// Below is for 1 epoch per frame
			for (g_trainingIndex = 0; g_trainingIndex < g_trainingData.length; ++g_trainingIndex) {
				runTraining(g_nodeData, g_trainingData[g_trainingIndex]);
			}
			++g_epoch.current;
			document.getElementById("status").innerHTML = "Training";
			document.getElementById("epoch").innerHTML = g_epoch.current + " / " + g_epoch.max;
			document.getElementById("training").innerHTML = g_trainingIndex + " / " + g_trainingData.length;
		} else if (g_testingIndex < g_testingData.length) { //Test it!
			if (runTest(g_nodeData, g_testingData[g_testingIndex])) ++g_testingCorrect;
			++g_testingIndex;
			document.getElementById("status").innerHTML = "Testing";
			document.getElementById("tests").innerHTML = g_testingIndex + " / " + g_testingData.length;
			document.getElementById("testAcc").innerHTML = (g_testingCorrect / g_testingIndex * 100).toFixed(2);
		} else {
			document.getElementById("status").innerHTML = "<b>DONE!</b>";
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
	// console.log("Epoch: " + g_epoch.current + " Training: " + g_trainingIndex + " Winner: " + bestNode.x + ", " + bestNode.y);
	//Adjust the best node towards train data vector and class
	adjustToward(nodes[bestNode.x][bestNode.y], trainData[1], trainData[2]);
	drawCellUpdate(bestNode.x, bestNode.y);
	//Adjust neighbors and their neighbors
	// console.log(neighbors(bestNode.x, bestNode.y)[0]);
	let neighArr = neighbors(bestNode.x, bestNode.y);
	for (let i = 0; i < neighArr.length; ++i) { //For each neighbor
		let neigh = neighArr[i];
		if (neigh[0] >= 0 && neigh[0] < nodes.length && neigh[1] >= 0 && neigh[1] < nodes[neigh[0]].length) { //check neighbor in bounds
			adjustToward(nodes[neigh[0]][neigh[1]], nodes[bestNode.x][bestNode.y][0], trainData[2]);
			drawCellUpdate(neigh[0], neigh[1]);
			let stepNeighArr = neighbors(neigh[0], neigh[1]);
			for (let j = 0; j < stepNeighArr.length; ++j) { //For each neighbor's neighbor
				let stepNeigh = stepNeighArr[j];
				if (stepNeigh[0] >= 0 && stepNeigh[0] < nodes.length && stepNeigh[1] >= 0 && stepNeigh[1] < nodes[neigh[0]].length 
					&& (stepNeigh[0] != bestNode.x || stepNeigh[1] != bestNode.y)) { //check neighbor in bounds and not winner
						adjustToward(nodes[stepNeigh[0]][stepNeigh[1]], nodes[neigh[0]][neigh[1]][0], trainData[2]);
						drawCellUpdate(stepNeigh[0], stepNeigh[1]);
				}
			}
		}
	}
}

function runTest(nodes, testData) {
	let bestNode = {x:0, y:0, dist:distance(nodes[0][0][0], testData[1])}; //Start with best node at 0,0 w/ its distance
	
	for (let x = 0; x < nodes.length; ++x) {
		for (let y = 0; y < nodes[x].length; ++y) {
			newDist = distance(nodes[x][y][0], testData[1]); //Get distance between node and training coordinate
			if (newDist < bestNode.dist) {
				bestNode.x = x;
				bestNode.y = y;
				bestNode.dist = newDist;
			}
		}
	}

	return (nodes[bestNode.x][bestNode.y][1] == testData[2]);
}

function distance(vec1, vec2) { //return the euclidian distance between two 3d vector arrays
	return Math.sqrt(Math.pow(vec1[0] - vec2[0], 2) + Math.pow(vec1[1] - vec2[1], 2) + Math.pow(vec1[2] - vec2[2], 2));
}

function neighbors(x, y) { //return array of coordinates right, left, below, above cell
	return [[x+1, y], [x-1, y], [x, y+1], [x, y-1]];
}

function adjustToward(node, targetVector, targetClass) { //takes a node [array with vector, class, color] and adjusts it towards other vector and class
	//Adjust node's vector towards target (newVector = currentVector + (targetVector - currentVector) * learningRate)
	node[0] = addVector(node[0], mulVectorScalar(subVector(targetVector, node[0]), g_learningRate));
	
	//Change node's class
	node[1] = targetClass;

	//Adjust node's color based on new class
	let r = red(node[2]), g = green(node[2]), b = blue(node[2]);
	switch(targetClass) {
		case 1:
			node[2] = color(r + r * g_colorRate, g - g * g_colorRate, b - b * g_colorRate);
			break;
		case 2:
			node[2] = color(r - r * g_colorRate, g + g * g_colorRate, b - b * g_colorRate);
			break;
		case 3:
			node[2] = color(r - r * g_colorRate, g - g * g_colorRate, b + b * g_colorRate);
			break;
	}
}

function addVector(vec1, vec2) { //Adds the elements of vec1 and vec2, returns the result vector
	let result = [];
	for (let i = 0; i < vec1.length; ++i) {
		result[i] = vec1[i] + vec2[i];
	}
	return result;
}

function subVector(vec1, vec2) { //Subtracts the elements of vec2 from vec1, returns the result vector
	let result = [];
	for (let i = 0; i < vec1.length; ++i) {
		result[i] = vec2[i] - vec1[i];
	}
	return result;
}

function mulVectorScalar(vec, scal) { //Multiplies a vector by a scalar, returns the result vector
	let result = [];
	for (let i = 0; i < vec.length; ++i) {
		result[i] = vec[i] * scal
	}
	return result;
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