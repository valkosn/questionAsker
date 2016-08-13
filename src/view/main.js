/**
 * Created by valko on 13-Aug-16.
 */
var incomeData = data;
var shuffledData = shuffle(incomeData);
var numberOfCurrantQuestion = 0;
var trueCurrantAnswer;
var totalTrueAnswers = 0;
var questionsAmount;

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

    // if (trueCurrantAnswer != null) {
    //     checkCurrantQuestion();
    // } else {
    //     var elem = document.getElementById("questionsAmount");
    //     questionsAmount = elem.options[elem.selectedIndex].value;
    //     elem.hide();
    //     document.getElementById("next").setAttribute("value", "Next");
    //     document.getElementById("questionTitle").innerHTML = "Question:";
    //     document.getElementById("answersTitle").innerHTML = "Choice the answer:";
    // }
    // if (questionsAmount > numberOfCurrantQuestion) {
    //     var questionObject = shuffledData[numberOfCurrantQuestion];
    //     var question = questionObject.question;
    //     var answers = questionObject.answers;
    //     trueCurrantAnswer = answers[0];
    //     numberOfCurrantQuestion++;
    //     renderQuestionAndAnswers(question, shuffle(answers));
    // } else {
    //     document.getElementById("next").hide();
    //     document.getElementById("questionTitle").innerHTML = "Result:";
    //     var container = document.getElementById("answers");
    //     clearContainer(container);
    //     document.getElementById("answersTitle").hide();
    //     var percents = Math.round(totalTrueAnswers / numberOfCurrantQuestion *100);
    //     document.getElementById("question").innerHTML = "Your result " +
    //         percents + "%. This is " + totalTrueAnswers + " of " + numberOfCurrantQuestion + " questions.";
    // }
}

function getCorrectAnswer(questionNumber) {
    return shuffledData[questionNumber].answer[0];
}

function getNextQuestion(questionNumber){
    var questionObject = shuffledData[numberOfCurrantQuestion];
    var question = questionObject.question;
    var answers = questionObject.answers.clone();
    renderQuestionAndAnswers(question, shuffle(answers), questionNumber);
}

Element.prototype.hide = function(){
    this.setAttribute("hidden", "true");
};

Element.prototype.show = function(){
    this.setAttribute("hidden", "false");
};

Array.prototype.clone = function() {
    return this.slice(0);
};

function cloneAndAppendElementById(targetId, destinationId, idForCopy) {
    var node = document.getElementById(targetId).cloneNode(true);
    node.id = idForCopy;
    var destinationElement = document.getElementById(destinationId);
    destinationElement.appendChild(node);
    return document.getElementById(idForCopy);
}

function renderQuestionAndAnswers(question, answers, questionNumber) {
    var idForCopyQuestion = 'qa_' + questionNumber;
    var questionBox = cloneAndAppendElementById("qa_holder_template", "test_answers", idForCopyQuestion);
    questionBox.innerHTML = question.toString();

    var number = answers.length;
    var questionContainer = document.getElementById(idForCopyQuestion);
    var answerTemplate = questionContainer.getElementsByTagName("label");
    for (var i = 0; i < number; i++) {
        var currentAnswer = answerTemplate;
        if(i <= (number - 1)){
            var idForCopyAnswer = 'answer_' + questionNumber;
            currentAnswer = cloneAndAppendElementById("answers", idForCopyQuestion, idForCopyAnswer);
        }
        var input = currentAnswer.getElementsByName("answerContainer");
        var span = currentAnswer.getElementById("answerText");
        input.setAttribute("value", answers[i]);
        span.innerHTML = answers[i];
    }
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

function clearContainer(container) {
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
}