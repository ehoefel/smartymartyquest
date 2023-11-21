/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/



var puzzles = {
  "aW50": {
	  "title": "Puzzle #1",
	  "readywhen": "Nov 21, 2023 07:31:25",
	  "content": "<p class=\"question\">What is the name of this painting?</p>",
	  "response": {
		  "type": "input",
		  "data-type": "string",
		  "validate": function(value) {
			  return value.toLowerCase() == "The Treachery of Images".toLowerCase();
		  }
	  }
	  },
  "Vc1M": {
	  "title": "Puzzle #2",
	  "readywhen": "Nov 21, 2023 10:31:25",
	  },
  "MxTT": {
	  },
  "UVDE": {
	  },
  "RTE5": {
	  },
  "TE5M": {
	  },
  "E5Mj": {
	  },
  "5Mjg": {
	  },
  "Mjgz": {
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
		return Object.keys(puzzles).indexOf(location.hash.slice(1));
		}

	function getPuzzleLink(index) {
		return "#".concat(Object.keys(puzzles)[index]);
		}
	function goToNextPuzzle() {
		location.hash = getPuzzleLink(getCurrPuzzle()+1);
	};

	function fail(reason) {
		location.hash = "#fail";

	}

(function($) {

	function createArticle(puzzleHash, puzzle) {
			var number = Object.keys(puzzles).indexOf(hash)+1;
			var article = document.createElement("article");
			article.id = hash;
			var title = puzzle.title;
			var h2 = document.createElement("h2");
			h2.classList.add("major");
			h2.innerHTML = title;
			article.appendChild(h2);

			var hero = document.createElement("div");
			hero.classList.add("hero");
			hero.style.backgroundImage = "url(/puzzles/"+number+"/image.jpg)";
			article.appendChild(hero);

			var content = document.createElement("div");
			content.classList.add("content");
			content.innerHTML = puzzle.content;
			article.appendChild(content);

			var response = document.createElement("div");
			response.classList.add("response");
			article.appendChild(response);

			if (puzzle.response && puzzle.response.type == "input") {
				var input = document.createElement("input");
				input.placeholder = "Answer";
				response.appendChild(input);
				var label = document.createElement("label");
				label.innerHTML = "Answer";
				response.appendChild(label);
				var button = document.createElement("button");
				button.innerHTML = "Enter";
				button.onclick = function() {
					if (puzzle.response.validate(input.value)) {
						goToNextPuzzle();

					}
					else {
						fail();
					}
				}
				response.appendChild(button);
			}


			article.setAttribute("readywhen", puzzle.readywhen);
			document.getElementById("main").appendChild(article);

		}


		// Initialize.


	for (var i = 0; i < Object.keys(puzzles).length; i++) {
			var hash = Object.keys(puzzles)[i];
			var puzzle = puzzles[hash];
			createArticle(hash, puzzle);

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
