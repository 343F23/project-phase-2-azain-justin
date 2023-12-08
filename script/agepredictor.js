// constants for html elements
const form = document.querySelector('.form');
const scatter = document.getElementById("scatter");
const resultScreen = document.querySelector('.resultScreen');
const clear = document.getElementById("clear");
const graph = document.getElementById("graph");

// graph-related constants
const key = "AGE";   // separate items from this page from others in localStorage
const title = "Your Predicted Lifespan Over Time";
const label = "Predicted Lifespan";

// Each question is assigned its own constant
const stress = document.querySelectorAll('input[name=stress]')
const sex = document.querySelectorAll('input[name=sex]')
const age = document.querySelector('.age')
const alcohol = document.querySelectorAll('input[name=alcohol]')
const healthy = document.querySelectorAll('input[name=healthy]')

// Array of tips to pull from based on the element most negatively affecting the score
const tips = [
    "taking measures to decrease your stress",
    "lowering your alcohol intake",
    "maintaining a healthier diet"
];

// array of questions with radio buttons
const ageArray = [
stress,
sex,
alcohol,
healthy
];

// Store results of each question and initializze overall score
var stressVal = 0;
var sexVal = 76;
var ageVal = 0;
var alcVal = 0;
var eatVal = 0;
var result = 0;

// for "toggle graph button"
var toggle = false;

// unchecks all radio buttons
function resetQuiz() {
    ageArray.forEach((element) => element.forEach((option) => option.checked = false));
    stressVal = 0;
    sexVal = 76;
    alcVal = 0;
    ageVal = 0;
    eatVal = 0;
    var result = 0;
}

// resize the graphs for mobile phones
function resize() {
    if (window.innerWidth <= 800) {
        scatter.style.width = "400px";
    } else {
        scatter.style.width = "800px";
    }
}

// import packages necessary for graphing
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// draws the chart based on elements in localStorage
function drawChart(result) {
    var data = google.visualization.arrayToDataTable([
    [{label: 'Date', type: "date"}, {label:label, type:"number"}],

    ]);
    /* pulls each element of a given key, starting from the 
    earliest result chronologically (left to right) */
    for (let i = 0; i < localStorage.length; i++) {
        let string = localStorage.getItem(i + key); 
        if (string != null) {   // don't try to add a null element
            let list = string.substring(1, string.length - 1).split(")");
            data.addRow([new Date(Date.parse(list[0] + ")")), Number(list[1])]);
        }
    }
    // aesthetics and proper labels
    var options = {
        title: title,
        hAxis: {format: 'M/d/yy', title: "Date", format: 'M/d/yy',
                gridlines: {color: "transparent"},
                minorGridlines: { color:"none" }
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
        // eliminate any empty space on page
        scatter.style.height = "0px";
        
        // clears localStorage of this page's elements, 
        // deletes graph, and deletes quiz results
        for (let i = 0; i < localStorage.length; i++) {
            localStorage.removeItem(i + key);
        }

        chart.clearChart();
        resetQuiz();

        /* redefine data so it doesn't conflict with its initialization
        when another graph is made */
        data = google.visualization.arrayToDataTable([
            [{label: 'Date', type: "date"}, {label: label, type:"number"}] ]);
        // hide graph-related elements
        clear.style.visibility = "hidden";
        graph.style.visibility = "hidden";
        scatter.style.visibility = "hidden";

        // reset the results shown (no results exist at this point)
        const resultScreen = document.querySelector('.resultScreen');
        const output = document.createElement("div");
        output.classList.add('resultScreen');
        const textNode = document.createTextNode("");
        output.appendChild(textNode);
        resultScreen.parentNode.replaceChild(output, resultScreen);
        let improve = document.createElement("p");
        improve.id = "improve";
        document.getElementById("improve").replaceWith(improve)
        // graph is "toggled" off despite not pressing the toggle button
        toggle = false;

        ev.preventDefault();
});

}

window.addEventListener('resize', (event) => {
    resize();
    drawChart();

} );

for (let i = 0; i < stress.length; i++) {
    stress[i].addEventListener("change", 
    function (e) {
        let choice = e.target.value
        if (choice == "1") {
            stressVal = 0;
        } else if (choice == "2") {
            stressVal = -5;
        } else if (choice == "3") {
            stressVal = -10;
        } else if (choice == "4") {
            stressVal = -20;
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

for (let i = 0; i < healthy.length; i++) {
    healthy[i].addEventListener("change", 
    function (e) {
        let choice = e.target.value
        if (choice == "1") {
            eatVal = 0;
        } else if (choice == "2") {
            eatVal = -5;
        } else if (choice == "3") {
            eatVal = -7;
        } else if (choice == "4") {
            eatVal = -10;
        }
    });
}

// show results and save result to localStorage
form.addEventListener('submit', (ev) => { 
    // calculate and display results
    ageVal = age.value;
    const result = stressVal + sexVal + alcVal + eatVal - ageVal; 
    const resultScreen = document.querySelector('.resultScreen')
    const output = document.createElement("div");
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

    // reveal graph and clear buttons in case clear button was pressed beforehand
    graph.style.visibility = "visible";
    clear.style.visibility = "visible";

    // show tip based on quiz results
    let vals = [stressVal, alcVal, eatVal ];
    for (let i = 0; i < vals.length; i++) {
        if (vals[i] == Math.min(...vals) && vals[i] < -5) {
            let msg = document.createElement("p");
            msg.textContent = "To improve, consider " + tips[i];
            msg.id = "improve"
            document.getElementById("improve").replaceWith(msg);
            
        }
    }
    if (toggle) {
        // graph stuff
        scatter.style.height = "400px";
        scatter.style.visibility = "visible";   
    }

    // update graph
    drawChart();    

    ev.preventDefault();

});

// toggle graph visibility
graph.addEventListener("click", function (ev) {
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
resetQuiz();
scatter.style.height = "0px";
scatter.style.visibility = "hidden";

ageArray.forEach((element) => element.forEach((option) => option.checked = false));
age.value = 0;
resetQuiz();
clear.style.visibility = "hidden";
