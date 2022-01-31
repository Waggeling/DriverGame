const Cabrio = function(x, y, c, btnLeft, btnRight){
	this.x = x;				//Anfangsposition
	this.y = y;
	this.c = c;
	this.btnLeft = btnLeft;
	this.btnRight = btnRight;
	this.velX = 0;
	this.width = 0;			//Position
	this.height = 0;
	this.collision = false;
	this.img = document.getElementById('cabrio');

	var self = this;
	var newX
	document.addEventListener('keydown', function(e){
		if (e.keyCode === 37){			//Links
			self.velX = -20;
			newX = self.x += self.velX;
			if (newX >= 0) {			//Herausfahren abfangen
				self.x = newX;
			}
			else {
				self.x = 0;
			}
		}
		if (e.keyCode === 39){			//Rechts
			self.velX = 20;
			newX = self.x += self.velX;
			if (newX <= 250) {			//Herausfahren abfangen
				self.x = newX;
			}
			else {
				self.x = 250;
			}
		}
	});
	btnLeft.addEventListener('click', function(){
		self.velX = -20;
		newX = self.x += self.velX;
		if (newX >= 0) {			//Herausfahren abfangen
			self.x = newX;
		}
		else {
			self.x = 0;
		}
	});
	btnRight.addEventListener('click', function(){
		self.velX = 20;
		newX = self.x += self.velX;
		if (newX <= 250) {			//Herausfahren abfangen
			self.x = newX;
		}
		else {
			self.x = 250;
		}
	});
};
Cabrio.prototype.update = function(barriers){
	if (this.detectCollisions(barriers)){
		this.collision = true;
	}
};
Cabrio.prototype.render = function(){
	this.width = 50;
	this.height = 30;
	this.c.drawImage(this.img, 0, 0, 199, 348, this.x, this.y, 50, 30);
	//(Bild, AnfangX, AnfangsY innerhalb Obj, fromX, fromY Bildausschnitt ab, img.width, img.height Größe des Bildes)
};
Cabrio.prototype.detectCollisions = function(barriers){			//true = Kollision
	for (var i = 0; i < barriers.length; i++) {
		let left = barriers[i].left;
		let x0 = left.x + left.length;		// = x1
		let y0 = left.y;
		let y1 = left.y + left.height + 2;
		
		let right = barriers[i].right;
		let x2 = right.x + 3;				// = x3
		let y2 = right.y;
		let y3 = right.y + right.height + 2;

		let a0 = this.x;					// = a1
		let b0 = this.y;					// = b2
		let b1 = this.y + this.height;		// = b3
		let a2 = this.x + this.width;		// = a3
			//(li oben + zw y0 und y1) 		od. (li unten + zw y0 und y1)			od. (re oben + zw y2 und y3)			od. (re unten + zw y2 und y3)
		if ((a0 < x0 && b0 > y0 && b0 < y1) || (a0 < x0 && b1 > y0 && b1 < y1) || (a2 > x2 && b0 > y2 && b0 < y3) || (a2 > x2 && b1 > y2 && b1 < y3)){
			return true;
		}
	}
	return false;
};
