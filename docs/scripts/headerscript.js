const HoroscopeButton = document.querySelectorAll('#header-horoscope'); 

HoroscopeButton.forEach(button => {
    button.addEventListener('click', async() => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('You must be logged in!');
            window.location.href = "login.html";
            return;
        }

        try {
            const response = await fetch(`${backURL}/api/clocklogs/fortune/avaliable`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log(data);

            if (data.avaliable) {
                window.location.href = "horoscope.html";
            } else {
                window.location.href = "horoscope-result.html";
            }
        } catch (error) {
            console.error('Error getting fortune status:', error);
            alert('Something went wrong! Check the console.');
        }
    })
});

document.querySelector('#header-profile').addEventListener('click', () => {
    const token = localStorage.getItem('token');

        if (!token) {
            alert('You must be logged in!');
            window.location.href = "login.html";
        } else {
            window.location.href = "myaccountpage.html";
        }
});

document.querySelector('#header-calendar').addEventListener('click', () => {
    const token = localStorage.getItem('token');

        if (!token) {
            alert('You must be logged in!');
            window.location.href = "login.html";
        } else {
            window.location.href = "calendarpage.html";
        }
});