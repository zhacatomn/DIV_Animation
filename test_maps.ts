//map1
let map1 = new library.map_create({
	w: 3000,
	h: 600,
	x: 0,
	y: 0,
	id: "map1",
	style: {
	}
});

map1.add_elements(function(){
	this.box1 = new library.create({
		x: 50,
		y: 100,
		w: 200,
		h: 75,
		content:"This is some text =)",
		style: {
			"backgroundColor": "lightgreen",
			"border": "1px solid black",
			"display": "flex",
			"align-items": "center",
			"justify-content": "center",
			"font-family": "Roboto Condensed",
			"z-index": "3"
		}
	});

	this.box2 = new library.create({
		x: 0,
		y: 550,
		w: 50,
		h: 50,
		content:" ",
		style: {
			"backgroundColor": "lightblue",
			"border": "1px solid black",
			"display": "flex",
			"align-items": "center",
			"justify-content": "center",
			"borderRadius": "100%",
			"z-index": "3"
		}
	});

	this.box3 = new library.create({
		x: 2000,
		y: 100,
		w: 250,
		h: 100,
		content:"a box in the middle of nowhere =)",
		style: {
			"backgroundColor": "#CA8787",
			"border": "1px solid black",
			"display": "flex",
			"align-items": "center",
			"justify-content": "center",
			"font-family": "Agency FB",
			"color": "white",
			"z-index": "3"
		}
	});

	this.image = new library.create({
		x:0,
		y:0,
		w:map1.w,
		h:map1.h,
		content: "<img src = 'http://i.imgur.com/qlgoLVk.png' height='100%'>",
		style:{
			
		}
	});

	this.speed = 10;
	this.movX = -1;
	this.intial_y = this.box2.y;
	this.counter = 0;
	this.foo = 0;

});

//map2
let map2 = new library.map_create({
	x:0,
	y:0,
	w:3000,
	h:600,
	id:"map2",
	style:{
		"backgroundColor": "lightblue"
	}
});

map2.add_elements(function(){

	this.image = new library.create({
		x:0,
		y:0,
		w:map2.w,
		h:map2.h,
		content: "<img src = 'http://i.imgur.com/qlgoLVk.png' height='100%'>",
		style:{
			
		}
	});

	this.box1 = new library.create({
		x:0,
		y:cameraH - 100 - 100,
		w:50,
		h:100,
		velocityX:0,
		velocityY:0,
		content:"lol",
		style:{
			"font-size": "20px",
			"backgroundColor": "lightgreen",
			"display": "flex",
			"align-items": "center",
			"justify-content": "center",
			"font-family": "Roboto Thin",
			"z-index": "2"
		}
	});

	this.platArray = [
		this.plat1 = new library.create({
			x: 300,
			y: 300,
			w: 400,
			h: 20,
			velocityX:-3,
			velocityY:0,
			content: " ",
			style:{
				"background-color": "red",
				"z-index": "2"
			}
		}),

		this.plat2 = new library.create({
			x: 200,
			y: 150,
			w: 200,
			h: 20,
			velocityX:0,
			velocityY:3,
			content: " ",
			style:{
				"background-color": "red",
				"z-index": "2"
			}
		}),

		this.platground = new library.create({
			x: 0,
			h: 100,
			y: cameraH - 100,
			w: this.w,
			velocityX:0,
			velocityY:0,
			content: " ",
			style:{
				"background-color": "orange",
				"z-index": "2"
			}
		})
	];

	this.frames = 0;
	this.allowJumpFunc = false;
	this.speed = 5;

	this.jump = function(object){
		if(!library.keyPress(87)){
			object.velocityY += 15;
		}
		object.velocityY += 1;
		if(object.velocityY > 0)object.velocityY = 0;
		if(object.velocityY >= 0){
			this.allowJumpFunc = false;
		}
	}

	this.box1.on("hover", function(){
		this.box1.style["backgroundColor"] = "#E99E9E";
	}, function(){
		this.box1.style["backgroundColor"] = "lightgreen";
	});

	this.box1.on("click", function(){
		map.value = "map1";
	});

	for(var i = 0; i < this.platArray.length; i++){
		let currentPlat = this.platArray[i];

		this.platArray[i].on("hover", function(){
			currentPlat.style["backgroundColor"] = "blue";
		}, function(){
			currentPlat.style["backgroundColor"] = "red";
		});
	}
});