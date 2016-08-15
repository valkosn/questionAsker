/**
 * Created by valko on 13-Aug-16.
 */
var incomeData = data;
var shuffledData = shuffle(incomeData);
var questionsAmount;
var currantQuestion = -1;
var renderedQuestionsAmount = 0;
var isResultsRendered = false;

Element.prototype.hide = function () {
    this.setAttribute("style", "display: none");
};

Element.prototype.show = function () {
    this.setAttribute("style", "display: block");
};

Node.prototype.hideNode = function () {
    this.style = "display: none";
};

Node.prototype.showNode = function () {
    this.style = "display: inline block";
};

Array.prototype.clone = function () {
    return this.slice(0);
};

Node.prototype.findChildById = function (id) {
    var children = this.childNodes;
    for (var i = (children.length - 1); i >= 0; i--) {
        var child = children[i];
        if (child.id === id) {
            return child;
        }
        var result = child.findChildById(id);
        if (result != null) {
            return result;
        }
    }
    return null;
};

Node.prototype.findChildByName = function (name) {
    var children = this.childNodes;
    for (var i = (children.length - 1); i >= 0; i--) {
        var child = children[i];
        if (child.name === name) {
            return child;
        }
        var result = child.findChildByName(name);
        if (result != null) {
            return result;
        }
    }
    return null;
};

String.prototype.hashCode = function () {
    var hash = 0, i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

function addMaxValueToQuestionAmount() {
    var container = document.getElementById("questionsAmount");
    if (container.length <= 5) {
        var elem = document.createElement("option");
        elem.setAttribute("value", incomeData.length.toString());
        elem.innerHTML = incomeData.length.toString() + " questions";
        container.appendChild(elem);
    }
}

function checkQuestion(questionNumber) {
    var radios = document.getElementsByName("answer_" + questionNumber);
    var userChoice;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].type === 'radio' && radios[i].checked) {
            userChoice = radios[i].value;
        }
        var radiosText = document.getElementById("answer_text_" + questionNumber + "_" + i);
        if (radios[i].value == getCorrectAnswer(questionNumber)) {
            radiosText.setAttribute("style", "color: green;");
        }
        radios[i].disabled = "true";
    }
    if (userChoice != null) {
        return getCorrectAnswer(questionNumber) == userChoice;
    } else {
        return false;
    }
}

function checkForLastQuestion() {
    if (currantQuestion == questionsAmount - 1) {
        var currantHolder = document.getElementById("question_holder_" + currantQuestion);
        currantHolder.findChildByName("finish").showNode();
        currantHolder.findChildByName("nextQuestion").hideNode();
    }
}

function hideCurrantQuestion() {
    document.getElementById("question_holder_" + currantQuestion).hide();
}

function startTest() {
    var questionsAmountElement = document.getElementById("questionsAmount");
    questionsAmount = questionsAmountElement.options[questionsAmountElement.selectedIndex].value;
    document.getElementById("start_screen_holder").hide();
    document.getElementById("evaluate").removeAttribute("disabled");
    getNextQuestion();
}

function getCorrectAnswer(questionNumber) {
    return shuffledData[questionNumber].answers[0].hashCode();
}

function getNextQuestion() {
    currantQuestion++;
    var previousQuestion = document.getElementById("question_holder_" + (currantQuestion - 1));
    if (previousQuestion != null && previousQuestion != undefined) {
        previousQuestion.hide();
    }
    if (currantQuestion >= renderedQuestionsAmount) {

        var questionObject = shuffledData[currantQuestion];
        var question = questionObject.question;
        var answers = questionObject.answers.clone();
        renderQuestionAndAnswers(question, shuffle(answers), currantQuestion);
        checkForLastQuestion();
    } else {
        document.getElementById("question_holder_" + currantQuestion).show();
    }

}

function getPreviousQuestion() {
    hideCurrantQuestion();
    document.getElementById("question_holder_" + (currantQuestion - 1)).show();
    currantQuestion--;
}

function getQuestion(questionNumber) {
    document.getElementById("result_screen").hide();
    document.getElementById("question_holder_" + questionNumber).show();
    currantQuestion = questionNumber;
}

function renderQuestionAndAnswers(question, answers, questionNumber) {
    var questionContainer = document.getElementById("question_holder_").cloneNode(true);
    questionContainer.show();
    questionContainer.id = questionContainer.id + questionNumber;

    var questionBox = questionContainer.findChildById("question_");
    questionBox.innerHTML = question.toString();

    var answerContainer = questionContainer.findChildById("answer_container_");
    answerContainer.id = answerContainer.id + questionNumber;

    if (currantQuestion > 0) {

        questionContainer.findChildByName("previousQuestion").disabled = false;
    }
    var number = answers.length;

    for (var i = 0; i < number; i++) {
        answerContainer.appendChild(renderAnswer(questionNumber, i, answers[i]));
    }
    document.getElementById("test_answers").appendChild(questionContainer);
    renderedQuestionsAmount++;
}

function renderAnswer(questionNumber, answerNumber, answer) {
    var answerContainer = document.getElementById("answer_holder_").cloneNode(true);
    answerContainer.show();
    answerContainer.id = answerContainer.id + questionNumber + "_" + answerNumber;

    var answerValue = answerContainer.findChildByName("answer_");
    answerValue.name = answerValue.name + questionNumber;
    answerValue.value = answer.hashCode();

    var answerText = answerContainer.findChildById("answer_text_");
    answerText.id = answerText.id + questionNumber + "_" + answerNumber;
    answerText.innerHTML = answer;
    return answerContainer;
}

function renderResults() {
    if (!isResultsRendered) {
        hideCurrantQuestion();
        var resultScreen = document.getElementById("result_screen");
        resultScreen.show();
        var resultsContainer = document.getElementById("results");
        for (var i = 0; i < questionsAmount; i++) {
            var resultItem = document.createElement("li");
            resultItem.setAttribute("onclick", "getQuestion(" + i + ")");
            resultItem.setAttribute("id", "result_" + i);
            var suffix = "";
            if (shuffledData[i].question.length > 80) {
                suffix = " ...";
            }
            resultItem.innerHTML = i + 1 + " - " + shuffledData[i].question.substring(0, 80) + suffix;
            resultsContainer.appendChild(resultItem);
        }
        isResultsRendered = true;
    } else {
        hideCurrantQuestion();
        document.getElementById("result_screen").show();
    }
}

function evaluateResults() {
    for (var i = questionsAmount - 1; i >= 0; i--) {
        var resultItem = document.getElementById("result_" + i);
        if (checkQuestion(i)) {
            resultItem.setAttribute("style", "color: green;");
        } else {
            resultItem.setAttribute("style", "color: red;");
        }
    }
    document.getElementById("evaluate").setAttribute("disabled", "");
}

function newAttempt() {
    var q = confirm("You really want to try again? All your results will be wipe!");
    if (q) {
        history.go(0);
    }
}