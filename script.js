document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELETOR DE MODO ESCURO (DARK MODE) ---
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Verifica preferência anterior no navegador
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.className = 'fa-solid fa-sun';
        } else {
            icon.className = 'fa-solid fa-moon';
        }
    }

    // --- 2. MENU RESPONSIVO MOBILE ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isOpened = navMenu.classList.contains('active');
        mobileMenuBtn.querySelector('i').className = isOpened ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    // Fecha o menu ao clicar em qualquer link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    // --- 3. CONTROLE DE ABAS INTERATIVAS ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            button.classList.add('active');
            const targetTab = button.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // --- 4. ANIMAÇÃO DE SCROLL (REVEAL) ---
    const scrollElements = document.querySelectorAll('.scroll-animate');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add('show');
        // Se for a seção de dados, inicia o contador numérico
        if(element.id === 'dados') {
            animateNumbers();
        }
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => { 
        handleScrollAnimation();
    });
    
    // Gatilho inicial caso elementos já estejam na tela
    handleScrollAnimation();

    // --- 5. CONTADOR NUMÉRICO ANIMADO ---
    let statsAnimated = false;
    function animateNumbers() {
        if (statsAnimated) return; // Roda apenas uma vez
        statsAnimated = true;

        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 40; // Quanto menor, mais rápido
            
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = Math.ceil(target / speed);

                if (count < target) {
                    counter.innerText = count + inc > target ? target : count + inc;
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // --- 6. VALIDAÇÃO DE FORMULÁRIO ---
    const form = document.getElementById('agro-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();

        if (nome === "" || email === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Exibe mensagem de sucesso estruturada
        formMessage.innerHTML = `<i class="fa-solid fa-circle-check"></i> Perfeito, <strong>${nome}</strong>! Sua conexão com a agroecologia foi iniciada. Enviamos um guia rápido para <em>${email}</em>.`;
        formMessage.className = "success";
        
        form.reset();
    });
});