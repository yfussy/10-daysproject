const token = localStorage.getItem('token');

async function renderUser() {
    if (!token) {
        alert('You must be logged in!');
        return;
    }
    
    try {
        const response = await fetch(`${backURL}/api/users`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        });
    
        const { username, email } = await response.json();
        document.querySelector('.username-style').textContent = `USERNAME : ${username}`;
        document.querySelector('.email-style').textContent = `EMAIL : ${email}`;
    
    } catch (error) {
        console.error("Error getting fortune:", error);
        alert('Something went wrong! Check the console.');
    }
}

renderUser();