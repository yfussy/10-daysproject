function press(button, buttonId) {
    if (localStorage.getItem(buttonId) === 'true') {
        button.classList.add('clicked');
    }
    button.addEventListener('click', function() {
    
        button.classList.add('clicked');
        localStorage.setItem(buttonId, 'true');
    });
}

const HomeButton = document.getElementById('Home-Button');
press(HomeButton, 'Home-Button');  
const CalendarButton = document.getElementById('Calendar-Button');
press(CalendarButton, 'Calendar-Button');  
const ClockButton = document.getElementById('Clock-Button');
press(ClockButton, 'Clock-Button');  
const HoroscopeButton = document.getElementById('Horoscope-Button');
press(HoroscopeButton, 'Horoscope-Button');  
