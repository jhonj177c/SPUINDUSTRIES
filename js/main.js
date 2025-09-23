// ===== FUNCIONALIDADES PRINCIPALES MEJORADAS =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando...');
    
    // Inicializar navegación primero
    initNavigation();
    initSmoothNavigation();
    
    // Inicializar otras funcionalidades
    initEnhancedNavigation();
    initScrollEffects();
    // initAnimations(); // COMENTADO - se maneja en animations.js
    initContactForm();
    initCounters();
    initParallax();
    initCursor();
    initTechProgress();
    initTeamEffects();
    // initParticleSystem(); // COMENTADO - se maneja en animations.js
    initKeyboardEffects();
    initProgrammerEffects();
    initCodeDemo();
    initWelcomeTerminal();
    
    // Inicializar animaciones después de un pequeño delay
    setTimeout(() => {
        initDelayedAnimations();
    }, 100);
    
    console.log('Inicialización completada');
});

// ===== NAVEGACIÓN MEJORADA =====
function initNavigation() {
    console.log('=== INICIANDO NAVEGACIÓN ===');
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    console.log('navToggle encontrado:', !!navToggle);
    console.log('navMenu encontrado:', !!navMenu);
    
    if (!navToggle || !navMenu) {
        console.error('ERROR: Elementos del menú no encontrados');
        return;
    }
    
    // Función para abrir/cerrar menú
    function toggleMenu() {
        console.log('🔥 CLICK EN BOTÓN HAMBURGUESA');
        
        // Toggle de clases
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevenir scroll
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            console.log('✅ Menú ABIERTO');
        } else {
            document.body.style.overflow = '';
            console.log('❌ Menú CERRADO');
        }
    }
    
    // Función para cerrar menú
    function closeMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listener principal
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Cerrar menú al hacer clic en enlaces
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    console.log('✅ Navegación configurada correctamente');
}

// ===== NAVEGACIÓN SUAVE =====
function initSmoothNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Cerrar menú móvil si está abierto
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Obtener el target
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calcular offset para el navbar fijo
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                // Scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar enlace activo después del scroll
                setTimeout(() => {
                    updateActiveNavLink();
                }, 100);
            }
        });
    });

    // Cambiar navbar al hacer scroll
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
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
    const elementsToAnimate = document.querySelectorAll('.service-card, .project-card, .value-item, .stat-item, .contact-item, .tech-card, .team-member, .stat-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// ===== ANIMACIONES BÁSICAS (SIN CONFLICTOS) =====
// COMENTADO: Las animaciones complejas se manejan en animations.js
/*
function initAnimations() {
    // Esta función se comenta para evitar conflictos con animations.js
}
*/

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
    
    // Animar las barras de habilidades
    const skillLevels = card.querySelectorAll('.skill-level');
    skillLevels.forEach((level, index) => {
        const levelValue = level.getAttribute('data-level');
        setTimeout(() => {
            level.style.setProperty('--level-width', levelValue + '%');
            level.querySelector('::after')?.style.setProperty('width', levelValue + '%');
        }, index * 200 + 500);
    });
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

// ===== SISTEMA DE PARTÍCULAS (COMENTADO - SE MANEJA EN ANIMATIONS.JS) =====
/*
function initParticleSystem() {
    // Esta función se comenta para evitar conflictos con animations.js
}
*/

// ===== EFECTOS DE TECLADO =====
function initKeyboardEffects() {
    document.addEventListener('keydown', (e) => {
        // Efecto de partículas al presionar teclas
        if (e.key === ' ') {
            // createClickParticles(window.innerWidth / 2, window.innerHeight / 2);
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
                // createClickParticles(window.innerWidth / 2, window.innerHeight / 2);
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
        // Ocultar cursor en dispositivos táctiles y móviles
        if ('ontouchstart' in window || window.innerWidth <= 768) {
            cursor.style.display = 'none';
            return;
        }
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Animación suave del cursor
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Efectos hover
        const hoverElements = document.querySelectorAll('a, button, .service-card, .project-card, .tech-card, .team-member, .nav-link');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
        
        // Efecto de click
        document.addEventListener('mousedown', () => {
            cursor.classList.add('click');
        });
        
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
        });
        
        // Ocultar cursor en redimensionamiento a móvil
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                cursor.style.display = 'none';
            } else {
                cursor.style.display = 'block';
            }
        });
    }
}

// ===== EFECTOS DE PROGRAMADOR =====
function initProgrammerEffects() {
    // Crear efecto matrix rain
    createMatrixRain();
    
    // Crear terminal flotante
    createFloatingTerminal();
    
    // Crear partículas de código
    createCodeParticles();
    
    // Efecto de glitch en títulos
    initGlitchEffect();
    
    // Efecto de holograma en tarjetas
    initHologramEffect();
}

function createMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-rain';
    document.body.appendChild(matrixContainer);
    
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    function createMatrixColumn() {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDuration = (Math.random() * 3 + 2) + 's';
        column.style.animationDelay = Math.random() * 2 + 's';
        
        let text = '';
        for (let i = 0; i < 20; i++) {
            text += characters[Math.floor(Math.random() * characters.length)] + '<br>';
        }
        column.innerHTML = text;
        
        matrixContainer.appendChild(column);
        
        setTimeout(() => {
            column.remove();
        }, 5000);
    }
    
    // Crear columnas cada 200ms
    setInterval(createMatrixColumn, 200);
}

function createFloatingTerminal() {
    const terminal = document.createElement('div');
    terminal.className = 'floating-terminal';
    terminal.innerHTML = `
        <div class="terminal-line">$ npm install spu-industries</div>
        <div class="terminal-line">$ git clone innovacion.git</div>
        <div class="terminal-line">$ cd futuro</div>
        <div class="terminal-line">$ npm start</div>
        <div class="terminal-line terminal-cursor">Servidor iniciado en puerto 3000</div>
    `;
    
    document.body.appendChild(terminal);
    
    // Mostrar terminal después de 3 segundos
    setTimeout(() => {
        terminal.classList.add('active');
    }, 3000);
    
    // Ocultar terminal después de 10 segundos
    setTimeout(() => {
        terminal.classList.remove('active');
        setTimeout(() => {
            terminal.remove();
        }, 500);
    }, 10000);
}

function createCodeParticles() {
    const codeSnippets = [
        'const innovacion = "SPU Industries"',
        'function crearFuturo() { return "éxito"; }',
        'if (proyecto === "innovador") { console.log("¡Éxito!"); }',
        'class Desarrollador { constructor() { this.skills = ["HTML", "CSS", "JS"]; } }',
        'const tecnologias = ["React", "Vue", "Angular"];',
        'async function desarrollar() { return await futuro; }'
    ];
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'code-snippet';
        particle.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 10000);
    }, 3000);
}

function initGlitchEffect() {
    const titles = document.querySelectorAll('.section-title, .hero-title');
    
    titles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.classList.add('glitch-text');
            title.setAttribute('data-text', title.textContent);
            
            setTimeout(() => {
                title.classList.remove('glitch-text');
            }, 1000);
        });
    });
}

function initHologramEffect() {
    const cards = document.querySelectorAll('.tech-card, .service-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hologram-effect');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hologram-effect');
        });
    });
}

// ===== ANIMACIONES RETARDADAS =====
function initDelayedAnimations() {
    // Animar elementos del hero
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(50px)';
        setTimeout(() => {
            heroTitle.style.transition = 'all 1s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroSubtitle.style.transition = 'all 1s ease';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 400);
    }
    
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroButtons.style.transition = 'all 1s ease';
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 600);
    }
}

// ===== DEMOSTRACIÓN DE CÓDIGO =====
function initCodeDemo() {
    // Esperar a que el DOM esté completamente cargado
    setTimeout(() => {
        const playBtn = document.getElementById('playCode');
        const resetBtn = document.getElementById('resetCode');
        const codeCursor = document.getElementById('codeCursor');
        const outputContent = document.getElementById('outputContent');
        const demoTabs = document.querySelectorAll('.demo-tab');
        
        if (!playBtn || !resetBtn || !codeCursor || !outputContent) {
            console.log('Elementos de demostración de código no encontrados');
            return;
        }
        
        let isPlaying = false;
        let currentLine = 0;
        let animationInterval;
        
        // Configuración de diferentes códigos por pestaña
        const codeSnippets = {
            html: {
                title: 'index.html',
                lines: [
                    '<!DOCTYPE html>',
                    '<html lang="es">',
                    '<head>',
                    '    <meta charset="UTF-8">',
                    '    <title>SPU Industries</title>',
                    '</head>',
                    '<body>',
                    '    <header>',
                    '        <h1>Desarrollo Web</h1>',
                    '    </header>',
                    '</body>',
                    '</html>'
                ]
            },
            css: {
                title: 'styles.css',
                lines: [
                    '.hero {',
                    '    background: linear-gradient(135deg,',
                    '        #00d4ff 0%, #0099ff 100%);',
                    '    padding: 6rem 0;',
                    '    text-align: center;',
                    '}',
                    '',
                    '.hero h1 {',
                    '    font-size: 3rem;',
                    '    color: white;',
                    '    margin-bottom: 1rem;',
                    '}'
                ]
            },
            js: {
                title: 'spu-industries.js',
                lines: [
                    'class SPUIndustries {',
                    '    constructor() {',
                    '        this.innovacion = "Desarrollo Web Moderno";',
                    '        this.tecnologias = ["HTML5", "CSS3", "JavaScript"];',
                    '    }',
                    '',
                    '    async crearProyecto(nombre) {',
                    '        try {',
                    '            const proyecto = await this.desarrollar(nombre);',
                    '            return proyecto;',
                    '        } catch (error) {',
                    '            console.error("Error al crear proyecto:", error);',
                    '        }',
                    '    }',
                    '}'
                ]
            },
            php: {
                title: 'api.php',
                lines: [
                    '<?php',
                    'class SPUAPI {',
                    '    private $db;',
                    '',
                    '    public function __construct() {',
                    '        $this->db = new PDO(',
                    '            "mysql:host=localhost;dbname=spu",',
                    '            $username, $password',
                    '        );',
                    '    }',
                    '',
                    '    public function crearProyecto($datos) {',
                    '        $sql = "INSERT INTO proyectos (nombre) VALUES (?)";',
                    '        $stmt = $this->db->prepare($sql);',
                    '        return $stmt->execute([$datos["nombre"]]);',
                    '    }',
                    '}',
                    '?>'
                ]
            }
        };
        
        // Función para cambiar de pestaña
        demoTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remover clase active de todas las pestañas
                demoTabs.forEach(t => t.classList.remove('active'));
                // Añadir clase active a la pestaña clickeada
                tab.classList.add('active');
                
                // Cambiar el código según la pestaña
                const tabType = tab.getAttribute('data-tab');
                changeCode(tabType);
            });
        });
        
        function changeCode(type) {
            const snippet = codeSnippets[type];
            const codeTitle = document.querySelector('.code-title');
            const codeLinesContainer = document.getElementById('codeLines');
            
            // Actualizar título
            codeTitle.textContent = snippet.title;
            
            // Limpiar líneas existentes
            codeLinesContainer.innerHTML = '';
            
            // Crear nuevas líneas
            snippet.lines.forEach((line, index) => {
                const lineDiv = document.createElement('div');
                lineDiv.className = 'code-line';
                lineDiv.setAttribute('data-line', index + 1);
                
                if (line.trim() === '') {
                    lineDiv.innerHTML = `<span class="line-number">${index + 1}</span>`;
                } else {
                    lineDiv.innerHTML = `<span class="line-number">${index + 1}</span><span class="code-content">${highlightSyntax(line, type)}</span>`;
                }
                
                codeLinesContainer.appendChild(lineDiv);
            });
            
            // Resetear animación
            resetAnimation();
        }
        
        function highlightSyntax(line, type) {
            // Colorear sintaxis básica
            return line
                .replace(/(class|function|const|let|var|if|else|for|while|return|try|catch|async|await)/g, '<span class="code-keyword">$1</span>')
                .replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="code-function">$1</span>(')
                .replace(/(["'].*?["'])/g, '<span class="code-string">$1</span>')
                .replace(/([{}()\[\]])/g, '<span class="code-bracket">$1</span>')
                .replace(/([;,])/g, '<span class="code-semicolon">$1</span>')
                .replace(/([=+\-*/<>!&|])/g, '<span class="code-operator">$1</span>');
        }
        
        // Función para reproducir animación
        function playAnimation() {
            if (isPlaying) return;
            
            isPlaying = true;
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            currentLine = 0;
            
            // Obtener las líneas actuales
            const currentCodeLines = document.querySelectorAll('.code-line');
            
            // Mostrar líneas una por una
            animationInterval = setInterval(() => {
                if (currentLine < currentCodeLines.length) {
                    currentCodeLines[currentLine].classList.add('visible');
                    currentLine++;
                } else {
                    // Animación completada
                    clearInterval(animationInterval);
                    isPlaying = false;
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                    
                    // Mostrar cursor al final
                    showCursor();
                }
            }, 300);
        }
        
        // Función para resetear animación
        function resetAnimation() {
            clearInterval(animationInterval);
            isPlaying = false;
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            currentLine = 0;
            
            // Ocultar todas las líneas actuales
            const currentCodeLines = document.querySelectorAll('.code-line');
            currentCodeLines.forEach(line => {
                line.classList.remove('visible');
            });
            
            // Ocultar cursor
            hideCursor();
            
            // Limpiar output
            outputContent.innerHTML = '<div class="output-line">$ Listo para ejecutar...</div>';
        }
        
        // Función para mostrar cursor
        function showCursor() {
            const currentCodeLines = document.querySelectorAll('.code-line');
            if (currentCodeLines.length > 0) {
                const lastLine = currentCodeLines[currentCodeLines.length - 1];
                const rect = lastLine.getBoundingClientRect();
                const containerRect = document.querySelector('.code-content').getBoundingClientRect();
                
                codeCursor.style.display = 'block';
                codeCursor.style.left = (rect.right - containerRect.left + 10) + 'px';
                codeCursor.style.top = (rect.top - containerRect.top) + 'px';
            }
        }
        
        // Función para ocultar cursor
        function hideCursor() {
            codeCursor.style.display = 'none';
        }
        
        // Event listeners
        playBtn.addEventListener('click', () => {
            if (isPlaying) {
                // Pausar
                clearInterval(animationInterval);
                isPlaying = false;
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                playAnimation();
            }
        });
        
        resetBtn.addEventListener('click', resetAnimation);
        
        // Inicializar con JavaScript por defecto
        changeCode('js');
        
        // Auto-play después de 2 segundos
        setTimeout(() => {
            playAnimation();
        }, 2000);
    }, 1000); // Esperar 1 segundo para que se cargue todo
}

// ===== TERMINAL DE BIENVENIDA =====
function initWelcomeTerminal() {
    setTimeout(() => {
        const typingElement = document.querySelector('.typing-animation');
        if (!typingElement) return;
        
        const text = typingElement.getAttribute('data-text');
        const typingText = typingElement.querySelector('.typing-text');
        
        if (!text || !typingText) return;
        
        let index = 0;
        const typingSpeed = 100; // Velocidad de escritura en ms
        
        function typeText() {
            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, typingSpeed);
            }
        }
        
        // Iniciar la animación de escritura después de 2 segundos
        setTimeout(typeText, 2000);
    }, 1000);
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

// ===== SCRIPT DE EMERGENCIA ELIMINADO =====
// El script de emergencia se ha eliminado para evitar conflictos

