(function(){
  // 1. SCROLL REVEAL ANIMATIONS
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if(entry.isIntersecting){
        setTimeout(() => {
          entry.target.classList.add('in');
        }, (idx % 4) * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // 2. HEADER SCROLL EFFECT
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    });
  }

  // 3. CURSOR GLOW FOLLOW
  const glow = document.getElementById('cursor-glow');
  if (glow) {
    let mx = window.innerWidth/2, my = window.innerHeight/2;
    let gx = mx, gy = my;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    function renderGlow(){
      gx += (mx - gx) * 0.1; gy += (my - gy) * 0.1;
      glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderGlow);
    }
    renderGlow();
  }

  // 4. 3D CARD TILT ANIMATION
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      card.style.transform = `rotateY(${x / 18}deg) rotateX(${-y / 18}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0px)';
    });
  });

  // 5. GOLD PARTICLES CANVAS
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = document.documentElement.scrollHeight;
    let particles = [];

    function initParticles(){
      particles = [];
      const count = Math.min(80, Math.floor(w / 16));
      for(let i = 0; i < count; i++){
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.5,
          vy: -(Math.random() * 0.25 + 0.05),
          o: Math.random() * 0.5 + 0.2
        });
      }
    }

    function drawParticles(){
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.y += p.vy;
        if(p.y < 0) { p.y = h; p.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.o})`;
        ctx.fill();
      });
      requestAnimationFrame(drawParticles);
    }

    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = document.documentElement.scrollHeight;
      initParticles();
    });

    initParticles();
    drawParticles();
  }
})();