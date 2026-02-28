/* ===========================
   TUREKO — MAIN JS
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // CUSTOM CURSOR DOT
  // =====================
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);
  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    dot.style.opacity = '1';
  });
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; });

  // =====================
  // STAT COUNTER
  // =====================
  function animateCounter(el) {
    const target = el.getAttribute('data-target');
    if (!target) return;
    const suffix = target.replace(/[0-9]/g, '');
    const num = parseInt(target);
    const dur = 1800;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * num) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if (statNums.length) {
    const statObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCounter(e.target); statObs.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => statObs.observe(el));
  }


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
  // ADVANCED PARALLAX
  // =====================
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  if (parallaxLayers.length) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed')) || 0;
            // Only apply transform if within top portion of window to save performance
            if (scrollY < window.innerHeight * 1.5) {
              layer.style.transform = `translateY(${scrollY * speed}px)`;
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // =====================
  // SERVICES NAV ACTIVE
  // =====================
  const svcNavLinks = document.querySelectorAll('.svc-nav-link');
  if (svcNavLinks.length) {
    const sections = document.querySelectorAll('.service-category');
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


});
