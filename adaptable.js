document.addEventListener('DOMContentLoaded', () => {
    // Menú móvil
    const menuToggle = document.getElementById('menuToggle');
    const menuNormal = document.getElementById('menunormal');

    menuToggle.addEventListener('click', () => {
        menuNormal.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('#menunormal a').forEach(link => {
        link.addEventListener('click', () => {
            menuNormal.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !menuNormal.contains(e.target)) {
            menuNormal.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Animación de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animación de entrada para elementos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('.feature-card, .animate-text, .subtitle').forEach((el) => {
        observer.observe(el);
    });
}); 