app.controller('gamesController', ['$scope','userFactory','$sce', '$routeParams','$location', function($scope, userFactory, $sce, $routeParams, $location) {
 	

	var	level = [
			[4,4,4,5,4,4,4],
			[2,2,2,1,2,2,2],
			[2,2,2,1,2,2,2],
			[2,2,2,1,2,2,2],
			[2,2,2,1,1,2,2],
			[2,2,2,2,1,2,2],
			[2,2,2,2,1,2,2],
			[2,2,2,2,0,2,2]
		];
		
	var	pacman = { x:4, y:7 };
	var world = level;
	var score = 0;
 	displayWorld = function(){
 		var output = '';
 		console.log('this is the board');
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
				if(world[i][j] == 0)
					output+="<div class='empty'></div>";
			}
			output += "\n</div>";
		}
		$scope.board = output;
		$scope.showIt = function(){
			return $sce.trustAsHtml($scope.board);
		};
 	};

 	displayPacman = function(){
 			console.log('this is the gopher');
			document.getElementById('pacman').style.top = pacman.y*40+"px";
			document.getElementById('pacman').style.left = pacman.x*40+"px";
	};

	displayScore = function(){
			console.log('this is the score');
			$scope.score = score;
	};

	displayWorld();
	displayPacman();
	displayScore();

	onkeydown = function(e){
		if(e.keyCode == 37 && world[pacman.y][pacman.x-1] !=2 && world[pacman.y][pacman.x-1] !=4){
			pacman.x--;
			document.getElementById("pacman").style.transform = "rotate(-90deg)";
		}
		else if (e.keyCode==39 && world[pacman.y][pacman.x+1] !=2 && world[pacman.y][pacman.x-1] !=4) {
			pacman.x++;
			document.getElementById("pacman").style.transform = "rotate(90deg)";
		}
		else if (e.keyCode==38 && world[pacman.y-1][pacman.x] !=2) {
			pacman.y--;
			document.getElementById("pacman").style.transform = "rotate(0deg)";
		}
		else if (e.keyCode==40 && world[pacman.y+1][pacman.x] !=2) {
			pacman.y++;
			document.getElementById("pacman").style.transform = "rotate(180deg)";
		}
		if(world[pacman.y][pacman.x]==1){
			world[pacman.y][pacman.x]=0;
			score+=10;
			displayWorld();
			displayScore();
		}
		if(world[pacman.y][pacman.x]==3){
			world[pacman.y][pacman.x]=0;
			score-=50;
			displayWorld();
			displayScore();
		}
		if(world[pacman.y][pacman.x]==5){
			world[pacman.y][pacman.x]=0;
			score+=300;
			displayWorld();
			displayScore();
			alert('Player 1 is the winner');
		}
		console.log(e.keyCode);
		displayPacman();
	};
  
}]);