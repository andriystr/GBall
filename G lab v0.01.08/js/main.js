var b = new Arc({
	x : (50 * 2) + 25,
	y : (50 * 1) + 25,
	r : 15,
	color : "#ee3"
});

var ctr = {
	u : false,
	l : false,
	r : false,
	space : false
};

b.s = 0;
b.p = 0.3;

b.din = function(map){
	this.s += this.p;
	if(ctr.r)this.x += 6;
	if(ctr.l)this.x -= 6;
	if(ctr.u)this.s = -10;
	this.y += this.s;
	if(this.x < 0 || this.y < 0 || this.x > map.fieldW*50 || this.y > map.fieldH*50){
		map.initField();
		map.genLab(19, 19);
		map.field[map.fieldH - 2][map.fieldW - 1] = " ";
		this.x = (50 * 2) + 25;
		this.y = (50 * 1) + 25;
		cam.x = this.x;
		cam.y = this.y;
	}
	var m = [];
	var x = Math.floor(this.x / 50);
	var y = Math.floor(this.y / 50);
	for(var i = y - 1; i <= y + 1; i++){
		for(var j = x - 1; j <= x + 1; j++){
			var t = map.toRect(j, i);
			if(t)m.push(t);
		}
	}
	for(var i = 0; i < m.length; i++){
		var e = m[i];
		if(intersect({
			x1 : this.x - this.r,
			y1 : this.y - this.r,
			x2 : this.x + this.r,
			y2 : this.y + this.r
		}, {
			x1 : e.x,
			y1 : e.y,
			x2 : e.x + e.w,
			y2 : e.y + e.h
		})){
			if(this.y < e.y + e.h && this.x > e.x && this.x < e.x + e.w){
				this.y = e.y - this.r;
				this.s /= -5.6;
				if(this.s > -0.5 && this.s < 0.3)this.s = 0;
			}
			if(this.x > e.x + e.w && this.y > e.y && this.y < e.y + e.h){
				this.x = e.x + e.w + this.r;
			}
			if(this.x < e.x && this.y > e.y && this.y < e.y + e.h){
				this.x = e.x - this.r;
			}
			if(this.y > e.y && this.x > e.x && this.x < e.x + e.w){
				this.y = e.y + e.h + this.r;
				this.s = 0;
			}
		}
	}
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

var banresize = () => {

}

function step(){
	clear();
	b.draw();
	b.din(map);
	map.draw();
	b.camera();
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

cam.x = b.x;
cam.y = b.y;

document.body.onload = () => {
	var el = document.querySelectorAll("div a");
	el.forEach(e => e.remove());
	initcontrols();
	step();
	document.body.onload = null;
}
