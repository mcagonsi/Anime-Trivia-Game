
"use strict"
const $ = selector => document.querySelector(selector);



const startGame = () =>{
    const nameInput = $("#name").value;
    const conditionInput = $("#condition").value;
    console.log(nameInput,conditionInput)

    if (nameInput == "" || conditionInput == "") {
        alert("both Name and Conditions for death has to be filled.");
    } 
     else {
        // Save the inputs in session storage
        sessionStorage.setItem('name', nameInput);
        sessionStorage.setItem('condition', conditionInput);

        // If both inputs are filled, navigate to question.html
        window.location.href = `pgs/question.html`;
}
}

const resetFields = () => {
    // Clear the input fields
    $("#name").value = '';
    $("#condition").value = '';
    $("#name").focus();
}
document.addEventListener('DOMContentLoaded', () => {
    
    $("#rules").addEventListener('click', () => {
        console.log('Showing Rules')
        alert('Rules:\n1. Enter your name.\n2. Accept the conditions.\n3. Click "Start the Game" to begin.');
    });

    $("#about-link").addEventListener('click', () => {
        alert('Welcome to Anime Trivia Game! \nJavascript Project by Aftab and Micheal. \nA Basic Trivia game with a timer and score counter.');
    });

    $("#start").addEventListener("click", startGame);
    $("#name").addEventListener("dbclick", resetFields);
    $("#condition").addEventListener("dbclick", resetFields);

    $("#name").addEventListener('click',()=>{
        const audio = new Audio("soudfx/deaththeme.mp3");
        audio.loop = true;
        audio.volume = 0.9; 
        audio.play(); 
    })
    
});



