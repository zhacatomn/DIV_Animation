function update() {
    stopRecurring = true;
    currentMap.run.call(currentMap);
    library.update();
    requestAnimationFrame(function () { update.call(currentMap); });
}
var camera = document.getElementById("screen"); //link to the screen
var currentMapDIV; //linking to the current map container
var currentMap;
var stopRecurring = false;
var map = {
    set value(v) {
        this._value = v; //change value of map
        //check if the id aligns with one of the maps
        for (var i = 0; i < mapContainer.length; i++) {
            if (mapContainer[i].id == this._value) {
                currentMapDIV = document.getElementById(mapContainer[i].id); //set current map div to the new map
                currentMap = mapContainer[i]; //set currentMap to the new map
                for (var i = 0; i < mapContainer.length; i++) {
                    document.getElementById(mapContainer[i].id).style.display = "none"; //set all map to have no display
                }
                currentMapDIV.style.display = "inline"; //set only current map to have a display
                if (!stopRecurring)
                    update(); //run the update function (only once so that the functions do not overlap)
            }
        }
    },
    get value() {
        return this._value;
    }
};
var mapContainer = [];
var keyDown = [];
window.addEventListener("keydown", function (e) {
    keyDown[e.keyCode] = true;
});
window.addEventListener("keyup", function (e) {
    keyDown[e.keyCode] = false;
});
var library;
(function (library) {
    var map_create = (function () {
        function map_create(object) {
            var _this = this;
            this.objectContainer = [];
            this.add_elements = function (elements) {
                var prev_container = currentMapDIV;
                var prev_map = currentMap;
                currentMapDIV = document.getElementById(_this.id);
                currentMap = _this;
                elements.call(_this);
                currentMapDIV = prev_container;
                currentMap = prev_map;
            };
            this.run = function (new_run) {
                _this.run = new_run;
            };
            this.w = object.w;
            this.h = object.h;
            this.x = object.x;
            this.y = object.y;
            this.id = object.id;
            this.style = object.style;
            camera.innerHTML += "<div id = '" + this.id + "'></div>";
            var created = document.getElementById(this.id);
            for (var i in object.style) {
                created.style[i] = object.style[i];
            }
            created.style.position = "absolute";
            created.style.width = this.w + "px";
            created.style.height = this.h + "px";
            created.style.left = this.x + "px";
            created.style.top = this.y + "px";
            mapContainer.push(this);
        }
        return map_create;
    }());
    library.map_create = map_create;
    var create = (function () {
        function create(object) {
            //setting x, y, id and style
            this.x = object.x;
            this.y = object.y;
            this.w = object.w;
            this.h = object.h;
            this.id = object.id;
            this.style = object.style;
            //creating the div
            currentMapDIV.innerHTML += "<div id = '" + this.id + "'></div>";
            var created = document.getElementById(this.id);
            //style object
            for (var i in object.style) {
                created.style[i] = object.style[i];
            }
            //setting position and text of objects
            created.style.position = "absolute";
            created.style.left = this.x + "px";
            created.style.top = this.y + "px";
            created.style.width = this.w + "px";
            created.style.height = this.h + "px";
            created.innerHTML = object.content;
            //store all te objects in an array
            currentMap.objectContainer.push(this);
        }
        return create;
    }());
    library.create = create;
    function update() {
        for (var i = 0; i < currentMap.objectContainer.length; i++) {
            var updating = document.getElementById(currentMap.objectContainer[i].id);
            //change x and y positions
            updating.style.left = currentMap.objectContainer[i].x + "px";
            updating.style.top = currentMap.objectContainer[i].y + "px";
            updating.style.width = currentMap.objectContainer[i].w + "px";
            updating.style.height = currentMap.objectContainer[i].h + "px";
            //change the style
            for (var k in currentMap.objectContainer[i].style) {
                updating.style[k] = currentMap.objectContainer[i].style[k];
            }
        }
        //change x and y positions
        currentMapDIV.style.left = currentMap.x + "px";
        currentMapDIV.style.top = currentMap.y + "px";
    }
    library.update = update;
    function collide(obj1, obj2) {
        var foo1 = obj1;
        var foo2 = obj2;
        for (var i = 0; i < 2; i++) {
            if (foo1.x >= foo2.x && foo1.x <= foo2.x + foo2.w ||
                foo1.x + foo1.w >= foo2.x && foo1.x + foo1.w <= foo2.x + foo2.w) {
                if (foo1.y >= foo2.y && foo1.y <= foo2.y + foo2.h ||
                    foo1.y + foo1.h >= foo2.y && foo1.y + foo1.h <= foo2.y + foo2.h) {
                    return true;
                }
            }
            foo1 = obj2;
            foo2 = obj1;
        }
        return false;
    }
    library.collide = collide;
    function keyPress(x) {
        if (keyDown[x])
            return true;
        else
            return false;
    }
    library.keyPress = keyPress;
    function trajectory(x, angle, intialV) {
        var radToDeg = Math.PI / 180;
        var result = (x * Math.tan(angle * radToDeg)) - ((9.80 * Math.pow(x, 2)) /
            (2 * Math.pow(intialV, 2) * Math.pow(Math.cos(angle * radToDeg), 2)));
        if (result > 0)
            return result;
        else
            return 0;
    }
    library.trajectory = trajectory;
})(library || (library = {}));
//map1
var map1 = new library.map_create({
    w: 3000,
    h: 600,
    x: 0,
    y: 0,
    id: "map1",
    style: {}
});
map1.add_elements(function () {
    this.box1 = new library.create({
        x: 50,
        y: 100,
        w: 200,
        h: 75,
        id: "box1",
        content: "This is some text =)",
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
        id: "box2",
        content: " ",
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
        id: "box3",
        content: "a box in the middle of nowhere =)",
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
        x: 0,
        y: 0,
        w: map1.w,
        h: map1.h,
        id: "image",
        content: "<img src = 'http://i.imgur.com/qlgoLVk.png' height='100%'>",
        style: {}
    });
    this.speed = 10;
    this.movX = -1;
    this.intial_y = this.box2.y;
    this.counter = 0;
    this.foo = 0;
});
//map2
var map2 = new library.map_create({
    x: 0,
    y: 0,
    w: 3000,
    h: 600,
    id: "map2",
    style: {
        "backgroundColor": "lightblue"
    }
});
map2.add_elements(function () {
    this.box4 = new library.create({
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        content: "lol",
        id: "box4",
        style: {
            "font-size": "20px",
            "backgroundColor": "green",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            "font-family": "Roboto Thin"
        }
    });
});
map1.run(function () {
    if (this.box1.x < 50)
        this.movX = 1;
    if (this.box1.x > 450)
        this.movX = -1;
    this.box1.x += this.speed * this.movX;
    //setting keypresses
    if (library.keyPress(87))
        this.box2.y -= this.speed; //W
    if (library.keyPress(83))
        this.box2.y += this.speed; //S
    if (library.keyPress(65)) {
        this.box2.x -= this.speed; //A
        if (this.box2.x >= 400 && this.box2.x <= this.w - 500)
            this.x += this.speed;
    }
    if (library.keyPress(68)) {
        this.box2.x += this.speed; //D
        if (this.box2.x >= 400 && this.box2.x <= this.w - 500)
            this.x -= this.speed;
    }
    if (this.box2.x < 400)
        this.x = 0;
    if (library.collide(this.box1, this.box2)) {
        this.box2.style["backgroundColor"] = "lightgreen";
    }
    else {
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
map2.run(function () {
});
map.value = "map1";
