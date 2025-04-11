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

document.addEventListener('DOMContentLoaded', () => {
    const ttsButton = document.getElementById('tts-button');
    if (ttsButton) {
      ttsButton.addEventListener('click', () => {
        const content = document.querySelector('.lesson-content').innerText;
        const speech = new SpeechSynthesisUtterance(content);
        speech.lang = 'en-US';
        window.speechSynthesis.speak(speech);
      });
    }
  });