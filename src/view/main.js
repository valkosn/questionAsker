/**
 * Created by valko on 13-Aug-16.
 */
var incomeData = data;
var shuffledData = shuffle(incomeData);
var numberOfCurrantQuestion = 0;
var trueCurrantAnswer;
var totalTrueAnswers = 0;
var questionsAmount;

Element.prototype.hide = function(){
    this.setAttribute("style", "display: none");
};

Element.prototype.show = function(){
    this.setAttribute("style", "display: block");
};

Array.prototype.clone = function() {
    return this.slice(0);
};

Node.prototype.findChildById = function (id) {
    var children = this.childNodes;
    for (var i = (children.length - 1); i >= 0; i--){
        var child = children[i];
        if(child.id === id){
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
    for (var i = (children.length - 1); i >= 0; i--){
        var child = children[i];
        if(child.name === name){
            return child;
        }
        var result = child.findChildByName(name);
        if (result != null) {
            return result;
        }
    }
    return null;
};

String.prototype.hashCode = function() {
    var hash = 0, i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
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

function checkCurrantQuestion() {
    var radios = document.getElementsByName('answer');
    var userChoice;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].type === 'radio' && radios[i].checked) {
            userChoice = radios[i].value;
        }
    }
    if (userChoice === null) {
        return false;
    } else if (trueCurrantAnswer === userChoice) {
        totalTrueAnswers++;
    }
}

function startTest() {
    document.getElementById("start_screen_holder").hide();
    getNextQuestion(1);
}

function getCorrectAnswer(questionNumber) {
    return shuffledData[questionNumber].answer[0];
}

function getNextQuestion(questionNumber){
    var questionObject = shuffledData[questionNumber];
    var question = questionObject.question;
    var answers = questionObject.answers.clone();
    renderQuestionAndAnswers(question, shuffle(answers), questionNumber);
}

function renderQuestionAndAnswers(question, answers, questionNumber) {
    var questionContainer = document.getElementById("question_holder_").cloneNode(true);
    questionContainer.show();
    questionContainer.id = questionContainer.id + questionNumber;

    var questionBox = questionContainer.findChildById("question_");
    questionBox.innerHTML = question.toString();

    var answerContainer = questionContainer.findChildById("answer_container_");
    answerContainer.id = answerContainer.id + questionNumber;

    questionContainer.findChildByName("nextQuestion").setAttribute("data-questionNumber", questionNumber);
    var number = answers.length;

    for (var i = 0; i < number; i++) {
        answerContainer.appendChild(renderAnswer(questionNumber, i, answers[i]));
    }
    document.getElementById("test_answers").appendChild(questionContainer);
}

function renderAnswer(questionNumber, answerNumber, answer){
    var answerContainer = document.getElementById("answer_holder_").cloneNode(true);
    answerContainer.show();
    answerContainer.id = answerContainer.id + questionNumber + "_" + answerNumber;

    var answerValue = answerContainer.findChildByName("answer_");
    answerValue.name = answer.name + questionNumber;
    answerValue.value = answer.hashCode();

    var answerText = answerContainer.findChildById("answer_text_");
    answerText.id = answerText.id + questionNumber + "_" + answerNumber;
    answerText.innerHTML = answer;

    return answerContainer;
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