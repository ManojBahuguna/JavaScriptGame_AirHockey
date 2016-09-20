var canvas;
var ctx;
var tableBorderSize = 15;
var tableBackgroundColor = "#cfc";
var tableBorderColor = "brown";
var tableCenterCircleRadius = 50;
var tableGoalSize = 100;
var tableForegroundColor = "#ada";

window.onload = function()
{
	canvas = document.getElementById('CanvasTennisGame');
	ctx = canvas.getContext('2d');
	
	playGame();
}

function playGame()
{
	drawTable();
}


function drawTable()	//draws the air hockey table
{
	//	tableBackground
	colorRect(0, 0, canvas.width, canvas.height, tableBackgroundColor);
	
	// tableCenter
	colorRect(0, canvas.height/2-tableBorderSize/2, canvas.width, tableBorderSize, tableForegroundColor);
	colorArc(canvas.width/2, canvas.height/2, tableCenterCircleRadius, 0, 360, tableForegroundColor );
	
	//	tableBorders
	colorRect(0, 0, canvas.width, tableBorderSize, tableBorderColor);
	colorRect(0, canvas.height-tableBorderSize, canvas.width, tableBorderSize, tableBorderColor);
	colorRect(0, 0, tableBorderSize, canvas.height, tableBorderColor);
	colorRect(canvas.width-tableBorderSize, 0, tableBorderSize, canvas.height, tableBorderColor);
	
	//	goals
	colorRect(canvas.width/2-tableGoalSize/2, 0, tableGoalSize, tableBorderSize, "white");
	colorArc(canvas.width/2, tableBorderSize, tableCenterCircleRadius, 0, 180, tableForegroundColor );
	colorRect(canvas.width/2-tableGoalSize/2, canvas.height-tableBorderSize, tableGoalSize, tableBorderSize, "white");
	colorArc(canvas.width/2, canvas.height-tableBorderSize, tableCenterCircleRadius, 180, 360, tableForegroundColor );
	
}




/*				UTILITY FUNCTIONS				*/

// draw colored rectangle
function colorRect(xPos, yPos, rectWidth, rectHeight, rectColor)
{
	ctx.fillStyle = rectColor;
	ctx.fillRect(xPos, yPos, rectWidth, rectHeight);
}

function colorArc( xPos, yPos, arcRadius, arcStartAngle, arcEndAngle, arcColor)
{
	for(var i=0; i<tableBorderSize; i++)
	{
		ctx.strokeStyle = arcColor;
		ctx.beginPath();
		ctx.arc(xPos,yPos,arcRadius+i,arcStartAngle/180*Math.PI,arcEndAngle/180*Math.PI);
		ctx.stroke();
		ctx.closePath();
	}
}