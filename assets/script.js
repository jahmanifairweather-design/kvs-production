const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuBtn && mobileMenu) {
  const setMenuOpen = (open, returnFocus = false) => {
    mobileMenu.classList.toggle('open', open);
    mobileMenu.inert = !open;
    mobileMenu.setAttribute('aria-hidden', String(!open));
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Close' : 'Menu';
    document.body.classList.toggle('menu-open', open);
    if (open) mobileMenu.querySelector('a')?.focus();
    else if (returnFocus) menuBtn.focus();
  };
  menuBtn.addEventListener('click', () => setMenuOpen(!mobileMenu.classList.contains('open')));
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });
  document.addEventListener('keydown', event => {
    if (!mobileMenu.classList.contains('open')) return;
    if (event.key === 'Escape') setMenuOpen(false, true);
    if (event.key === 'Tab') {
      const controls = [menuBtn, ...mobileMenu.querySelectorAll('a')];
      const index = controls.indexOf(document.activeElement);
      event.preventDefault();
      controls[(index + (event.shiftKey ? -1 : 1) + controls.length) % controls.length].focus();
    }
  });
  window.matchMedia('(max-width: 1200px)').addEventListener('change', () => setMenuOpen(false));
  setMenuOpen(false);
  document.documentElement.classList.add('enhanced-menu');
}

const header = document.querySelector('.kvs-header');
let lastScroll = window.scrollY;
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (!header) return;
  header.classList.toggle('nav-compact', currentScroll > 80);
  const keepVisible = header.contains(document.activeElement) || mobileMenu?.classList.contains('open');
  header.classList.toggle('nav-hidden', !keepVisible && currentScroll > lastScroll && currentScroll > 120);
  lastScroll = Math.max(currentScroll, 0);
}, { passive: true });
