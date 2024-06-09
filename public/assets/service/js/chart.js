var options = {
    chart: {
        type: 'bar',
    },
    series: [{
        name: 'sales',
        data: [30,40,35,50, 32, 45, 69]
    }],
    xaxis: {
        categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();
var options = {
chart: {
    type: 'area',
},
series: [{
    name: 'sales',
    data: [30,40,35,50]
}],
xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr']
}
}

var chart = new ApexCharts(document.querySelector("#chart2"), options);

chart.render();

const modal = document.querySelectorAll('dialog');