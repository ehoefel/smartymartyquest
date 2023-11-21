/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

var intervals = {};

function unlockCheckpoint1() {
	intervals['c1'] = setInterval(function() {
		if (location.hash == "#intro") {
			$("#checkpoint1")
			.click(function() {
				goToPuzzle(puzzles["c1"].goto);
				setTimeout(function() {
					$("#checkpoint1").removeClass("active");
				}, 300);
			})
			.addClass("active")
			.css("animation-duration", "" + ($(window).height() + $(window).width())/200 + "s");
		}
	}, 1000);
}

function lockCheckpoint1() {
	intervals['c1'] && clearInterval(intervals['c1']);
	$("#checkpoint1").removeClass("active").prop("onclick", null);
}



var puzzles = {
  //S'il vous plaît
  //2+2
  //how many in picture (0)
  //how many in picture (many)
  //which of these is not turkey
  //wifi password
  //click next
  //what was the previous puzzle number
  //which iphone is this
  "intro": {
	  "title": "Intro",
	  "goto": "p1",
	  "content": {
		  "type": "audio",
		  "value": "https://filesamples.com/samples/audio/mp3/Symphony%20No.6%20(1st%20movement).mp3"
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
		        return value.toLowerCase() == "The Treachery of Images".toLowerCase();
		}
	  }
  },
  "p2": {
	  "title": "Puzzle #2",
	  "goto": "p3",
	  "readywhen": "Nov 21, 2023 09:31:25",
	  "content": {
		"type": "text",
		"value": "In bowling, three strikes in a row is called?",
	  },
	  "response": {
		"type": "multiple-choice",
		"options": [
		      "triple",
		      "turkey",
		      "triumph",
		      "trashed"
		],
		"validate": function(value) {
		        return value.toLowerCase() == "turkey";
		}
	  }
  },
  "p3": {
	  "title": "Puzzle #3",
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
	  "goto": "p5",
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
  "p5": {
	  "title": "Puzzle #5",
	  "goto": "p6",
	  "readywhen": "Nov 21, 2023 09:31:25",
	  //"imgtitle": "Those are alpacas :)",
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
	  "goto": "p8",
	  "onenter": unlockCheckpoint1,
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
  "p8": {
	  "readywhen": "Nov 21, 2023 17:31:25",
  },
  "jgzM": {
  },
  "gzMD": {
  },
  "zMDk": {
  },
  "MDkx": {
  },
  "DkxO": {
  },
  "kxOD": {
  },
  "xODI": {
  },
  "ODI0": {
  },
  "DI0M": {
  },
  "I0MD": {
  },
  "0MDk": {
  },
  "MDky": {
  },
};
	function getCurrPuzzle() {
		return puzzles[location.hash.slice(1)];
	}

	function getPuzzleLink(index) {
		return "#".concat(Object.keys(puzzles)[index]);
	}
	function goToPuzzle(link) {
		location.hash = link;
	};
	function goToNextPuzzle() {
		goToPuzzle(getCurrPuzzle().goto);
	};

	function fail(reason) {
		location.hash = "#fail";

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
								var value = e.target.innerHTML;
								answerPuzzle(puzzle.response.validate(value));
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


	for (var i = 0; i < Object.keys(puzzles).length; i++) {
			var id = Object.keys(puzzles)[i];
			var puzzle = puzzles[id];
			createArticle(id, puzzle);

		}

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
	$main._show(location.hash.substr(1));
  }
}, 1000);


	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article');

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
				$body.removeClass('is-preload');
			}, 100);
		});

	// Fix: Flexbox min-height bug on IE.
		if (browser.name == 'ie') {

			var flexboxFixTimeoutId;

			$window.on('resize.flexbox-fix', function() {

				clearTimeout(flexboxFixTimeoutId);

				flexboxFixTimeoutId = setTimeout(function() {

					if ($wrapper.prop('scrollHeight') > $window.height())
						$wrapper.css('height', 'auto');
					else
						$wrapper.css('height', '100vh');

				}, 250);

			}).triggerHandler('resize.flexbox-fix');

		}

	// Nav.
		var $nav = $header.children('nav'),
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
			$main._show = function(id, initial) {

				var $article = $main_articles.filter('#' + id);

				// No such article? Bail.
					if ($article.length == 0)
						return;

				var readywhen = $article.attr("readywhen");
				if (readywhen && (new Date(readywhen).getTime() - new Date().getTime()) > 3) {
					$article = $main_articles.filter('#notready');
					$("#timer").attr("date", readywhen);
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
								$body.addClass('is-switching');

							// Mark as visible.
								$body.addClass('is-article-visible');

							// Deactivate all articles (just in case one's already active).
								$main_articles.removeClass('active');

							// Hide header, footer.
								$header.hide();
								$footer.hide();
								$("#loading").hide();

							// Show main, article.
								$main.show();
								$article.show();

							// Activate article.
								$article.addClass('active');

							// Unlock.
								locked = false;

							// Unmark as switching.
								setTimeout(function() {
									$body.removeClass('is-switching');
								}, (initial ? 1000 : 0));

							return;

						}

					// Lock.
						//locked = true;

				// Article already visible? Just swap articles.
					if ($body.hasClass('is-article-visible')) {

						// Deactivate current article.
							var $currentArticle = $main_articles.filter('.active');

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
							$body
								.addClass('is-article-visible');
							$("#loading").addClass('active');

						// Show article.
							setTimeout(function() {

								// Hide header, footer.
									$header.hide();
									$footer.hide();
									$("#loading").removeClass('active');

								// Show main, article.
									$main.show();
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

			$main._hide = function(addState) {

				var $article = $main_articles.filter('.active');

				// Article not visible? Bail.
					if (!$body.hasClass('is-article-visible'))
						return;

				// Add state?
					if (typeof addState != 'undefined'
					&&	addState === true)
						history.pushState(null, null, '#');

				// Handle lock.

					// Already locked? Speed through "hide" steps w/o delays.
						if (locked) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Deactivate article.
								$article.removeClass('active');

							// Hide article, main.
								$article.hide();
								$main.hide();

							// Show footer, header.
								$footer.show();
								$header.show();

							// Unmark as visible.
								$body.removeClass('is-article-visible');

							// Unlock.
								locked = false;

							// Unmark as switching.
								$body.removeClass('is-switching');

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
							$main.hide();

						// Show footer, header.
							$("#loading").removeClass('active');
							setTimeout(function() {
							$footer.show();
							$header.show();

						// Unmark as visible.
							setTimeout(function() {

								$body.removeClass('is-article-visible');

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
			$main_articles.each(function() {

				var $this = $(this);

				// Close.
					$('<div class="close">Close</div>')
						.appendTo($this)
						.on('click', function() {
							setTimeout(function() {
							location.hash = '';
							}, 200 + Math.random() * 200);
						});

				// Prevent clicks from inside article from bubbling.
					$this.on('click', function(event) {
						event.stopPropagation();
					});

			});

		// Events.
			$body.on('click', function(event) {
			});

			$window.on('keyup', function(event) {

				switch (event.keyCode) {

					case 27:

						// Article visible? Hide.
							if ($body.hasClass('is-article-visible'))
								$main._hide(true);

						break;

					default:
						break;

				}

			});

			$window.on('hashchange', function(event) {

				// Empty hash?
					if (location.hash == ''
					||	location.hash == '#') {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Hide.
							$main._hide();

					}

				// Otherwise, check for a matching article.
					else if ($main_articles.filter(location.hash).length > 0) {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Show article.
							$main._show(location.hash.substr(1));

					}
					else {
						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Show article.
							$main._show("notfound");

					}

			});

		// Scroll restoration.
		// This prevents the page from scrolling back to the top on a hashchange.
			if ('scrollRestoration' in history)
				history.scrollRestoration = 'manual';
			else {

				var	oldScrollPos = 0,
					scrollPos = 0,
					$htmlbody = $('html,body');

				$window
					.on('scroll', function() {

						oldScrollPos = scrollPos;
						scrollPos = $htmlbody.scrollTop();

					})
					.on('hashchange', function() {
						$window.scrollTop(oldScrollPos);
					});


			}

	$("#accept").attr("href", getPuzzleLink(0));
			// Hide main, articles.
				$main.hide();
				$main_articles.hide();

			// Initial article.
				if (location.hash != ''
				&&	location.hash != '#')
					$window.on('load', function() {
						$main._show(location.hash.substr(1), true);
					});

})(jQuery);
