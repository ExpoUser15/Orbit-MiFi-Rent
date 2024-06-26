fetch('http://localhost:7777/superuser/chart/api/last-week-reports')
.then(response => response.json())
.then(res => {
    document.querySelector('.rentangtanggal').value = res.rentangWaktu;

    var options = {
        chart: {
            type: 'bar',
            height: 400,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 10
            }
        },
        series: [{
                name: 'Order',
                data: res.chart
            },
        ],
        xaxis: {
            categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
        }
    }
    
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
});

fetch('http://localhost:7777/superuser/chart/api/choosen-plan')
.then(response => response.json())
.then(res => {

    var options = {
        colors: '0000FF',
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                columnWidth: '55%'
            }
        },
        dataLabels: {
                enabled: true,
                formatter: function(val) {
                return val + "%";
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left'
        },
        tooltip: {
            enabled: true
        },
        series: [
            {
                name: 'Rented Modems',
                data: res.planCounts
            }
        ],
        xaxis: {
            show: false,
            categories: res.plan,
            labels: {
                show: false
            }
        }
    }
    var chart = new ApexCharts(document.querySelector("#planChart"), options);
    
    chart.render();
});


fetch('http://localhost:7777/superuser/chart/api/most-visited')
.then(response => response.json())
.then(res => {

    var options = {
        chart: {
            type: 'pie',
            height: 348
        },
        series: res.visitCount,
        labels: res.destination,
        dataLabels: {
            enabled: true,
        },
        plotOptions: {
            pie: {
                customScale: 0.8,
            }
        }
    }

    var chart = new ApexCharts(document.querySelector("#destinationChart"), options);

    chart.render();
})


