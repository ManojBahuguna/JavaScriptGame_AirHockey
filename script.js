var canvas;
var ctx;

var tableBorderSize = 20;
var tableBorderColor = "#444";
var tableCornerColor = "#f00";
var tableDesignSize = 15;
var tableDesignColor = "#dd4";
var tableBackgroundColorP1 = "#0d9";
var tableBackgroundColorP2 = "#09f";
var tableCircleRadius = 40;
var tableGoalSize = tableCircleRadius*2;
var tableBallRestDiscSize = 30;
var tableBallRestDiscPosXP1Left = 0;
var tableBallRestDiscPosYP1Left = 0;
var tableBallRestDiscPosXP1Right = 0;
var tableBallRestDiscPosYP1Right = 0;
var tableBallRestDiscPosXP2Left = 0;
var tableBallRestDiscPosYP2Left = 0;
var tableBallRestDiscPosXP2Right = 0;
var tableBallRestDiscPosYP2Right = 0;

var ballPosX = 0;
var ballPosY = 0;
var ballSize = 10;
var ballColor = "#252";
var ballFriction = 10;
var ballSpeed = 10;
var ballL2R = true;
var ballT2B = true;

var batSize = 20;
var batPosXP1 = 0;
var batPosYP1 = 0;
var batColorP1 = "#09f";
var batPosXP2 = 0;
var batPosYP2 = 0;
var batColorP2 = "#0d9";


window.onload = function()
{
	canvas = document.getElementById('CanvasTennisGame');
	ctx = canvas.getContext('2d');
	canvas.addEventListener('mousemove', controlBat, false);
	
	tableBallRestDiscPosXP1Left = canvas.width*1/5;
	tableBallRestDiscPosYP1Left = canvas.height*1/5;
	tableBallRestDiscPosXP1Right = canvas.width*4/5;
	tableBallRestDiscPosYP1Right = canvas.height*1/5;
	tableBallRestDiscPosXP2Left = canvas.width*1/5;
	tableBallRestDiscPosYP2Left = canvas.height*4/5;
	tableBallRestDiscPosXP2Right = canvas.width*4/5;
	tableBallRestDiscPosYP2Right = canvas.height*4/5;
	
	setInterval(playGame, 17);
}

function playGame()
{
	strikeBall();
	drawTable();
}

function strikeBall()
{
	if(ballL2R==true)
		ballPosX+=ballSpeed;
	else
		ballPosX-=ballSpeed;
	
	if(ballT2B==true)
		ballPosY+=ballSpeed;
	else
		ballPosY-=ballSpeed;
	
	
	//	ensure that balls keeps slowing down and stops after a time
	setTimeout(function()
	{
		if(ballSpeed > 0)
		{
			ballSpeed-=ballFriction/100;
		} else
		{
			ballSpeed = 0;
		}
	}, 500)
	
	//	change ball direction when ball hits border
	if(ballPosX+ballSize >= canvas.width-tableBorderSize)
		ballL2R=false;
	if(ballPosY+ballSize >= canvas.height-tableBorderSize)
		ballT2B=false;
	if(ballPosX-ballSize <= 0+tableBorderSize)
		ballL2R=true;
	if(ballPosY-ballSize <= 0+tableBorderSize)
		ballT2B=true;
	
	
	
}

function controlBat(event)
{
	if(
		event.pageY-batSize/2<canvas.height/2-tableDesignSize/2-ballSize
	&&	event.pageX-batSize/2>tableBorderSize+batSize
	&&	event.pageX-batSize/2<canvas.width-tableBorderSize-batSize
	&&	event.pageY-batSize/2>tableBorderSize+batSize
	)
	{
		batPosXP1 = event.pageX-batSize/2;
		batPosYP1 = event.pageY-batSize/2;
	}
	
	if(
		event.pageY-batSize/2>canvas.height/2+tableDesignSize/2+ballSize
	&&	event.pageX-batSize/2>tableBorderSize+batSize
	&&	event.pageX-batSize/2<canvas.width-tableBorderSize-batSize
	&&	event.pageY-batSize/2<canvas.height-tableBorderSize-batSize
	)
	{
		batPosXP2 = event.pageX-batSize/2;
		batPosYP2 = event.pageY-batSize/2;
	}
	
	
	if(
		(batPosXP1-batSize <= ballPosX+ballSize
	&&	batPosXP1+batSize >= ballPosX-ballSize
	&&	batPosYP1-batSize <= ballPosY+ballSize
	&&	batPosYP1+batSize >= ballPosY-ballSize)
	||
		(batPosXP2-batSize <= ballPosX+ballSize
	&&	batPosXP2+batSize >= ballPosX-ballSize
	&&	batPosYP2-batSize <= ballPosY+ballSize
	&&	batPosYP2+batSize >= ballPosY-ballSize)
	)
	{
		ballSpeed = 10;
		console.log("test");
	}
	
}

function drawTable()	//draws the air hockey table
{
	//	tableBackground
	colorRect(0, 0, canvas.width, canvas.height/2, tableBackgroundColorP1);
	colorRect(0, canvas.height/2, canvas.width, canvas.height, tableBackgroundColorP2);
	
	// tableCenter
	colorRect(0, canvas.height/2-tableDesignSize/2, canvas.width, tableDesignSize, tableDesignColor);	//center line
	colorArc(canvas.width/2, canvas.height/2, tableCircleRadius, 0, 360, tableDesignSize, tableDesignColor, false );	//center circle
	
	//	tableBorders
	colorRect(0, 0, canvas.width, tableBorderSize, tableBorderColor);//up
	colorRect(0, canvas.height-tableBorderSize, canvas.width, tableBorderSize, tableBorderColor);//down
	colorRect(0, 0, tableBorderSize, canvas.height, tableBorderColor);//left
	colorRect(canvas.width-tableBorderSize, 0, tableBorderSize, canvas.height, tableBorderColor);//right
	colorRect(0, 0, tableBorderSize, tableBorderSize, tableCornerColor);//upLeftCorner
	colorRect(canvas.width-tableBorderSize, 0, tableBorderSize, tableBorderSize, tableCornerColor);//upRightCorner
	colorRect(0, canvas.height-tableBorderSize, tableBorderSize, tableBorderSize, tableCornerColor);//downLeftCorner
	colorRect(canvas.width-tableBorderSize, canvas.height-tableBorderSize, tableBorderSize, tableBorderSize, tableCornerColor);//downRightCorner
	
	//	ballRestDiscs
	colorArc(tableBallRestDiscPosXP1Left, tableBallRestDiscPosYP1Left, tableBallRestDiscSize, 0, 360, 2, tableBackgroundColorP2, false );
	colorArc(tableBallRestDiscPosXP1Right, tableBallRestDiscPosYP1Right, tableBallRestDiscSize, 0, 360, 2, tableBackgroundColorP2, false );
	colorArc(tableBallRestDiscPosXP2Left, tableBallRestDiscPosYP2Left, tableBallRestDiscSize, 0, 360, 2, tableBackgroundColorP1, false );
	colorArc(tableBallRestDiscPosXP2Right, tableBallRestDiscPosYP2Right, tableBallRestDiscSize, 0, 360, 2, tableBackgroundColorP1, false );
	
	//	goals
	colorRect(canvas.width/2-tableGoalSize/2, 0, tableGoalSize, tableBorderSize, "white");//upGoal
	colorArc(canvas.width/2, tableBorderSize, tableCircleRadius, 0, 180, tableDesignSize, tableDesignColor, false );//upArc
	colorRect(canvas.width/2-tableGoalSize/2, canvas.height-tableBorderSize, tableGoalSize, tableBorderSize, "white");//downGoal
	colorArc(canvas.width/2, canvas.height-tableBorderSize, tableCircleRadius, 180, 360, tableDesignSize, tableDesignColor, false );//downArc
	
	//	ball
	colorArc(ballPosX, ballPosY, ballSize, 0, 360, 1, ballColor, true);
	
	//	bats
	colorArc(batPosXP1, batPosYP1, batSize, 0, 360, 1, batColorP1, true);
	colorArc(batPosXP1, batPosYP1, batSize/3, 0, 360, 1, "black", true);
	colorArc(batPosXP2, batPosYP2, batSize, 0, 360, 1, batColorP2, true);
	colorArc(batPosXP2, batPosYP2, batSize/3, 0, 360, 1, "black", true);
}


/*				UTILITY FUNCTIONS				*/

// draw colored rectangle
function colorRect(xPos, yPos, rectWidth, rectHeight, rectColor)
{
	ctx.fillStyle = rectColor;
	ctx.fillRect(xPos, yPos, rectWidth, rectHeight);
}

function colorArc( xPos, yPos, arcRadius, arcStartAngle, arcEndAngle, arcStrokeSize, arcColor, fillArc)
{
	
	for(var i=0; i<arcStrokeSize; i++)
	{
		ctx.strokeStyle = arcColor;
		ctx.fillStyle = arcColor;
		ctx.beginPath();
		ctx.arc(xPos,yPos,arcRadius+i,arcStartAngle/180*Math.PI,arcEndAngle/180*Math.PI);
		ctx.stroke();
		ctx.stroke();
		ctx.stroke();	// three layers of stroke for smooth drawing
		if(fillArc == true)
			ctx.fill();
		ctx.closePath();
	}
}