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
});
