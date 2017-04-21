		var world = [
			[4,5,4,4,4],
			[2,1,2,2,2],
			[2,1,2,3,2],
			[2,1,2,1,2],
			[2,1,1,1,2],
			[2,2,2,1,2],
			[2,2,2,0,2]
		];
	var score = 0;
	var pacman = {
		x:3, 
		y:6
	};
	function displayWorld(){
		var output = '';
		for(var i=0; i<world.length; i++){
			output += "\n<div class='section'>\n"; 
			for(var j=0; j<world[i].length; j++){
				if(world[i][j] == 2)
					output+="<div class='brick'></div>";
				else if(world[i][j] == 1)
					output+="<div class='coin'></div>";
				else if(world[i][j] == 3)
					output+="<div class='cherry'></div>";
				else if(world[i][j] == 4)
					output+="<div class='grass'></div>";
				else if(world[i][j] == 5)
					output+="<div class='finish'></div>";
				else if(world[i][j] == 6)
					output+="<div class='explode'></div>";
				if(world[i][j] == 0)
					output+="<div class='empty'></div>";
			}
			output += "\n</div>";
		}
		//console.log(output);
		document.getElementById('world').innerHTML = output;
	}
	function displayPacman(){
			document.getElementById('pacman').style.top = pacman.y*40+"px";
			document.getElementById('pacman').style.left = pacman.x*40+"px";
	}
	function displayScore(){
			document.getElementById('score').innerHTML = score;
	}
	displayWorld();
	displayPacman();
	displayScore();

	document.onkeydown = function(e){
		e.preventDefault();
		if(e.keyCode == 37 && world[pacman.y][pacman.x-1] !=2 && world[pacman.y][pacman.x-1] !=4){
			pacman.x--;
			document.getElementById("pacman").style.background = "url('images/left.gif')";
		}
		else if (e.keyCode==39 && world[pacman.y][pacman.x+1] !=2 && world[pacman.y][pacman.x-1] !=4) {
			pacman.x++;
			document.getElementById("pacman").style.background = "url('images/right.gif')";
		}
		else if (e.keyCode==38 && world[pacman.y-1][pacman.x] !=2) {
			pacman.y--;
			document.getElementById("pacman").style.background = "url('images/backward.gif')";
		}
		else if (e.keyCode==40 && world[pacman.y+1][pacman.x] !=2) {
			pacman.y++;
			document.getElementById("pacman").style.background = "url('images/forward.gif')";
		}
		if(world[pacman.y][pacman.x]==1){
			world[pacman.y][pacman.x]=0;
			score+=10;
			displayWorld();
			displayScore();
		}
		if(world[pacman.y][pacman.x]==3){
			world[pacman.y][pacman.x]=6;
			score-=50;
			displayWorld();
			displayScore();
			world[pacman.y][pacman.x]=0;
		}
		if(world[pacman.y][pacman.x]==5){
			world[pacman.y][pacman.x]=0;
			score+=300;
			displayWorld();
			displayScore();
			modalWin();
		}
		console.log(e.keyCode);
		displayPacman();
	}

	function playGame() {
		var game = document.getElementById('gameBlocker');
		var button = document.getElementById('playGame');
		var dirt = document.getElementsByClassName('coin');
		var mine = document.getElementsByClassName('cherry');
		game.style.visibility = "visible";
		button.style.display= "none";
		game.style.margin = "18px";
		dirt.style.backgroundImage = "url('../images/animateDirt.gif')";
		mine.style.backgroundImage = "url('../images/animateDirt.gif')";
	}

//--------------- Modal Code ---------------//

	// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
function modalWin() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    window.location.reload();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        window.location.reload();
    }
}