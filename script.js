const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    menuToggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
    siteNav.classList.toggle('is-open', !open);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
      siteNav.classList.remove('is-open');
      const openDetails = siteNav.querySelector('.nav-more[open]');
      if (openDetails) openDetails.removeAttribute('open');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
      siteNav.classList.remove('is-open');
      menuToggle.focus();
    }
  });
}

const contactForm = document.querySelector('#whatsapp-form');
const formStatus = document.querySelector('#form-status');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const data = new FormData(contactForm);
    const lines = [
      'Olá! Quero falar com o Cores do Vento.',
      `Nome: ${String(data.get('name') || '').trim()}`,
      `Meu WhatsApp: ${String(data.get('phone') || '').trim()}`,
      `Assunto: ${String(data.get('interest') || '').trim()}`,
    ];
    const message = String(data.get('message') || '').trim();
    if (message) lines.push(`Mensagem: ${message}`);

    const url = `https://wa.me/5571996963779?text=${encodeURIComponent(lines.join('\n'))}`;
    if (formStatus) {
      formStatus.textContent = 'A mensagem está pronta para continuar no WhatsApp. Revise e toque em enviar por lá; a equipe só receberá seu contato quando você confirmar o envio.';
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

const floatingWhatsapp = document.querySelector('.floating-whatsapp');
const audienceBar = document.querySelector('.audience-bar');
const contactSection = document.querySelector('#contato');
if (floatingWhatsapp && audienceBar && contactSection) {
  const updateFloatingWhatsapp = () => {
    const passedAudienceBar = audienceBar.getBoundingClientRect().bottom < 0;
    const contactRect = contactSection.getBoundingClientRect();
    const contactIsVisible = contactRect.top < window.innerHeight && contactRect.bottom > 0;
    floatingWhatsapp.classList.toggle('is-hidden', !passedAudienceBar || contactIsVisible);
  };
  window.addEventListener('scroll', updateFloatingWhatsapp, { passive: true });
  window.addEventListener('resize', updateFloatingWhatsapp);
  updateFloatingWhatsapp();
}

const year = document.querySelector('#current-year');
if (year) year.textContent = String(new Date().getFullYear());
