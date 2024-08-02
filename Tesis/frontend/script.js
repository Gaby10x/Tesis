document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (response.ok) {
        window.location.href = 'main.html'; // Redirige al usuario a la página principal
    } else {
        document.getElementById('error').innerText = result.message;
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('nav ul li a');

    for (const link of links) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 50, // Ajustar por la altura del header
                behavior: 'smooth'
            });
        });
    }
});
