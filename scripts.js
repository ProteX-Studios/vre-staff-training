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

async function generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

async function updatePassword() {
    const newPassword = await generateRandomPassword();

    // Update the password.json file (simulated here, requires backend for real implementation)
    console.log("New Password:", newPassword); // For debugging purposes

    // Send the new password to the Discord webhook
    const webhookUrl = 'https://discord.com/api/webhooks/1358961607396561160/2G69FRSw53vaixn8Z8CSDVaKv-V9gMycCiNWUyGchoqGda6eS-WnzwOvs2xKFZgjY5tB';
    await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: `The new password is: **${newPassword}**`
        })
    });

    return newPassword;
}

async function fetchPassword() {
    try {
        const response = await fetch('password.json'); // Fetch the password from an external file
        if (!response.ok) throw new Error('Failed to fetch password');
        const data = await response.json();
        return data.password;
    } catch (error) {
        console.error('Error fetching password:', error);
        return null;
    }
}

async function checkPassword() {
    const password = document.getElementById('password-input').value;
    const storedPassword = await fetchPassword();

    if (storedPassword && password === storedPassword) {
        document.getElementById('password-overlay').style.display = 'none';
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
}

// Call updatePassword() to generate and send a new password when the page loads
updatePassword();
