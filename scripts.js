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

            // Attempt to select a more natural-sounding voice
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(voice => voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.name.includes('Natural'));
            if (preferredVoice) {
                speech.voice = preferredVoice;
            }

            speech.lang = 'en-US';
            speech.pitch = 1; // Adjust pitch for a more natural tone
            speech.rate = 1; // Adjust rate for better clarity
            window.speechSynthesis.speak(speech);
        });
    }

    // Progress bar logic
    const totalLessons = 25;
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];

    // Update progress bar
    function updateProgress() {
        const progress = (completedLessons.length / totalLessons) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${completedLessons.length} of ${totalLessons} lessons completed`;
    }

    // Mark lesson as completed
    document.querySelectorAll('.lesson-card').forEach(card => {
        card.addEventListener('click', () => {
            const lessonId = card.getAttribute('href');
            if (!completedLessons.includes(lessonId)) {
                completedLessons.push(lessonId);
                localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
                updateProgress();
            }
        });
    });

    // Initialize progress
    updateProgress();
});