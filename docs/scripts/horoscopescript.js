document.getElementById('Spin-button').addEventListener('click', async() => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You must be logged in!');
        return;
    }
    
    try {
        const response = await fetch(`${backURL}/api/clocklogs/fortune/generate`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log(data);
        window.location.href = "horoscope-result.html";
    } catch (error) {
        console.error('Error generating fortune:', error);
        alert('Something went wrong! Check the console.');
    }
});