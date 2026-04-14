// Time-based browser tab title
(function() {
  var hour = new Date().getHours();
  var greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  document.title = greeting + ' · Ian Sequeira';
})();

// Console Easter egg
console.log('%cHey, curious one.', 'font-size: 14px; font-weight: bold; color: #7A1F2E;');
console.log('%cCogito, ergo sum, semper evolvens.', 'font-size: 12px; font-style: italic; color: #888;');

// All DOM-ready logic in one listener
document.addEventListener('DOMContentLoaded', function() {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function() {
      var isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll fade-in
  var fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fadeEls.forEach(function(el) { el.classList.add('visible'); });
    } else {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      fadeEls.forEach(function(el) { observer.observe(el); });
    }
  }

  // Contact form (Formspree)
  var form = document.getElementById('contactForm');
  if (form) {
    var successMsg = document.getElementById('success-message');
    var errorMsg = document.getElementById('error-message');

    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      try {
        var response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.reset();
          successMsg.style.display = 'block';
          errorMsg.style.display = 'none';
          setTimeout(function() { successMsg.style.display = 'none'; }, 5000);
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        errorMsg.style.display = 'block';
        successMsg.style.display = 'none';
      }
    });
  }
});
