// fecthing data from json
async function fetchData() {
    let data = {
        days: new Array(),
        amount: new Array()
    };
    let expenses = await fetch('http://localhost:3000/data');
    let res = await expenses.json()
    res.forEach(element => {
        console.log(element)
        data.days.push(element.day)
        data.amount.push(element.amount)
    });
    return data;
}

// IIFE arrow function 
(async () => {
    let canvas = document.querySelector('#expense_chart');
    let data = await fetchData();

    let chartData = {
        labels: data.days,
        datasets: [{
            labels: "hidden",
            data: data.amount,
            backgroundColor: ['#ec775f', '#ec775f', '#76b5bc', '#ec775f', '#ec775f', '#ec775f', '#ec775f']
        }]
    }

    let chartOptions = {
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    display: false,
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                yAlign: "bottom",
                displayColors: false,
                caretPadding:5,
                caretSize:0,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            }).format(context.parsed.y);
                        }
                        return label;
                    },

                    title: function () {
                        return ''
                    }
                }
            },
        },

        onHover: (event, chartEle)=>{
            if(chartEle.length === 1) event.native.target.style.cursor='pointer'
            else event.native.target.style.cursor='default'
        } 
    }

    let chart = new Chart(canvas, {
        type: 'bar',
        data: chartData,
        options: chartOptions
    })

})()