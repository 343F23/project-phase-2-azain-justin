// constants for html elements
const form = document.querySelector('.form');
let scatter = document.getElementById("scatter");
const resultScreen = document.querySelector('.resultScreen')
const clear = document.getElementById("clear");
const graph = document.getElementById("graph");
const key = "STR"   // separate items from this page from others

// coonstants for output text based on results
const good = "Your stress levels are well under control. You've done a good job managing your stress. Whatever you're doing, keep it up!";
const moderate = "Your stress levels are normal, but not ideal. You've done a good job managing your stress, but consider ways you can adjust your workload. Also, consider how others may help reduce your stress.";
const bad = "Your stress levels are higher than average. Living with high stress for long periods of time can have severe health consequences. Start taking steps to maintain a better work-life balance, and seeing which social connections are causing you the most harm.";

// one constant for each question
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

// array of all questions used to calculate results
const stressArray = [ q1, q2, q3, q4, q5, q6, q7, q8, q9,q10 ];

// for "toggle graph button"
var toggle = false;
let result = 0;

// hold score for each question
let valArray = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

// spectrum-related variables
let answer = document.getElementById("answer");
let canvas = document.getElementById("canvas");
let size = 2;
const spectrum = document.getElementById("spectrum");
const shape = canvas.getContext("2d");
const arrow = answer.getContext("2d");
const ctx = answer.getContext("2d");

// unchecks all radio buttons
function resetQuiz() {
    stressArray.forEach((element) => element.forEach((option) => option.checked = false));
    for (let i = 0; i < valArray.length; i++) valArray[i] = 0;
    var result = 0;
}

// resizes the graph container and visualization based on the current width
function resize() {
    if (this.window.innerWidth <= 800) {
        scatter.style.width = "400px";
    } else {
        scatter.style.width = "800px";
    }
    if (this.window.innerWidth <= 630) {
        canvas.width = 500;
        answer.width = 333;
        size = 1;
        drawSpectrum();
        updateArrow(result);
    } else {
        canvas.width = 1000;
        answer.width = 666;
        size = 2;
        drawSpectrum();
        updateArrow(result);
    }
}

// import packages necessary for graphing
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// draws the chart based on elements in localStorage
function drawChart(result) {
    var data = google.visualization.arrayToDataTable([
        [{label: 'Date', type: "date"}, {label:'Stress Score', type:"number"}] 
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
        title: 'Your Stress Score Over Time',
        hAxis: {
                format: 'M/d/yy', title: 'Date', format: 'M/d/yy',
                gridlines: { color: "transparent" },
                minorGridlines: { color:"none" } 
            },
        vAxis: {format: '0', title: 'Stress Score', minValue: 0},
        pointSize: 10,
        colors: ['Black'],
        legend: 'none',
    };

    // clear local storage if button is pressed, resetting values to their defaults
    var chart = new google.visualization.LineChart(scatter);
    chart.draw(data, options);


    // clear local storage if button is pressed, resetting values to their defaults
    clear.addEventListener("click", function (ev) {
        // eliminate any empty space on page
        canvas.style.height = "0px";
        spectrum.style.height = "0px"
        answer.style.height = "0px";
        scatter.style.height = "0px";
        
        // clears localStorage of this page's elements,\
        // deletes graph, and deletes quiz results
        for (let i = 0; i < localStorage.length; i++) {
            localStorage.removeItem(i + key);
        };
        chart.clearChart();
        resetQuiz();

        /* redefine data so it doesn't conflict with its initialization
        when another graph is made */
        data = google.visualization.arrayToDataTable([
            [{label: 'Date', type: "date"}, {label:'Weight', type:"number"}] 
            ]);

        // hide graph-related elements and visualization
        clear.style.visibility = "hidden";
        graph.style.visibility = "hidden";
        scatter.style.visibility = "hidden";
        canvas.style.visibility = "hidden";
        answer.style.visibility = "hidden";

        // reset the results shown (no results exist at this point)
        const resultScreen = document.querySelector('.resultScreen');
        const output = document.createElement("output");
        output.classList.add('resultScreen');
        const textNode = document.createTextNode("");
        output.appendChild(textNode);
        resultScreen.parentNode.replaceChild(output, resultScreen);
        document.querySelector('.stressLevel').textContent = "";
        document.querySelector('.trend').textContent = "";

        // graph is off
        toggle = false;
        ev.preventDefault();
    });
}

// draws the spectrum that visualizes stress score, shows good versus bad results
function drawSpectrum() {
    shape.beginPath();
    shape.moveTo(12.25 * size, 25);
    shape.lineTo(25 * size, 50);
    shape.lineTo(25 * size, 0);

    shape.moveTo(25 * size, 15);
    shape.lineTo(166.66 * size, 15);
    shape.lineTo(166.66 * size, 35);
    shape.lineTo(25 * size, 35);

    shape.fillStyle = "green";
    shape.fill();

    shape.beginPath();
    shape.moveTo(166.66 * size, 35);
    shape.lineTo(308 * size, 35);
    shape.lineTo(308 * size, 15);
    shape.lineTo(166.66 * size, 15);

    shape.fillStyle = "yellow";
    shape.fill();

    shape.beginPath();
    shape.moveTo(308 * size, 35);
    shape.lineTo(450 * size, 35);
    shape.lineTo(450 * size, 15);
    shape.lineTo(308 * size, 15);

    shape.moveTo(462.5 * size, 25);
    shape.lineTo(450 * size, 50);
    shape.lineTo(450 * size, 0);

    shape.fillStyle = "red";
    shape.fill();
}

function updateArrow(result) {
    arrow.beginPath();
    arrow.moveTo((17.5 + result * 7.1) * size , 150);
    arrow.lineTo((12.5 + result * 7.1) * size , 125);
    arrow.lineTo((22.25 + result * 7.1) * size , 125);
    
    arrow.moveTo((15 + result * 7.1) * size , 125);
    arrow.lineTo((20 + result * 7.1) * size , 125);
    arrow.lineTo((20 + result * 7.1) * size , 90);
    arrow.lineTo((15 + result * 7.1) * size , 90);
    
    arrow.fillStyle = "black";
    arrow.fill();
    
    
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(result, (17.5 + result * 7.1) * size, 75);

    spectrum.style.height = "250px";
    canvas.style.height = "100px";
    answer.style.height = "150px";

}


// redraw the graph and spectrum based on the window size
window.addEventListener('resize', (event) => {
    resize();
    drawChart();
} );

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

// calculate quiz, results, save to localStorage, decide whether to update graph
form.addEventListener('submit', (ev) => {
    // output-related constants
    const resultScreen = document.querySelector('.resultScreen');
    const output = document.createElement("output");
    const stressLevel = document.querySelector('.stressLevel');
    const trend = document.querySelector('.trend');

    // stores previous stress result
    let string = "";
    let i = localStorage.length - 1;
    while (string == "" && i >= 0) {
        string = localStorage.getItem(i + key);
        i--;
    }
    console.log(string);

    // calculate result for all 10 questions
    result = 0;
    valArray.forEach((element) => result = result + element);

    // label stress as good, moderate, or high
    if (result < 14) {
        stressLevel.textContent = good;
    } else if (result < 27) {
        stressLevel.textContent = moderate;
    } else stressLevel.textContent = high;

    // guage improvement (or the opposite)
    if (string != null) {
        let list = string.substring(1, string.length - 1).split(")");
        let lastResult = Number(list[1]);
        if (lastResult != 0 && result != 0) {
            if (result < lastResult) {
                trend.textContent = "Your stress levels have decreased by " + 
                                    Math.round(((lastResult / result) - 1) * 100) + "% since you last" +
                                    " took this test (previous score of " + lastResult+ ").";
            } else if (result > lastResult) {
                trend.textContent = "Your stress levels have increased by " + 
                Math.round(((result / lastResult) - 1) * 100) + "% since you last" +
                " took this test (previous score of " + lastResult+ ").";
            } else {
                trend.textContent = "Your stress levels have not changed since you last took this test.";
            }
        }
    }

    // print stress score
    output.classList.add('resultScreen');
    const textNode = document.createTextNode("Your stress score is " + result + ".");
    output.appendChild(textNode);
    resultScreen.parentNode.replaceChild(output, resultScreen);

    resize();

    // save to local storage
    localStorage.setItem(localStorage.length + key, JSON.stringify(new Date() + result));

    // update graph if needed
    if (toggle) {
        scatter.style.height = "400px";
        scatter.style.visibility = "visible";   
    }

    // update data visualizations
    drawChart();
    updateArrow(result);

    canvas.style.visibility = "visible";
    answer.style.visibility = "visible";
    graph.style.visibility = "visible";

    ev.preventDefault();

});

// create and show graph
graph.addEventListener("click", function (ev) {
    if (toggle) {
        // replaces div so page is the correct size, with no space at the bottom
        let newScatter = document.createElement("div");
        newScatter.id = "scatter";
        scatter.replaceWith(newScatter);
        scatter = document.getElementById("scatter");

        scatter.style.height = "0px";

        clear.style.visibility = "hidden";
        scatter.style.visibility = "hidden";
        toggle = false;
        return;
    }
    scatter.style.height = "400px";
    drawChart();
    clear.style.visibility = "visible";
    console.log("toggle was false");
    scatter.style.visibility = "visible";
    toggle = true;
    ev.preventDefault();
});

/* no visualizations upon page load and
undo any quiz work */
scatter.style.visibility = "hidden";
canvas.style.visibility = "hidden";
spectrum.style.visibility = "hidden";
canvas.width = 1000;
resetQuiz();
resize();
spectrum.style.height = "0px";
canvas.style.height = "0px";
answer.style.height = "0px";
// default size
answer.width = 666;
answer.height = 150;

clear.style.visibility = "hidden";
