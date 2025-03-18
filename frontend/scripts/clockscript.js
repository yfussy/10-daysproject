const token = localStorage.getItem("token");

async function getClockLog(date) { // YYYY-MM-DD
    if (!token) {
        alert("You must be logged in!");
        return;
    }
    
    try {
        const response = await fetch(`${backURL}/api/clocklogs/date/:${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = response.json();

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
            return data.clockLog;
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
        const response = await fetch(`${backURL}/api/clocklogs/clock/:${date}`, {
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

function displayDate() {
    const now = new Date();  // Get current date and time
    const day = now.getDate();  // Get the day (1-31)
    const month = now.getMonth() + 1;  // Get the month (0-11, so we add 1)
    const year = now.getFullYear();  // Get the full year (e.g., 2025)

    // Format date as "DD/MM/YYYY"
    // const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;

    // Display the date inside the element with id 'date'

    console.log(document.getElementById('day'));
    console.log(typeof month);
    console.log(typeof year);
    console.log(typeof now);

    document.getElementById('day').textContent = day;
    document.getElementById('month').textContent = month;
    document.getElementById('year').textContent = year;

    
    
}

// Call the function to display the current date
displayDate();