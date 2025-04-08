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

async function fetchPasswordHash() {
    try {
        const response = await fetch('password-hash.json'); // Fetch the hash from an external file
        if (!response.ok) throw new Error('Failed to fetch password hash');
        const data = await response.json();
        return data.hash;
    } catch (error) {
        console.error('Error fetching password hash:', error);
        return null;
    }
}

async function hashInput(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

async function checkPassword() {
    const password = document.getElementById('password-input').value;
    const hashedInput = await hashInput(password);
    console.log("Hashed Input:", hashedInput); // Log the hashed input for comparison
    const storedHash = await fetchPasswordHash();

    if (storedHash && hashedInput === storedHash) {
        document.getElementById('password-overlay').style.display = 'none';
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
}
