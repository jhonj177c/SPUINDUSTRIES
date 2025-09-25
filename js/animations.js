// ===== ANIMACIONES AVANZADAS =====

class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupTypingEffect();
        this.setupParticleSystem();
        this.setupGlitchEffect();
        this.setupMorphingEffects();
        this.setup3DEffects();
    }

    // ===== ANIMACIONES DE SCROLL =====
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Elementos a animar
        const elements = document.querySelectorAll('.service-card, .project-card, .value-item, .stat-item, .tech-card, .team-member');
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            observer.observe(el);
        });

        // Configurar animaciones de texto responsive
        this.setupTextAnimations();
    }

    animateElement(element) {
        element.classList.add('animate-fadeInUp');

        // Efecto de ondas
        this.createRippleEffect(element);

        // Efecto especial según el tipo de elemento
        if (element.classList.contains('tech-card')) {
            this.animateTechCard(element);
        } else if (element.classList.contains('team-member')) {
            this.animateTeamMember(element);
        } else if (element.classList.contains('service-card')) {
            this.animateServiceCard(element);
        }
    }

    // ===== EFECTOS HOVER =====
    setupHoverEffects() {
        // Efecto de ondas en botones
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e.target, e);
            });
        });

        // Efecto de tilt en tarjetas
        const cards = document.querySelectorAll('.service-card, .project-card, .tech-card, .team-member');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                this.tiltCard(card, e);
            });

            card.addEventListener('mouseleave', () => {
                this.resetTilt(card);
            });
        });

        // Efecto de brillo en iconos
        const icons = document.querySelectorAll('.service-icon, .tech-icon, .value-icon, .contact-icon');
        icons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                this.glowIcon(icon);
            });

            icon.addEventListener('mouseleave', () => {
                this.resetGlow(icon);
            });
        });
    }

    createRippleEffect(element, event = null) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event ? event.clientX - rect.left - size / 2 : rect.width / 2 - size / 2;
        const y = event ? event.clientY - rect.top - size / 2 : rect.height / 2 - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(0, 212, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    tiltCard(card, event) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
    }

    resetTilt(card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }

    glowIcon(icon) {
        icon.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.6)';
        icon.style.transform = 'scale(1.1)';
    }

    resetGlow(icon) {
        icon.style.boxShadow = 'none';
        icon.style.transform = 'scale(1)';
    }

    // ===== EFECTO DE TECLADO =====
    setupTypingEffect() {
        const codeLines = document.querySelectorAll('.code-line');
        codeLines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            line.style.borderRight = '2px solid #00d4ff';

            setTimeout(() => {
                this.typeText(line, text, () => {
                    if (index === codeLines.length - 1) {
                        line.style.borderRight = 'none';
                    }
                });
            }, index * 500);
        });
    }

    typeText(element, text, callback) {
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i > text.length) {
                clearInterval(timer);
                if (callback) callback();
            }
        }, 50);
    }

    // ===== SISTEMA DE PARTÍCULAS =====
    setupParticleSystem() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Crear partículas de fondo (reducidas)
        for (let i = 0; i < 20; i++) {
            this.createFloatingParticle(hero);
        }

        // Crear partículas al hacer clic
        document.addEventListener('click', (e) => {
            this.createClickParticle(e.clientX, e.clientY);
        });

        // Crear partículas al hacer hover
        const hoverElements = document.querySelectorAll('.btn, .service-card, .tech-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.createHoverParticles(el);
            });
        });
    }

    createFloatingParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';

        const size = Math.random() * 4 + 2;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        const colors = ['#00d4ff', '#00ff88', '#0099ff'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: floatParticle ${duration}s linear infinite;
            animation-delay: ${delay}s;
            opacity: 0.6;
        `;

        container.appendChild(particle);
    }

    createClickParticle(x, y) {
        for (let i = 0; i < 4; i++) {
            const particle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / 8;
            const velocity = Math.random() * 100 + 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            const colors = ['#00d4ff', '#00ff88', '#0099ff'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 6px;
                height: 6px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: clickParticle 1s ease-out forwards;
                --vx: ${vx}px;
                --vy: ${vy}px;
            `;

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    createHoverParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50 + 25;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            const colors = ['#00d4ff', '#00ff88'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: hoverParticle 0.8s ease-out forwards;
            `;

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 800);
        }
    }

    // ===== EFECTO GLITCH =====
    setupGlitchEffect() {
        const title = document.querySelector('.hero-title');
        if (!title) return;

        title.addEventListener('mouseenter', () => {
            this.glitchEffect(title);
        });
    }

    glitchEffect(element) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let iterations = 0;
        const maxIterations = 20;

        const glitchInterval = setInterval(() => {
            element.textContent = element.textContent
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');

            if (iterations >= originalText.length) {
                clearInterval(glitchInterval);
                element.textContent = originalText;
            }

            iterations += 1 / 3;
        }, 50);
    }

    // ===== EFECTOS DE MORFING =====
    setupMorphingEffects() {
        const morphElements = document.querySelectorAll('.service-icon, .tech-icon, .value-icon');

        morphElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.morphElement(element);
            });

            element.addEventListener('mouseleave', () => {
                this.resetMorph(element);
            });
        });
    }

    morphElement(element) {
        element.style.borderRadius = '50%';
        element.style.transform = 'scale(1.2) rotate(180deg)';
        element.style.background = 'linear-gradient(45deg, #00d4ff, #00ff88)';
    }

    resetMorph(element) {
        element.style.borderRadius = '50%';
        element.style.transform = 'scale(1) rotate(0deg)';
        element.style.background = '';
    }

    // ===== EFECTOS 3D =====
    setup3DEffects() {
        const cards3D = document.querySelectorAll('.service-card, .project-card, .tech-card');

        cards3D.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                this.apply3DEffect(card, e);
            });

            card.addEventListener('mouseleave', () => {
                this.reset3DEffect(card);
            });
        });
    }

    apply3DEffect(element, event) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        element.style.boxShadow = `0 ${Math.abs(rotateX)}px ${Math.abs(rotateY)}px rgba(0, 212, 255, 0.15)`;
    }

    reset3DEffect(element) {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        element.style.boxShadow = '';
    }

    // ===== ANIMACIONES ESPECÍFICAS =====
    animateTechCard(card) {
        const icon = card.querySelector('.tech-icon');
        const progressBar = card.querySelector('.progress-bar');

        if (icon) {
            icon.style.animation = 'rotate 1s ease-in-out';
        }

        if (progressBar) {
            const width = progressBar.getAttribute('data-width');
            progressBar.style.width = '0%';
            setTimeout(() => {
                progressBar.style.width = width + '%';
            }, 500);
        }
    }

    animateTeamMember(member) {
        const photo = member.querySelector('.member-photo');
        const socialLinks = member.querySelectorAll('.social-links a');

        if (photo) {
            photo.style.animation = 'bounceIn 0.8s ease';
        }

        socialLinks.forEach((link, index) => {
            setTimeout(() => {
                link.style.animation = 'fadeInUp 0.5s ease';
            }, index * 100);
        });
    }

    animateServiceCard(card) {
        const icon = card.querySelector('.service-icon');
        const features = card.querySelectorAll('.service-features li');

        if (icon) {
            icon.style.animation = 'pulse 1s ease-in-out';
        }

        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.animation = 'slideInLeft 0.5s ease';
            }, index * 100);
        });
    }

    // ===== ANIMACIONES DE TEXTO RESPONSIVE =====
    setupTextAnimations() {
        // Detectar el tamaño de pantalla
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 991 && window.innerWidth > 768;
        const isSmallMobile = window.innerWidth <= 575;
        const isDesktop = window.innerWidth >= 992;

        console.log('📱 Configurando animaciones responsive:', {
            width: window.innerWidth,
            isMobile,
            isTablet,
            isSmallMobile,
            isDesktop
        });

        // Configurar animaciones del título principal
        this.setupHeroTitleAnimation(isMobile, isTablet, isSmallMobile, isDesktop);
        
        // Configurar animación de typing
        this.setupTypingAnimation(isMobile, isTablet, isSmallMobile, isDesktop);
        
        // Configurar animaciones de botones
        this.setupButtonAnimations(isMobile, isTablet, isSmallMobile, isDesktop);
    }

    setupHeroTitleAnimation(isMobile, isTablet, isSmallMobile, isDesktop) {
        const heroTitle = document.querySelector('.hero-title');
        const titleLines = document.querySelectorAll('.title-line');
        
        if (!heroTitle) return;

        // Aplicar animaciones según el dispositivo
        if (isMobile) {
            titleLines.forEach((line, index) => {
                line.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s both`;
            });
        } else if (isTablet) {
            titleLines.forEach((line, index) => {
                line.style.animation = `slideInLeft 0.8s ease-out ${index * 0.2}s both`;
            });
        } else if (isDesktop) {
            // Animación completa para desktop
            titleLines.forEach((line, index) => {
                line.style.animation = `slideInLeft 1s ease-out ${index * 0.3}s both`;
            });
        }
    }

    setupTypingAnimation(isMobile, isTablet, isSmallMobile, isDesktop) {
        // Buscar el elemento con múltiples selectores
        let typingElement = document.querySelector('.typing-animation');
        if (!typingElement) {
            typingElement = document.querySelector('.output-line.typing-animation');
        }
        if (!typingElement) {
            typingElement = document.querySelector('[data-text]');
        }
        
        if (!typingElement) {
            console.log('❌ No se encontró el elemento de typing');
            return;
        }

        const text = typingElement.getAttribute('data-text') || 'Bienvenido a SPU Industries';
        let typingText = typingElement.querySelector('.typing-text');
        
        if (!typingText) {
            // Si no encuentra .typing-text, usar el elemento mismo
            typingText = typingElement;
            console.log('⚠️ Usando el elemento principal como contenedor de texto');
        }

        console.log('✅ Configurando animación de typing:', {
            text,
            isMobile,
            isTablet,
            isSmallMobile,
            isDesktop,
            element: typingElement,
            textElement: typingText
        });

        // Asegurar que el elemento sea visible
        typingElement.style.opacity = '1';
        typingElement.style.display = 'block';

        // Configurar velocidad según el dispositivo
        let speed = 50; // ms por carácter
        let delay = 1000; // ms de retraso inicial

        if (isSmallMobile) {
            speed = 30;
            delay = 600;
        } else if (isMobile) {
            speed = 40;
            delay = 800;
        } else if (isTablet) {
            speed = 45;
            delay = 1000;
        } else if (isDesktop) {
            speed = 50;
            delay = 1800;
        }

        console.log('⚙️ Configuración de typing:', { speed, delay });

        // Limpiar texto existente
        typingText.textContent = '';
        
        // Iniciar animación de typing
        setTimeout(() => {
            console.log('🚀 Iniciando animación de typing...');
            this.typeText(typingText, text, speed);
        }, delay);
    }

    setupButtonAnimations(isMobile, isTablet, isSmallMobile, isDesktop) {
        const buttons = document.querySelectorAll('.hero-buttons .btn');
        
        buttons.forEach((button, index) => {
            let delay = 1500; // ms de retraso base
            
            if (isSmallMobile) {
                delay = 1000 + (index * 100);
            } else if (isMobile) {
                delay = 1200 + (index * 150);
            } else if (isTablet) {
                delay = 1400 + (index * 200);
            } else if (isDesktop) {
                delay = 1800 + (index * 300);
            }

            button.style.animation = `scaleIn 0.6s ease-out ${delay}ms both`;
        });
    }

    // Método mejorado para typing
    typeText(element, text, speed) {
        let i = 0;
        console.log('⌨️ Iniciando typing con texto:', text, 'velocidad:', speed);
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                console.log('✅ Typing completado');
                
                // Iniciar parpadeo del cursor
                const cursor = element.parentElement.querySelector('.typing-cursor');
                if (cursor) {
                    cursor.style.animation = 'blink 0.75s step-end infinite';
                    console.log('👁️ Cursor iniciado');
                }
            }
        }, speed);
    }
}

// ===== CSS DINÁMICO PARA ANIMACIONES =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes clickParticle {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--vx), var(--vy)) scale(0);
            opacity: 0;
        }
    }

    @keyframes hoverParticle {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }

    @keyframes floatParticle {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
        }
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .animate-fadeInUp {
        animation: fadeInUp 0.8s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', () => {
    // Solo inicializar si no hay conflictos
    if (!window.animationControllerInitialized) {
        // Esperar un poco para que se carguen otros scripts
        setTimeout(() => {
            new AnimationController();
            window.animationControllerInitialized = true;
        }, 100);
    }
});

// ===== RESPONSIVE ANIMATIONS =====
// Reconfigurar animaciones cuando cambie el tamaño de ventana
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Solo reconfigurar si ya está inicializado
        if (window.animationControllerInitialized) {
            const controller = new AnimationController();
            controller.setupTextAnimations();
        }
    }, 250);
});

// ===== DETECCIÓN DE DISPOSITIVO =====
function isMobileDevice() {
    return window.innerWidth <= 768;
}

function isTabletDevice() {
    return window.innerWidth <= 991 && window.innerWidth > 768;
}

function isSmallMobileDevice() {
    return window.innerWidth <= 575;
}

// ===== OPTIMIZACIONES DE RENDIMIENTO =====
// Reducir animaciones en dispositivos de bajo rendimiento
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
    document.documentElement.style.setProperty('--transition-duration', '0.2s');
}

// Desactivar animaciones si el usuario prefiere movimiento reducido
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01s');
    document.documentElement.style.setProperty('--transition-duration', '0.01s');
}

