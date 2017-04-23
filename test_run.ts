map1.run(function(){
	if(this.box1.x < 50)this.movX = 1;
	if(this.box1.x > 450)this.movX = -1;
	this.box1.x += this.speed * this.movX;
	
	//setting keypresses
	if(library.keyPress(87)) this.box2.y -= this.speed;//W
	if(library.keyPress(83)) this.box2.y += this.speed;//S
	if(library.keyPress(65)) {
		this.box2.x -= this.speed;//A
		if(this.box2.x >= 400 && this.box2.x <= this.w - 500)this.x += this.speed;
	}
	if(library.keyPress(68)) {
		this.box2.x += this.speed;//D
		if(this.box2.x >= 400 && this.box2.x <= this.w - 500)this.x -= this.speed;
	}

	if(this.box2.x < 400)this.x = 0;

	if(library.collide(this.box1, this.box2)){
		this.box2.style["backgroundColor"] = "lightgreen";
	}		else{
		this.box2.style["backgroundColor"] = "lightblue";
	}
	//trajectory
	/*
	if(this.counter < 2){ //if coutner is 2, then ball has touched the floor after being thrown
			this.box2.y = this.intial_y - library.trajectory(this.box2.x, 20, 200); //increases the y axis of the ball for throwing ball
			this.box2.x += this.speed; //
			if(this.box2.x > 400 && this.box2.x < this.w - 400){
			this.x -= this.speed;
		}
	}
	
	if(this.box2.y == this.intial_y) this.counter++;
	*/
});



map2.run(function(){
	if(library.keyPress(65))this.box1.x -= this.speed; //A
	if(library.keyPress(68))this.box1.x += this.speed; //D
	if(library.keyPress(87) && !this.allowJumpFunc){// Press W to Jump
			this.jumpSpeed = this.INITIALJUMPSPEED;
			this.allowJumpFunc = true;
	}
	if(this.allowJumpFunc){
		this.jump(this.box1);
	}
});

map.value = "map2";