const backURL = "http://localhost:3000";

function openPopup() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}
function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

async function renderFortune() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        alert('You must be logged in!');
        return;
    }
    
    try {
        const response = await fetch(`${backURL}/api/clocklogs/fortune`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        });

        const { fortune } = await response.json();
        console.log(fortune);
        // TODO: display fortune on horoscope-result.hmtl


    } catch (error) {
        console.error("Error getting fortune:", error);
        alert('Something went wrong! Check the console.');
    }
}

renderFortune();