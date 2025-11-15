// script.js — simple parallax + small UI helpers
document.getElementById('year').textContent = new Date().getFullYear();

(function(){
  const layers = Array.from(document.querySelectorAll('.parallax-layer'));
  function onScroll(){
    const sc = window.scrollY;
    layers.forEach(layer=>{
      const speed = parseFloat(layer.dataset.speed) || 0;
      const y = sc * speed;
      layer.style.transform = `translate3d(0, ${y}px, 0)`;
    });
  }
  // small reveal animations
  function onLoad(){
    requestAnimationFrame(onScroll);
    document.querySelectorAll('.card, .person, .gallery img').forEach((el, i)=>{
      el.style.transition = 'transform 700ms cubic-bezier(.2,.8,.2,1), opacity 600ms';
      el.style.transform = 'translateY(18px)';
      el.style.opacity = '0';
      setTimeout(()=>{ el.style.transform='translateY(0)'; el.style.opacity='1' }, 120 + i*100);
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('load', onLoad);
  // basic mobile fix: parallax via background-position for mobile
  const mq = window.matchMedia('(max-width:600px)');
  mq.addListener(()=>{ if(mq.matches){ layers.forEach(l=> l.style.willChange='auto'); }});
})();
