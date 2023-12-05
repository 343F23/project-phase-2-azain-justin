// enable the random selection of a graph to display
const scatter = document.getElementById("scatter");
const keyArray = ["BMI", "STR", "AGE"];
const titleArray = ["Your BMI Over Time", "Your Stress Score Over Time", "Your Predicted Lifespan Over Time"];
const labelArray = ["BMI", "Stress Score", "Predicted Lifespan"];
const randElement = Math.floor(Math.random() * keyArray.length);
const key = keyArray[randElement];
const title = titleArray[randElement];
const label = labelArray[randElement];



google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = google.visualization.arrayToDataTable([
        [{label: 'Date', type: "date"}, {label: label, type:"number"}] 
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
        hAxis: {
                format: 'M/d/yy', title: 'Date', format: 'M/d/yy',
                gridlines: { color: "transparent" },
                minorGridlines: { color:"none" } 
            },
        vAxis: {format: '0', title: label, minValue: 0},
        pointSize: 10,
        colors: ['Black'],
        legend: 'none',
    };

    var chart = new google.visualization.LineChart(scatter);
    chart.draw(data, options);
}

function resize() {
    if (window.innerWidth <= 800) {
        scatter.style.height = "300px";
        scatter.style.width = "400px";
    } else {
        scatter.style.width = "600px";
        scatter.style.height = "450px";
    }
}


window.addEventListener('resize', (event) => {
    resize();
    drawChart();

} );

resize();
