const Environment = function(canvas, c){
	this.canvas = canvas;
	this.c = c;
	this.bgPos = 0;
	this.bgSpeed = 1.25;
	this.bgHeight = 500;
	this.bgImg = document.getElementById('road');
};
Environment.prototype.update = function(){
	this.bgPos += this.bgSpeed;
	if (this.bgPos > 500+this.bgHeight)
		this.bgPos = 0;
};
Environment.prototype.render = function(){
	for (let i = 0; i <= 500/this.bgHeight+1; i++)
		this.c.drawImage(this.bgImg, 0, this.bgPos-i*this.bgHeight);
};