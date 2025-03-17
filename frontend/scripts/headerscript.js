const HomeButton = document.getElementById('Home-Button');
const CalendarButton = document.getElementById('Calendar-Button');
press(CalendarButton, 'Calendar-Button');  
const ClockButton = document.getElementById('Clock-Button');
press(ClockButton, 'Clock-Button');  
const HoroscopeButton = document.getElementById('Horoscope-Button');
press(HoroscopeButton, 'Horoscope-Button');  

HoroscopeButton.addEventListener('click', async() => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You must be logged in!');
        return;
    }

    try {
        const response = await fetch(`${backURL}/api/clocklogs/fortune/status`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const { status } = await response.json();

        if (status) {
            window.location.href = "horoscope.html";
        } else {
            window.location.href = "horoscope-result.html";
        }
    } catch (error) {
        console.error('Error getting fortune status:', error);
        alert('Something went wrong! Check the console.');
    }
});