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
	if(library.keyPress(87) && !this.allowJumpFunc && this.velocity == 0){// Press W to Jump
			this.allowJumpFunc = true;
			this.velocity = -23; //set a negative velocity
	}
	if(this.allowJumpFunc){
		this.jump(this.box1); //jumping function (all it does is increase the velocity)
	}
	if(this.velocity >= 0){ //check if the object is stationary or has a positive velocity
		let foo = true;
		for(var i = 0; i < this.platArray.length; i++){
			let platform = this.platArray[i];
			// determine if the object is on the top of a platform
			if(this.box1.x > platform.x && this.box1.x < platform.x + platform.w
			|| this.box1.x + this.box1.w > platform.x && this.box1.x +this.box1.w < platform.x + platform.w){
				if(this.box1.y + this.box1.h <= platform.y && this.box1.y + this.box1.h + this.velocity >= platform.y){
					foo = false;
					this.box1.y = platform.y - this.box1.h; // set the y axis accordingly
					this.velocity = 0; //set the velocity to 0
					break;
				}
			}
		}
		if (this.box1.y + this.box1.h < cameraH && foo){
			this.velocity++; //increase the velocity of a falling object and provided that it is not on a platform ie. gravity
		}
	}

	if(this.box1.y + this.box1.h > cameraH){ //ensure that the object does not go below the floor
		this.box1.y = cameraH - this.box1.h;
		this.velocity = 0;
	}

	this.box1.y += this.velocity; //add the velocity (NOTE: positive velocity us moving down; negative velocity is moving up)
});

map.value = "map2";