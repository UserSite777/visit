// Проверяем наличие согласия пользователя на использование cookies
if (!checkCookieConsent()) {
    showAlertAndSetCookie(); // Показываем уведомление и сохраняем согласие
}

// Функция проверки наличия согласия пользователя
function checkCookieConsent() {
    return !!getCookie("cookie_consent");
}

// Функция установки cookie для хранения согласия пользователя
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Получаем значение указанного cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Отображение уведомления и установка согласия
function showAlertAndSetCookie() {
    alert("Данный сайт использует файлы cookie. Продолжая просмотр, Вы соглашаетесь на их использование.");
    setCookie("cookie_consent", "true", 365); // Запоминаем согласие на один год
}

 

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
