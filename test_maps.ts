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
		id:"box1",
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
		id:"box2",
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
		id:"box3",
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
		id:"image",
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
	this.box4 = new library.create({
		x:0,
		y:0,
		w:100,
		h:100,
		content:"lol",
		id:"box4",
		style:{
			"font-size": "20px",
			"backgroundColor": "green",
			"display": "flex",
			"align-items": "center",
			"justify-content": "center",
			"font-family": "Roboto Thin"
		}
	});
});