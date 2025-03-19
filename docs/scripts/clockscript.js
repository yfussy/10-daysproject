////////////////////////////////////////////////////////////////
//apply horoscope
// const horoBtn = document.getElementById('horo-checkbox');
// function checkHoroCheckbox() {
//     var checkbox = document.getElementById("horo-checkbox");

//     // Check if the checkbox is checked
//     if (checkbox.checked) {
//         return true;
//     } else {
//         return false;
//     }
// }
// checkHoroCheckbox();
////////////////////////////////////////////////////////////////////

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
const day = document.getElementById("day").value;
const month = document.getElementById("month").value;
const year = document.getElementById("year").value;

function setDate(){
    const day = document.getElementById("day").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;

    if(isNaN(parseInt(day)) || isNaN(parseInt(month)) || isNaN(parseInt(year))){
        alert("Please enter number")
    }
    else{
        if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month ==12){
            if(day>31){
                day = 31;
            }
        }
        else if(month == 2){
            if(day>28){
                day = 28;
            }
        }
        else{
            if(day>30){
                day = 30;
            }
        }
        if(day<0){
            day = 0;
        }
        if(year<0){
            year = 0;
        }
        if(year>2025){
            year = 2025;
        }
    }
    document.getElementById("day").textContent = day;
    document.getElementById("month").textContent = month;
    document.getElementById("year").textContent = year;
}

// if(isNaN(parseInt(date)) || isNaN(parseInt(month)) || isNaN(parseInt(year))){
//     alert("Please enter number");
// }
// else{
//     timeWindow.style.display = 'none';
// }

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

doneBtn.onclick = function(){
    let travelDuraion = getValue("travelTimeBox");
    let prepareDuration = getValue("pTimeBox");
    if(isNaN(travelDuraion) || isNaN(prepareDuration)){
        alert("Please enter number");
    }
    else{
        timeWindow.style.display = 'none';
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

let date, sleepTime, sleepDuration, wakeTime, travelDuration, appointmentTime = getEventByDate(dateString);

function updateWakeTime(){
    document.getElementById('time-wake').textContent = wakeTime;
    console.log(wakeTime);

}
function updateSleepTime(){
    document.getElementById('sleeptime').textContent = sleepTime;
}

///////////////////////////////////////////////////////////////////

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
            body: clocklog
        });

        const data = await response.json();
        return data.clockLog; // {date, sleepTime, sleepDuration, wakeTime, travelDuration, appointmentTime}
        
    } catch (error) {
        console.error("Error getting clocklog:", error);
        alert('Something went wrong! Check the console.');
    }
}

// date, sleepTime, sleepDuration, wakeTime, travelDuration, appointmentTime = saveClockLog({sleepDuration, travelDuration, appointmentTime}, dateString)