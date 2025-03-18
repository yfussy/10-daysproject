const calendarBody = document.getElementById("calendar-body");
const monthYearDisplay = document.getElementById("month-year");
const body = document.querySelector("body");  
const wrapper = document.querySelector(".wrapper");

const token = localStorage.getItem('token');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

monthYearDisplay.textContent = `${monthNames[month]}`;

const firstDay = new Date(year, month, 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();

let dayCount = 1;
let row = document.createElement("tr");

for (let i = 0; i < firstDay; i++) {
    row.appendChild(document.createElement("td"));
}

for (let i = firstDay; i < 7; i++) {
    let cell = document.createElement("td");
    let button = document.createElement("button");
    button.classList.add("calendar-btn");

    let dateSpan = document.createElement("span");
    dateSpan.textContent = dayCount;
    button.appendChild(dateSpan);

    button.addEventListener("click", () => {
        wrapper.classList.add("transparent");
    });

    cell.appendChild(button);
    row.appendChild(cell);
    dayCount++;
}

calendarBody.appendChild(row);

while (dayCount <= daysInMonth) {
    row = document.createElement("tr");

    for (let i = 0; i < 7; i++) {
        let cell = document.createElement("td");
        let button = document.createElement("button");
        button.classList.add("calendar-btn");

        if (dayCount <= daysInMonth) {
            let dateSpan = document.createElement("span");
            dateSpan.textContent = dayCount;
            button.appendChild(dateSpan);

            button.addEventListener("click", () => {
                wrapper.classList.add("transparent"); 
            });

            cell.appendChild(button);
            dayCount++;
        }

        row.appendChild(cell);
    }

    calendarBody.appendChild(row);
}

const calendarButtons = document.querySelectorAll(".calendar-btn");

calendarButtons.forEach(button => {
    button.addEventListener("click", () => {
        const rectangle = document.createElement("div");
        rectangle.id = "rectangle";

        const popupContent = document.createElement("div");
        popupContent.id = "popup-content";

        const dm = new Date();
        const shtmonthNames = [
            "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
        ];

        const date = document.createElement("div");
        date.classList.add("date-style");

        const clickedDate = button.textContent;
        date.textContent = `${clickedDate} ${shtmonthNames[dm.getMonth()]}`;

        const closeButton = document.createElement("button");
        closeButton.classList.add("close-btn");
        closeButton.textContent = "X";

        const textTitle = document.createElement("input");
        textTitle.id = "title-text";
        textTitle.placeholder = "Title";

        const textLo = document.createElement("input");
        textLo.id = "lo-text";
        textLo.placeholder = "Location";

        const alldaybtn = document.createElement("button");
        alldaybtn.classList.add("allday-btn");
        alldaybtn.textContent = "ALL-DAY";

        const st = document.createElement("div");
        st.classList.add("st-style");
        st.textContent = "Start";

        const startTimeContainer = document.createElement("div");
        startTimeContainer.classList.add("time-picker");

        const startHours = document.createElement("input");
        startHours.type = "number";
        startHours.min = "0";
        startHours.max = "23";
        startHours.value = "09"; 
        startHours.classList.add("sthr-input");

        const startMinutes = document.createElement("input");
        startMinutes.type = "number";
        startMinutes.min = "0";
        startMinutes.max = "59";
        startMinutes.value = "00"; 
        startMinutes.classList.add("stmin-input");

        const colon = document.createElement("span");
        colon.classList.add("stcolon");
        colon.textContent = ":";

        startTimeContainer.appendChild(startHours);
        startTimeContainer.appendChild(colon);
        startTimeContainer.appendChild(startMinutes);

        const en = document.createElement("div");
        en.classList.add("en-style");
        en.textContent = "End";

        
        const endTimeContainer = document.createElement("div");
        endTimeContainer.classList.add("time-picker");

        const endHours = document.createElement("input");
        endHours.type = "number";
        endHours.min = "0";
        endHours.max = "23";
        endHours.value = "10"; 
        endHours.classList.add("enhr-input");

        const endMinutes = document.createElement("input");
        endMinutes.type = "number";
        endMinutes.min = "0";
        endMinutes.max = "59";
        endMinutes.value = "00"; 
        endMinutes.classList.add("enmin-input");

        const colon2 = document.createElement("span");
        colon2.classList.add("encolon");
        colon2.textContent = ":";

        endTimeContainer.appendChild(endHours);
        endTimeContainer.appendChild(colon2);
        endTimeContainer.appendChild(endMinutes);

        const textNote = document.createElement("input");
        textNote.id = "note-text";
        textNote.placeholder = "Notes";

        const AddEventbtn = document.createElement("button");
        AddEventbtn.classList.add("addeventbtn");
        AddEventbtn.textContent =  "ADD EVENT";

        popupContent.appendChild(date);
        popupContent.appendChild(closeButton);
        popupContent.appendChild(textTitle);
        popupContent.appendChild(textLo);
        popupContent.appendChild(alldaybtn);
        popupContent.appendChild(st);
        popupContent.appendChild(startTimeContainer);
        popupContent.appendChild(en);
        popupContent.appendChild(endTimeContainer);
        popupContent.appendChild(textNote);
        popupContent.appendChild(AddEventbtn);

        rectangle.appendChild(popupContent);
        document.body.appendChild(rectangle);
        rectangle.classList.add("show");
        AddEventbtn.addEventListener("click",() => {
            const title = textTitle.value;
            const location = textLo.value;
            const notes = textNote.value;
            const startHour = startHours.value;
            const startMinute = startMinutes.value;
            const startTime = `${startHour}:${startMinute}`;
            const endHour = endHours.value;
            const endMinute = endMinutes.value;
            const endTime = `${endHour}:${endMinute}`;
            const selectedDate = button.textContent; 
            const eventDate = `${year}-${month + 1}-${selectedDate.padStart(2, "0")}`; // Format as YYYY-MM-DD

            saveEvent({title, location, startTime, endTime, notes}, eventDate);
            rectangle.remove();
            wrapper.classList.remove("transparent");
        });
        closeButton.addEventListener("click", () => {
            rectangle.remove();
            wrapper.classList.remove("transparent");
        });
    });
});

async function getCalendarByMonth(month) { // month: YYYY-MM
    if (!token) {
        alert("You must be logged in!");
        return;
    }

    try {
        const response = await fetch(`${backURL}/api/clocklogs/month/:${month}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = response.json();
        return data; // [{date, sleepTime, sleepDuration, wakeTime, travelDuration, appointmentTime},{},{},...]
    } catch (error) {
        console.error("Error getting clocklog:", error);
        alert('Something went wrong! Check the console.');
    }
}

async function saveEvent(event, date) { // event: {title, location, duration: {startTime, endTime}, note}, date: YYYY-MM-DD
    if (!token) {
        alert("You must be logged in!");
        return;
    }

    try {
        const response = await fetch(`${backURL}/api/clocklogs/event/:${date}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: event
        });

        const data = response.json();
        return data.event; // {title, location, duration: {startTime, endTime}, note}
    } catch (error) {
        console.error("Error getting clocklog:", error);
        alert('Something went wrong! Check the console.');
    } 
}