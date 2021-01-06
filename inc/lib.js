var cam = {
	x : 0,
	y : 0,
	zoom : (canv.width > canv.height ? canv.height : canv.width) / 400
};

function Store(v){
	var v = v;
	this.get = function(){return v}
}

function isMobile(){
	return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Opera Mobile|Kindle|Windows Phone|PSP|AvantGo|Atomic Web Browser|Blazer|Chrome Mobile|Dolphin|Dolfin|Doris|GO Browser|Jasmine|MicroB|Mobile Firefox|Mobile Safari|Mobile Silk|Motorola Internet Browser|NetFront|NineSky|Nokia Web Browser|Obigo|Openwave Mobile Browser|Palm Pre web browser|Polaris|PS Vita browser|Puffin|QQbrowser|SEMC Browser|Skyfire|Tear|TeaShark|UC Browser|uZard Web|wOSBrowser|Yandex.Browser mobile|Mobile/i.test(navigator.userAgent.toLowerCase()));
}

function isLandscape(){
	return (/landscape/i.test(screen.orientation.type) && window.innerHeight < window.innerWidth);
}

var newElem = e => document.createElement(e);

function clear(){
	c.clearRect(0, 0, canv.width, canv.height);
}

function rand(){

var a = Math.random();
var b = Math.random();

ra = Math.cos(2 * Math.PI * a) * Math.sqrt( -2 * Math.log(b) );
rb = Math.sin(2 * Math.PI * a) * Math.sqrt( -2 * Math.log(b) );

return Math.abs(Math.floor(ra * 1000000000000000));

}

function len(o){
	return Math.sqrt(Math.pow(o.x1 - o.x2, 2) + Math.pow(o.y1 - o.y2, 2));
}

function intersect(a, b){
	return ((a.x1 > b.x1 && a.x1 < b.x2) || (a.x2 > b.x1 && a.x2 < b.x2) || (a.x1 == b.x1)) && ((a.y1 > b.y1 && a.y1 < b.y2) || (a.y2 > b.y1 && a.y2 < b.y2) || (a.y1 == b.y1));
}

function Arc(o){
	this.x = o.x;
	this.y = o.y;
	this.r = o.r;
	this.color = o.color || "#000";
	this.draw = function(){
		c.beginPath();
		c.fillStyle = this.color;
		c.arc((this.x - cam.x) * cam.zoom, (this.y - cam.y) * cam.zoom, this.r * cam.zoom, 0, Math.PI*2, false);
		c.fill();
	}
}

function Rect(o){
	this.x = o.x;
	this.y = o.y;
	this.w = o.w;
	this.h = o.h;
	this.color = o.color || o.fillColor;
	this.strokeColor = o.strokeColor;
	this.lineWidth = o.lineWidth;
	this.draw = function(){
		c.beginPath();
		c.rect((this.x - cam.x) * cam.zoom, (this.y - cam.y) * cam.zoom, this.w * cam.zoom, this.h * cam.zoom);
		if(this.color){
			c.fillStyle = this.color;
			c.fill();
		}
		if(this.strokeColor){
			c.strokeStyle = this.strokeColor;
			if(this.lineWidth)c.lineWidth = this.lineWidth * cam.zoom;
			c.stroke();
		}
	}
}
