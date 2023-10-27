document.addEventListener('DOMContentLoaded', function () {
    const aboutLink = document.querySelector('.menu a[href="#about"]');
    const aboutSection = document.getElementById('about');
    const contactLink = document.querySelector('.menu a[href="#contact"]');
    const contactSection = document.getElementById('contact');
    const closeContactButton = document.getElementById('close-contact');
    const introText = document.querySelector('#home h1');
    const translations = {
        English: 'Hello, My name is Benjamin Estrada 👋',
        Spanish: 'Hola, Mi nombre es Benjamin Estrada 👋',
    };
    const canvas = document.getElementById('generative-art');
    const ctx = canvas.getContext('2d');
    const particles  = [];

    let currentTranslation = 'English';

    function swapLanguage() {
        introText.classList.add('fade-out');
        setTimeout(() => {
            const languages = Object.keys(translations);
            const currentIndex = languages.indexOf(currentTranslation);
            currentTranslation = languages[(currentIndex + 1) % languages.length];
            introText.innerText = translations[currentTranslation];
            introText.classList.remove('fade-out');
            introText.classList.add('fade-in');
        }, 1000);
    }


    aboutLink.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: aboutSection.offsetTop - document.querySelector('header').offsetHeight,
            behavior: 'smooth'
        });
    });

    contactLink.addEventListener('click', function (e) {
        e.preventDefault();
        if (contactSection.style.transform === 'translateY(0)') {
            // If the contact section is already open, close it
            contactSection.style.transform = 'translateY(100%)';
        } else {
            // If the contact section is closed, open it
            contactSection.style.transform = 'translateY(0)';
        }
    });

    closeContactButton.addEventListener('click', () => {
        contactSection.style.transform = 'translateY(100%)';
    });
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to generate random particles
function generateParticle() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 5 + 2; // Random size between 2 and 7
    const speedX = (Math.random() - 0.5) * 2; // Random horizontal speed
    const speedY = (Math.random() - 0.5) * 2; // Random vertical speed
    const color = `hsl(${Math.random() * 360}, 40%, 60%)`;

    particles.push({ x, y, size, speedX, speedY, color });
}

// Function to move and draw particles
function moveAndDrawParticles() {
    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        // Move the particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Draw the particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw lines to connect this particle with others
        for (let j = 0; j < particles.length; j++) {
            if (i !== j) {
                const otherParticle = particles[j];
                const dx = otherParticle.x - particle.x;
                const dy = otherParticle.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 50) {
                    ctx.strokeStyle = particle.color;
                    ctx.lineWidth = 0.2;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            }
        }

        // Remove particles that are out of the canvas
        if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
            particles.splice(i, 1);
            i--;
        }
    }
}

// Function to animate the generative art
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateParticle();
    moveAndDrawParticles();
    requestAnimationFrame(animate);
}

// Start the animation
animate();


    setInterval(swapLanguage, 3000);
});