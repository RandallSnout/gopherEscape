app.controller('gamesController', ['$scope','userFactory','$sce', '$routeParams','$location', '$timeout','$animate', function($scope, userFactory, $sce, $routeParams, $location, $timeout, $animate) {
 	

	var	level = [
			[4,5,4,4],
			[2,1,2,2],
			[2,1,2,2],
			[2,1,2,2],
			[2,1,1,2],
			[2,2,1,2],
			[2,2,1,2],
			[2,2,0,2]
		];
	
	var getUser = function(){
        userFactory.show(function(returnedData){
            $scope.user = returnedData.data;
        });
    };

    getUser();

	thisLevel = function(level){
		userFactory.getLevel(level, function(returnedData){
			// var currentLevel = 'level'+$scope.user.level;
            $scope.level = returnedData;
            console.log($scope.level+' controller level 1');
            return $scope.level;
        });
        console.log($scope.level+' controller level 2');
	};
	console.log($scope.level+' controller level 3');

	thisLevel($routeParams.id);

	var points = 0;
	var world = level

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
	locatePacman();
	var	pacman = {x:$scope.x, y:$scope.y};
	$scope.showPath = true;
	$scope.shakeBoard = true;

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
							output+="<div class='animateBrick'></div>"; 
							$scope.showPath = false; 
							displayWorld();
						}, 300);
					} else {
						output+="<div class='animateBrick'></div>";
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
		// $scope.$apply();
 	};

 	 var displayPacman = function(){
			document.getElementById('pacman').style.top = pacman.y*40+"px";
			document.getElementById('pacman').style.left = pacman.x*40+"px";
	};


	displayWorld();
	displayPacman();

	document.onkeydown = function(e){
		if(e.keyCode == 37 && world[pacman.y][pacman.x-1] !=2 && world[pacman.y][pacman.x-1] !=4){
			pacman.x--;
			document.getElementById("pacman").style.background = "url('assets/images/left.gif')";
			movePoints();
		}
		else if (e.keyCode==39 && world[pacman.y][pacman.x+1] !=2 && world[pacman.y][pacman.x-1] !=4) {
			pacman.x++;
			document.getElementById("pacman").style.background = "url('assets/images/right.gif')";
			movePoints();
		}
		else if (e.keyCode==38 && world[pacman.y-1][pacman.x] !=2) {
			pacman.y--;
			document.getElementById("pacman").style.background = "url('assets/images/backward.gif')";
			movePoints();
		}
		else if (e.keyCode==40 && world[pacman.y+1][pacman.x] !=2) {
			pacman.y++;
			document.getElementById("pacman").style.background = "url('assets/images/forward.gif')";
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
			gameEnd();
		}
		$scope.score = points;
		displayWorld();
		// $scope.$apply();
	};
	movePoints();

	//--------------------------------------- Modal Function -------------------------//

	var gameEnd = function() {

		  // Define our constructor 
		  this.Modal = function() {

		    // Create global element references
		    this.closeButton = null;
		    this.modal = null;
		    this.overlay = null;

		    // Determine proper prefix
		    this.transitionEnd = transitionSelect();

		    // Define option defaults 
		    var defaults = {
		      autoOpen: false,
		      className: 'fade-and-drop',
		      closeButton: true,
		      content: "",
		      maxWidth: 350,
		      minWidth: 280,
		      overlay: true
		    }

		    // Create options by extending defaults with the passed in arugments
		    if (arguments[0] && typeof arguments[0] === "object") {
		      this.options = extendDefaults(defaults, arguments[0]);
		    }

		    if(this.options.autoOpen === true) this.open();

		  }

		  // Public Methods

		  Modal.prototype.close = function() {
		    var _ = this;
		    this.modal.className = this.modal.className.replace(" scotch-open", "");
		    this.overlay.className = this.overlay.className.replace(" scotch-open",
		      "");
		    this.modal.addEventListener(this.transitionEnd, function() {
		      _.modal.parentNode.removeChild(_.modal);
		    });
		    this.overlay.addEventListener(this.transitionEnd, function() {
		      if(_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
		    });
		  }

		  Modal.prototype.open = function() {
		    buildOut.call(this);
		    initializeEvents.call(this);
		    window.getComputedStyle(this.modal).height;
		    this.modal.className = this.modal.className +
		      (this.modal.offsetHeight > window.innerHeight ?
		        " scotch-open scotch-anchored" : " scotch-open");
		    this.overlay.className = this.overlay.className + " scotch-open";
		  }

		  // Private Methods

		  function buildOut() {

		    var content, contentHolder, docFrag;

		    /*
		     * If content is an HTML string, append the HTML string.
		     * If content is a domNode, append its content.
		     */

		    if (typeof this.options.content === "string") {
		      content = this.options.content;
		    } else {
		      content = this.options.content.innerHTML;
		    }

		    // Create a DocumentFragment to build with
		    docFrag = document.createDocumentFragment();

		    // Create modal element
		    this.modal = document.createElement("div");
		    this.modal.className = "scotch-modal " + this.options.className;
		    this.modal.style.minWidth = this.options.minWidth + "px";
		    this.modal.style.maxWidth = this.options.maxWidth + "px";

		    // If closeButton option is true, add a close button
		    if (this.options.closeButton === true) {
		      this.closeButton = document.createElement("button");
		      this.closeButton.className = "scotch-close close-button";
		      this.closeButton.innerHTML = "&times;";
		      this.modal.appendChild(this.closeButton);
		    }

		    // If overlay is true, add one
		    if (this.options.overlay === true) {
		      this.overlay = document.createElement("div");
		      this.overlay.className = "scotch-overlay " + this.options.className;
		      docFrag.appendChild(this.overlay);
		    }

		    // Create content area and append to modal
		    contentHolder = document.createElement("div");
		    contentHolder.className = "scotch-content";
		    contentHolder.innerHTML = content;
		    this.modal.appendChild(contentHolder);

		    // Append modal to DocumentFragment
		    docFrag.appendChild(this.modal);

		    // Append DocumentFragment to body
		    document.body.appendChild(docFrag);

		  }

		  function extendDefaults(source, properties) {
		    var property;
		    for (property in properties) {
		      if (properties.hasOwnProperty(property)) {
		        source[property] = properties[property];
		      }
		    }
		    return source;
		  }

		  function initializeEvents() {

		    if (this.closeButton) {
		      this.closeButton.addEventListener('click', this.close.bind(this));
		    }

		    if (this.overlay) {
		      this.overlay.addEventListener('click', this.close.bind(this));
		    }

		  }

		  function transitionSelect() {
		    var el = document.createElement("div");
		    if (el.style.WebkitTransition) return "webkitTransitionEnd";
		    if (el.style.OTransition) return "oTransitionEnd";
		    return 'transitionend';
		  }

		  var myContent = document.getElementById('content');

		  var myModal = new Modal({
		    content: myContent
		  });

		  myModal.open();
		};
  
}]);