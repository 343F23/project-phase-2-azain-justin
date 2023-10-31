const form = document.querySelector('.form');


const q1 = document.querySelectorAll('input[name=q1]')
const q2 = document.querySelectorAll('input[name=q2]')
const q3 = document.querySelectorAll('input[name=q3]')
const q4 = document.querySelectorAll('input[name=q4]')
const q5 = document.querySelectorAll('input[name=q5]')
const q6 = document.querySelectorAll('input[name=q6]')
const q7 = document.querySelectorAll('input[name=q7]')
const q8 = document.querySelectorAll('input[name=q8]')
const q9 = document.querySelectorAll('input[name=q9]')
const q10 = document.querySelectorAll('input[name=q10]')

const stressArray = [
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    q7,
    q8,
    q9,
    q10
];



const resultScreen = document.querySelector('.resultScreen')
var result = 0;
let valArray = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
];

for (let j = 0; j < stressArray.length; j++) {
    stress = stressArray[j];
    for (let i = 0; i < stress.length; i++) {
        stress[i].addEventListener("change", 
        function (e) {
            let choice = e.target.value
            if (choice == "1") {
                valArray[j] = 1;
            } else if (choice == "2") {
                valArray[j] = 2;
            } else if (choice == "3") {
                valArray[j] = 3;
            } else if (choice == "4") {
                valArray[j] = 4;
            } else {
                valArray[j] = 0;
            }
        });
    }
}
// EXPLAIN THE RESULTS BASED ON THEIR SCORE (low stress? high stress?)


form.addEventListener('submit', (ev) => { 
    console.log('submitted');
    result = 0;
    valArray.forEach((element) => result = result + element);
    console.log(result);
    const resultScreen = document.querySelector('.resultScreen');
    const output = document.createElement("output");
    output.classList.add('resultScreen');
    const textNode = document.createTextNode("Your stress score is " + result + ".");
    output.appendChild(textNode);
    resultScreen.parentNode.replaceChild(output, resultScreen);
    ev.preventDefault();

});