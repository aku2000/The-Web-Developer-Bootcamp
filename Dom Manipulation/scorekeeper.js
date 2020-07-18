var p1b = document.querySelector("#p1");
var p2b = document.getElementById("p2");
var reset = document.querySelector("#reset");
var numinput = document.querySelector("#num");
var p1s = 0;
var p2s = 0;
var gameover = false;
var winningscore = 5;

p1b.addEventListener("click", function() {
	if (!gameover) {
		p1s++;
		document.querySelector("#p1sd").textContent = p1s;
		if (p1s === winningscore) {
			document.querySelector("#p1sd").classList.add("green");
			gameover = true;
		}
	}
});

p2b.addEventListener("click", function() {
	if (!gameover) {
		p2s++;
		document.querySelector("#p2sd").textContent = p2s;
		if (p2s === winningscore) {
			document.querySelector("#p2sd").classList.add("green");
			gameover = true;
		}
	}
});

reset.addEventListener("click", res);

function res() {
	p1s = 0;
	p2s = 0;
	gameover = false;
	document.querySelector("#p2sd").classList.remove("green");
	document.querySelector("#p1sd").classList.remove("green");
	document.querySelector("#p1sd").textContent = p1s;
	document.querySelector("#p2sd").textContent = p2s;
}

numinput.addEventListener("change", function() {
	document.querySelector("#numberofgames").textContent = numinput.value;
	winningscore = Number(numinput.value);
	res();
});
