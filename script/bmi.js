const form = document.querySelector('.form');
const foot = document.querySelector('.foot')
const inch = document.querySelector('.inch')
const weight = document.querySelector('.weight')
const key = "BMI" // separates the items from this page from other pages


// graph related constants and variables
const scatter = document.getElementById("scatter");
const graph = document.getElementById("graph");
const clear = document.getElementById("clear");
let toggle = false;


const resultScreen = document.querySelector('.resultScreen')

let result = 0;

// unchecks all radio buttons
function resetQuiz() {
    foot.value = "";
    inch.value = "";
    weight.value = "";
    result = 0;
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(result) {

    var data = google.visualization.arrayToDataTable([
        [{label: 'Date', type: "date"}, {label:'BMI', type:"number"}] 
        ]);

    for (let i = 0; i < localStorage.length; i++) {
        let string = localStorage.getItem(i + key);
        if (string != null) {
            let list = string.substring(1, string.length - 1).split(")");
            data.addRow([new Date(Date.parse(list[0] + ")")), Number(list[1])]);
        }

    }

    var options = {
        title: 'Your BMI Over Time',
        hAxis: {
                format: 'M/d/yy', title: 'Date', format: 'M/d/yy',
                gridlines: { color: "transparent" },
                minorGridlines: { color:"none" } 
            },
        vAxis: {format: '0', title: 'BMI', minValue: 0},
        pointSize: 10,
        colors: ['Black'],
        legend: 'none',
    };

    var chart = new google.visualization.LineChart(document.getElementById('scatter'));
    chart.draw(data, options);




    // clear local storage if button is pressed, resetting values to their defaults
    clear.addEventListener("click", function (ev) {
        scatter.style.height = "0px";
        
        localStorage.clear();
        chart.clearChart();
        resetQuiz();

        data = google.visualization.arrayToDataTable([
            [{label: 'Date', type: "date"}, {label:'BMI', type:"number"}] 
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

// reset quiz results
resetQuiz();
scatter.style.visibility = "hidden";

// show bmi on submit
form.addEventListener('submit', (ev) => { 
    footVal = Number(foot.value * 12);
    inchVal = Number(inch.value);
    weightVal = Number(weight.value);

    const result = (weightVal / ((footVal + inchVal) * (footVal + inchVal))) * 703;
    const resultScreen = document.querySelector('.resultScreen');
    const output = document.createElement("output");
    output.classList.add('resultScreen')
    const textNode = document.createTextNode("Your BMI is " + result.toFixed(1) + ".");

    if (isNaN(result)) {
        textNode.textContent = "Please enter a numerical value in each field."
    } else {
        // save to local storage
        localStorage.setItem(localStorage.length + key, JSON.stringify(new Date() + result));
    }

    output.appendChild(textNode);
    resultScreen.parentNode.replaceChild(output, resultScreen);

    graph.style.visibility = "visible";
    if (toggle) {
        drawChart();
    }
    console.log("got here 2");
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
