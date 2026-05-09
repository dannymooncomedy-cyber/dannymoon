/* ============================================
   Danny Moon - dannymoon.com
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Shared Navigation --- */
  buildNav();

  /* --- Theme Toggle --- */
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('dm-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('dm-theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  /* --- Mobile Hamburger --- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  /* --- Hero Slideshow --- */
  const slides = document.querySelectorAll('.hero-slideshow img');
  if (slides.length > 0) {
    let currentSlide = 0;
    slides[0].classList.add('active');

    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 4000);
  }

  /* --- Navbar Scroll Effect --- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = 'var(--shadow)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }

  /* --- Scroll Reveal Animation --- */
  const revealElements = document.querySelectorAll('.section');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });

  /* --- Brevo Contact Form Submission --- */
  const brevoForms = document.querySelectorAll('.brevo-form');
  
  // NOTE: This placeholder assumes an environment variable substitution during deployment (e.g., CI/CD).
  // If no build step exists, this string will need to be replaced manually or loaded from a server.
  // Example for simple build replacement:
  const BREVO_API_KEY = "YOUR_BREVO_API_KEY_HERE"; 

  brevoForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const statusDiv = form.querySelector('.form-status');
      
      const formData = new FormData(form);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || 'N/A';
      const message = formData.get('message') || '';
      const source = form.getAttribute('data-source') || 'Unknown Form';
      
      const subject = `New Lead Request - ${source}`;
      const htmlContent = `
        <h2>New Lead from ${source}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
      `;

      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      statusDiv.className = 'form-status';
      statusDiv.style.display = 'none';

      try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY
          },
          body: JSON.stringify({
            sender: { email: "updates@system.dannymoonkid.com", name: "Danny Moon System" },
            to: [{ email: "dannymoon.comedy@gmail.com", name: "Danny Moon" }],
            subject: subject,
            replyTo: { email: email, name: name },
            htmlContent: htmlContent
          })
        });

        if (!response.ok) {
          throw new Error('Failed to send message.');
        }

        form.reset();
        statusDiv.textContent = 'Message sent successfully!';
        statusDiv.classList.add('success');
      } catch (err) {
        console.error(err);
        statusDiv.textContent = 'Error sending message. Please try again.';
        statusDiv.classList.add('error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        statusDiv.style.display = 'block';
        
        // Hide success message after 5 seconds
        if(statusDiv.classList.contains('success')) {
            setTimeout(() => {
                statusDiv.style.display = 'none';
                statusDiv.classList.remove('success');
            }, 5000);
        }
      }
    });
  });

});

/* --- Shared Navigation Builder --- */
function buildNav() {
  var placeholder = document.getElementById('main-nav');
  if (!placeholder) return;

  var page = location.pathname.split('/').pop() || 'index.html';
  var isHome = (page === 'index.html' || page === '');

  var links = [
    { href: 'index.html',    label: 'Home' },
    { href: 'pricing.html',  label: 'Services & Pricing' },
    { href: 'contact.html',  label: 'Contact' }
  ];

  var linkItems = links.map(function(l) {
    var active = '';
    if (l.href === page) active = ' class="active"';
    if (page === '' && l.href === 'index.html') active = ' class="active"';
    return '<li><a href="' + l.href + '"' + active + '>' + l.label + '</a></li>';
  }).join('\n        ');

  placeholder.className = 'navbar';
  placeholder.innerHTML =
    '<div class="container">' +
      '<a href="index.html" class="nav-logo">DANNY <span>MOON</span></a>' +
      '<ul class="nav-links" id="nav-links">' +
        linkItems +
      '</ul>' +
      '<div style="display:flex;align-items:center;gap:12px;">' +
        '<button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme"></button>' +
        '<button class="hamburger" id="hamburger" aria-label="Menu">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</div>' +
    '</div>';
}
