// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    });
});

let currentPassword = null; // Store the current password in memory

async function generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

async function updatePassword() {
    currentPassword = await generateRandomPassword(); // Generate and store the new password in memory

    // Send the new password to the Discord webhook
    const webhookUrl = 'https://discord.com/api/webhooks/1358961607396561160/2G69FRSw53vaixn8Z8CSDVaKv-V9gMycCiNWUyGchoqGda6eS-WnzwOvs2xKFZgjY5tB';
    await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: `The new password is: **${currentPassword}**`
        })
    });

    console.log("New Password Sent to Discord:", currentPassword); // Debugging purposes
}

function checkPassword() {
    const password = document.getElementById('password-input').value;

    if (password === currentPassword) {
        document.getElementById('password-overlay').style.display = 'none';
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
}

// Call updatePassword() to generate and send a new password when the page loads
updatePassword();
