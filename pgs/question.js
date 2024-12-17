"use strict";
const $ = selector => document.querySelector(selector);

let counter = 1;
let timer = null;
let totalGameSec = 111;

const playerName = sessionStorage.getItem('name');
let playerScore = 0;
let bgImgsCache = []
for(let i = 1; i < 32;i++){
    let img = new Image()
    img.src = `../img/bg/bg${i}.png`
    bgImgsCache.push(img)
}

const questionCtnr = document.querySelector('#questions_container');
$('#questions_container').style.display = 'none';

const loadingQuestions = () => {
    const loadingh2E = document.createElement('h1');
    const loadingText = document.createTextNode('Ready to Die?');
    loadingh2E.appendChild(loadingText);
    $('#questions_container').parentNode.appendChild(loadingh2E);
}

const displayQuestion = (questions) => {
    // Set a random background image
    const pic = Math.floor(Math.random() * 31 + 1);
    $('body').style.backgroundImage = `url(${bgImgsCache[pic].src})`;

    // Timer for each question
    let eachQuestionTime = 7;
    clearInterval(timer); // Clear any previous interval
    timer = setInterval(() => {
        questionCtnr.querySelector('#qTime').innerHTML = `${eachQuestionTime} secs left`;
        $('#countdown').innerHTML = totalGameSec;
        totalGameSec --
        eachQuestionTime--;
        if (eachQuestionTime === -1) {
            clearInterval(timer);
            
            displayQuestion(questions);
        }
    }, 1000);

    $('#questions_container').style.display = 'block';
    const randomQuestionIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions.splice(randomQuestionIndex, 1)[0];

    // Clear previous content
    let ctner = $('#questions_container').parentNode;
    ctner.innerHTML = '';

    questionCtnr.querySelector('#qnum').innerHTML = counter;
    questionCtnr.querySelector('p').innerHTML = randomQuestion.question;

    let btnOpts = questionCtnr.querySelectorAll('button');

    // Assign new options and update event listeners
    for (let i = 0; i < btnOpts.length; i++) {
        btnOpts[i].disabled = false;
        btnOpts[i].innerHTML = randomQuestion.options[i];
        btnOpts[i].onclick = function () {
            // Disable all buttons after one is clicked
            for (let j = 0; j < btnOpts.length; j++) {
                btnOpts[j].disabled = true;
                const audio = new Audio("../soudfx/asta-madada.mp3");
                audio.volume = 0.2; 
                audio.play(); 
            }

            // Check if the answer is correct
            if (randomQuestion.answer === btnOpts[i].innerHTML) {
                playerScore++;
                console.log('Correct! Player score:', playerScore);
                sessionStorage.setItem('playerScore',playerScore);
            } else {
                console.log('Incorrect. Player score:', playerScore);
                sessionStorage.setItem('playerScore',playerScore);
            }
            
            
        };
    }

    console.log(playerScore);

    ctner.appendChild(questionCtnr);

    if (counter === 15) {
        clearInterval(timer);
        sessionStorage.setItem('playerScore',playerScore);
        location.href = 'result.html';
    }
    counter++;
};

const startGame = () => {
    loadingQuestions();
    timer = setInterval(() => {
        displayQuestion(questions);
    }, 8000);
}

document.addEventListener('DOMContentLoaded', ()=>{
    $("#playerName").innerHTML = playerName
    startGame();
});
