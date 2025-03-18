function checkLoggedIn() {
    const token = localStorage.getItem('token');

    if (!token) {
        document.querySelector('.login-box').innerHTML = `<a href="login.html">
                <button class="login-button">Login</button>
            </a>`
    };
}

checkLoggedIn();