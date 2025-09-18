// ===== FUNCIONALIDADES PRINCIPALES MEJORADAS =====

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initNavigation();
    initEnhancedNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
    initCounters();
    initParallax();
    initCursor();
    initTechProgress();
    initTeamEffects();
    initParticleSystem();
    initKeyboardEffects();
});

// ===== NAVEGACIÓN MEJORADA =====
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Debug: verificar que los elementos existen
    console.log('Elementos de navegación encontrados:');
    console.log('navToggle:', navToggle);
    console.log('navMenu:', navMenu);
    console.log('navLinks:', navLinks.length);
    console.log('navbar:', navbar);

    // Toggle del menú móvil
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Scroll suave para enlaces internos y cerrar menú móvil
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Debug: verificar que el enlace funciona
            console.log('Navegando a:', link.getAttribute('href'));
            
            // Cerrar menú móvil si está abierto
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
            
            // Obtener el target
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            console.log('Sección encontrada:', targetSection);
            
            if (targetSection) {
                // Calcular offset para el navbar fijo
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                console.log('Posición objetivo:', targetPosition);
                
                // Scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar enlace activo después del scroll
                setTimeout(() => {
                    updateActiveNavLink();
                }, 100);
            } else {
                console.error('No se encontró la sección:', targetId);
            }
        });
    });

    // Cambiar navbar al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Actualizar enlace activo según scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== MEJORAS DE NAVEGACIÓN =====
function initEnhancedNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efecto de ripple en los enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(0, 212, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 0;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== EFECTOS DE SCROLL MEJORADOS =====
function initScrollEffects() {
    // Scroll reveal para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                
                // Efecto especial para tarjetas de tecnología
                if (entry.target.classList.contains('tech-card')) {
                    animateTechProgress(entry.target);
                }
                
                // Efecto especial para miembros del equipo
                if (entry.target.classList.contains('team-member')) {
                    animateTeamMember(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observar elementos
    const elementsToAnimate = document.querySelectorAll('.service-card, .project-card, .value-item, .stat-item, .contact-item, .tech-card, .team-member');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// ===== ANIMACIONES MEJORADAS =====
function initAnimations() {
    // Animación de botones con efecto ripple
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRippleEffect(e.target, e);
        });
    });

    // Efecto de tilt en tarjetas
    const cards = document.querySelectorAll('.service-card, .project-card, .tech-card, .team-member');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            tiltCard(card, e);
        });
        
        card.addEventListener('mouseleave', () => {
            resetTilt(card);
        });
    });

    // Animación de iconos
    const icons = document.querySelectorAll('.service-icon, .tech-icon, .value-icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotate(360deg) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotate(0deg) scale(1)';
        });
    });
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

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

function tiltCard(card, event) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
}

function resetTilt(card) {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
}

// ===== PROGRESO DE TECNOLOGÍAS =====
function initTechProgress() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBar(entry.target);
                progressObserver.unobserve(entry.target);
            }
        });
    });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

function animateProgressBar(bar) {
    const width = bar.getAttribute('data-width');
    bar.style.width = '0%';
    
    setTimeout(() => {
        bar.style.width = width + '%';
    }, 500);
}

function animateTechProgress(card) {
    const progressBar = card.querySelector('.progress-bar');
    if (progressBar) {
        animateProgressBar(progressBar);
    }
}

// ===== EFECTOS DEL EQUIPO =====
function initTeamEffects() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            // Efecto de brillo
            member.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.5)';
            
            // Animar iconos sociales
            const socialLinks = member.querySelectorAll('.social-links a');
            socialLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.style.transform = 'scale(1.2) rotate(360deg)';
                }, index * 100);
            });
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.boxShadow = 'none';
            
            const socialLinks = member.querySelectorAll('.social-links a');
            socialLinks.forEach(link => {
                link.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    });
}

function animateTeamMember(member) {
    // Efecto de entrada especial para miembros del equipo
    member.style.opacity = '0';
    member.style.transform = 'translateY(50px) rotateX(20deg)';
    
    setTimeout(() => {
        member.style.transition = 'all 0.8s ease';
        member.style.opacity = '1';
        member.style.transform = 'translateY(0) rotateX(0deg)';
    }, 200);
}

// ===== SISTEMA DE PARTÍCULAS MEJORADO =====
function initParticleSystem() {
    // Crear partículas de fondo
    createBackgroundParticles();
    
    // Crear partículas al hacer clic
    document.addEventListener('click', (e) => {
        createClickParticles(e.clientX, e.clientY);
    });
    
    // Crear partículas al hacer hover en elementos especiales
    const specialElements = document.querySelectorAll('.btn, .service-card, .tech-card');
    specialElements.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            createHoverParticles(e.target);
        });
    });
}

function createBackgroundParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 30; i++) {
        createFloatingParticle(hero);
    }
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    const colors = ['#00d4ff', '#00ff88', '#0099ff'];

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
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

function createClickParticles(x, y) {
    for (let i = 0; i < 8; i++) {
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

function createHoverParticles(element) {
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

        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
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

// ===== EFECTOS DE TECLADO =====
function initKeyboardEffects() {
    document.addEventListener('keydown', (e) => {
        // Efecto de partículas al presionar teclas
        if (e.key === ' ') {
            createClickParticles(window.innerWidth / 2, window.innerHeight / 2);
        }
        
        // Efecto de ondas al presionar Enter
        if (e.key === 'Enter') {
            createWaveEffect();
        }
        
        // Efecto de brillo al presionar Escape
        if (e.key === 'Escape') {
            createGlowEffect();
        }
    });
}

function createWaveEffect() {
    const wave = document.createElement('div');
    wave.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border: 2px solid #00d4ff;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
        animation: waveExpand 1s ease-out;
    `;
    
    document.body.appendChild(wave);
    
    setTimeout(() => {
        wave.remove();
    }, 1000);
}

function createGlowEffect() {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9998;
        animation: glowPulse 0.5s ease-out;
    `;
    
    document.body.appendChild(glow);
    
    setTimeout(() => {
        glow.remove();
    }, 500);
}

// ===== FORMULARIO DE CONTACTO MEJORADO =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validar datos
            if (validateForm(data)) {
                // Efecto de éxito
                showNotification('¡Mensaje enviado correctamente!', 'success');
                form.reset();
                
                // Efecto de partículas
                createClickParticles(window.innerWidth / 2, window.innerHeight / 2);
            } else {
                showNotification('Por favor, completa todos los campos correctamente', 'error');
            }
        });
        
        // Efectos en campos del formulario
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'scale(1.02)';
                input.parentElement.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.style.transform = 'scale(1)';
                input.parentElement.style.boxShadow = 'none';
            });
        });
    }
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    
    if (!data.nombre || data.nombre.trim().length < 2) return false;
    if (!data.email || !emailRegex.test(data.email)) return false;
    if (!data.telefono || !phoneRegex.test(data.telefono)) return false;
    if (!data.mensaje || data.mensaje.trim().length < 10) return false;
    
    return true;
}

function showNotification(message, type) {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#00ff88' : '#ff4444'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== CONTADORES ANIMADOS MEJORADOS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
            
            // Efecto especial al completar
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ===== EFECTOS DE PARALLAX MEJORADOS =====
function initParallax() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// ===== CURSOR PERSONALIZADO MEJORADO =====
function initCursor() {
    const cursor = document.querySelector('.custom-cursor');
    
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Efectos hover
        const hoverElements = document.querySelectorAll('a, button, .service-card, .project-card, .tech-card, .team-member');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursor.style.transform = 'scale(2)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursor.style.transform = 'scale(1)';
            });
        });
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

    @keyframes waveExpand {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }

    @keyframes glowPulse {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(100%);
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
