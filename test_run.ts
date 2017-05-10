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

var onPlat = false;

map2.run(function(){

	onPlat = false;

	this.box1.velocityX = 0;

	if(this.platArray[0].x < 50) this.platArray[0].velocityX = 3;//move first platform left and right
	else if(this.platArray[0].x > 600) this.platArray[0].velocityX = -3;

	if(this.platArray[1].y < 50) this.platArray[1].velocityY = 3; // move second platform up and down
	else if(this.platArray[1].y > 400)this.platArray[1].velocityY = -3;

	if(this.box1.x >= 400)this.x = -(this.box1.x - 400) - 5 //camera
	else this.x = 0;

	if(this.allowJumpFunc){
		this.jump(this.box1); //jumping function (all it does is increase the velocity)
	}
	if(!this.allowJumpFunc){ //check if the object is stationary or has a positive velocity
		let foo = true;
		for(var i = 0; i < this.platArray.length; i++){
			let platform = this.platArray[i];
			if (platform.style["display"] == "none")continue;
			// determine if the object is on the top of a platform
			if(this.box1.x > platform.x && this.box1.x < platform.x + platform.w
			|| this.box1.x + this.box1.w > platform.x && this.box1.x +this.box1.w < platform.x + platform.w){
				if((this.box1.y + this.box1.h <= platform.y && this.box1.y + this.box1.h + this.box1.velocityY >= platform.y)
					//landing on plat
					|| this.box1.y + this.box1.h == platform.y){//already on plat
					onPlat = true; // set it to be on a platform
					foo = false;
					this.box1.y = platform.y - this.box1.h; // set the y axis accordingly
					// transfer platform velocity to box1
					this.box1.velocityY = platform.velocityY; 
					this.box1.velocityX = platform.velocityX;
					break;
				}
			}
		}
		if (this.box1.y + this.box1.h < cameraH && foo){
			this.box1.velocityY++; //increase the velocity of a falling object and provided that it is not on a platform ie. gravity
		}
	}

	if(library.keyPress(65)){
		if(this.box1.velocityX > 0) this.box1.velocityX = -(this.speed - this.box1.velocityX);
		else this.box1.velocityX -= this.speed; //A
		//console.log(this.box1.velocityX);
		//if(this.box1.x >= 400 && this.box1.x <= this.w - 400)this.x += this.speed;
	}
	if(library.keyPress(68)){
		if(this.box1.velocityX < 0) this.box1.velocityX = this.speed + this.box1.velocityX;
		else this.box1.velocityX += this.speed; //D
		//if(this.box1.x >= 400 && this.box1.x <= this.w - 400)this.x -= this.speed;
	}
	if(library.keyPress(87) && !this.allowJumpFunc && onPlat){// Press W to Jump
			this.allowJumpFunc = true;
			this.box1.velocityY = -23; //set a negative velocity
	}

	if(this.box1.y + this.box1.h > cameraH){ //ensure that the object does not go below the floor
		this.box1.y = cameraH - this.box1.h;
		this.box1.velocityY = 0;
	}
	//console.log(this.box1.velocityY);
	for(var i = 0; i < this.objectContainer.length; i++){ //updating the velocity of all the objects
		this.objectContainer[i].y += this.objectContainer[i].velocityY;
		this.objectContainer[i].x += this.objectContainer[i].velocityX;
	}

	this.frames++;
});

map.value = "map2";