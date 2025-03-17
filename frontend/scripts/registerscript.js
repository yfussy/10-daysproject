const backURL = "http://localhost:3000";

document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const birthdate = document.getElementById("birthdate").value;

    try {
        const response = await fetch(`${backURL}/api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, email, name: {firstname, lastname}, birthdate})
        });

        if (response.ok) {
            alert("Login successful!");
            window.location.href = "./testlogin.html";
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred during login.");
    }
});
