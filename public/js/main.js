/* ===========================
   TUREKO — MAIN JS
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // INTRO OVERLAY
  // =====================
  const overlay = document.getElementById('intro-overlay');
  if (overlay) {
    const seen = sessionStorage.getItem('tureko_intro_seen');
    if (seen) {
      overlay.classList.add('hidden');
      overlay.style.display = 'none';
    } else {
      sessionStorage.setItem('tureko_intro_seen', '1');
      setTimeout(() => {
        overlay.classList.add('hidden');
        setTimeout(() => { overlay.style.display = 'none'; }, 700);
      }, 3000);
    }
  }

  // =====================
  // NAVBAR SCROLL
  // =====================
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // =====================
  // ACTIVE NAV LINK
  // =====================
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (href !== '/' && path.startsWith(href))) {
      link.classList.add('active');
    }
  });

  // =====================
  // MOBILE NAV TOGGLE
  // =====================
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // =====================
  // NAV USER DROPDOWN TOGGLE
  // =====================
  const navUserBtn = document.getElementById('navUserBtn');
  const navUserDropdown = document.getElementById('navUserDropdown');

  if (navUserBtn && navUserDropdown) {
    navUserBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      navUserDropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!navUserDropdown.contains(e.target) && !navUserBtn.contains(e.target)) {
        navUserDropdown.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') navUserDropdown.classList.remove('open');
    });
  }

  // =====================
  // REVEAL ON SCROLL
  // =====================
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  // =====================
  // SERVICES NAV HORIZONTAL SCROLL
  // =====================
  const leftBtn = document.querySelector('.left-scroll-btn');
  const rightBtn = document.querySelector('.right-scroll-btn');
  const navWrapper = document.querySelector('.nav-links-wrapper');

  if (leftBtn && rightBtn && navWrapper) {
    leftBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navWrapper.scrollBy({ left: -250, behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navWrapper.scrollBy({ left: 250, behavior: 'smooth' });
    });
  }

  // =====================
  // SERVICES NAV ACTIVE
  // =====================
  const svcNavLinks = document.querySelectorAll('.svc-nav-link, .premium-svc-link');
  if (svcNavLinks.length) {
    const sections = document.querySelectorAll('.service-category, .premium-service-category');
    const svcObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          svcNavLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.2, rootMargin: '-80px 0px -60% 0px' });
    sections.forEach(s => svcObserver.observe(s));

    // Smooth scroll
    svcNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          const offset = 140;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  // =====================
  // SUSTAINABILITY EXPERIENCE TOGGLE
  // =====================
  const expYes = document.getElementById('expYes');
  const expNo = document.getElementById('expNo');
  const expGroup = document.getElementById('sustainExplanationGroup');
  if (expYes && expNo && expGroup) {
    function toggleExp() {
      expGroup.style.display = expYes.checked ? 'flex' : 'none';
    }
    expYes.addEventListener('change', toggleExp);
    expNo.addEventListener('change', toggleExp);
    toggleExp();
  }

  // =====================
  // FILE UPLOAD UI
  // =====================
  const resumeInput = document.getElementById('resume');
  const fileLabel = document.getElementById('fileLabel');
  const fileInfo = document.getElementById('fileInfo');
  const fileWrapper = document.getElementById('fileUploadWrapper');
  if (resumeInput) {
    resumeInput.addEventListener('change', () => {
      const file = resumeInput.files[0];
      if (file) {
        if (file.type !== 'application/pdf') {
          showFileError('Only PDF files are accepted.');
          resumeInput.value = '';
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          showFileError('File size exceeds 2MB limit.');
          resumeInput.value = '';
          return;
        }
        if (fileLabel) fileLabel.textContent = file.name;
        if (fileInfo) {
          fileInfo.style.display = 'block';
          fileInfo.textContent = `✓ ${file.name} (${(file.size / 1024).toFixed(0)} KB)`;
        }
        if (fileWrapper) fileWrapper.style.borderColor = 'var(--green)';
      }
    });
  }

  function showFileError(msg) {
    if (fileInfo) {
      fileInfo.style.display = 'block';
      fileInfo.style.background = '#fff3f3';
      fileInfo.style.color = '#c62828';
      fileInfo.textContent = msg;
    }
    if (fileWrapper) fileWrapper.style.borderColor = '#e53935';
  }

  // =====================
  // FORM SUBMIT LOADER
  // =====================
  ['quoteForm', 'careersForm'].forEach(id => {
    const form = document.getElementById(id);
    if (form) {
      form.addEventListener('submit', () => {
        const btn = form.querySelector('.btn-submit');
        if (btn) {
          const span = btn.querySelector('span');
          const loader = btn.querySelector('.btn-loader');
          if (span) span.textContent = 'Submitting…';
          if (loader) loader.style.display = 'block';
          btn.disabled = true;
        }
      });
    }
  });

  // =====================
  // SMOOTH SCROLL ANCHORS
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 120;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // =====================
  // SERVICES TOGGLE (QUOTE PAGE)
  // =====================
  const servicesGrid = document.getElementById('servicesGrid');
  const servicesToggle = document.getElementById('servicesToggle');
  const toggleLabel = document.getElementById('toggleLabel');
  const toggleIcon = document.getElementById('toggleIcon');

  if (servicesGrid && servicesToggle) {
    servicesToggle.addEventListener('click', () => {
      const isExpanded = servicesGrid.classList.contains('expanded');
      servicesGrid.classList.toggle('expanded');
      servicesToggle.classList.toggle('expanded');
      toggleLabel.textContent = isExpanded ? 'View All Services' : 'View Less';
    });
  }

  // =====================
  // BACK TO TOP BUTTON
  // =====================
  const backToTopBtn = document.getElementById('backToTop');
  const progressFill = document.querySelector('.back-to-top-fill');

  if (backToTopBtn) {
    const circumference = 2 * Math.PI * 20; // r = 20

    function updateBackToTop() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

      // Show / hide
      if (scrollTop > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }

      // Update progress ring
      if (progressFill) {
        const offset = circumference - (scrollPercent * circumference);
        progressFill.style.strokeDashoffset = offset;
      }
    }

    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop();

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


});
