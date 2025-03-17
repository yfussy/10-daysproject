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
