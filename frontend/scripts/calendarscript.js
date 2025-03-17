const calendarBody = document.getElementById("calendar-body");
const monthYearDisplay = document.getElementById("month-year");
const body = document.querySelector("body");  
const wrapper = document.querySelector(".wrapper");

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
        date.textContent = `${clickedDate} ${shtmonthNames[dm.getMonth()]} `;
        
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

        const en = document.createElement("div");
        en.classList.add("en-style");
        en.textContent = "End";

        popupContent.appendChild(date);
        popupContent.appendChild(closeButton);
        popupContent.appendChild(textTitle);
        popupContent.appendChild(textLo);
        popupContent.appendChild(alldaybtn);
        popupContent.appendChild(st);
        popupContent.appendChild(en);

        rectangle.appendChild(popupContent);
        document.body.appendChild(rectangle);
        rectangle.classList.add("show");

        closeButton.addEventListener("click", () => {
            rectangle.remove(); 
            wrapper.classList.remove("transparent");
        });
    });
});
