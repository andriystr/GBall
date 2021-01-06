var walls = [];

for(i = 0; i < map.length; i++){
	for(j = 0; j < map[i].length; j++){
		if(map[i][j] == "0")walls.push(new Rect({
			x : 50 * j,
			y : 50 * i,
			w : 50,
			h : 50,
			strokeColor : "#666",
			color : "#111",
			lineWidth : 1.5
		}));
		if(map[i][j] == "b")window.b = new Arc({
			x : (50 * j) + 25,
			y : (50 * i) + 25,
			r : 15
		});
	}
}

walls.draw = function(){
	this.forEach(function(e){
		e.draw();
	});
}

walls.din = function(o){
	this.forEach(function(e){
		if(intersect({
			x1 : o.x - o.r,
			y1 : o.y - o.r,
			x2 : o.x + o.r,
			y2 : o.y + o.r
		}, {
			x1 : e.x,
			y1 : e.y,
			x2 : e.x + e.w,
			y2 : e.y + e.h
		})){
			if(o.y < e.y + e.h && o.x > e.x && o.x < e.x + e.w){
				o.y = e.y - o.r;
				o.s /= -5.6;
				if(o.s > -0.5 && o.s < 0.3)o.s = 0;
			}
			if(o.x > e.x + e.w && o.y > e.y && o.y < e.y + e.h){
				o.x = e.x + e.w + o.r;
			}
			if(o.x < e.x && o.y > e.y && o.y < e.y + e.h){
				o.x = e.x - o.r;
			}
			if(o.y > e.y && o.x > e.x && o.x < e.x + e.w){
				o.y = e.y + e.h + o.r;
				o.s = 0;
			}
		}
	});
}

var ctr = {
	u : false,
	l : false,
	r : false,
	space : false
};

b.s = 0;
b.p = 0.3;

b.din = function(){
	this.s += this.p;
	if(ctr.r)this.x += 6;
	if(ctr.l)this.x -= 6;
	if(ctr.u)this.s = -8;
	this.y += this.s;
}

var Zoom = new Store(cam.zoom);
var MinZoom = new Store(cam.zoom / 4);

b.camera = function(){
	var x = this.x - canv.width / cam.zoom / 2;
	var y = this.y - canv.height / cam.zoom / 2;
	if(cam.x < x)cam.x += (x - cam.x) / 10;
	if(cam.x > x)cam.x -= (cam.x - x) / 10;
	if(cam.y < y)cam.y += (y - cam.y) / 10;
	if(cam.y > y)cam.y -= (cam.y - y) / 10;
	if(ctr.space)cam.zoom = (cam.zoom > MinZoom.get() ? cam.zoom - MinZoom.get() / 5 : cam.zoom);
	else cam.zoom = (cam.zoom < Zoom.get() ? cam.zoom + MinZoom.get() / 5 : cam.zoom)
}

var func;

function step(){
	clear();
	b.draw();
	b.din();
	b.camera();
	walls.draw();
	walls.din(b);
	if(typeof(func) == "function")func();
	if(!isMobile())
		requestAnimationFrame(step);
	else if(/landscape/i.test(screen.orientation.type))
		requestAnimationFrame(step);
	else {
		var ban = newElem("div");
		ban.innerHTML = "&#8634;";
		ban.style.cssText = `
			width: 100vw;
			height: 100vh;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 999999;
			color: #CCC;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #333;
			font-size: 16vmax;
		`;

		resizefunc = () => {
			if(/landscape/i.test(screen.orientation.type)){
				ban.remove();
				resizefunc = null;
				step();
			}
		}

		document.body.appendChild(ban);
	}
}

document.body.onload = () => {
	var el = document.querySelectorAll("div a");
	el.forEach(e => e.remove());
	initcontrols();
	step();
	document.body.onload = null;
}
