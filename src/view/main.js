/**
 * Created by valko on 13-Aug-16.
 */
var incomeDate = data;
var shuffledDate = shuffle(incomeDate);
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

function getRandomQuestion(data) {
    var randomNumber = Math.round(Math.random() * data.length);
    return data[randomNumber.valueOf()];
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
        //alert("TRUE");
    } else {
        //alert("FALSE");
    }
}

function getNextQuestion() {
    if (trueCurrantAnswer != null) {
        checkCurrantQuestion();
    } else {
        var elem = document.getElementById("questionsAmount");
        questionsAmount = elem.options[elem.selectedIndex].value;
        elem.setAttribute("hidden", "true");
        document.getElementById("next").setAttribute("value", "Next");
        document.getElementById("questionTitle").innerHTML = "Question:";
        document.getElementById("answersTitle").innerHTML = "Choice the answer:";
    }
    if (questionsAmount > numberOfCurrantQuestion) {
        var questionObject = shuffledDate[numberOfCurrantQuestion];
        var question = questionObject.question;
        var answers = questionObject.answers;
        trueCurrantAnswer = answers[0];
        numberOfCurrantQuestion++;
        renderQuestionAndAnswers(question, shuffle(answers));
    } else {
        document.getElementById("next").hidden = "true";
        document.getElementById("questionTitle").innerHTML = "Result:"
        document.getElementById("message").innerHTML = "wdksgdf";
        // alert("Your result " + totalTrueAnswers + " of " + numberOfCurrantQuestion + " questions");
    }
}

function renderQuestionAndAnswers(question, answers) {

    var questionBox = document.getElementById("question");
    questionBox.disabled = false;
    questionBox.innerHTML = question.toString();

    var number = answers.length;
    var container = document.getElementById("answers");
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    for (var i = 0; i < number; i++) {
        var input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.setAttribute("value", answers[i]);
        container.appendChild(input);
        container.appendChild(document.createTextNode(answers[i]));
        container.appendChild(document.createElement("br"));
    }
}

function addMaxValueToQuestionAmount() {
    var container = document.getElementById("questionsAmount");
    if (container.length <= 5) {
        var elem = document.createElement("option");
        elem.setAttribute("value", incomeDate.length.toString());
        elem.innerHTML = incomeDate.length.toString();
        container.appendChild(elem);
    }
}