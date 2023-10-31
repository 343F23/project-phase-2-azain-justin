const form = document.querySelector('.form');
const stress = document.querySelectorAll('input[name=stress]')
const sex = document.querySelectorAll('input[name=sex]')
const age = document.querySelector('.age')
const alcohol = document.querySelectorAll('input[name=alcohol]')

const resultScreen = document.querySelector('.resultScreen')
var result = 0;
var stressVal = 0;
var sexVal = 76;
var ageVal = 0;
var alcVal = 0;

for (let i = 0; i < stress.length; i++) {
    stress[i].addEventListener("change", 
    function (e) {
        let choice = e.target.value
        if (choice == "1") {
            stressVal = 0;
        } else if (choice == "2") {
            stressVal = -3;
        } else if (choice == "3") {
            stressVal = -5;
        } else if (choice == "4") {
            stressVal = -10;
        }
    });
}

for (let i = 0; i < sex.length; i++) {
    sex[i].addEventListener("change", 
    function (e) {
        let choice = e.target.value
        if (choice == "1") {
            sexVal = 79;
        } else if (choice == "2") {
            sexVal = 73;
        } else if (choice == "3") {
            sexVal = 76;
        }
    });
}

for (let i = 0; i < alcohol.length; i++) {
    alcohol[i].addEventListener("change", 
    function (e) {
        let choice = e.target.value
        if (choice == "1") {
            alcVal = 0;
        } else if (choice == "2") {
            alcVal = -5;
        } else if (choice == "3") {
            alcVal = -10;
        } else if (choice == "4") {
            alcVal = -20;
        }
    });
}

form.addEventListener('submit', (ev) => { 
    console.log('submitted');
    ageVal = age.value;
    const result = stressVal + sexVal + alcVal - ageVal;
    console.log(result);
    const resultScreen = document.querySelector('.resultScreen')
    const output = document.createElement("output");
    output.classList.add('resultScreen')
    const textNode = document.createTextNode("You have approximately " + result + " years to live.");
    output.appendChild(textNode);
    resultScreen.parentNode.replaceChild(output, resultScreen);
    ev.preventDefault();

});