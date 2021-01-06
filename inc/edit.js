var r = new Rect({
	x : 0,
	y : 0,
	w : 50,
	h : 50,
	strokeColor : "#333"
});

function edit(){
	if(!isMobile())canv.addEventListener("mousemove", mousemove, false);
	canv.addEventListener("click", click, false);
	func = function(){
		r.draw();
	}
}

function mousemove(e){
	var x = (e.x / cam.zoom) + cam.x;
	var y = (e.y / cam.zoom) + cam.y;
	x -= (x % 50) + (x < 0 ? 50 : 0);
	y -= (y % 50) + (y < 0 ? 50 : 0);
	r.x = x;
	r.y = y;
	r.draw();
}

function click(e){
	var x = (e.x / cam.zoom) + cam.x;
	var y = (e.y / cam.zoom) + cam.y;
	x -= (x % 50) + (x < 0 ? 50 : 0);
	y -= (y % 50) + (y < 0 ? 50 : 0);
	walls.reverse();
	var tmp = walls.pop();
	walls.reverse();
	tmp.x = x;
	tmp.y = y;
	walls.push(tmp/*new Rect({
		x : x,
		y : y,
		w : 30,
		h : 30,
		strokeColor : "#666",
		color : "#111",
		lineWidth : 1.5
	})*/);
}

edit();
