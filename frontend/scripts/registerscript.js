const backURL = "http://localhost:3000";

document.querySelector(".createAccount-button").addEventListener("click", async function(event) {
    event.preventDefault();

    const username = document.querySelector(".usernameBox").value;
    const password = document.querySelector(".passwordBox").value;
    const email = document.querySelector(".emailBox").value;
    const firstname = document.querySelector(".fnameBox").value;
    const lastname = document.querySelector(".lnameBox").value;
    const birthdate = document.querySelector(".birthday").value;
    const checkPassword = document.querySelector(".CpasswordBox").value;

    if (username || password || email || firstname || lastname || birthdate) {
        if (password === checkPassword) {
            try {
                let response = await fetch(`${backURL}/api/users/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password, email, name: {firstname, lastname}, birthdate})
                });

                const message = await response.json();

                if (response.ok) {
                    alert(message.message);
                    window.location.href = "login.html";
                } else {
                    alert(message.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert("An error occurred during login.");
            }
        } else {
            alert("Password does not match!");
        }
    } else {
        alert("Fill all missing fields!");
    }
});
