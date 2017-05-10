function update() {
    currentMap.run.call(currentMap);
    library.update();
    requestAnimationFrame(function () { update.call(currentMap); });
}
var camera = document.getElementById("screen"); //link to the screen
var cameraW = 800;
var cameraH = 600;
var currentMapDIV; //linking to the current map container
var currentMap;
var stopRecurring = false;
var idGenerator = 1;
camera.style.width = cameraW + "px";
camera.style.height = cameraH + "px";
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
                console.log("test");
                if (!stopRecurring) {
                    stopRecurring = true;
                    update(); //run the update function (only once so that the functions do not overlap)
                }
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
            for (var i in object) {
                this[i] = object[i];
            }
            camera.innerHTML += "<div id = '" + this.id + "'></div>"; //adding the div, and linking it to a div
            var created = document.getElementById(this.id);
            for (var i in object.style) {
                created.style[i] = object.style[i];
            }
            created.style.position = "absolute";
            created.style.width = this.w + "px";
            created.style.height = this.h + "px";
            created.style.left = this.x + "px";
            created.style.top = this.y + "px";
            mapContainer.push(this); //pushing the map into an array
        }
        return map_create;
    }());
    library.map_create = map_create;
    var create = (function () {
        function create(object) {
            var _this = this;
            this.on = function (event, code1, code2) {
                if (code2 === void 0) { code2 = function () { }; }
                if (event == "hover") {
                    document.getElementById(_this.id).addEventListener("mouseover", function () {
                        code1.call(currentMap);
                    });
                    document.getElementById(_this.id).addEventListener("mouseout", function () {
                        code2.call(currentMap);
                    });
                }
                if (event == "click") {
                    document.getElementById(_this.id).addEventListener("click", function () {
                        code1.call(currentMap);
                    });
                }
            };
            //setting x, y, id and style
            for (var i in object) {
                this[i] = object[i];
            }
            this.id = idGenerator + " ";
            idGenerator++;
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
    this.image = new library.create({
        x: 0,
        y: 0,
        w: map2.w,
        h: map2.h,
        content: "<img src = 'http://i.imgur.com/qlgoLVk.png' height='100%'>",
        style: {}
    });
    this.box1 = new library.create({
        x: 0,
        y: cameraH - 100 - 100,
        w: 50,
        h: 100,
        velocityX: 0,
        velocityY: 0,
        content: "lol",
        style: {
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
            velocityX: -3,
            velocityY: 0,
            content: " ",
            style: {
                "background-color": "red",
                "z-index": "2"
            }
        }),
        this.plat2 = new library.create({
            x: 200,
            y: 150,
            w: 200,
            h: 20,
            velocityX: 0,
            velocityY: 3,
            content: " ",
            style: {
                "background-color": "red",
                "z-index": "2"
            }
        }),
        this.platground = new library.create({
            x: 0,
            h: 100,
            y: cameraH - 100,
            w: this.w,
            velocityX: 0,
            velocityY: 0,
            content: " ",
            style: {
                "background-color": "orange",
                "z-index": "2"
            }
        })
    ];
    this.frames = 0;
    this.allowJumpFunc = false;
    this.speed = 5;
    this.jump = function (object) {
        if (!library.keyPress(87)) {
            object.velocityY += 15;
        }
        object.velocityY += 1;
        if (object.velocityY > 0)
            object.velocityY = 0;
        if (object.velocityY >= 0) {
            this.allowJumpFunc = false;
        }
    };
    this.box1.on("hover", function () {
        this.box1.style["backgroundColor"] = "#E99E9E";
    }, function () {
        this.box1.style["backgroundColor"] = "lightgreen";
    });
    this.box1.on("click", function () {
        map.value = "map1";
    });
    var _loop_1 = function () {
        var currentPlat = this_1.platArray[i];
        this_1.platArray[i].on("hover", function () {
            currentPlat.style["backgroundColor"] = "blue";
        }, function () {
            currentPlat.style["backgroundColor"] = "red";
        });
    };
    var this_1 = this;
    for (var i = 0; i < this.platArray.length; i++) {
        _loop_1();
    }
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
var onPlat = false;
map2.run(function () {
    onPlat = false;
    this.box1.velocityX = 0;
    if (this.platArray[0].x < 50)
        this.platArray[0].velocityX = 3; //move first platform left and right
    else if (this.platArray[0].x > 600)
        this.platArray[0].velocityX = -3;
    if (this.platArray[1].y < 50)
        this.platArray[1].velocityY = 3; // move second platform up and down
    else if (this.platArray[1].y > 400)
        this.platArray[1].velocityY = -3;
    if (this.box1.x >= 400)
        this.x = -(this.box1.x - 400) - 5; //camera
    else
        this.x = 0;
    if (this.allowJumpFunc) {
        this.jump(this.box1); //jumping function (all it does is increase the velocity)
    }
    if (!this.allowJumpFunc) {
        var foo = true;
        for (var i = 0; i < this.platArray.length; i++) {
            var platform = this.platArray[i];
            if (platform.style["display"] == "none")
                continue;
            // determine if the object is on the top of a platform
            if (this.box1.x > platform.x && this.box1.x < platform.x + platform.w
                || this.box1.x + this.box1.w > platform.x && this.box1.x + this.box1.w < platform.x + platform.w) {
                if ((this.box1.y + this.box1.h <= platform.y && this.box1.y + this.box1.h + this.box1.velocityY >= platform.y)
                    || this.box1.y + this.box1.h == platform.y) {
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
        if (this.box1.y + this.box1.h < cameraH && foo) {
            this.box1.velocityY++; //increase the velocity of a falling object and provided that it is not on a platform ie. gravity
        }
    }
    if (library.keyPress(65)) {
        if (this.box1.velocityX > 0)
            this.box1.velocityX = -(this.speed - this.box1.velocityX);
        else
            this.box1.velocityX -= this.speed; //A
        //console.log(this.box1.velocityX);
        //if(this.box1.x >= 400 && this.box1.x <= this.w - 400)this.x += this.speed;
    }
    if (library.keyPress(68)) {
        if (this.box1.velocityX < 0)
            this.box1.velocityX = this.speed + this.box1.velocityX;
        else
            this.box1.velocityX += this.speed; //D
        //if(this.box1.x >= 400 && this.box1.x <= this.w - 400)this.x -= this.speed;
    }
    if (library.keyPress(87) && !this.allowJumpFunc && onPlat) {
        this.allowJumpFunc = true;
        this.box1.velocityY = -23; //set a negative velocity
    }
    if (this.box1.y + this.box1.h > cameraH) {
        this.box1.y = cameraH - this.box1.h;
        this.box1.velocityY = 0;
    }
    //console.log(this.box1.velocityY);
    for (var i = 0; i < this.objectContainer.length; i++) {
        this.objectContainer[i].y += this.objectContainer[i].velocityY;
        this.objectContainer[i].x += this.objectContainer[i].velocityX;
    }
    this.frames++;
});
map.value = "map2";
