(() => {
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  const stars = [];
  const STAR_COUNT = Math.floor((w * h) / 12000);

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function init() {
    stars.length = 0;
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.3, 1.6),
        alpha: rand(0.2, 1),
        dr: rand(0.0005, 0.003)
      });
    }
  }

  function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    init();
  }
  addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (const s of stars) {
      s.alpha += s.dr;
      if (s.alpha <= 0.2 || s.alpha >= 1) s.dr *= -1;
      ctx.beginPath();
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = 'white';
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  init();
  draw();

  const btn = document.getElementById('surpriseBtn');
  const modal = document.getElementById('modal');
  const close = document.getElementById('closeBtn');
  const audio = document.getElementById('bgMusic');

  function openSurprise() {
    modal.classList.remove('hidden');
    audio.play().catch(e => console.warn('audio play prevented', e));
  }

  function closeSurprise() {
    modal.classList.add('hidden');
    audio.pause();
    audio.currentTime = 0;
  }

  btn.addEventListener('click', openSurprise);
  close.addEventListener('click', closeSurprise);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSurprise();
  });
})();
