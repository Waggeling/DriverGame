const Barrier = function(x, y, length, speed, c){
	this.x = x;
	this.y = y;
	this.length = length;
	this.speed = speed;
	this.c = c;
	this.height = 20;
};
Barrier.prototype.update = function(){
	this.y += this.speed;
};
Barrier.prototype.render = function(){
	this.c.fillStyle = "#424242";
	this.c.fillRect(this.x, this.y, this.length, this.height);
};