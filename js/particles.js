// ===== SISTEMA DE PARTÍCULAS CON PARTICLES.JS =====

// Configuración de partículas
const particlesConfig = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ["#00d4ff", "#00ff88", "#0099ff", "#8338ec"]
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#00d4ff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
};

// Inicializar partículas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', particlesConfig);
    } else {
        // Fallback si particles.js no está cargado
        createFallbackParticles();
    }
});

// ===== SISTEMA DE PARTÍCULAS FALLBACK =====
function createFallbackParticles() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;

    // Crear partículas manualmente
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }

    // Crear conexiones entre partículas
    createConnections(particlesContainer);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle-fallback';

    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const vx = (Math.random() - 0.5) * 2;
    const vy = (Math.random() - 0.5) * 2;
    const colors = ['#00d4ff', '#00ff88', '#0099ff', '#8338ec'];
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
        opacity: 0.7;
        box-shadow: 0 0 10px ${color};
    `;

    container.appendChild(particle);

    // Animar partícula
    animateParticle(particle, vx, vy);
}

function animateParticle(particle, vx, vy) {
    let x = parseFloat(particle.style.left);
    let y = parseFloat(particle.style.top);

    function move() {
        x += vx;
        y += vy;

        // Rebotar en los bordes
        if (x <= 0 || x >= window.innerWidth) vx *= -1;
        if (y <= 0 || y >= window.innerHeight) vy *= -1;

        // Mantener dentro de la pantalla
        x = Math.max(0, Math.min(window.innerWidth, x));
        y = Math.max(0, Math.min(window.innerHeight, y));

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        requestAnimationFrame(move);
    }

    move();
}

function createConnections(container) {
    const particles = container.querySelectorAll('.particle-fallback');

    function updateConnections() {
        // Limpiar conexiones existentes
        const existingLines = container.querySelectorAll('.connection-line');
        existingLines.forEach(line => line.remove());

        // Crear nuevas conexiones
        particles.forEach((particle1, i) => {
            particles.forEach((particle2, j) => {
                if (i < j) {
                    const x1 = parseFloat(particle1.style.left) + 2;
                    const y1 = parseFloat(particle1.style.top) + 2;
                    const x2 = parseFloat(particle2.style.left) + 2;
                    const y2 = parseFloat(particle2.style.top) + 2;

                    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

                    if (distance < 150) {
                        const line = document.createElement('div');
                        line.className = 'connection-line';

                        const angle = Math.atan2(y2 - y1, x2 - x1);
                        const length = distance;

                        line.style.cssText = `
                            position: absolute;
                            left: ${x1}px;
                            top: ${y1}px;
                            width: ${length}px;
                            height: 1px;
                            background: linear-gradient(90deg, #00d4ff, transparent);
                            transform-origin: 0 0;
                            transform: rotate(${angle}rad);
                            opacity: ${1 - distance / 150};
                            pointer-events: none;
                        `;

                        container.appendChild(line);
                    }
                }
            });
        });
    }

    // Actualizar conexiones cada 100ms
    setInterval(updateConnections, 100);
}

// ===== EFECTOS INTERACTIVOS =====
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle-fallback');
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    particles.forEach(particle => {
        const x = parseFloat(particle.style.left);
        const y = parseFloat(particle.style.top);
        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);

        if (distance < 100) {
            const force = (100 - distance) / 100;
            const angle = Math.atan2(y - mouseY, x - mouseX);
            const pushX = Math.cos(angle) * force * 2;
            const pushY = Math.sin(angle) * force * 2;

            particle.style.transform = `translate(${pushX}px, ${pushY}px)`;
            particle.style.opacity = '1';
        } else {
            particle.style.transform = 'translate(0, 0)';
            particle.style.opacity = '0.7';
        }
    });
});

// ===== EFECTOS DE CLICK =====
document.addEventListener('click', (e) => {
    const particles = document.querySelectorAll('.particle-fallback');
    const clickX = e.clientX;
    const clickY = e.clientY;

    particles.forEach(particle => {
        const x = parseFloat(particle.style.left);
        const y = parseFloat(particle.style.top);
        const distance = Math.sqrt((clickX - x) ** 2 + (clickY - y) ** 2);

        if (distance < 200) {
            const force = (200 - distance) / 200;
            const angle = Math.atan2(y - clickY, x - clickX);
            const pushX = Math.cos(angle) * force * 50;
            const pushY = Math.sin(angle) * force * 50;

            particle.style.transition = 'transform 0.3s ease';
            particle.style.transform = `translate(${pushX}px, ${pushY}px)`;

            setTimeout(() => {
                particle.style.transition = 'none';
                particle.style.transform = 'translate(0, 0)';
            }, 300);
        }
    });
});

// ===== EFECTOS DE SCROLL =====
window.addEventListener('scroll', () => {
    const particles = document.querySelectorAll('.particle-fallback');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.1;

    particles.forEach((particle, index) => {
        const speed = 0.5 + (index * 0.01);
        particle.style.transform = `translateY(${rate * speed}px)`;
    });
});

// ===== EFECTOS DE TECLADO =====
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        createExplosionEffect();
    }
});

function createExplosionEffect() {
    const particles = document.querySelectorAll('.particle-fallback');

    particles.forEach(particle => {
        const x = parseFloat(particle.style.left);
        const y = parseFloat(particle.style.top);
        const angle = Math.random() * Math.PI * 2;
        const force = Math.random() * 100 + 50;
        const vx = Math.cos(angle) * force;
        const vy = Math.sin(angle) * force;

        particle.style.transition = 'transform 0.5s ease-out';
        particle.style.transform = `translate(${vx}px, ${vy}px) scale(1.5)`;

        setTimeout(() => {
            particle.style.transition = 'transform 0.3s ease-in';
            particle.style.transform = 'translate(0, 0) scale(1)';
        }, 500);
    });
}

// ===== RESPONSIVE =====
window.addEventListener('resize', () => {
    const particles = document.querySelectorAll('.particle-fallback');
    particles.forEach(particle => {
        const x = parseFloat(particle.style.left);
        const y = parseFloat(particle.style.top);

        if (x > window.innerWidth) particle.style.left = window.innerWidth + 'px';
        if (y > window.innerHeight) particle.style.top = window.innerHeight + 'px';
    });
});

// ===== EFECTOS DE COLOR =====
function changeParticleColors() {
    const particles = document.querySelectorAll('.particle-fallback');
    const colorSets = [
        ['#00d4ff', '#00ff88', '#0099ff', '#8338ec'],
        ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'],
        ['#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'],
        ['#00d2d3', '#ff9f43', '#ee5a24', '#0984e3']
    ];

    const randomSet = colorSets[Math.floor(Math.random() * colorSets.length)];

    particles.forEach(particle => {
        const randomColor = randomSet[Math.floor(Math.random() * randomSet.length)];
        particle.style.background = randomColor;
        particle.style.boxShadow = `0 0 10px ${randomColor}`;
    });
}

// Cambiar colores cada 10 segundos
setInterval(changeParticleColors, 10000);
