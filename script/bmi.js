const form = document.querySelector('.form');

const foot = document.querySelector('.foot')
const inch = document.querySelector('.inch')
const weight = document.querySelector('.weight')

const resultScreen = document.querySelector('.resultScreen')

let result = 0;



form.addEventListener('submit', (ev) => { 
    console.log('submitted');
    footVal = Number(foot.value * 12);
    inchVal = Number(inch.value);
    weightVal = Number(weight.value);
    const result = (weightVal / ((footVal + inchVal) * (footVal + inchVal))) * 703;
    console.log(footVal);
    console.log(inchVal);
    console.log(result);
    const resultScreen = document.querySelector('.resultScreen')
    const output = document.createElement("output");
    output.classList.add('resultScreen')
    const textNode = document.createTextNode("Your BMI is " + result.toFixed(1) + ".");
    output.appendChild(textNode);
    resultScreen.parentNode.replaceChild(output, resultScreen);
    ev.preventDefault();

});