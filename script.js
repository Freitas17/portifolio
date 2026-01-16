// 1. LÓGICA DO MENU MOBILE
const mobileMenuBtn = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    // Alterna a classe 'active' que criamos no CSS
    navMenu.classList.toggle('active');
});

// Fechar o menu automaticamente ao clicar em um link (boa prática de UX)
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// 2. ANIMAÇÃO AO SCROLLAR (Intersection Observer)
// Isso faz os cards aparecerem suavemente quando entram na tela
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1 // Ativa quando 10% do elemento estiver visível
});

// Seleciona todos os elementos que queremos animar
const elementsToAnimate = document.querySelectorAll('.scroll-reveal');
elementsToAnimate.forEach(el => observer.observe(el));

// 3. EFEITO DE DIGITAÇÃO (TYPEWRITER)
const textElement = document.getElementById('typing-text');
const phrases = [
    'Sites Responsivos.', 
    'Sistemas Web.', 
    'Soluções Digitais.',
    'Experiências Únicas.'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    // Controla se está escrevendo ou apagando
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    // Velocidade da digitação
    let typeSpeed = isDeleting ? 50 : 100;

    // Lógica de paradas
    if (!isDeleting && charIndex === currentPhrase.length) {
        // Terminou de escrever a frase inteira, espera 2s
        typeSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Terminou de apagar tudo, passa para a próxima frase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Inicia o efeito assim que a página carregar
document.addEventListener('DOMContentLoaded', typeEffect);