const calendarBody = document.getElementById("calendar-body");
const monthYearDisplay = document.getElementById("month-year");

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
        const clickedDate = new Date(year, month, button.textContent);
        alert(`${dayNames[clickedDate.getDay()]}, ${monthNames[month]} ${button.textContent}, ${year}`);
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
                const clickedDate = new Date(year, month, button.textContent);
                alert(`${dayNames[clickedDate.getDay()]}, ${monthNames[month]} ${button.textContent}, ${year}`);
            });

            cell.appendChild(button);
            dayCount++;
        }

        row.appendChild(cell);
    }

    calendarBody.appendChild(row);
}
