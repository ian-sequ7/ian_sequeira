// navbar scroll script
const header = document.querySelector('.navbar');
window.onscroll = function() {
    const top = window.scrollY;
    if(top >=100) {
        header.classList.add('navbarDark');
    }
    else {
        header.classList.remove('navbarDark');
    }
}

// Collapse navbar after click on small devices
const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('navbarSupportedContent')
navLinks.forEach((l) => {
    l.addEventListener('click', () => { new bootstrap.Collapse(menuToggle).toggle() })
})

// Typing animation
document.addEventListener('DOMContentLoaded', function() {
    // Start typing animation
    const textElement = document.getElementById('typed-text');
    const cursorElement = document.querySelector('.cursor');
    const textToType = "Ian Sequeira";
    let i = 0;

    function typeWriter() {
        if (i < textToType.length) {
            textElement.textContent += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, 150); // Adjust typing speed here
        } else {
            // Add a CSS class to start the subtitle animations after typing
            const heroContent = document.querySelector('.hero-content');
            heroContent.classList.add('typing-completed');
        }
    }

    setTimeout(() => {
        typeWriter();
    }, 1000); // Delay before typing start
    
    // PARTICLE CREATIONNNN
    createParticles();
});

// Create the absolutely lit particle animation
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const numberOfParticles = 50;
    
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random sizing for the balls
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random positioning betwixted the spheres
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random animation duration between 15s and 30s
        const duration = Math.random() * 15 + 15;
        particle.style.animationDuration = `${duration}s`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        // Random movement direction
        const moveX = Math.random() * 200 - 100; // -100px to 100px
        const moveY = Math.random() * 200 - 100; // -100px to 100px
        particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        
        particlesContainer.appendChild(particle);
    }
}

// Smooth scroll for the "scroll down" button
document.addEventListener('DOMContentLoaded', function() {
    const scrollDownBtn = document.querySelector('.scroll-down');
    
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.querySelector('#about');
            
            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Initialize portfolio filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(filterBtn => {
                filterBtn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});
// The formspree API that should handle all messaging on the site
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    form.addEventListener('submit', handleSubmit);
    
    async function handleSubmit(event) {
        event.preventDefault();
        
        const data = new FormData(form);
        
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                form.reset();
                formStatus.style.display = 'block';
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                
                // Time Success message out
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                // Error - uh oh
                const responseData = await response.json();
                throw new Error(responseData.error || 'Form submission failed');
            }
        } catch (error) {
            formStatus.style.display = 'block';
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            console.error('Error:', error);
        }
    }
});