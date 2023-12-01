/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

var intervals = {};
var currPage = null;
var currState = null;
var ignoreReadywhen = false;

var states = {
  'start': {
    background: "/audio/bg-1.mp3",
    continue: 'intro',
    onenter: function() {
			$('body').removeClass("evil");
			$('body').removeClass("saved");
      lockCheckpoint2();
      lockCheckpoint1();
    }
  },
  'first': {
    background: "/audio/bg-1.mp3",
    continue: 'p1',
    onenter: function() {
			$('body').removeClass("evil");
			$('body').removeClass("saved");
	    $("#begin").text("Continue");
      lockCheckpoint2();
      lockCheckpoint1();
    }
  },
  'c1': {
    background: "/audio/bg-2.mp3",
    continue: 'p1',
    onenter: function() {
			$('body').removeClass("evil");
			$('body').removeClass("saved");
	    $("#begin").text("Continue");
      unlockCheckpoint1();
      lockCheckpoint2();
    }
  },
  'c2': {
    background: "/audio/bg-tricky.mp3",
    continue: '',
    onenter: function() {
			$('body').removeClass("evil");
			$('body').removeClass("saved");
      $("#begin").text("Continue").parents("nav")
        .css({"visibility": "hidden", "opacity": 0});
      lockCheckpoint1();
      unlockCheckpoint2();
    }
  },
  'evil-start': {
    background: "/audio/bg-evil.mp3",
    continue: '',
    onenter: function(previous) {
			$('body').addClass("evil");
			$('body').removeClass("saved");
      var b = $("#begin").text("Continue");
      lockCheckpoint1();
    }
  },
  'evil': {
    background: "/audio/bg-evil.mp3",
    continue: 'intro2',
    onenter: function(previous) {
			$('body').addClass("evil");
			$('body').removeClass("saved");
      var b = $("#begin").text("Continue");
      if (previous == "evil-start") {
        b.parents("nav").css({"visibility": "unset", "opacity": 1});
      }
      lockCheckpoint2();
      lockCheckpoint1();
    }
  },
  'evil-puzzles': {
    background: "/audio/bg-evil.mp3",
    continue: 'e1',
    onenter: function() {
			$('body').addClass("evil");
			$('body').removeClass("saved");
	    $("#begin").text("Continue");
      lockCheckpoint2();
      lockCheckpoint1();
    }
  },
  'defeated': {
    background: "/audio/bg-3.mp3",
    continue: 'intro3',
    onenter: function() {
			$('body').removeClass("evil");
			$('body').addClass("saved");
	    $("#begin").text("Continue");
      lockCheckpoint2();
      lockCheckpoint1();
    }
  },
  'last': {
    background: "/audio/bg-last.mp3",
    continue: 'p15',
    onenter: function() {
			$('body').removeClass("evil");
			$('body').addClass("saved");
	    $("#begin").text("Continue");
      lockCheckpoint2();
      lockCheckpoint1();
    }
  },
  'done': {
    background: "",
    continue: 'intro4',
    onenter: function() {
			$('body').removeClass();
	    $("#begin").text("Continue");
      lockCheckpoint2();
      lockCheckpoint1();
    }
  }
}

function changeState(state) {
  if (!state)
    state = "start";
  var oldState = currState;
  currState = state;
  states[currState].onenter(oldState);
  localStorage.setItem("state", currState);

  if (states[currState]?.background != states[oldState]?.background) {
    $("#background").animate({volume: 0}, 1000, function() {
 			var bg = $("#background")[0];
      bg.src = states[currState].background;
      bg.loop = true;
			bg.load();
			bg.play();
      $("#background").animate({volume: 0.2}, 1000);
    });

  }
}

var speeches = {
	'evil-entrance': [
		{ 'class': '', 'duration': 1000 },
		{ 'class': 'long-talk', 'duration': 2000 },
		{ 'class': '', 'duration': 500 },
		{ 'class': 'talking', 'duration': 4700 },
		{ 'class': '', 'duration': 500 },
		{ 'class': 'talking', 'duration': 7800 },
		{ 'class': 'long-talk', 'duration': 3000 },
		{ 'class': '', 'duration': 1000 },
	],
	'evil-conflict': [
		{ 'class': '', 'duration': 1300 },
		{ 'class': 'long-talk', 'duration': 2500 },
		{ 'class': '', 'duration': 400 },
		{ 'class': 'talking', 'duration': 4000 },
		{ 'class': '', 'duration': 800 },
		{ 'class': 'talking', 'duration': 4000 },
		{ 'class': '', 'duration': 1100 },
		{ 'class': 'talking', 'duration': 2400 },
		{ 'class': '', 'duration': 1100 },
		{ 'class': 'talking', 'duration': 10000 },
	],
	'zabi-enters': [
		{ 'class': '', 'duration': 1700 },
		{ 'class': 'long-talk', 'duration': 700 },
		{ 'class': '', 'duration': 200 },
		{ 'class': 'long-talk', 'duration': 800 },
		{ 'class': '', 'duration': 750 },
		{ 'class': 'long-talk', 'duration': 300 },
		{ 'class': '', 'duration': 80 },
		{ 'class': 'long-talk', 'duration': 660 },
		{ 'class': '', 'duration': 500 },
		{ 'class': 'long-talk', 'duration': 200 },
		{ 'class': '', 'duration': 30 },
		{ 'class': 'long-talk', 'duration': 1200 },
		{ 'class': '', 'duration': 30 },
		{ 'class': 'long-talk', 'duration': 500 },
	],
	'zabi-rawr': [
		{ 'class': '', 'duration': 1000 },
		{ 'class': 'rawr', 'duration': 1000 },
		{ 'class': 'bark', 'duration': 240 },
	],
	'evil-decide-escape': [
		{ 'class': '', 'duration': 1300 },
		{ 'class': 'talking', 'duration': 2800 },
		{ 'class': '', 'duration': 900 },
		{ 'class': 'talking', 'duration': 3600 },
	],
	'edu-escape': [
	],
	'zabi-chase': [
	],
}

function playSoundEffect(file) {
	var o = $("#soundeffects").html("<source src=\"/audio/" + file + ".mp3\" type=\"audio/mp3\"/>")[0];
	o.load();
	setTimeout(function() {
		o.play();
	}, 500);

}

function speak(speaker, tag, onFinish) {
	var o = $('#speech-'+speaker).html("<source src=\"/audio/" + tag + ".mp3\" type=\"audio/mp4\"/>")[0];
	o.load();
	o.play();
	var speech = speeches[tag];
	var acctime = 0;
	function runSpeechAnimation(classes, acctime) {
		setTimeout(function() {
			$('.edu').removeClass("talking long-talk")
			.addClass(classes);
		}, acctime);
	}
	for (var i = 0; i < speech.length; i++) {
		runSpeechAnimation(speech[i].class, acctime);
		acctime += speech[i].duration;
	}

	setTimeout(function() {
		$('.edu').removeClass("talking long-talk");
		onFinish && onFinish();
	}, acctime);
}

function eduDefeatedAnimation() {
	$("#intro3").addClass("interrupted");
  setTimeout(function() {
	  $("#eduFinal .edu").addClass("entering");
	  $("#eduFinal").show();
	  speak('edu', 'evil-conflict', function() {
      setTimeout(function() {
	  	  $("#zabi").addClass("entering").show();
        setTimeout(function() {
	        speak('edu', 'zabi-enters', function() {
	          speak('zabi', 'zabi-rawr', function() {
	            speak('edu', 'evil-decide-escape', function() {
	              speak('edu', 'edu-escape');
	  	    	    $("#eduFinal .edu").addClass("escaping");
	  	    	    $("#zabi").addClass("chasing");
	              speak('zabi', 'zabi-chase');
                setTimeout(function() {
	  	            $("#intro3").removeClass();
	  	            $("#intro3").addClass("active");
                  changeState("defeated");
                }, 18000);
              });
            });
          });
        }, 750);
      }, 1500);
	  });
  }, 2500);

}

function unlockCheckpoint1() {
	intervals['c1'] = setInterval(function() {
		if (!currPage) {
			showCheckpoint1();
		} else {
			hideCheckpoint1();
    }
	}, 1000);
}

function showCheckpoint1() {
	$("#checkpoint1").show().addClass("active")
			.click(function() {
				goToPage("p8");
				setTimeout(hideCheckpoint1, 300);
			})
			.css("animation-duration", "" + ($(window).height() + $(window).width())/150 + "s");
}

function hideCheckpoint1() {
	$("#checkpoint1").removeClass("active").prop("onclick", null).hide();
}

function lockCheckpoint1() {
	intervals['c1'] && clearInterval(intervals['c1']);
	hideCheckpoint1();
}

function unlockCheckpoint2() {
	$("#begin").text("Continue");
	lockCheckpoint1();
	intervals['c2'] = setInterval(function() {
		if (!currPage) {
			showCheckpoint2();
		}
	}, 1000);
}

function showCheckpoint2() {
	$("#checkpoint2").show().addClass("active")
			.click(function() {

				$('#checkpoint2').addClass("used");
				setTimeout(function() {
					$('#checkpoint2').addClass("flipped");
					setTimeout(function() {
            changeState("evil-start");
						speak('edu', 'evil-entrance', function() {
							$('#checkpoint2 .edu').addClass("leaving");
              setTimeout(function() {
                changeState("evil");
              }, 500);
						});
					}, 1000);
				}, 2500);
			});
}

function hideCheckpoint2() {
	$("#checkpoint2").hide().removeClass().prop("onclick", null);
}

function lockCheckpoint2() {
	intervals['c2'] && clearInterval(intervals['c2']);
	hideCheckpoint2();
}


function unlockCheckpoint3() {
	solvedEvilPuzzles = true;
}



var puzzles = {
  "intro": {
	  "title": "Intro",
	  "goto": "p1",
	  "content": {
		  "type": "audio",
		  "value": "/audio/intro1.mp3"
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
		      "maybe",
		      "I'll think about it",
		],
		"validate": function(value) {
		        return value.toLowerCase() == "maybe";
		}
	  }
  },
  "p1": {
	  "title": "Puzzle #1",
	  "onenter": function(){ changeState("first")},
	  "onenter": hideCheckpoint1,
	  "goto": "p2",
	  "readywhen": "Dec 01, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "What is the name of this painting?",
	  },
	  "response": {
		"type": "input",
		"datatype": "text",
		"validate": function(value) {
		        return value.toLowerCase().indexOf("Starry Night".toLowerCase()) >= 0;
		}
	  }
  },
  "p2": {
	  "title": "Puzzle #2",
	  "goto": "p3",
	  "readywhen": "Dec 01, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "In bowling, three strikes in a row is called?",
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
		      "Triple",
		      "Turkey",
		      "Triumph",
		      "Trashed"
		],
		"validate": function(value) {
		        return value == "Turkey";
		}
	  }
  },
  "p3": {
	  "title": "Puzzle #3",
	  "goto": "p4",
	  "readywhen": "Dec 01, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "Which number follows the sequence above?",
	  },
	  "response": {
		"type": "input",
		"datatype": "number",
		"validate": function(value) {
		        return Number(value) === 13;
		}
	  }
  },
  "p4": {
	  "title": "Puzzle #4",
	  "goto": "p5",
	  "readywhen": "Dec 01, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "When is the Koala holiday celebrated?",
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
		      "January 8th",
		      "April 31st",
		      "May 3rd",
		      "August 15th",
		],
		"validate": function(value) {
		        return value == "May 3rd";
		}
	  }
  },
  "p5": {
	  "title": "Puzzle #5",
	  "goto": "p6",
	  "readywhen": "Dec 01, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "How many llamas are in this picture?",
	  },
	  "response": {
		"type": "input",
		"datatype": "number",
		"validate": function(value) {
		        return Number(value) == 9;
		}
	  }
  },
  "p6": {
	  "title": "Puzzle #6",
	  "goto": "p7",
	  "readywhen": "Dec 01, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "How is this called?",
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
		      "Xbox",
		      "X Series",
		      "Xbox Series X",
		      "Xbox 360 Pro",
		],
		"validate": function(value) {
		        return value == "Xbox Series X";
		}
	  }
  },
  "p7": {
	  "title": "Puzzle #?",
	  "goto": "c1",
	  "readywhen": "Dec 01, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "What is the number of this puzzle?",
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
		      "6",
		      "7",
		      "8",
		      "9",
		],
		"validate": function(value) {
		        return Number(value) == 7;
		}
	  }
  },
  "c1": {
	  "title": "Checkpoint",
	  "goto": "",
	  "onenter": function(){changeState("c1")},
	  "readywhen": "Dec 01, 2023 17:00:00",
	  "content": {
		"type": "audio",
		"value": "/audio/checkpoint1.mp3",
	  },
	  "response": {
		"type": "single-choice",
		"options": [
		      "Continue",
		],
		"validate": function(value) {
		        return true;
		}
	  }
  },
  "p8": {
	  "title": "Puzzle #8",
	  "goto": "p9",
	  "readywhen": "Dec 02, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "What is the name of this painting?",
	  },
	  "response": {
		"type": "input",
		"datatype": "text",
		"validate": function(value) {
		        return value.toLowerCase().indexOf("Treachery of Images".toLowerCase()) >= 0;
		}
	  }
  },
  "p9": {
	  "title": "Puzzle #9",
	  "goto": "p10",
	  "readywhen": "Dec 02, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "What is the English name of this movie?",
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
		      "Circus",
		      "Fun Around",
		      "The Gamblers",
		      "The Turkey"
		],
		"validate": function(value) {
		        return value == "The Turkey";
		}
	  }
  },
  "p10": {
	  "title": "Puzzle #10",
	  "goto": "p11",
	  "readywhen": "Dec 02, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "Given that the area of the blue squares is <b>1</b>, what is the area of the yellow square?",
	  },
	  "response": {
		"type": "input",
		"datatype": "number",
		"validate": function(value) {
		        return Number(value) === 25;
		}
	  }
  },
  "p11": {
	  "title": "Puzzle #11",
	  "goto": "p12",
	  "readywhen": "Dec 02, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "How is the French governmental system organized?",
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
		      "Parliamentary",
		      "Presidential",
		      "Semi-parliamentary",
		      "Semi-presidential"
		],
		"validate": function(value) {
		        return value == "Semi-presidential";
		}
	  }
  },
  "p12": {
	  "title": "Puzzle #12",
	  "goto": "p13",
	  "readywhen": "Dec 02, 2023 17:00:00",
	  "imgtitle": "Those are alpacas :)",
	  "content": {
		"type": "text",
		"value": "How many llamas are in this picture?",
	  },
	  "response": {
		"type": "input",
		"datatype": "number",
		"validate": function(value) {
		        return Number(value) == 0;
		}
	  }
  },
  "p13": {
	  "title": "Puzzle #13",
	  "goto": "p14",
	  "readywhen": "Dec 02, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "How was this technology from the 70s called?",
	  },
	  "response": {
		"type": "input",
		"datatype": "text",
		"validate": function(value) {
		        return value.toLowerCase().indexOf("betamax") >= 0;
		}
	  }
  },
  "p14": {
	  "title": "Puzzle #14",
	  "goto": "c2",
	  "readywhen": "Dec 02, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "Which one was not an option in Puzzle #9?",
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
		      "The Gamblers",
		      "Clowns",
		      "Fun Around",
		      "Circus",
		],
		"validate": function(value) {
		        return value == "Clowns";
		}
	  }
  },
  "c2": {
	  "title": "Checkpoint",
	  "goto": "",
	  "onenter": function(){changeState("c2")},
	  "readywhen": "Dec 02, 2023 17:00:00",
	  "content": {
		"type": "audio",
		"value": "/audio/evil-trick.mp3",
	  },
	  "response": {
		"type": "single-choice",
		"options": [
		      "Continue",
		],
		"validate": function(value) {
		        return true;
		}
	  }
  },
  "intro2": {
	  "title": "Intro 2",
	  "onenter": function(){changeState("evil-puzzles")},
	  "readywhen": "Dec 03, 2023 17:00:00",
	  "goto": "e1",
	  "content": {
		  "type": "audio",
		  "value": "/audio/maja_save_us.mp3"
	  },
	  "response": {
		"type": "single-choice",
		"options": [
		      "Continue",
		],
		"validate": function(value) {
		        return true;
		}
	  }
  },
  "e1": {
	  "title": "Puzzle #1",
	  "goto": "e2",
	  "readywhen": "Dec 03, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "What is your WiFi password?",
	  },
	  "response": {
		"type": "input",
		"datatype": "text",
		"validate": function(value) {
		        return ["it'sreallycomplicateD6969", "it'sverycomplicateD6969"].indexOf(value) >= 0;
		}
	  }
  },
  "e2": {
	  "title": "Puzzle #2",
	  "goto": "e3",
	  "onenter": function() {
		var hero = document.querySelector("#e2 .hero");
		var dragStart = {};
		var dragEnd = {};

		function heroMove(e){
			var base = hero.getBoundingClientRect();
			hero.style.position = 'relative';
			var top = (e.clientY - dragStart.y + (dragEnd.y | 0));
			var left = (e.clientX - dragStart.x + (dragEnd.x | 0));

			hero.style.top = top + 'px';
			hero.style.left = left + 'px';

			if (Math.abs(top) > Math.abs(base.height * 0.25) || Math.abs(left) > Math.abs(base.width * 0.25))
				hero.classList.add("moved");
			else
				hero.classList.remove("moved");
		}

		function mouseUp(e) {
			dragEnd.x = Number(hero.style.left.substr(0, hero.style.left.length-2));
			dragEnd.y = Number(hero.style.top.substr(0, hero.style.top.length-2));
    			window.removeEventListener('mousemove', heroMove, true);
		}

		function mouseDown(e){
			dragStart.x = e.x;
			dragStart.y = e.y;
  		window.addEventListener('mousemove', heroMove, true);
		}

    function touchMove(e) {
        heroMove(e.targetTouches[0]);
    }

    function touchStart(e) {
      dragStart.x = e.targetTouches[0].clientX;
      dragStart.y = e.targetTouches[0].clientY;
      window.addEventListener("touchmove", touchMove, true);
    }

    function touchEnd(e) {
			dragEnd.x = Number(hero.style.left.substr(0, hero.style.left.length-2));
			dragEnd.y = Number(hero.style.top.substr(0, hero.style.top.length-2));
    	window.removeEventListener('touchmove', touchMove, true);

    }

		hero.addEventListener("mousedown", mouseDown, false);
		window.addEventListener('mouseup', mouseUp, false);
		hero.addEventListener("touchstart", touchStart, false);
		window.addEventListener('touchend', touchEnd, false);
		window.addEventListener('touchend', touchEnd, false);

	  },
	  "readywhen": "Dec 03, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "Which one of these is not a kind of Turkey",
  //which of these is not turkey
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
		      "turkey",
		      "turkey",
		      "turkey",
		      "turkey",
		      "chicken"
		],
		"validate": function(value) {
		        return value.toLowerCase() !== "turkey";
		}
	  }
  },
  "e3": {
	  "title": "Puzzle #3",
	  "goto": "e4",
	  "readywhen": "Dec 03, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": '<span draggable="true" class="draggable" ondragstart="dragstart_handler(event);" ondragend="dragend_handler(event);" onclick="cheat_e3()">ˆ</span>How do you spell <em>Sí-wu-plate</em> properly?',
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
		      'S\'il vous <span id="e3target" ondrop="drop_handler(event);" ondragover="dragover_handler(event);">plait</span>',
		      "Si vou play",
		      "Si vouw plant",
		      "See who please",
		],
		"validate": function(value) {
		        return value == "S'il vous plaît";
		}
	  }
  },
  "e4": {
	  "title": "Puzzle #4",
	  "goto": "e5",
	  "readywhen": "Dec 03, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "How <span class=\"clickable\" onclick=\"goToPage('e5')\">many</span> grains of sand are in this picture?",
	  },
	  "response": {
		"type": "input",
		"datatype": "number",
		"validate": function(value) {
		        return false;
		}
	  }
  },
  "e5": {
	  "title": "Puzzle #5",
	  "goto": "e6",
	  "readywhen": "Dec 03, 2023 17:00:00",
	  "onenter": function() {
      $("article#e5 .close").click(function() {
				event.preventDefault();
				event.stopPropagation();
        goToPage("e6");
      });
    },
	  "content": {
		"type": "text",
      "value": "Find x",
	  },
	  "response": {
		"type": "input",
		"datatype": "number",
		"validate": function(value) {
		        return false;
		}
	  }
  },
  "e6": {
	  "title": "Puzzle #6",
	  "goto": "e7",
	  "readywhen": "Dec 03, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "Which iPhone is this?",
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
		      "iPhone 10",
		      "iPhone 11",
		      "<input id=\"input_iphone\" onkeyup=\"cheat_e6(event)\" value=\"iPhone 12\"/>",
		      "iPhone 13",
		],
		"validate": function(value) {
		        return value.toLowerCase() == "iphone 12 pro";
		}
	  }
  },
  "e7": {
	  "title": "Puzzle #7",
	  "goto": "intro3",
	  "readywhen": "Dec 03, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "Which character kills two people in the season 2 of Lost?",
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
			"Michael",
			"Ana-Lucia",
			"Sayid",
			"Charlie",
		],
		"validate": function(value) {
		        return value == "Michael";
		}
	  }
  },
  "intro3": {
	  "title": "Dog saves the day!",
	  "goto": "p15",
	  "onenter": eduDefeatedAnimation,
	  "readywhen": "Dec 03, 2023 17:00:00",
	  "content": {
		  "type": "audio",
		  "value": "/audio/intro3.mp3"
	  },
	  "response": {
		"type": "single-choice",
		"options": [
		      "Continue",
		],
		"validate": function(value) {
		        return true;
		}
	  }
  },
  "p15": {
	  "title": "Puzzle #15",
	  "onenter": function(){changeState("last")},
	  "goto": "p16",
	  "readywhen": "Dec 04, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "Who is the author of this painting?",
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
		      "Da Vinci",
		      "Picasso",
		      "Van Gogh",
		      "Majinha"
		],
		"validate": function(value) {
		        return value == "Majinha";
		}
	  }
  },
  "p16": {
	  "title": "Puzzle #16",
	  "goto": "p17",
	  "readywhen": "Dec 04, 2023 17:00:00",
	  "content": {
		"type": "text",
      "value": "What internet show has the slogan above?",
	  },
	  "response": {
		  "type": "input",
		  "datatype": "text",
		  "validate": function(value) {
        return value.toLowerCase().indexOf("crime junkie") >= 0;
		  }
	  }
  },
  "p17": {
	  "title": "Puzzle #17",
	  "goto": "p18",
	  "readywhen": "Dec 04, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "2 + 2?",
	  },
	  "response": {
		"type": "input",
		"datatype": "input",
		"validate": function(value) {
		        return value == 5;
		}
	  }
  },
  "p18": {
	  "title": "Puzzle #18",
	  "goto": "p19",
	  "readywhen": "Dec 04, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "Can you identify the owner of this fingerprint?",
	  },
	  "response": {
		"type": "input",
		"datatype": "text",
		"validate": function(value) {
		        return value.toLowerCase().indexOf("abi") > 0;
		}
	  }
  },
  "p19": {
	  "title": "Puzzle #19",
	  "goto": "p20",
	  "readywhen": "Dec 04, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "How old was Taylor Swift at the age of <b>21</b>?",
	  },
	  "response": {
		"type": "input",
		"datatype": "number",
		"validate": function(value) {
		        return value == 21;
		}
	  }
  },
  "p20": {
	  "title": "Puzzle #20",
	  "goto": "p21",
	  "readywhen": "Dec 04, 2023 17:00:00",
	  "content": {
		"type": "text",
		"value": "What does this machine make?",
	  },
	  "response": {
		"type": "input",
		"datatype": "text",
		"validate": function(value) {
		        return value.toLowerCase().indexOf("pop") >= 0;
		}
	  }
  },
  "p21": {
	  "title": "Puzzle #21",
	  "goto": "intro4",
	  "readywhen": "Dec 04, 2023 17:00:00",
	  "content": {
		"type": "text",
      "value": "What is the answer to the next <b>question</b>?",
	  },
	  "response": {
		"type": "input",
		"datatype": "text",
		"validate": function(value) {
      return value.toLowerCase().indexOf("yes") >= 0;
		}
	  }
  },
  "intro4": {
	  "title": "We're counting on you!",
	  "goto": "",
	  "onenter": function(){changeState("done")},
	  "readywhen": "Dec 05, 2023 17:00:00",
	  "content": {
		  "type": "audio",
		  "value": "/audio/intro4.mp3"
	  },
	  "response": {
		"type": "single-choice",
		"options": [],
		"validate": function(value) {
		        return true;
		}
	  }
  },
};
	function getCurrPuzzle() {
		return puzzles[currPage] || {};
	}

	function goToPage(id) {
		if (id && id != "home") {
			if (id == "continue") {
        id = states[currState].continue;
      }

			var article = window.$main_articles.filter('#' + id);
			if (article.length > 0) {
				window.$main._show(id);
				if (puzzles[id] && puzzles[id].onenter) {
				  var readywhen = puzzles[id].readywhen;
				  if (ignoreReadywhen || (new Date(readywhen).getTime() - new Date().getTime()) <= 3) {
						puzzles[id].onenter();
				  }
				}
			} else {
				debugger;
				window.$main._show("notfound");
			}
		} else {
      id = null;
			window.$main._hide();
		}
		currPage = id;
	};
	function goToNextPuzzle() {
		goToPage(getCurrPuzzle()?.goto);
	};

	function fail(reason) {
		goToPage("fail");
	}

	function answerPuzzle(valid) {
		if (valid) {
			goToNextPuzzle();
		}
		else {
			fail();
		}
	}

(function($) {

	function createArticle(id, puzzle) {
			var article = document.createElement("article");
			article.id = id;
			var title = puzzle.title;
			var h2 = document.createElement("h2");
			h2.classList.add("major");
			h2.innerHTML = title;
			article.appendChild(h2);

			var hero = document.createElement("div");
			hero.classList.add("hero");
			hero.style.backgroundImage = "url(/puzzles/"+id+"/image.jpg)";
			hero.title = puzzle.imgtitle;
			article.appendChild(hero);

			if (puzzle.content) {
				var content = document.createElement("div");
				content.classList.add("content");
				switch (puzzle.content.type) {
					case "audio":
						var audio = document.createElement("audio");
						audio.classList.add("mejs__player");
						audio.setAttribute("data-mejsoptions", '{"stretching": "fill", "width": "100%", "alwaysShowControls": "true"}');
						var source = document.createElement("source");
						source.src = puzzle.content.value;
						source.type = "audio/mp3";
						audio.appendChild(source);
						content.appendChild(audio);
						break;
					case "text":
						var p = document.createElement("p");
						p.classList.add("question");
						p.innerHTML = puzzle.content.value;
						content.appendChild(p);
						break;
					default:
						break;
				}
				article.appendChild(content);
			}

			if (puzzle.response) {
				var response = document.createElement("div");
				response.classList.add("response");
				response.classList.add(puzzle.response.type);
				switch (puzzle.response.type) {
					case "input":
						var input = document.createElement("input");
						input.placeholder = "Answer";
						input.type = puzzle.response.datatype;
						response.appendChild(input);
						input.onkeypress = function(e) {
    							if (e.key == "Enter") {
								answerPuzzle(puzzle.response.validate(input.value));
    							}
						}
						var label = document.createElement("label");
						label.innerHTML = "Answer";
						response.appendChild(label);
						var button = document.createElement("button");
						button.innerHTML = "Enter";
						button.onclick = function() {
							answerPuzzle(puzzle.response.validate(input.value));
						}
						response.appendChild(button);
						break;
					case "multiple-choice":
						for (var i = 0; i < puzzle.response.options.length; i++) {
							var option = puzzle.response.options[i];
							var button = document.createElement("button");
							button.classList.add("option");
							button.innerHTML = option;
							button.onclick = function(e) {
								if (e.target !== this)
									return;
								var value = e.target.innerHTML;
								if (e.target.firstChild.nodeName == "INPUT") {
									value = e.target.firstChild.value;
									if (!value.toLowerCase().endsWith(" pro"))
										return;
								}
								answerPuzzle(puzzle.response.validate(value));
							};
							response.appendChild(button);
						}
						break;
					case "single-choice":
						for (var i = 0; i < puzzle.response.options.length; i++) {
							var option = puzzle.response.options[i];
							var button = document.createElement("button");
							button.classList.add("option");
							button.innerHTML = option;
							button.onclick = function(e) {
								if (e.target !== this)
									return;
								var value = e.target.innerHTML;
								if (e.target.firstChild.nodeName == "INPUT") {
									value = e.target.firstChild.value;
									if (!value.toLowerCase().endsWith(" pro"))
										return;
								}
								answerPuzzle(puzzle.response.validate(value));
							};
							response.appendChild(button);
						}
						break;
					default:
						break;
				}
				article.appendChild(response);
			}


			article.setAttribute("readywhen", puzzle.readywhen);
			document.getElementById("main").appendChild(article);

		}


	// Initialize.

	window.$window = $(window),
	window.$body = $('body'),
	window.$wrapper = $('#wrapper'),
	window.$header = $('#header'),
	window.$footer = $('#footer'),
	window.$main = $('#main');

	for (var i = 0; i < Object.keys(puzzles).length; i++) {
			var id = Object.keys(puzzles)[i];
			var puzzle = puzzles[id];
			createArticle(id, puzzle);

		}
	window.$main_articles = window.$main.children('article');

setInterval(function() {

  var timer = document.getElementById("timer");
  var countDownRunning = timer.getAttribute("running") == 'true';
  if (!countDownRunning)
	return;

  var countDownDate = new Date(timer.getAttribute("date")).getTime();

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = Math.max(0, countDownDate - now);

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  if (days > 0)
  	days = days + "d ";
  else
	days = "";

  timer.innerHTML = days + String(hours).padStart(2, "0") + ":"
  + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

  // If the count down is over, write some text
  if (distance < 0) {
	timer.setAttribute("running", "false");
	location.reload();
  }
}, 1000);

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {

        $("#play").click(function() {
          changeState(localStorage.getItem("state") || "");
          $("#play").remove();
				  window.$body.removeClass('is-preload');
        });

			}, 100);
		});

	// Fix: Flexbox min-height bug on IE.
		if (browser.name == 'ie') {

			var flexboxFixTimeoutId;

			$window.on('resize.flexbox-fix', function() {

				clearTimeout(flexboxFixTimeoutId);

				flexboxFixTimeoutId = setTimeout(function() {

					if (window.$wrapper.prop('scrollHeight') > $window.height())
						window.$wrapper.css('height', 'auto');
					else
						window.$wrapper.css('height', '100vh');

				}, 250);

			}).triggerHandler('resize.flexbox-fix');

		}

	// Nav.
		var $nav = window.$header.children('nav'),
			$nav_li = $nav.find('li');

		// Add "middle" alignment classes if we're dealing with an even number of items.
			if ($nav_li.length % 2 == 0) {

				$nav.addClass('use-middle');
				$nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');

			}

	// Main.
		var	delay = 2250,
			locked = false;

		// Methods.
			window.$main._show = function(id, initial, prev) {

				var $article = window.$main_articles.filter('#' + id);

				// No such article? Bail.
					if ($article.length == 0)
						return;

				var readywhen = $article.attr("readywhen");
				if (!ignoreReadywhen && (new Date(readywhen).getTime() - new Date().getTime()) > 3) {
					$article = window.$main_articles.filter('#notready');
					$("#timer").attr("date", readywhen);
				}

				// Handle lock.

					// Already locked? Speed through "show" steps w/o delays.
						if (locked || (id.length <= 1 && typeof initial != 'undefined' && initial === true)) {

							// Mark as switching.
								window.$body.addClass('is-switching');

							// Mark as visible.
								window.$body.addClass('is-article-visible');

							// Deactivate all articles (just in case one's already active).
								window.$main_articles.removeClass('active');

							// Hide header, footer.
								window.$header.hide();
								window.$footer.hide();
								$("#loading").hide();

							// Show main, article.
								window.$main.show();
								$article.show();

							// Activate article.
								$article.addClass('active');

							// Unlock.
								locked = false;

							// Unmark as switching.
								setTimeout(function() {
									window.$body.removeClass('is-switching');
								}, (initial ? 1000 : 0));

							return;

						}

					// Lock.
						//locked = true;

				// Article already visible? Just swap articles.
					if (window.$body.hasClass('is-article-visible')) {

						// Deactivate current article.
							var $currentArticle = window.$main_articles.filter('.active');

							$currentArticle.removeClass('active');
							$("#loading").addClass('active');

						// Show article.
							setTimeout(function() {

								// Hide current article.
									$currentArticle.hide();

								// Show article.
									$("#loading").removeClass('active');
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

				// Otherwise, handle as normal.
					else {

						// Mark as visible.
							window.$body
								.addClass('is-article-visible');
							$("#loading").addClass('active');

						// Show article.
							setTimeout(function() {

								// Hide header, footer.
									window.$header.hide();
									window.$footer.hide();
									$("#loading").removeClass('active');

								// Show main, article.
									window.$main.show();
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

			};

			window.$main._hide = function(addState) {

				var $article = window.$main_articles.filter('.active');

				// Article not visible? Bail.
					if (!window.$body.hasClass('is-article-visible'))
						return;

				// Add state?
					if (typeof addState != 'undefined'
					&&	addState === true)
						history.pushState(null, null, '#');

				// Handle lock.

					// Already locked? Speed through "hide" steps w/o delays.
						if (locked) {

							// Mark as switching.
								window.$body.addClass('is-switching');

							// Deactivate article.
								$article.removeClass('active');

							// Hide article, main.
								$article.hide();
								window.$main.hide();

							// Show footer, header.
								window.$footer.show();
								window.$header.show();

							// Unmark as visible.
								window.$body.removeClass('is-article-visible');

							// Unlock.
								locked = false;

							// Unmark as switching.
								window.$body.removeClass('is-switching');

							// Window stuff.
								$window
									.scrollTop(0)
									.triggerHandler('resize.flexbox-fix');

							return;

						}

					// Lock.
						//locked = true;

				// Deactivate article.
					$article.removeClass('active');
							$("#loading").addClass('active');

				// Hide article.
					setTimeout(function() {

						// Hide article, main.
							$article.hide();
							window.$main.hide();

						// Show footer, header.
							$("#loading").removeClass('active');
							setTimeout(function() {
							window.$footer.show();
							window.$header.show();

						// Unmark as visible.
							setTimeout(function() {

								window.$body.removeClass('is-article-visible');

								// Window stuff.
									$window
										.scrollTop(0)
										.triggerHandler('resize.flexbox-fix');

								// Unlock.
									setTimeout(function() {
										locked = false;
									}, delay);

							}, 25);
							}, 725);

					}, delay);


			};

		// Articles.
			window.$main_articles.each(function() {

				var $this = $(this);

				// Close.
					$('<div class="close">Close</div>')
						.appendTo($this)
						.on('click', function() {
              if (this.parentElement.id == "e5")
                return;
							setTimeout(function() {
							goToPage(null);
							}, 200 + Math.random() * 200);
						});

				// Prevent clicks from inside article from bubbling.
					$this.on('click', function(event) {
						event.stopPropagation();
					});

			});

		// Events.
			$window.on('hashchange', function(event) {
				event.preventDefault();
				event.stopPropagation();

				if (location.hash.length <= 1)
					return;

				var page = location.hash;
				goToPage(page.substr(1));

				location.hash = "";
			});

			// Hide main, articles.
				window.$main.hide();
				window.$main_articles.hide();

})(jQuery);


function dragstart_handler(ev) {
}
function dragover_handler(ev) {
 ev.preventDefault();
}
function drop_handler(ev) {
  ev.preventDefault();
  ev.target.parentNode.innerHTML = "S'il vous plaît";
  var src = document.querySelectorAll('.draggable')[0];
  src.parentNode.removeChild(src);
}
function dragend_handler(ev) {
  ev.preventDefault();
}
function cheat_e3(e) {
  drop_handler({"target": $("#e3target")[0], "preventDefault": function(){}});
}
function cheat_e6(ev) {
  if (ev.target.value.toLowerCase() === 'iphone 12 pro') {
    ev.target.parentNode.click();
  }
}
