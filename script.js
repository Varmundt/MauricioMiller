    /* ALTERNÂNCIA DE TEMA CLARO / ESCURO*/
    const themeBtn = document.getElementById('theme-toggle');
    const htmlEl   = document.documentElement;
    let isDark = false;

    themeBtn.addEventListener('click', () => {
      isDark = !isDark;
      htmlEl.setAttribute('data-theme', isDark ? 'dark' : '');
      themeBtn.textContent = isDark ? '◑ Tema' : '◐ Tema';
    });

    /* MENU HAMBURGER RESPONSIVO (mobile)*/
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    function closeMobileMenu() {
      mobileMenu.classList.remove('open');
    }

    /* VALIDAÇÃO DO FORMULÁRIO DE CONTATO
       Verifica nome, e-mail com regex e mensagem antes de simular o envio */
    const form       = document.getElementById('contact-form');
    const modal      = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');

    /**
     * Valida o formato de e-mail usando regex.
     * MODELO: alguma-coisa@dominio.extensao
     * @param {string} email - endereço a ser validado
     * @returns {boolean} true se o formato for válido
     */
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * Exibe ou oculta a mensagem de erro de um campo.
     * @param {string} errorId - ID do <span> de erro
     * @param {boolean} show   - true para exibir, false para ocultar
     */
    function toggleError(errorId, show) {
      const el = document.getElementById(errorId);
      if (show) el.classList.add('show');
      else      el.classList.remove('show');
    }

    // previne o comportamento padrão e valida campos
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome     = document.getElementById('nome').value.trim();
      const email    = document.getElementById('email').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();
      let valid = true;
      // Valida campo nome
      if (!nome) { toggleError('erro-nome', true);  valid = false; }
      else          toggleError('erro-nome', false);
      // Valida campo e-mail (preenchido + formato)
      if (!email || !isValidEmail(email)) { toggleError('erro-email', true);  valid = false; }
      else                                   toggleError('erro-email', false);
      // Valida campo mensagem
      if (!mensagem) { toggleError('erro-mensagem', true);  valid = false; }
      else              toggleError('erro-mensagem', false);
      // Se válido: limpa formulário e abre modal de confirmação
      if (valid) {
        form.reset();
        modal.classList.add('open');
      }
    });
    // Fecha o modal ao clicar no botão "Fechar"
    modalClose.addEventListener('click', () => modal.classList.remove('open'));
    // Fecha o modal ao clicar fora da caixa de diálogo
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });

    /* ANIMAÇÃO DE ENTRADA POR SCROLL */
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const fill = entry.target.querySelector('.lang-fill');
          if (fill) fill.style.width = fill.getAttribute('data-width') + '%';
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.style.color = link.getAttribute('href') === `#${id}`
              ? 'var(--text)'
              : 'var(--muted)';
          });
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(sec => spyObserver.observe(sec));