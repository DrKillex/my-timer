// funzione timer
function timer() {
    if(stopTimer!==true){
        const now = new Date()
        let endDate = new Date(`${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()} ${now.getFullYear()}`)
        if(now.getTime() > endDate.getTime()){
                endDate = new Date(`${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}  ${now.getFullYear() + 1}`)
            }
        const timeDifference = endDate - now
        displayDays.innerHTML = Math.floor(timeDifference / day)
        displayHours.innerHTML = Math.floor((timeDifference % day) / hour)
        displayMinutes.innerHTML = Math.floor((timeDifference % hour) / min)
        displaySeconds.innerHTML = Math.floor((timeDifference % min) / sec)
    }
    else{
        clearInterval(timer)
    }
};

//selezione elementi html
const displayHours = document.getElementById('hours');
const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const displayDays = document.getElementById('days');
const submitDate = document.getElementById('date');
const submit = document.getElementById('submit');
const save = document.getElementById('save');
const remove = document.getElementById('remove');

//utility
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const sec = 1000;
const min = 60 * sec;
const hour = 60 * min;
const day = 24 * hour;
const year = new Date().getFullYear();
let stopTimer = false;
document.getElementById('date').setAttribute("min", year + "-01-01"); document.getElementById('date').setAttribute("max", year + "-12-31");
let selectedDate='';

// auto timer se salvato
if(localStorage.getItem('myTimer')!==null){
    selectedDate = new Date(localStorage.getItem('myTimer'))
    console.log(localStorage.getItem('myTimer'))
    const tick = setInterval(timer, 1000)
};

// eventi dei bottoni
submit.addEventListener('click', function(){
    const dateValue = submitDate.value
    selectedDate = new Date(dateValue)
    const tick = setInterval(timer, 1000)
})
save.addEventListener('click', function(){
    const dateValue = submitDate.value
    selectedDate = new Date(dateValue)
    localStorage.setItem('myTimer', selectedDate);
    const tick = setInterval(timer, 1000)
})
remove.addEventListener('click', function(){
    localStorage.removeItem("myTimer");
    displayDays.innerHTML = '00'
    displayHours.innerHTML = '00'
    displayMinutes.innerHTML = '00'
    displaySeconds.innerHTML = '00'
    stopTimer = true
})
