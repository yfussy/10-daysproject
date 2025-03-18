document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("usernameBox").value;
    const password = document.getElementById("passwordBox").value;
    console.log(username, password);
    

    try {
        const response = await fetch(`${backURL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            alert("Login successful!");
            window.location.href = "index.html";
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred during login.");
    }
});

document.getElementById("createanAccountbutton").addEventListener("click", () => {
    window.location.href = "register.html";
});

document.querySelectorAll(".header-button").forEach(button => {
    button.addEventListener("click", () => {
        alert("Please Log in First!")
    });
});