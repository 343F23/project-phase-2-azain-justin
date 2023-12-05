// constants for html elements
const form = document.querySelector('.form');
const scatter = document.getElementById("scatter");
const resultScreen = document.querySelector('.resultScreen');
const clear = document.getElementById("clear");
const graph = document.getElementById("graph");
const key = "AGE";   // separate items from this page from others
const title = "Your Predicted Lifespan Over Time";
const label = "Predicted Lifespan";
let result = 0;

const stress = document.querySelectorAll('input[name=stress]')
const sex = document.querySelectorAll('input[name=sex]')
const age = document.querySelector('.age')
const alcohol = document.querySelectorAll('input[name=alcohol]')
const improve = document.getElementById("improve");

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

// unchecks all radio buttons
function resetQuiz() {
    ageArray.forEach((element) => element.forEach((option) => option.checked = false));
    stressVal = 0;
    sexVal = 76;
    alcVal = 0;
    ageVal = 0;
    var result = 0;
}
// for "toggle graph button"
var toggle = false;

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(result) {
  var data = google.visualization.arrayToDataTable([
    [{label: 'Date', type: "date"}, {label:label, type:"number"}],

  ]);

  for (let i = 0; i < localStorage.length; i++) {
    let string = localStorage.getItem(i + key);
    if (string != null) {
        let list = string.substring(1, string.length - 1).split(")");
        data.addRow([new Date(Date.parse(list[0] + ")")), Number(list[1])]);
    }

    }

  var options = {

    title: title,
    hAxis: {format: 'M/d/yy', title: "Date", format: 'M/d/yy',
            gridlines: {color: "transparent"},
            minorGridlines: {
                color:"none"
              }
    },
    vAxis: {format: '0', title: label, minValue: 0},
    pointSize: 10,
    colors: ['Black'],
    legend: 'none',
  };

  

var chart = new google.visualization.LineChart(scatter);
chart.draw(data, options);


  // clear local storage if button is pressed, resetting values to their defaults
  clear.addEventListener("click", function (ev) {
    scatter.style.height = "0px";
    
    localStorage.clear();
    chart.clearChart();
    resetQuiz();

    data = google.visualization.arrayToDataTable([
        [{label: 'Date', type: "date"}, {label:'Weight', type:"number"}] 
        ]);
    
    
    
    clear.style.visibility = "hidden";
    graph.style.visibility = "hidden";
    scatter.style.visibility = "hidden";
    const resultScreen = document.querySelector('.resultScreen');
    const output = document.createElement("output");
    output.classList.add('resultScreen');
    const textNode = document.createTextNode("");
    output.appendChild(textNode);
    resultScreen.parentNode.replaceChild(output, resultScreen);
    toggle = false;

    ev.preventDefault();
});

}
resetQuiz();
scatter.style.visibility = "hidden";




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
    scatter.style.height = "400px";
    scatter.style.visibility = "visible";    const resultScreen = document.querySelector('.resultScreen')
    const output = document.createElement("output");
    output.classList.add('resultScreen')
    const textNode = document.createTextNode("You have approximately " + result + " years to live.\n");
    output.appendChild(textNode);
    resultScreen.parentNode.replaceChild(output, resultScreen);
    
    if (isNaN(result)) {
        textNode.textContent = "Please enter a numerical value in each field."
    } else {
        // save to local storage
        localStorage.setItem(localStorage.length + key, JSON.stringify(new Date() + result));
    }

    let vals = [stressVal, alcVal ];
    for (let i = 0; i < vals.length; i++) {
        if (vals[i] == Math.max(...vals)) {
            console.log(vals[i]);
            let tip = document.createElement("li");
            let msg = document.createElement("p");
            msg.textContent = "To improve, consider " + tips[i];
            console.log(msg);
            tip.appendChild(msg);
            improve.appendChild(tip);
            
        }
    }

        graph.style.visibility = "visible";
    if (toggle) {
        drawChart();
    }
    
    ev.preventDefault();

});

resetQuiz();

// graph stuff

clear.style.visibility = "hidden";

// create and show graph
graph.addEventListener("click", function (ev) {
    if (localStorage.length == 0) return;
    if (toggle) {
        scatter.style.height = "0px";

        clear.style.visibility = "hidden";
        scatter.style.visibility = "hidden";
        toggle = false;
        return;
    }
    scatter.style.height = "400px";
    drawChart();
    clear.style.visibility = "visible";
    scatter.style.visibility = "visible";
    toggle = true;
    ev.preventDefault();
});

resize();

function resize() {
    if (window.innerWidth <= 800) {
        scatter.style.width = "400px";
    } else {
        scatter.style.width = "800px";
    }
}


window.addEventListener('resize', (event) => {
    resize();
    drawChart();

} );