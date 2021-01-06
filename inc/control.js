function initcontrols(){
	if(isMobile()){

		var jstl = newElem("div");
		jstl.style.cssText = `
			position: absolute;
			background: transparent;
			left: 10px;
			bottom: 10px;
			z-index: 999;
		`;

		var left = newElem("div");
		//left.innerHTML = "<";
		var arleft = newElem("div");
		arleft.style.cssText = `
			width: 6vh;
			height: 6vh;
			margin: 2.5vh;
			background: transparent;
			transform: rotateZ(45deg);
			border-bottom: 1vh solid;
			border-left: 1vh solid;
		`;

		left.appendChild(arleft);

		var right = newElem("div");
		//right.innerHTML = ">";
		var arright = newElem("div");
		arright.style.cssText = `
			width: 6vh;
			height: 6vh;
			margin: 2.5vh;
			background: transparent;
			transform: rotateZ(45deg);
			border-top: 1vh solid;
			border-right: 1vh solid;
		`;

		right.appendChild(arright);

		left.style.cssText = right.style.cssText = `
			background: #3335;
			color: #CCC;
			display: inline-block;
			margin: 1vw;
			padding: 0 3vw;
			border: 0.8vh solid;
			border-radius: 3vh;
		`;

		jstl.appendChild(left);
		jstl.appendChild(right);

		var jstr = newElem("div");
		jstr.style.cssText = `
			position: absolute;
			background: transparent;
			right: 10px;
			bottom: 10px;
			z-index: 999;
		`;

		var tsl = e => {
			e.stopImmediatePropagation();
			ctr.l = true;
			left.style.color = "#C00";
		}
		var tel = e => {
			e.stopImmediatePropagation();
			ctr.l = false;
			left.style.color = "#CCC";
		}

		left.addEventListener("touchstart", tsl, false);
		left.addEventListener("touchend", tel, false);

		var tsr = e => {
			e.stopImmediatePropagation();
			ctr.r = true;
			right.style.color = "#C00";
		}
		var ter = e => {
			e.stopImmediatePropagation();
			ctr.r = false;
			right.style.color = "#CCC";
		}

		right.addEventListener("touchstart", tsr, false);
		right.addEventListener("touchend", ter, false);

		var scale = newElem("div");
		var up = newElem("div");

		var arscale = newElem("div");
		arscale.style.cssText = `
			width: 6vh;
			height: 6vh;
			margin: 2vh;
			background: transparent;
			border: 1vh solid;
		`;
		scale.appendChild(arscale);

		var arup = newElem("div");
		arup.style.cssText = `
			width: 6vh;
			height: 6vh;
			margin: 2.5vh;
			margin-top: 4vh;
			margin-bottom: 1vh;
			background: transparent;
			transform: rotateZ(45deg);
			border-top: 1vh solid;
			border-left: 1vh solid;
		`;
		up.appendChild(arup);

		jstr.appendChild(scale);
		jstr.appendChild(up);

		up.style.cssText = scale.style.cssText = `
			background: #3335;
			color: #CCC;
			display: inline-block;
			margin: 1vw;
			padding: 0 3vw;
			border: 0.8vh solid;
			border-radius: 3vh;
		`;

		var tss = e => {
			e.stopImmediatePropagation();
			ctr.space = true;
			scale.style.color = "#C00";
		}
		var tes = e => {
			e.stopImmediatePropagation();
			ctr.space = false;
			scale.style.color = "#CCC";
		}

		scale.addEventListener("touchstart", tss, false);
		scale.addEventListener("touchend", tes, false);

		var tsu = e => {
			e.stopImmediatePropagation();
			ctr.u = true;
			up.style.color = "#C00";
		}
		var teu = e => {
			e.stopImmediatePropagation();
			ctr.u = false;
			up.style.color = "#CCC";
		}

		up.addEventListener("touchstart", tsu, false);
		up.addEventListener("touchend", teu, false);

		document.body.appendChild(jstl);
		document.body.appendChild(jstr);

	}else {
		var keydown = function(e){
			switch(e.keyCode){
				case 65: ctr.l = true;
				break;
				case 68: ctr.r = true;
				break;
				case 87: ctr.u = true;
				break;
				case 32: ctr.space = true;
				break;
			}
		}
		var keyup = function(e){
			switch(e.keyCode){
				case 65: ctr.l = false;
				break;
				case 68: ctr.r = false;
				break;
				case 87: ctr.u = false;
				break;
				case 32: ctr.space = false;
				break;
			}
		}
		window.addEventListener("keydown", keydown, false);
		window.addEventListener("keyup", keyup, false);
	}
}