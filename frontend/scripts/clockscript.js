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