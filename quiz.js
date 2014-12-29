(function(){

    var data = {
        quizContent: [
            {
                question: "Which team was the champion of the 1994-1995 Premier League season?",
                answer1: "Blackburn Rovers",
                answer2: "Manchester United",
                answer3: "Arsenal",
                correctAnswer: 1
            },
            {
                question: "In 2001-2002 Premier League season top scorer was:",
                answer1: "Michael Owen",
                answer2: "Alan Shearer",
                answer3: "Thierry Henry",
                correctAnswer: 3
            },
            {
                question: "What is the name of the Southampton F.C.'s stadium",
                answer1: "St John's Stadium",
                answer2: "St Peter's Stadium",
                answer3: "St Mary's Stadium",
                correctAnswer: 3
            },
            {
                question: "Derby County F.C. was founded in:",
                answer1: "1884",
                answer2: "1878",
                answer3: "1892",
                correctAnswer: 1
            },
            {
                question: "Which player has the most appearances for the Charlton Athletic F.C.?",
                answer1: "Derek Hales",
                answer2: "Sam Bartram",
                answer3: "Nicky Weaver",
                correctAnswer: 2
            }
        ],
        points: 0
    };
    
    var display = {
        getApp: document.getElementById('app'),
        mainPage: function() {
            var newEl = '<p id="questNumber"></p><h1 id="questionDisplay"></h1>';
                newEl += '<ul><li><input type="radio" name="answers" id="input1" value="1"><label for="input1" id="answerDisplay1"></label></li>';
                newEl += '<li><input type="radio" name="answers" id="input2" value="2"><label for="input2" id="answerDisplay2"></label></li>';
                newEl += '<li><input type="radio" name="answers" id="input3" value="3"><label for="input3" id="answerDisplay3"></label></li></ul>';
                newEl += '<p id="currentPoints"></p>';

            this.getApp.innerHTML = newEl;
        },
        updateMainPage: function() {
            var getQuestNumber = document.getElementById('questNumber'),
                getQuestion = document.getElementById('questionDisplay'),
                getAnswer1 = document.getElementById('answerDisplay1'),
                getAnswer2 = document.getElementById('answerDisplay2'),
                getAnswer3 = document.getElementById('answerDisplay3'),
                getCurrentPoints = document.getElementById('currentPoints'),
                sumOfQuestions = data.quizContent.length;
                
            getQuestNumber.innerHTML = control.count + 1 + '/' + sumOfQuestions;    
            getQuestion.innerHTML = data.quizContent[control.count].question;
            getAnswer1.innerHTML = data.quizContent[control.count].answer1;
            getAnswer2.innerHTML = data.quizContent[control.count].answer2;
            getAnswer3.innerHTML = data.quizContent[control.count].answer3;
            getCurrentPoints.innerHTML = 'Points:' + ' ' + data.points;
            this.newElement('button', 'submit', 'Submit Answer');
        },
        addAnswer: function(showMessage) {
            var sumOfQuestions = data.quizContent.length;

            if(showMessage === 'correct') {
                this.newElement('p', 'showAnswer', 'Correct Answer');
            } else {
                this.newElement('p', 'showAnswer', 'Incorrect Answer');
            }

            if (control.count < sumOfQuestions - 1) {
                this.newElement('button', 'nextQuest', 'Next question');
            } else {
                this.newElement('button', 'result', 'See your result');
            }
        },
        removeAnswer: function(event) {
            var getShowAnswer = document.getElementById('showAnswer');
            var getShowAnswerParent = getShowAnswer.parentNode;
            getShowAnswerParent.removeChild(getShowAnswer);
            var clickedEl = event.target;
            var clickedElParent = clickedEl.parentNode;
            clickedElParent.removeChild(clickedEl);
            var radioButtons = document.getElementsByName('answers');
            var allRadioButtons = radioButtons.length;
            var i;

            for(i = 0; i < allRadioButtons; i++) {
                radioButtons[i].checked = false;
            }
        },
        resultPage: function() {
            this.getApp.innerHTML = '<h1>You have answered correctly on ' + data.points + ' questions</h1>';
            this.newElement('button', 'restart', 'Restart Quiz');
        },
        newElement: function(elem, elemId, elemText) {
            var newElem = document.createElement(elem);
            var newElemText = document.createTextNode(elemText);
            newElem.appendChild(newElemText);
            newElem.id = elemId;
            this.getApp.appendChild(newElem);
        }
    };

    var control = {
        init: function() {
            var start = document.getElementById('start') || document.getElementById('restart');
            start.addEventListener('click', function() {
                display.mainPage();
                control.update();
            }, false);
        },
        update: function() {
            display.updateMainPage();
            var submit = document.getElementById('submit');
            submit.addEventListener('click', this.checkAnswer, false);
        },
        checkAnswer: function(event) {
            var radioButtons = document.getElementsByName('answers'),
                allRadioButtons = radioButtons.length,
                isChecked = false,
                checkedRadio,
                clickedEl = event.target,
                clickedElParent = clickedEl.parentNode,
                i;

            for (i = 0; i < allRadioButtons; i++) {
                if (radioButtons[i].checked) {
                    isChecked = true;
                    checkedRadio = +radioButtons[i].value;
                }
            }

            if (isChecked === false) {
                alert('Please choose the answer!');
            } else {
                clickedElParent.removeChild(clickedEl);
                if (checkedRadio === data.quizContent[control.count].correctAnswer) {
                    display.addAnswer('correct');
                    data.points++;
                } else {
                    display.addAnswer();
                }

                var nextQuestion = document.getElementById('nextQuest'),
                    result = document.getElementById('result');

                if (nextQuestion) {
                    nextQuestion.addEventListener('click', function(event) {
                        control.count++;
                        display.removeAnswer(event);
                        control.update();
                    }, false);
                } else {
                    result.addEventListener('click', function() {
                        display.resultPage();
                        control.init();
                        control.count = 0;
                        data.points = 0;
                    }, false);
                }
            }
        },
        count: 0
    };

    control.init();

})();