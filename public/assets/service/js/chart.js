var options = {
    chart: {
        type: 'bar',
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
            data: [30,40,35,50, 32, 45]
        },
    ],
    xaxis: {
        categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();
var options = {
chart: {
    type: 'bar',
    stacked: true,
    stackType: "100%",
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
        data: [12,39,21,50, 34, 40]
    },
    {
        name: 'Available Modems',
        data: [30,40,35,50, 21,45]
    },
],
xaxis: {
    categories: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
}
}

var chart = new ApexCharts(document.querySelector("#chart2"), options);

chart.render();

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
            data: [12,39,21,50, 34, 21, 12, 20]
        }
    ],
    xaxis: {
        show: false,
        categories: ['Orbit MiFi 2GB (3 Days)', 'Orbit MiFi 6GB (3 Days)', 'Orbit MiFi 2.5GB (7 Days)', 'Orbit MiFi 12GB (7 Days)', 'Orbit MiFi 18GB (30 Days)', 'Orbit MiFi 50GB (30 Days)', 'Orbit MiFi 85GB (30 Days)', 'Orbit MiFi 120GB (30 Days)'],
        labels: {
            show: false
        }
    }
}

var chart = new ApexCharts(document.querySelector("#planChart"), options);

chart.render();

var options = {
    chart: {
        type: 'pie',
        height: 348
    },
    series: [44, 55, 41, 17, 15, 11],
    labels: ['Raja Ampat', 'Sorong', 'Manokwari', 'Nabire', 'Fak-fak', 'Kaimana'],
    dataLabels: {
        enabled: true,
        // formatter: function (val) {
        //     return val + "%"
        // }
    },
    plotOptions: {
        pie: {
            customScale: 0.8,
        }
    }
}

var chart = new ApexCharts(document.querySelector("#destinationChart"), options);

chart.render();