(function(){

	var quizData = [{
		question: "Which team was the champion of the 1994-1995 Premier League season?",
		answer1: "Blackburn Rovers",
		answer2: "Manchester United",
		answer3: "Arsenal",
		correctAnswer: 1,
		totalStats: 0
		}, 
		{
		question: "In 2001-2002 Premier League season top scorer was:",
		answer1: "Michael Owen",
		answer2: "Alan Shearer",
		answer3: "Thierry Henry",
		correctAnswer: 3,
		totalStats: 0
		},
		{
		question: "What is the name of the Southampton F.C.'s stadium",
		answer1: "St John's Stadium",
		answer2: "St Peter's Stadium",
		answer3: "St Mary's Stadium",
		correctAnswer: 3,
		totalStats: 0
		},
		{
		question: "Derby County F.C. was founded in:",
		answer1: "1884",
		answer2: "1878",
		answer3: "1892",
		correctAnswer: 1,
		totalStats: 0
		},
		{
		question: "Which player has the most appearances for the Charlton Athletic F.C.?",
		answer1: "Derek Hales",
		answer2: "Sam Bartram",
		answer3: "Nicky Weaver",
		correctAnswer: 2,
		totalStats: 0
	}];

	var startQuiz = document.getElementById('start'),
		getApp = document.getElementById('app'),
		radioButtons = document.getElementsByName('answers'),
		sumOfQuestions = quizData.length,
		correctAnswIncrement = 0,
		questionIncrement = 0,
		totalPoints = 0;

	var display = {
		mainPage: function(event) {
			var newEl = '<h1 id="questionDisplay"></h1>';
			newEl += '<ul><li><input type="radio" name="answers" id="input1"><label for="answers" id="answerDisplay1"></label></li>';
			newEl += '<li><input type="radio" name="answers" id="input2"><label for="answers" id="answerDisplay2"></label></li>';
			newEl += '<li><input type="radio" name="answers" id="input3"><label for="answers" id="answerDisplay3"></label></li></ul>';
			getApp.innerHTML = newEl;
			display.updatePage(event);
		},
		updatePage: function() {
			var getInput1 = document.getElementById('input1'),
				getInput2 = document.getElementById('input2'),
				getInput3 = document.getElementById('input3'),
				getQuestion = document.getElementById('questionDisplay'),
				getAnswer1 = document.getElementById('answerDisplay1'),
				getAnswer2 = document.getElementById('answerDisplay2'),
				getAnswer3 = document.getElementById('answerDisplay3');
				
				makeNewButton('Submit Answer', 'submit', checkAnswer);

			if(questionIncrement < sumOfQuestions) {
				getInput1.value = 1;
				getInput2.value = 2;
				getInput3.value = 3;
				getQuestion.innerHTML = quizData[questionIncrement].question;
				getAnswer1.innerHTML = quizData[questionIncrement].answer1;
				getAnswer2.innerHTML = quizData[questionIncrement].answer2;
				getAnswer3.innerHTML = quizData[questionIncrement].answer3;
				questionIncrement++;
			} 
		},
		addAnswer: function(showMessage) {
			if(showMessage === 'correct') {
				addAnswerMessage('Correct Answer!');
			} else {
				addAnswerMessage('Incorrect Answer!');
			}

			if (questionIncrement < sumOfQuestions) {
				makeNewButton('Next question', 'nextQuest', this.removeAnswer);
			} else {
				makeNewButton('See your result', 'result', this.resultPage);
			}
		},
		removeAnswer: function(event) {
			var getShowAnswer = document.getElementById('showAnswer');
			var getShowAnswerParent = getShowAnswer.parentNode;
			getShowAnswerParent.removeChild(getShowAnswer);
			display.updatePage(event);
			var clickedEl = event.target;
			var clickedElParent = clickedEl.parentNode;
			clickedElParent.removeChild(clickedEl);
			var i;

			for(i = 0; i < radioButtons.length; i++) {
				radioButtons[i].checked = false;
			}
		},
		resultPage: function() {
			getApp.innerHTML = '<h1>You have answered correctly on ' + totalPoints + ' questions</h1>';
			questionIncrement = 0;
			correctAnswIncrement = 0;
			totalPoints = 0;
			makeNewButton('Restart quiz', 'retart', display.mainPage);
		}
	};

	function checkAnswer(event) {
		var isChecked = false,
			i,
			checkedRadio,
			clickedEl = event.target,
			clickedElParent = clickedEl.parentNode;

		for (i = 0; i < radioButtons.length; i++) {
			if (radioButtons[i].checked) {
				isChecked = true;
				checkedRadio = +radioButtons[i].value;
			}
		}

		if (isChecked === false) {
			alert('Please choose the answer!');
		} else {
			clickedElParent.removeChild(clickedEl);
			if (checkedRadio === quizData[correctAnswIncrement].correctAnswer) {
				display.addAnswer('correct');
				totalPoints++;
			} else {
				display.addAnswer();
			}
			correctAnswIncrement++;
		}
	}

	// Create a new button with event listener attached
	function makeNewButton(buttonText, buttonId, onEventFunction) {
		var newButton = document.createElement('button');
		var newButtonText = document.createTextNode(buttonText);
		newButton.appendChild(newButtonText);
		newButton.id = buttonId;
		getApp.appendChild(newButton);
		newButton.addEventListener('click', onEventFunction, false);
	}

	function addAnswerMessage(messageText) {
		var showAnswer = document.createElement('p');
		showAnswer.id = 'showAnswer';
		var showAnswerMsg = document.createTextNode(messageText);
		showAnswer.appendChild(showAnswerMsg);
		getApp.appendChild(showAnswer);
	}

	startQuiz.addEventListener('click', display.mainPage, false);

})();