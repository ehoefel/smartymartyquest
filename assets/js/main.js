/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

var intervals = {};
var currPage = null;
var skipIntro = false;
var skipIntro2 = false;
var reachedEvilPuzzles = false;
var solvedEvilPuzzles = false;

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
	]
}

function playSoundEffect(file) {
	var o = $("#soundeffects").html("<source src=\"/audio/" + file + ".mp3\" type=\"audio/mp3\"/>")[0];
	o.load();
	setTimeout(function() {
		o.play();
	}, 500);

}

function speak(tag, onFinish) {
	var o = $('#speech').html("<source src=\"/audio/" + tag + ".aac\" type=\"audio/mp4\"/>")[0];
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
		onFinish();
	}, acctime);
}

function enableSkipIntro() {
	skipIntro = true;
	$("#begin").text("Continue");
}

function enableSkipIntro2() {
	skipIntro2 = true;
	$("#begin").text("Continue");
}
    

function unlockCheckpoint1() {
	intervals['c1'] = setInterval(function() {
		if (currPage == "intro") {
			showCheckpoint1();
		}
	}, 1000);
}

function showCheckpoint1() {
	$("#checkpoint1:not(.active)").addClass("active")
			.click(function() {
				goToPage(puzzles["c1"].goto);
				setTimeout(hideCheckpoint1, 300);
			})
			.css("animation-duration", "" + ($(window).height() + $(window).width())/150 + "s");
}

function hideCheckpoint1() {
	$("#checkpoint1.active").removeClass("active").prop("onclick", null);

}

function lockCheckpoint1() {
	intervals['c1'] && clearInterval(intervals['c1']);
	hideCheckpoint1();
}

function unlockCheckpoint2() {
	lockCheckpoint1();
	intervals['c2'] = setInterval(function() {
		if (!currPage) {
			showCheckpoint2();
		}
	}, 1000);
}

function showCheckpoint2() {
	if (reachedEvilPuzzles)
		return;

	$("#checkpoint2:not(.active)").addClass("active")
			.click(function() {
				if (reachedEvilPuzzles)
					return;

				$('body').addClass("evil");
				$('#checkpoint2').addClass("used");
				reachedEvilPuzzles = true;
				setTimeout(function() {
					$('#checkpoint2').addClass("flipped");
					setTimeout(function() {
						speak('evil-entrance', function() {
							$('.edu').addClass("leaving");
						});
					}, 1000);
				}, 2500);
			});
}

function hideCheckpoint2() {
	$("#checkpoint2.active").removeClass("active").prop("onclick", null);

}

function lockCheckpoint2() {
	intervals['c2'] && clearInterval(intervals['c2']);
	hideCheckpoint2();
}



var puzzles = {
  "intro": {
	  "title": "Intro",
	  "sound": false,
	  "onleave": hideCheckpoint1,
	  "onenter": enableSkipIntro,
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
	  "sound": true,
	  "goto": "p2",
	  "readywhen": "Nov 21, 2023 07:31:25",
	  "content": {
		"type": "text",
		"value": "What is the name of this painting?",
	  },
	  "response": {
		"type": "input",
		"datatype": "string",
		"validate": function(value) {
		        return value.toLowerCase().indexOf("Starry Night".toLowerCase()) >= 0;
		}
	  }
  },
  "p2": {
	  "title": "Puzzle #2",
	  "sound": true,
	  "goto": "p3",
	  "readywhen": "Nov 21, 2023 09:31:25",
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
	  "sound": true,
	  "goto": "p4",
	  "readywhen": "Nov 21, 2023 09:31:25",
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
	  "sound": true,
	  "goto": "p5",
	  "readywhen": "Nov 21, 2023 09:31:25",
	  "content": {
		"type": "text",
		"value": "DNA stands for",
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
		      "Deoxyribonucleic Acid",
		      "Dioxonocteric Acid",
		      "Deltanucleic Acid",
		      "Deoxyribonappetit Acid",
		],
		"validate": function(value) {
		        return value == "Deoxyribonucleic Acid";
		}
	  }
  },
  "p5": {
	  "title": "Puzzle #5",
	  "sound": true,
	  "goto": "p6",
	  "readywhen": "Nov 21, 2023 09:31:25",
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
	  "sound": true,
	  "goto": "p7",
	  "readywhen": "Nov 21, 2023 09:31:25",
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
	  "sound": true,
	  "goto": "c1",
	  "readywhen": "Nov 21, 2023 09:31:25",
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
	  "sound": false,
	  "goto": "p8",
	  "onenter": unlockCheckpoint1,
	  "readywhen": "Nov 21, 2023 09:31:25",
	  "content": {
		"type": "audio",
		"value": "/audio/checkpoint1.mp3",
	  },
	  "response": {
		"type": "multiple-choice",
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
	  "sound": true,
	  "goto": "p9",
	  "readywhen": "Nov 21, 2023 07:31:25",
	  "content": {
		"type": "text",
		"value": "What is the name of this painting?",
	  },
	  "response": {
		"type": "input",
		"datatype": "string",
		"validate": function(value) {
		        return value.toLowerCase().indexOf("Treachery of Images".toLowerCase()) >= 0;
		}
	  }
  },
  "p9": {
	  "title": "Puzzle #9",
	  "sound": true,
	  "goto": "p10",
	  "readywhen": "Nov 21, 2023 07:31:25",
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
	  "sound": true,
	  "goto": "p11",
	  "readywhen": "Nov 21, 2023 09:31:25",
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
	  "sound": true,
	  "goto": "p12",
	  "readywhen": "Nov 21, 2023 09:31:25",
	  "content": {
		"type": "text",
		"value": "How many eyes does a honey bee have?",
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
		      "2",
		      "3",
		      "4",
		      "5",
		],
		"validate": function(value) {
		        return Number(value) == 5;
		}
	  }
  },
  "p12": {
	  "title": "Puzzle #12",
	  "sound": true,
	  "goto": "p13",
	  "readywhen": "Nov 21, 2023 09:31:25",
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
	  "sound": true,
	  "goto": "p14",
	  "readywhen": "Nov 21, 2023 09:31:25",
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
	  "sound": true,
	  "goto": "c2",
	  "readywhen": "Nov 21, 2023 09:31:25",
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
	  "sound": false,
	  "goto": "",
	  "onenter": unlockCheckpoint2,
	  "readywhen": "Nov 21, 2023 09:31:25",
	  "content": {
		"type": "audio",
		"value": "",
	  },
	  "response": {
		"type": "multiple-choice",
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
	  "sound": false,
	  "onleave": hideCheckpoint2,
	  "onenter": enableSkipIntro2,
	  "goto": "e1",
	  "content": {
		  "type": "audio",
		  "value": "/audio/maja_save_us.mp3"
	  },
	  "response": {
		"type": "multiple-choice",
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
	  "sound": true,
	  "goto": "e2",
	  "readywhen": "Nov 21, 2023 07:31:25",
	  "content": {
		"type": "text",
		"value": "What is your WiFi password?",
	  },
	  "response": {
		"type": "input",
		"datatype": "string",
		"validate": function(value) {
		        return ["it'sreallycomplicateD6969", "it'sverycomplicateD6969"].indexOf(value) >= 0;
		}
	  }
  },
  "e2": {
	  "title": "Puzzle #2",
	  "sound": true,
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

		hero.addEventListener("mousedown", mouseDown, false);
		window.addEventListener('mouseup', mouseUp, false);

	  },
	  "readywhen": "Nov 21, 2023 09:31:25",
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
	  "sound": true,
	  "goto": "e4",
	  "readywhen": "Nov 21, 2023 09:31:25",
	  "content": {
		"type": "text",
		"value": '<span draggable="true" class="draggable" ondragstart="dragstart_handler(event);" ondragend="dragend_handler(event);">ˆ</span>How do you spell <em>Sí-wu-plate</em> properly?',
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
		      'S\'il vous <span ondrop="drop_handler(event);" ondragover="dragover_handler(event);">plait</span>',
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
	  "sound": true,
	  "goto": "e5",
	  "readywhen": "Nov 21, 2023 09:31:25",
	  "content": {
		"type": "text",
		"value": "How <span class=\"clickable\" onclick=\"goToPage('e6')\">many</span> grains of sand are in this picture?",
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
	  "title": "Puzzle #<span class=\"clickable\" onclick=\"goToPage('e6')\">5</span>",
	  "sound": true,
	  "goto": "e6",
	  "readywhen": "Nov 21, 2023 09:31:25",
	  "content": {
		"type": "text",
		"value": "2+2",
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
		      "2",
		      "3",
		      "4",
		      "6"
		],
		"validate": function(value) {
		        return Number(value) == 5;
		}
	  }
  },
  "e6": {
	  "title": "Puzzle #6",
	  "sound": true,
	  "goto": "e7",
	  "readywhen": "Nov 21, 2023 09:31:25",
	  "content": {
		"type": "text",
		"value": "Which iPhone is this?",
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
		      "iPhone 10",
		      "iPhone 11",
		      "<input value=\"iPhone 12\"/>",
		      "iPhone 13",
		],
		"validate": function(value) {
		        return value.toLowerCase() == "iphone 12 pro";
		}
	  }
  },
  //click next
  "e7": {
	  "title": "Puzzle #7",
	  "sound": true,
	  "goto": "c3",
	  "readywhen": "Nov 21, 2023 09:31:25",
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
			"Kate",
		],
		"validate": function(value) {
		        return value == "Michael";
		}
	  }
  },
};
	function getCurrPuzzle() {
		return puzzles[currPage] || {};
	}

	function goToPage(id) {
		if (id) {
			if (id == "intro" && skipIntro) {
				id = "p1";
				if (reachedEvilPuzzles) {
					id = "intro2";
				}
				if (skipIntro2)
					id = "e1";
				if (solvedEvilPuzzles) {
					debugger;
				}
			}
			var article = window.$main_articles.filter('#' + id);
			if (article.length > 0) {
				window.$main._show(id);
			} else {
				debugger;
				window.$main._show("notfound");
			}
		} else {
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

	function answerPuzzle(valid, playSound) {
		if (valid) {
			goToNextPuzzle();
			if (playSound) {
				//var audioindex = Math.round(Math.random() * 6 + 1);
				//playSoundEffect("right"+audioindex);
			}
		}
		else {
			fail();
			if (playSound) {
				var audioindex = Math.round(Math.random() * 3 + 1);
				playSoundEffect("wrong"+audioindex);
			}
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
								answerPuzzle(puzzle.response.validate(input.value), puzzle.sound);
    							}
						}
						var label = document.createElement("label");
						label.innerHTML = "Answer";
						response.appendChild(label);
						var button = document.createElement("button");
						button.innerHTML = "Enter";
						button.onclick = function() {
							answerPuzzle(puzzle.response.validate(input.value), puzzle.sound);
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
								console.log(e);
								var value = e.target.innerHTML;
								if (e.target.firstChild.nodeName == "INPUT") {
									value = e.target.firstChild.value;
									if (!value.toLowerCase().endsWith(" pro"))
										return;
								}
								answerPuzzle(puzzle.response.validate(value), puzzle.sound);
							};
							response.appendChild(button);
						}
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
	window.$main._show(currPage);
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
				window.$body.removeClass('is-preload');
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
				if (readywhen && (new Date(readywhen).getTime() - new Date().getTime()) > 3) {
					$article = window.$main_articles.filter('#notready');
					$("#timer").attr("date", readywhen);
				}

				var currPuzzle = puzzles[prev];
				if (currPuzzle && currPuzzle.onleave) {
					currPuzzle.onleave();

				}

				if (puzzles[id]) {
					if (puzzles[id].onenter) {
						puzzles[id].onenter();
					}

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
				var bg = new Audio("/audio/bg.mp3");
				bg.play();

})(jQuery);


function dragstart_handler(ev) {
 console.log("dragStart");
}
function dragover_handler(ev) {
 console.log("dragOver");
 ev.preventDefault();
}
function drop_handler(ev) {
  console.log("Drop");
  ev.preventDefault();
  ev.target.parentNode.innerHTML = "S'il vous plaît";
  var src = document.querySelectorAll('.draggable')[0];
  src.parentNode.removeChild(src);
}
function dragend_handler(ev) {
  console.log("dragEnd");
  ev.preventDefault();
}
