const nav = document.querySelector('#nav');
const navBtn = document.querySelector('#nav-btn');
const navBtnImg = document.querySelector('#nav-btn-img');

navBtn.onclick = () => {
    if (nav.classList.toggle('open')) {
        navBtnImg.src = "./img/icons/nav-close.svg";
        document.body.style.overflow = 'hidden'; // Блокируем скролл при открытом меню
    } else {
        navBtnImg.src = './img/icons/nav-open.svg';
        document.body.style.overflow = 'auto'; // Разблокируем скролл
    }
}

// Закрытие меню при клике на ссылку (для мобильных)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
            nav.classList.remove('open');
            navBtnImg.src = './img/icons/nav-open.svg';
            document.body.style.overflow = 'auto';
        }
    });
});

// Инициализация AOS анимаций
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Функция плавного скролла для всех ссылок с якорями
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Активация соответствующего пункта меню при скролле
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Обработка изменения размера окна для адаптивности изображения
window.addEventListener('resize', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && window.innerWidth <= 700) {
        heroImage.style.objectPosition = 'center';
    }
});
