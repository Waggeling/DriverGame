var maxScore = 0;

function selectFittingCSS() {				//Auswahl der CSS-Datei (Browser- oder Mobil-Version)
	var fileref = document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		fileref.setAttribute("href", "css/style_mobile.css");
	}
	else {
		fileref.setAttribute("href", "css/style.css");
	}
	document.getElementsByTagName("head")[0].appendChild(fileref);

	drawGame();
}

function drawGame(){
	var canvas =  document.getElementById('canvas');
	var c = canvas.getContext("2d");
	var btnRestart = document.getElementById('btnRestart');
	btnRestart.disabled = true;
	var btnLeft = document.getElementById('btnLeft');
	var btnRight = document.getElementById('btnRight');

	const environment = new Environment(canvas, c);
	const cabrio = new Cabrio(200, 100, c, btnLeft, btnRight);
	const barriers = [];
	setInterval(function(){
		let barrierSet = generateRandomBarriers(c, 300, 500);
		barriers.push({left: barrierSet.left, right: barrierSet.right});
	}, 1500);		//jede 1,5 Sekunden
	gameLoop();

	var i = 0;
	var score = 0;
	var div = document.getElementById('scoreDiv');
	div.textContent = score;
	var best = document.getElementById('bestDiv');
	best.textContent = maxScore;

	/* Main Game Loop*/
	function gameLoop(){
		cabrio.update(barriers);
		if (cabrio.collision){
			if (score > maxScore){
				maxScore = score;
				best.textContent = maxScore;
			}
			score = 0;
			div.textContent = score;
			drawGameOver(c, canvas);
			btnRestart.disabled = false;
			return;
		}
		environment.update();
		environment.render();
		barriers.forEach(function(barrier1){
			barrier1.left.update();
			barrier1.right.update();
			barrier1.left.render();
			barrier1.right.render();
		});
		cabrio.render();
		
		if (i == 10){
			score += 1;
			div.textContent = score;
			i = 0;
		}
		else {
			i += 1;
		}
		window.requestAnimationFrame(gameLoop);
	}
};
function generateRandomBarriers(c, canvasWidth, canvasHeight){
	let lengthLeft = Math.round(Math.random()*190+10);
	let lengthRight = canvasWidth - lengthLeft - 100;
	let returnVal = { };
	returnVal.left = new Barrier(-10, -20, lengthLeft, 1.25, c);
	returnVal.right = new Barrier(canvasWidth - lengthRight, -20, lengthRight, 1.25, c);
	return returnVal;
};
function drawGameOver(c, canvas){
	c.font = "30px Verdana";
	c.fillStyle = "#CC0000";
	c.fillText("Game over!!", canvas.width/4, canvas.height/2);
};