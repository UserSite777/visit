/* js/script.js */
// Инициализация AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Мобильное меню
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');  // <<< новая строка
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


// плавно прокручиваем с учётом 70-пиксельного меню
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();

        const headerOffset = 70;             // высота .main-nav
        const elementPos  = target.getBoundingClientRect().top;
        const offsetPos   = elementPos + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPos, behavior: 'smooth' });

        // закрыть мобильное меню
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});


// Активная ссылка в навигации
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
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

// Слайдер ассортимента с локальными изображениями
const vegetables = [
    {
        name: 'Капуста белокочанная',
        desc: 'Вкусная и идеальная для салатов',
        img: 'img/капуста.jpeg'
    },
    {
        name: 'Огурцы свежие',
        desc: 'Хрустящие огурцы прямо с грядки',
        img: 'img/огурцы.jpeg'
    },
    {
        name: 'Помидоры спелые',
        desc: 'Ароматные томаты высшего сорта',
        img: 'img/помидоры.jpeg'
    }
];

let currentVegetable = 0;
const vegSlide = document.getElementById('vegSlide');
const prevBtn = document.getElementById('prevVeg');
const nextBtn = document.getElementById('nextVeg');

function renderVegetable() {
    const veg = vegetables[currentVegetable];
    vegSlide.innerHTML = `
        <img class="vegetable-image" src="${veg.img}" alt="${veg.name}">
        <h3 class="vegetable-name">${veg.name}</h3>
        <p class="vegetable-desc">${veg.desc}</p>
    `;
}

function nextVegetable() {
    currentVegetable = (currentVegetable + 1) % vegetables.length;
    renderVegetable();
}

function prevVegetable() {
    currentVegetable = (currentVegetable - 1 + vegetables.length) % vegetables.length;
    renderVegetable();
}



// Инициализация слайдера
renderVegetable();

// Обработчики событий
nextBtn.addEventListener('click', nextVegetable);
prevBtn.addEventListener('click', prevVegetable);

// Автоматическая смена слайдов
setInterval(nextVegetable, 5000);

// Обработка формы
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Получаем данные формы
    const formData = new FormData(this);
    const name = this.querySelector('input[placeholder="Ваше имя"]').value;
    const phone = this.querySelector('input[placeholder="Телефон"]').value;
    const message = this.querySelector('textarea').value;

    // Простая валидация
    if (!name || !phone || !message) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    // Имитация отправки
    alert(`Спасибо, ${name}! Ваше сообщение получено. Я свяжусь с вами по номеру ${phone}.`);
    this.reset();
});

// Анимация полос навыков при скролле
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-bar');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Эффект parallax для floating листьев
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    document.querySelectorAll('.floating-leaf').forEach((leaf, index) => {
        const speed = 0.5 + (index * 0.2);
        leaf.style.transform = `translateY(${rate * speed}px)`;
    });
});

// Анимация логотипа в hero блоке
function animateLogo() {
    const animatedLogo = document.querySelector('.animated-logo');
    if (animatedLogo) {
        animatedLogo.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
            animatedLogo.style.transform = 'scale(1) rotate(0deg)';
        }, 2000);
    }
}

// Запуск анимации логотипа каждые 4 секунды
setInterval(animateLogo, 4000);

// Анимация WhatsApp иконки
function animateWhatsApp() {
    const whatsappIcon = document.querySelector('.whatsapp-icon');
    if (whatsappIcon) {
        whatsappIcon.style.transform = 'scale(1.2) rotate(10deg)';
        setTimeout(() => {
            whatsappIcon.style.transform = 'scale(1) rotate(0deg)';
        }, 800);
    }
}

// Запуск анимации WhatsApp каждые 3 секунды
setInterval(animateWhatsApp, 3000);
