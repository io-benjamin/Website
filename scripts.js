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
    const readMoreLinks = document.querySelectorAll('.read-more');

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

    setInterval(swapLanguage, 3000);
});