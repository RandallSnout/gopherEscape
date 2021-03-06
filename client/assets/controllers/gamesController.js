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
            $timeout(function() {
	        	callback();
			}, 100);
        });
	};


	var points = 0;


	var locatePlayer = function(){
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
	var player;

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
 	 var displayPlayer = function(){
			document.getElementById(gopher+'Gopher').style.top = player.y*40+"px";
			document.getElementById(gopher+'Gopher').style.left = player.x*40+"px";
	};

 	var assign = function(){
		world = $scope.level;
		gopher = $scope.user.gopher;
		displayWorld();
		locatePlayer();
		player = {x:$scope.x, y:$scope.y};
		displayPlayer();
		movePoints();

	};


	document.onkeydown = function(e){
		// e.preventDefault();
		if(e.keyCode == 37 && world[player.y][player.x-1] !=2 && world[player.y][player.x-1] !=4){
			player.x--;
			document.getElementById(gopher+'Gopher').style.background = "url('assets/images/"+gopher+"Left.gif')";
			movePoints();
		}
		else if (e.keyCode==39 && world[player.y][player.x+1] !=2 && world[player.y][player.x+1] !=4) {
			player.x++;
			document.getElementById(gopher+'Gopher').style.background = "url('assets/images/"+gopher+"Right.gif')";
			movePoints();
		}
		else if (e.keyCode==38 && world[player.y-1][player.x] !=2 && world[player.y-1][player.x] !=4) {
			player.y--;
			document.getElementById(gopher+'Gopher').style.background = "url('assets/images/"+gopher+"Backward.gif')";
			movePoints();
		}
		else if (e.keyCode==40 && world[player.y+1][player.x] !=2 && world[player.y+1][player.x] !=4) {
			player.y++;
			document.getElementById(gopher+'Gopher').style.background = "url('assets/images/"+gopher+"Forward.gif')";
			movePoints();
		}
		displayPlayer();
	};

	movePoints = function(){
		if(world[player.y][player.x]==1){
			world[player.y][player.x] = 0;
			points+=10;
		}
		if(world[player.y][player.x]==3){
			world[player.y][player.x]=0;
			points-=20;
		}
		if(world[player.y][player.x]==5){
			world[player.y][player.x]=0;
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