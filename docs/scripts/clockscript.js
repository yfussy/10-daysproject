const token = localStorage.getItem("token");

const timeWindow = document.getElementById('time-popup');
timeWindow.style.display = 'none';


//for DATE input
function moveNext(current, nextId) {
    if (current.value.length === current.maxLength) {
        document.getElementById(nextId).focus();
    }
}
////////////////////////////////////////////////////////////////////

//check if input date is number
// const day = document.getElementById("day").value;
// const month = document.getElementById("month").value;
// const year = document.getElementById("year").value;


const daySelect = document.getElementById('day-option');
const monthSelect = document.getElementById('month-option');
const yearSelect = document.getElementById('year-option');

// Populate years (you can adjust the range as needed)
const currentYear = new Date().getFullYear();
const startYear = currentYear - 5; // 100 years back
const endYear = currentYear + 5;    // 10 years into the future

function populateYears() {
    for (let y = endYear; y >= startYear; y--) {
        const option = document.createElement('option');
        option.value = y;
        option.textContent = y;
        yearSelect.appendChild(option);
    }
}

function populateMonths() {
    for (let month = 1; month <= 12; month++) {
        const option = document.createElement('option');
        option.value = month < 10 ? '0' + month : month; // Format as 01-12
        option.textContent = option.value;
        monthSelect.appendChild(option);
    }
  }

// Populate days based on selected month and year
function populateDays() {
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);
    
    // Clear current options
    daySelect.innerHTML = '';

    const daysInMonth = new Date(year, month, 0).getDate();

    for (let d = 1; d <= daysInMonth; d++) {
    const option = document.createElement('option');
    option.value = d;
    option.textContent = d;
    daySelect.appendChild(option);
    }
}

// Initial population
populateYears();
populateMonths();

// Set default selection to today's date
const today = new Date();
yearSelect.value = today.getFullYear();
monthSelect.value = today.getMonth() + 1;

populateDays(); // Populate days after setting year & month
daySelect.value = today.getDate();

// Update days when month or year changes
monthSelect.addEventListener('change', populateDays);
yearSelect.addEventListener('change', populateDays);



// if(isNaN(parseInt(date)) || isNaN(parseInt(month)) || isNaN(parseInt(year))){
//     alert("Please enter number");
// }
// else{
//     timeWindow.style.display = 'none';
// }
const day = document.getElementById("day-option").value;
const month = document.getElementById("month-option").value;
const year = document.getElementById("year-option").value;
const dateString = year.toString() + '-' + month.toString() + '-' + day.toString();


//set NOW time
function updateNowTime() {

    const currentTime = new Date();
    
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    // let seconds = currentTime.getSeconds();
    let minute = `0`;
    let hour = `0`;

    if(minutes<10){
        minute = `0`+`${minutes}`;
    }
    else{
        minute = `${minutes}`;
    }

    if(hours<10){
        let hour = `0`+`${hours}`;
    }
    else{
        hour = `${hours}`;
    }

    const timeString = hour + `:` + minute;
    document.getElementById('time-now').textContent = timeString;
}
updateNowTime();
setInterval(updateNowTime, 60000);
////////////////////////////////////////////////////////////////////

//popup set time
const setTimeBtn = document.getElementById('set-time-btn');
// const timeWindow = document.getElementById('time-popup');
const doneBtn = document.getElementById('done-btn');

// timeWindow.style.display = 'none';

setTimeBtn.onclick = function(){
    timeWindow.style.display = 'block';
}

doneBtn.onclick = async function() {
    let travelDuration = getValue("travelTimeBox");
    let prepareDuration = getValue("pTimeBox");

    if (isNaN(travelDuration) || isNaN(prepareDuration)) {
        alert("Please enter number");
    } else {
        // Optional: save prepareDuration somewhere if needed

        timeWindow.style.display = 'none';

        // Save clock log and get sleep/wake time
        await handleSaveClockLog();
    }
}
////////////////////////////////////////////////////////////////////


//get value of travelDuration & prepareDuration
function getValue(id){
    let value = document.getElementById(id).value;
    return parseInt(value);
}
////////////////////////////////////////////////////////////////////


//find sleep duration
let sleep = 0;

const sleepTimeWindow = document.getElementById("sleep-time-window");
const sleepNewWindow = document.getElementById("sleep-new-window");
sleepTimeWindow.style.display = 'block';
sleepNewWindow.style.display = 'none'

document.querySelectorAll('.square').forEach(button =>{
    const btnName = button.getAttribute('id');
    let hour = 0;
    let minute = 0;

    if(btnName === "1.5hours"){
        hour = 1;
        minute = 30;
    } else if(btnName === "3hours"){
        hour = 3;
        minute = 0;

    } else if(btnName === "4.5hours"){
        hour = 4;
        minute = 30;

    } else if(btnName === "6hours"){
        hour = 6;
        minute = 0;
    } else if(btnName === "7.5hours"){
        hour = 7;
        minute = 30;
    } else if(btnName === "9hours"){
        hour = 9;
        minute = 0;
    }
    
    
    button.onclick = function(){
        updateSleepTime();
        sleepTimeWindow.style.display = 'none';
        sleepNewWindow.style.display = 'block';
        console.log('clicked');
        sleep = hour*60 + minute;
        console.log(sleep);
    }
})

////////////////////////////////////////////////////////////////////

//bin button
const bin = document.getElementById("bin");
bin.onclick = function(){
    sleepTimeWindow.style.display = 'block';
    sleepNewWindow.style.display = 'none';
}
////////////////////////////////////////////////////////////////////

// let date, sleepTime, sleepDuration, wakeTime, travelDuration, appointmentTime = getEventByDate(dateString);

async function updateWakeTime(){
    const day = document.getElementById("day-option").value;
    const month = document.getElementById("month-option").value;
    const year = document.getElementById("year-option").value;
    const dateString = year.toString() + '-' + month.toString() + '-' + day.toString();
    let { wakeTime } = await getClockLogByDate(dateString);
    document.getElementById('time-wake').textContent = wakeTime;
    // console.log(wakeTime);

}
async function updateSleepTime(){
    const day = document.getElementById("day-option").value;
    const month = document.getElementById("month-option").value;
    const year = document.getElementById("year-option").value;
    const dateString = year.toString() + '-' + month.toString() + '-' + day.toString();
    let { sleepTime } = await getClockLogByDate(dateString); //
    document.getElementById('sleeptime').textContent = sleepTime;
}

///////////////////////////////////////////////////////////////////

//countdown
function updateCountdown() {
    const day = document.getElementById("day-option").value;
    const month = document.getElementById("month-option").value;
    const year = document.getElementById("year-option").value;
    const dateString = year.toString() + '-' + month.toString() + '-' + day.toString();
    let {date, sleepTime, sleepDuration, wakeTime, travelDuration, appointmentTime} = getEventByDate(dateString);
    // const now = new Date();

    // // Get tomorrow's date
    // const tomorrow = new Date();
    // tomorrow.setDate(now.getDate() + 1);
    // tomorrow.setHours(0, 0, 0, 0); // Set time to 00:00:00

    const diff = wakeTime - sleepTime;

    if (diff <= 0) {
      document.getElementById('countdown').innerText = "It's a new day!";
      clearInterval(timer);
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Pad with leading zeros
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');

    document.querySelectorAll('.cooldowntimer').forEach((timertext) => {
        timertext.innerText = `Next Spin in ${h}:${m}:${s}`;
    });
  }

// Update immediately
updateCountdown();
//////////////////////////////////////////////////

//backend

async function getEventByDate(date) { // YYYY-MM-DD
    if (!token) {
        alert("You must be logged in!");
        return;
    }

    try {
        const response = await fetch(`${backURL}/api/clocklogs/event/date/${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Error getting event:", error);
            alert("Something went wrong! Check the console.");
            return;
        }
        
        return data; // {start, end} -> 'xx:xx' format
    } catch (error) {
        console.error("Error getting clocklog:", error);
        alert('Something went wrong! Check the console.');
    }
}

async function getClockLogByDate(date) { // YYYY-MM-DD
    if (!token) {
        alert("You must be logged in!");
        return;
    }
    
    try {
        const response = await fetch(`${backURL}/api/clocklogs/date/${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                date,
                sleepTime: "00:00",
                sleepDuration: 0,
                wakeTime: "06:00",
                travelDuration: 0,
                appointmentTime: "08:00"
            }
        } else {
            return data.clockLog; // {date, sleepTime, sleepDuration, wakeTime, travelDuration, appointmentTime}
        }
    } catch (error) {
        console.error("Error getting clocklog:", error);
        alert('Something went wrong! Check the console.');
    }
}

async function saveClockLog(clocklog, date) { // { sleepDuration, travelDuration, appointmentTime}, YYYY-MM-DD
    if (!token) {
        alert("You must be logged in!");
        return;
    }
    
    try {
        const response = await fetch(`${backURL}/api/clocklogs/clock/${date}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(clocklog)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Error saving clocklog:", data.message);
            alert(data.message || "Something went wrong!");
            return null;
        }
        console.log('Clocklog saved:', data.clockLog)
        return data.clockLog; // {date, sleepTime, sleepDuration, wakeTime, travelDuration, appointmentTime}
        
    } catch (error) {
        console.error("Error getting clocklog:", error);
        alert('Something went wrong! Check the console.');
    }
}

async function handleSaveClockLog() {
    const day = document.getElementById("day-option").value;
    const month = document.getElementById("month-option").value;
    const year = document.getElementById("year-option").value;
    const dateString = `${year}-${month}-${day}`; // YYYY-MM-DD format

    const sleepDuration = sleep; // already calculated from the button click (in minutes)
    const travelDuration = getValue("travelTimeBox"); // assuming value in minutes
    const appointmentTime = document.getElementById("appointTimeBox").value; // assuming 'HH:mm' format
    
    if (isNaN(sleepDuration) || isNaN(travelDuration) || !appointmentTime) {
        alert("Please enter valid sleep duration, travel time, and appointment time.");
        return;
    }

    const clocklog = {
        sleepDuration,
        travelDuration,
        appointmentTime
    };

    const savedLog = await saveClockLog(clocklog, dateString);

    if (savedLog) {
        // Display the times returned from backend
        document.getElementById('sleeptime').textContent = savedLog.sleepTime;
        document.getElementById('time-wake').textContent = savedLog.wakeTime;

        alert(`You should go to bed at ${savedLog.sleepTime} and wake up at ${savedLog.wakeTime}`);
    }
}


// date, sleepTime, sleepDuration, wakeTime, travelDuration, appointmentTime = saveClockLog({sleepDuration, travelDuration, appointmentTime}, dateString)


// function fetchEventData() {
//     // Fetch data from the backend API
//     fetch('/api/events')  // Assuming your backend API endpoint is '/api/events'
//     .then(response => response.json())
//     .then(events => displayEvents(events))
//     .catch(error => console.error('Error fetching events:', error));
// }
  
// function displayEvents(events) {
//     const eventListContainer = document.getElementById('event-list');
//     eventListContainer.innerHTML = '';

//     events.forEach(event => {
//         const eventElement = document.createElement('div');
//         eventElement.classList.add('event');

//         const eventName = document.createElement('h3');
//         eventName.innerText = event.event_name;

//         const eventTime = document.createElement('p');
//         const eventDate = new Date(event.event_time);
//         eventTime.innerText = `Time: ${eventDate.toLocaleString()}`;

//         eventElement.appendChild(eventName);
//         eventElement.appendChild(eventTime);

//         eventListContainer.appendChild(eventElement);
//     });
// }

// // Display the events
// displayEvents(eventData);