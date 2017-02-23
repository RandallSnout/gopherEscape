app.controller('gamesController', ['$scope','userFactory','$sce', '$routeParams','$location', '$timeout','$animate', function($scope, userFactory, $sce, $routeParams, $location, $timeout, $animate) {
 	
	var world;
	var gopher = 'brown';

	var getUser = function(){
        userFactory.show(function(returnedData){
            $scope.user = returnedData.data;
        });
    };

    getUser();


    $scope.logOut = function(){
        userFactory.logout();
        $location.url('/');
    }

	var thisLevel = function(levelId, callback){
		userFactory.getLevel(levelId, function(returnedData){
            $scope.level = returnedData.data;
            console.log($scope.level+' controller level');
	        callback();
        });
	};


	var points = 0;


	var locatePacman = function(){
		for(var p=0; p<world.length; p++){ 
			for(var t=0; t<world[p].length; t++){ 
				if(world[p][t] == 0){
					$scope.x = t;
					$scope.y = p;
				}
			}
		}
	};

	
	$scope.showPath = true;
	$scope.shakeBoard = true;

	// trying something new...
	var pacman;

 	var displayWorld = function(){
 		var output = '';
		for(var i=0; i<world.length; i++){
			output += "\n<div class='section'>\n"; 
			for(var j=0; j<world[i].length; j++){
				if(world[i][j] == 2)
					output+="<div class='brick'></div>";
				else if(world[i][j] == 1){
					if ($scope.showPath == true) {
						output+="<div class='empty'></div>";
						$timeout(function() {
							output+="<div class='brick'></div>"; 
							$scope.showPath = false; 
							displayWorld();
						}, 300);
					} else {
						output+="<div class='brick'></div>";
					};
				}
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
		$scope.showIt = function(){
			return $sce.trustAsHtml($scope.board);
		};

 	};
 	 var displayPacman = function(){
			document.getElementById(gopher+'Gopher').style.top = pacman.y*40+"px";
			document.getElementById(gopher+'Gopher').style.left = pacman.x*40+"px";
	};

 	var assign = function(){
		world = $scope.level;
		gopher = $scope.user.gopher;
		console.log('Gopher');
		console.log(gopher+"Gopher");
		displayWorld();
		locatePacman();
		pacman = {x:$scope.x, y:$scope.y};
		displayPacman();
		movePoints();

	};


	document.onkeydown = function(e){
		// e.preventDefault();
		if(e.keyCode == 37 && world[pacman.y][pacman.x-1] !=2 && world[pacman.y][pacman.x-1] !=4){
			pacman.x--;
			document.getElementById(gopher+'Gopher').style.background = "url('assets/images/"+gopher+"Left.gif')";
			movePoints();
		}
		else if (e.keyCode==39 && world[pacman.y][pacman.x+1] !=2 && world[pacman.y][pacman.x+1] !=4) {
			pacman.x++;
			document.getElementById(gopher+'Gopher').style.background = "url('assets/images/"+gopher+"Right.gif')";
			movePoints();
		}
		else if (e.keyCode==38 && world[pacman.y-1][pacman.x] !=2 && world[pacman.y-1][pacman.x] !=4) {
			pacman.y--;
			document.getElementById(gopher+'Gopher').style.background = "url('assets/images/"+gopher+"Backward.gif')";
			movePoints();
		}
		else if (e.keyCode==40 && world[pacman.y+1][pacman.x] !=2 && world[pacman.y+1][pacman.x] !=4) {
			pacman.y++;
			document.getElementById(gopher+'Gopher').style.background = "url('assets/images/"+gopher+"Forward.gif')";
			movePoints();
		}
		displayPacman();
	};

	movePoints = function(){
		if(world[pacman.y][pacman.x]==1){
			world[pacman.y][pacman.x] = 0;
			points+=10;
		}
		if(world[pacman.y][pacman.x]==3){
			world[pacman.y][pacman.x]=0;
			points-=20;
		}
		if(world[pacman.y][pacman.x]==5){
			world[pacman.y][pacman.x]=0;
			points+=300;
			modalWin();
		}
		$scope.score = points;
		displayWorld();
		if(!$scope.$$phase) {
  			$scope.$apply();
		}
		// $scope.$apply();
	};

	var levels = function(){
        userFactory.lvlLength(function(returnedData){
            $scope.length = returnedData.data;
        });
    };
    
    levels();

	$scope.replay = function(){
		thisLevel($routeParams.id, assign);
		window.location.reload();
		
	};
	$scope.exit = function(score){
		userFactory.addPoints(score, function(returnData){
			$location.url('/home');
		})
		
	};
	$scope.next = function(score){
		console.log('score: '+score);
		userFactory.addPoints(score, function(returnData){
			console.log('users level is:');
			console.log(returnData);
			var newLevel = returnData;
			$location.url('/game/'+newLevel);
		})
		// window.location.reload();
	};

	thisLevel($routeParams.id, assign);

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