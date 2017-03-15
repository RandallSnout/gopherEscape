app.controller('splashController', ['$scope','userFactory','$sce', '$routeParams','$location', '$timeout','$animate', function($scope, userFactory, $sce, $routeParams, $location, $timeout, $animate) {
 	
	var sampleWorld = [
			[4,5,4,4,4],
			[2,1,2,2,2],
			[2,1,2,1,2],
			[2,1,2,1,2],
			[2,1,1,1,2],
			[2,2,2,1,2],
			[2,2,2,0,2]
		];

	$scope.login = function() {
		keyboardLock = 0;
		$location.path('/login');
	};

	var keyboardLock = 0;

	
	$scope.showPath = true;
	$scope.shakeBoard = true;

	// trying something new...
	var pacman = {
		x:3, 
		y:6
	};

 	var displaySample = function(){
 		var output = '';
		for(var i=0; i<sampleWorld.length; i++){
			output += "\n<div class='samplesection'>\n"; 
			for(var j=0; j<sampleWorld[i].length; j++){
				if(sampleWorld[i][j] == 2)
					output+="<div class='samplebrick'></div>";
				else if(sampleWorld[i][j] == 1){
					if ($scope.showPath == true) {
						output+="<div class='sampleempty'></div>";
						$timeout(function() {
							output+="<div class='samplebrick'></div>"; 
							$scope.showPath = false; 
							displaySample();
						}, 300);
					} else {
						output+="<div class='samplebrick'></div>";
					};
				}
				else if(sampleWorld[i][j] == 3)
					output+="<div class='samplecherry'></div>";
				else if(sampleWorld[i][j] == 4)
					output+="<div class='samplegrass'></div>";
				else if(sampleWorld[i][j] == 5)
					output+="<div class='samplefinish'></div>";
				if(sampleWorld[i][j] == 0)
					output+="<div class='sampleempty'></div>";
			}
			output += "\n</div>";
		};
		if ($scope.shakeBoard == true) {
						$scope.animate = 'shake';
						$timeout(function() {
							$scope.animate = 'shake';
							$scope.shakeBoard = false; 
						}, 300);
					} else {
						$scope.animate = 'noShake';
		};
		$scope.board = output;
		$scope.showSample = function(){
			return $sce.trustAsHtml($scope.board);
		};

 	};
 	 var displayPacman = function(){
			document.getElementById('pacman').style.top = pacman.y*40+"px";
			document.getElementById('pacman').style.left = pacman.x*40+"px";
	};


	document.onkeydown = function(e){
		if (keyboardLock === 1){
			e.preventDefault();
		}
		if(e.keyCode == 37 && sampleWorld[pacman.y][pacman.x-1] !=2 && sampleWorld[pacman.y][pacman.x-1] !=4){
			pacman.x--;
			document.getElementById("pacman").style.background = "url('assets/images/left.gif')";
		}
		else if (e.keyCode==39 && sampleWorld[pacman.y][pacman.x+1] !=2 && sampleWorld[pacman.y][pacman.x-1] !=4) {
			pacman.x++;
			document.getElementById("pacman").style.background = "url('assets/images/right.gif')";
		}
		else if (e.keyCode==38 && sampleWorld[pacman.y-1][pacman.x] !=2) {
			pacman.y--;
			document.getElementById("pacman").style.background = "url('assets/images/backward.gif')";
		}
		else if (e.keyCode==40 && sampleWorld[pacman.y+1][pacman.x] !=2) {
			pacman.y++;
			document.getElementById("pacman").style.background = "url('assets/images/forward.gif')";
		}
		displayScore();
		displayPacman();
	};


	var displayScore = function(){
		var points = 0;
		if(sampleWorld[pacman.y][pacman.x]==1){
			sampleWorld[pacman.y][pacman.x] = 0;
			points+=10;
		}
		if(sampleWorld[pacman.y][pacman.x]==3){
			sampleWorld[pacman.y][pacman.x]=0;
			points-=20;
		}
		if(sampleWorld[pacman.y][pacman.x]==5){
			sampleWorld[pacman.y][pacman.x]=0;
			points+=300;
			keyboardLock = 0;
			modalWin();
		}
		$scope.sampleScore = points;
		console.log($scope.sampleScore);
		displaySample();
		if(!$scope.$$phase) {
  			$scope.$apply();
		}
		// $scope.$apply();
	};

	$scope.sampleGame = function() {
		var game = document.getElementById('samplegameBlocker');
		var button = document.getElementById('sampleplayGame');
		game.style.visibility = "visible";
		button.style.display= "none";
		game.style.margin = "18px";
		displaySample();
		displayPacman();
		displayScore();
		keyboardLock = 1;
	};

	//--------------------------------------- Modal Function -------------------------//

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
	    keyboardLock = 0;
	    window.location.reload();
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	        window.location.reload();
	    }
	}
  
}]);