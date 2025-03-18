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
        document.querySelector('.popupLuckynumber').innerText = fortune.number;
        document.querySelector('.TheLuckynumber').innerText = fortune.number;
        document.getElementById('C1').style.backgroundColor = fortune.color.colorFortune;
        document.getElementById('C2').style.backgroundColor = fortune.color.colorUnFortune;

    } catch (error) {
        console.error("Error getting fortune:", error);
        alert('Something went wrong! Check the console.');
    }
}

function updateCountdown() {
    const now = new Date();

    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Set time to 00:00:00

    const diff = tomorrow - now;

    if (diff <= 0) {
      document.getElementById('countdown').innerText = "It's a new day!";
      clearInterval(timer);
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Pad with leading zeros
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');

    document.querySelectorAll('.cooldowntimer').forEach((timertext) => {
        timertext.innerText = `Next Spin in ${h}:${m}:${s}`;
    });
  }

// Update immediately
updateCountdown();

// Then every second
const timer = setInterval(updateCountdown, 1000);

renderFortune();
