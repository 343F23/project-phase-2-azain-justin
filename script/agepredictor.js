google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(result) {
  var data = google.visualization.arrayToDataTable([
    [{label: 'Date', type: "date"}, {label:'Predicted Age', type:"number"}],

  ]);

  var options = {

    title: 'Your Predicted Age Over Time',
    hAxis: {format: 'M/d/yy', title: 'Date', format: 'M/d/yy',
            gridlines: {color: "transparent"},
            minorGridlines: {
                color:"none"
              }
    },
    vAxis: {format: '0', title: 'Predicted Age', minValue: 0},
    pointSize: 10,
    colors: ['Black'],
    legend: 'none',
  };

  

var chart = new google.visualization.LineChart(document.getElementById('scatter'));

function updateChart (result) {
    
    var date = new Date();
    data.addRow([date, result]);
    chart.draw(data, options);

}

document.getElementById('scatter').style.visibility = "hidden";


form.addEventListener('submit', (ev) => { 
    result = stressVal + sexVal + alcVal - ageVal;
    scatter.style.height = "400px";
    updateChart(result);
    scatter.style.visibility = "visible";
    ev.preventDefault();

});
}



const form = document.querySelector('.form');
const stress = document.querySelectorAll('input[name=stress]')
const sex = document.querySelectorAll('input[name=sex]')
const age = document.querySelector('.age')
const alcohol = document.querySelectorAll('input[name=alcohol]')
const improve = document.getElementById("improve");

const resultScreen = document.querySelector('.resultScreen')
var result = 0;
var stressVal = 0;
var sexVal = 76;
var ageVal = 0;
var alcVal = 0;

const tips = [
            "Take measures to decrease your stress",
            "Lower your alcohol intake"
];

const ageArray = [
    stress,
    sex,
    alcohol
];

ageArray.forEach((element) => element.forEach((option) => option.checked = false));
age.value = 0;

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
    const textNode = document.createTextNode("You have approximately " + result + " years to live.\n");
    output.appendChild(textNode);
    resultScreen.parentNode.replaceChild(output, resultScreen);
    
    improve.innerHTML = "";
    let vals = [stressVal, alcVal];
    console.log("got here");
    let count = 0;
    let temp = "";
        for (let j = 0; j < 2; j++) {
            if (vals[j] == Math.max(...vals)) {
                console.log(vals[j]);
                let tip = document.createElement("li");
                let msg = document.createElement("p");
                msg.textContent = tips[j];
                console.log(msg);
                tip.appendChild(msg);
                console.log(tip);
                improve.appendChild(tip);
                count += 1;
                
            }
        }
    
    ev.preventDefault();

});

