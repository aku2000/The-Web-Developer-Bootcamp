var secretNumber = prompt("Enter the secret number!");
var flag = false;
while (!flag) {
	var guess = prompt("Guess the number!");
	if (Number(guess) === secretNumber) {
		alert("BINGO! You Guessed it right!");
		flag = true;
	} else if (Number(guess) < secretNumber) {
		alert("Too Low!!!");
	} else {
		alert("Too High!!!");
	}
}
