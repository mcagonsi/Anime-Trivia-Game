"use strict";
const $ = selector => document.querySelector(selector);
const playerName = sessionStorage.getItem('name');
const playerScore = sessionStorage.getItem('playerScore')
const condition = sessionStorage.getItem('condition');

const showResult = (fate) =>{
    $('#playerName').textContent = playerName;
    $('#condition').textContent = condition;
    $('#playerScore').textContent = playerScore;
    $('#fate').textContent = fate;
}

const tryAgain =()=>{
    window.location.href = 'question.html'
}

const endGame = () =>{
    sessionStorage.clear();
    window.location.href="../index.html"
}

document.addEventListener('DOMContentLoaded',()=>{
    let fate;
    if(playerScore > 10){
        fate = 'Survived'
        $("img").src = "https://s1.zerochan.net/Kamado.Nezuko.600.2878731.jpg";
        $('img').style.height = "250px";
       
    }
    else{
        fate = 'Death';
        $("img").src = "https://i.pinimg.com/736x/f9/34/eb/f934ebda77a63cf387a07d168e144eb2.jpg"
        $('img').style.height = "250px";
       
    }

    showResult(fate);
    $("#tryAgain").addEventListener('click',tryAgain);
    $("#endGame").addEventListener('click',endGame);

}) 