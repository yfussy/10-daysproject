const SpinButton = document.getElementById('Spin-button');
SpinButton.addEventListener('click', async() => {
    alert('spin');

    const token = localStorage.getItem('token');

    if (!token) {
        alert('You must be logged in!');
        return;
      }
    
    try {
    const response = await fetch('http://localhost:3000/api/clocklogs/fortune', {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        return;
    }

    const data = await response.json();
    console.log(data);

    const { fortune } = data;

    // TODO: Update UI with fortune data

    } catch (error) {
    console.error('Error generating fortune:', error);
    alert('Something went wrong! Check the console.');
    }
});