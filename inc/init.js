var canv = document.createElement("canvas");
var c = canv.getContext("2d");
canv.width = window.innerWidth;
canv.height = window.innerHeight;
document.body.appendChild(canv);
document.body.style.cssText = "margin: 0; overflow: hidden;";
if(window.bgdark)canv.style.cssText = "background: #111;";
window.addEventListener("resize", resize, false);
var resizefunc = null;
function resize(){
	canv.width = window.innerWidth;
	canv.height = window.innerHeight;
	cam.zoom = (canv.width > canv.height ? canv.height : canv.width) / 400;
	if(typeof resizefunc == "function")resizefunc();
}

//====== Debug =======

window.addEventListener('error', function(e){
	alert(`${e.message} at ${e.filename} ${e.lineno}:${e.colno}`)
})
