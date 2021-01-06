function randPair(v){
	v = rand() % v;
	v -= v % 2;
	return Math.abs(v);
}

function Map(){
	this.field = [];

	this.fieldW = 41;
	this.fieldH = 41;

	this.initField = function(){
		this.fieldW = randPair(9) * 10 + 21;
		this.fieldH = randPair(9) * 10 + 21;
		while(this.field.length > 0)this.field.pop();
		for(var i = 0; i < this.fieldH; i++){
			var t = [];
			for(var j = 0; j < this.fieldW; j++){
				if(i % 2 == 0 || j % 2 == 0) t.push('0');
				else t.push('-');
			}
			this.field.push(t);
		}
	}

	this.genLab = function(x = 1, y = 1){
		var next;
		var stc = [];
		stc.push({x : x, y : y});
		this.field[y][x] = ' ';
		while(true){
			while(true){
				var s = [];
				var nStep;

				if(x - 2 >= 0 && this.field[y][x - 2] == '-')s.push({x : x - 2, y : y});
				if(y - 2 >= 0 && this.field[y - 2][x] == '-')s.push({x : x, y : y - 2});
				if(x + 2 < this.fieldW && this.field[y][x + 2] == '-')s.push({x : x + 2, y : y});
				if(y + 2 < this.fieldH && this.field[y + 2][x] == '-')s.push({x : x, y : y + 2});
				
				if(s.length < 1)break;
				nStep = rand() % s.length;

				while(s.length - 1 > nStep)s.pop();
				next = s.pop();
				while(s.length > 0)s.pop();
				stc.push({x : next.x, y : next.y});
				this.field[next.y][next.x] = ' ';
				if(next.x < x)this.field[next.y][next.x + 1] = ' ';
				if(next.x > x)this.field[next.y][next.x - 1] = ' ';
				if(next.y < y)this.field[next.y + 1][next.x] = ' ';
				if(next.y > y)this.field[next.y - 1][next.x] = ' ';
				x = next.x;
				y = next.y;
			}
			var n = 0;
			while(true){
				var t = stc.pop();
				x = t.x;
				y = t.y;
				if(x - 2 >= 0 && this.field[y][x - 2] == '-')n++;
				if(y - 2 >= 0 && this.field[y - 2][x] == '-')n++;
				if(x + 2 < this.fieldW && this.field[y][x + 2] == '-')n++;
				if(y + 2 < this.fieldH && this.field[y + 2][x] == '-')n++;
				delete t;
				if(stc.length < 1){
					return;
				}
				if(n > 0)break;
			}
		}
	}

	this.draw = function(){
		for(var i = 0; i < this.field.length; i++){
			for(var j = 0; j < this.field[i].length; j++){
				if(this.field[i][j] == "0"){
					c.fillStyle = "#333";
					c.strokeStyle = "#222";
					c.beginPath();
					c.rect(((j * 50) - cam.x) * cam.zoom, ((i * 50) - cam.y) * cam.zoom, 50 * cam.zoom, 50 * cam.zoom);
					c.fill();
					c.stroke();
				}
			}
		}
	}

	this.toRect = function(x, y){
		if(x >= 0 && y >= 0 && y < this.field.length && x < this.field[y].length && this.field[y][x] == "0"){
			var t = {
				x : 50 * x,
				y : 50 * y,
				w : 50,
				h : 50
			};
			return t;
		}
		return null;
	}
}

var map = new Map();
map.initField();
map.genLab(19, 19);
map.field[map.fieldH - 2][map.fieldW - 1] = " ";
