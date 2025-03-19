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

async function renderCalendar(year, month) {
    const monthStr = `${year}-${(month + 1).toString().padStart(2, "0")}`;
    const logs = await getEventsByMonth(monthStr);
  
    // Map logs by date for quick lookup
    const logsByDate = {};
    logs.forEach(log => {
      logsByDate[log.date] = log.event; // Could be null if no event
    });
  
    drawCalendarGrid(year, month, logsByDate);
}

function drawCalendarGrid(year, month, eventsByDate) {
    calendarBody.innerHTML = ''; // Clear previous calendar
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    let dayCount = 1;
    let row = document.createElement("tr");
  
    // Add empty cells before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      row.appendChild(document.createElement("td"));
    }
  
    // Fill out the rest of the first row
    for (let i = firstDay; i < 7; i++) {
      if (dayCount > daysInMonth) break;
      const cell = createCalendarCell(year, month, dayCount, eventsByDate);
      row.appendChild(cell);
      dayCount++;
    }
  
    calendarBody.appendChild(row);
  
    // Remaining weeks
    while (dayCount <= daysInMonth) {
      row = document.createElement("tr");
  
      for (let i = 0; i < 7; i++) {
        if (dayCount > daysInMonth) break;
        const cell = createCalendarCell(year, month, dayCount, eventsByDate);
        row.appendChild(cell);
        dayCount++;
      }
  
      calendarBody.appendChild(row);
    }
}
  

function createCalendarCell(year, month, day, eventsByDate) {
    const cell = document.createElement("td");
    const button = document.createElement("button");
    button.classList.add("calendar-btn");
  
    // Build date string in YYYY-MM-DD format
    const dateStr = `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  
    // Add date number
    const dateSpan = document.createElement("span");
    dateSpan.classList.add("date-span");
    dateSpan.textContent = day;
    button.appendChild(dateSpan);
  
    // If there is an event on this date, show its title + time
    const eventData = eventsByDate[dateStr];
  
    if (eventData && !isDefaultEvent(eventData)) {
        const eventInfo = document.createElement("span");
        eventInfo.classList.add("event-info");
        eventInfo.textContent = `${eventData.title} (${eventData.duration.start} - ${eventData.duration.end})`;
        button.appendChild(eventInfo);
      
        button.classList.add("has-event");
      }
      
  
    // Click listener to open the event popup
    button.addEventListener("click", () => {
        openEventPopup(year, month, day, eventData, button);
    });
  
    cell.appendChild(button);
    return cell;
}

function openEventPopup(year, month, day, existingEvent, button) {
    // Clear previous popup if it exists
    const oldPopup = document.getElementById("rectangle");
    if (oldPopup) oldPopup.remove();
  
    const rectangle = document.createElement("div");
    rectangle.id = "rectangle";
  
    const popupContent = document.createElement("div");
    popupContent.id = "popup-content";
  
    const eventDate = `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  
    // Fields for title, location, notes...
    const dm = new Date();
    const shtmonthNames = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    const date = document.createElement("div");
    date.classList.add("date-style");

    const clickedDate = day;
    date.textContent = `${clickedDate} ${shtmonthNames[dm.getMonth()]}`;

    const textTitle = document.createElement("input");
    textTitle.placeholder = "Title";
    textTitle.value = existingEvent ? existingEvent.title : "";
    textTitle.id = "title-text";
  
    const textLocation = document.createElement("input");
    textLocation.placeholder = "Location";
    textLocation.value = existingEvent ? existingEvent.location : "";
    textLocation.id = "lo-text";
    
    const st = document.createElement("div");
    st.classList.add("st-style");
    st.textContent = "Start";

    const startTimeContainer = document.createElement("div");
    startTimeContainer.classList.add("time-picker");

    const startTime = existingEvent ? existingEvent.duration.start : "09:00";
    const endTime = existingEvent ? existingEvent.duration.end : "10:00";

    const startHours = document.createElement("input");
    startHours.type = "number";
    startHours.min = "0";
    startHours.max = "23";
    startHours.value = startTime.split(":")[0]; 
    startHours.classList.add("sthr-input");

    const startMinutes = document.createElement("input");
    startMinutes.type = "number";
    startMinutes.min = "0";
    startMinutes.max = "59";
    startMinutes.value = startTime.split(":")[1]; 
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
    endHours.value = endTime.split(":")[0]; 
    endHours.classList.add("enhr-input");

    const endMinutes = document.createElement("input");
    endMinutes.type = "number";
    endMinutes.min = "0";
    endMinutes.max = "59";
    endMinutes.value = endTime.split(":")[1]; 
    endMinutes.classList.add("enmin-input");

    const colon2 = document.createElement("span");
    colon2.classList.add("encolon");
    colon2.textContent = ":";

    endTimeContainer.appendChild(endHours);
    endTimeContainer.appendChild(colon2);
    endTimeContainer.appendChild(endMinutes);

    const textNote = document.createElement("input");
    textNote.placeholder = "Notes";
    textNote.value = existingEvent ? existingEvent.note : "";
    textNote.id = "note-text"
  
    const saveBtn = document.createElement("button");
    saveBtn.textContent = existingEvent ? "Update Event" : "Add Event";
    saveBtn.classList.add("addeventbtn");
  
    saveBtn.addEventListener("click", async () => {
      const event = {
        title: textTitle.value,
        location: textLocation.value,
        duration: {
            start: `${startHours.value.padStart(2, '0')}:${startMinutes.value.padStart(2, '0')}`,
            end: `${endHours.value.padStart(2, '0')}:${endMinutes.value.padStart(2, '0')}`
        },
        note: textNote.value,
      };
      console.log(event);
  
      await saveEvent(event, eventDate); // Call your existing API
      rectangle.remove();
      wrapper.classList.remove("transparent");
  
      // Re-render calendar to show updated events!
      renderCalendar(year, month);
    });
  
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.classList.add("close-btn")
    closeBtn.addEventListener("click", () => {
      rectangle.remove();
      wrapper.classList.remove("transparent");
    });
  
    popupContent.append(date,textTitle, textLocation , st, startTimeContainer, en, endTimeContainer,textNote, saveBtn, closeBtn);
    rectangle.appendChild(popupContent);
    document.body.appendChild(rectangle);
    rectangle.classList.add("show");
  
    wrapper.classList.add("transparent");
}
  
  
  

async function getEventsByMonth(month) { // month: YYYY-MM
    if (!token) {
        alert("You must be logged in!");
        return;
    }

    try {
        const response = await fetch(`${backURL}/api/clocklogs/event/month/${month}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const events = await response.json();
        return events; // [{title, location, duration: {start, end}, note},{},{},...]
    } catch (error) {
        console.error("Error getting clocklog:", error);
        alert('Something went wrong! Check the console.');
    }
}

async function saveEvent(eventData, date) { // event: {title, location, duration: {start, end}, note}, date: YYYY-MM-DD
    if (!token) {
        alert("You must be logged in!");
        return;
    }

    try {
        const response = await fetch(`${backURL}/api/clocklogs/event/${date}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(eventData)
        });

        const data = await response.json();
        return data.event; // {title, location, duration: {start, end}, note}
    } catch (error) {
        console.error("Error getting clocklog:", error);
        alert('Something went wrong! Check the console.');
    } 
}

function isDefaultEvent(event) {
    const defaultTitle = ""; // or "Untitled" or whatever your empty state is
    const defaultStart = "09:00";
    const defaultEnd = "10:00";
  
    return (
      event.title === defaultTitle &&
      event.duration.start === defaultStart &&
      event.duration.end === defaultEnd &&
      !event.location && !event.note // optional: check other fields
    );
}
  
document.addEventListener("DOMContentLoaded", () => {
    renderCalendar(year, month);
  });