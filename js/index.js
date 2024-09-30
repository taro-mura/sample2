// who トグルスイッチ
// 
// 

const switchOuters = document.querySelectorAll(".who__toggle-outer");

switchOuters.forEach((outer) => {
    const toggleInner = outer.querySelector(".who__toggle-inner");

    outer.addEventListener("click", () => {
        outer.classList.toggle("active");
        toggleInner.classList.toggle("active");
        const toggleId = outer.id; 
        const contentId = `who__content${toggleId.replace('toggle', '')}`; 
        const contentElement = document.getElementById(contentId);
        
        if (contentElement) {
            contentElement.classList.toggle("visible");
        }
    });
});



// change スライダーで画像切り替え
// 
// 

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.change__slider');
    const imgTop = document.querySelector('.change__img-top');
    const container = document.querySelector('.change__slider-container');
    let isDragging = false;

    const syncSliderAndClip = (clientX) => {
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;

    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;

    slider.style.left = `${percentage}%`;
    imgTop.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    };

    const startDrag = (e) => {
    e.preventDefault();
    isDragging = true;

    let clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    syncSliderAndClip(clientX);
    };

    const onDrag = (e) => {
    if (!isDragging) return;
    let clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    syncSliderAndClip(clientX);
    };

    const stopDrag = () => {
    isDragging = false;
    };

    slider.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);

    slider.addEventListener('touchstart', startDrag);
    window.addEventListener('touchmove', onDrag);
    window.addEventListener('touchend', stopDrag);
});




// パララックスswiper
// 
// 

document.querySelectorAll('.swiper').forEach(swiperElement => {
  new Swiper(swiperElement, {
    loop: true, 
    parallax: true, 
    allowTouchMove: false, 
    speed: 500, 
    autoplay: { 
      delay: 1000, 
      disableOnInteraction: false, 
    },
  });
});




// chart.js -- pie-chart
// 
// 
// 


var chart = document.getElementById("pie-chart"); 
var barChartElement = document.getElementById("bar-chart"); 
var chart_flag = false; 
var bar_chart_flag = false; 

var chartTiming = function() {

    var targetPie = $(chart).offset().top; 
    var scroll = $(window).scrollTop();  
    var height = $(window).height();  

    if (scroll > targetPie - height && !chart_flag) {            
        chartItem();       
        chart_flag = true;      
    }

    var targetBar = $(barChartElement).offset().top; 
    if (scroll > targetBar - height && !bar_chart_flag) {
        barChartItem();
        bar_chart_flag = true;
    }
};

document.addEventListener('DOMContentLoaded', chartTiming); 
window.addEventListener('scroll', chartTiming);

function chartItem() {
    const ctxPie = document.getElementById('pie-chart').getContext('2d');
    const pieData = {
        labels: ['男性', '女性'], 
        datasets: [{
            data: [63.4, 36.6], 
            backgroundColor: [
                'rgba(0, 146, 227, 1)',  
                'rgba(255, 116, 86, 1)'    
            ],
            hoverBackgroundColor: [
                'lightblue', 
                'pink'
            ]
        }]
    };

    const pieOptions = {
        cutout: '0%', 
        responsive: true, 
        plugins: {
            legend: {
                display: false 
            },
            datalabels: {
                color: 'white',
                font: {
                    size: 24, 
                    weight: 'bold', 
                    family: 'Orbitron'
                },
                formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return `  ${label}\n${value}%`; 
                },
                align: 'center', 
                anchor: 'center', 
                padding: 5, 
                display: (context) => context.dataset.data[context.dataIndex] > 0
            }
        }
    };

    const pieChart = new Chart(ctxPie, {
        type: 'doughnut', 
        data: pieData,
        options: pieOptions,
        plugins: [ChartDataLabels] 
    });
}

function barChartItem() {
    const ctxBar = document.getElementById('bar-chart').getContext('2d');
    const barData = {
        labels: ['21/12', '22/12', '23/12'], 
        datasets: [{
            label: '売上',
            data: [4200, 5800, 6100],
            backgroundColor: 'rgba(255, 2, 17, 1)'
        }]
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false, 
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 2000,
                    callback: (value) => value 
                },
            },
        },
        plugins: {
            legend: {
                position: 'top', 
                align: 'end',
                labels: {
                    boxHeight: 13, 
                    boxWidth: 13 
                }
            },
        }
    };

    const barChart = new Chart(ctxBar, {
        type: 'bar',
        data: barData,
        options: barOptions
    });
}




// 本数計算
// 
// 

document.getElementById('quantity__submitBtn').addEventListener('click', function() {
    var age = document.getElementById('age').value;
    var weight = document.getElementById('weight').value;
    var sleep = document.getElementById('sleep').value;
    var result = '';

    if ((age === '20代' || age === '30代') && 
        (weight === '60kg代' || weight === '70kg代' || weight === '80kg代') &&
        (sleep === '5時間' || sleep === '6時間')) {
        result = '3';
    } else if ((age === '10代' || age === '20代' || age === '60代') || 
               (weight === '30kg代' || weight === '40kg代') || 
               (sleep === '8時間' || sleep === '9時間以上')) {
        result = '1';
    } else {
        result = '2';
    }

    document.getElementById('quantity__result').innerText = result;
});



