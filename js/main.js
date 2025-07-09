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

// Cookie Popup JavaScript
class CookiePopup {
    constructor() {
        this.cookiePopup = null;
        this.cookieModal = null;
        this.cookieConsent = null;
        this.acceptBtn = null;
        this.declineBtn = null;
        this.closeBtn = null;
        this.modalCloseBtn = null;
        this.agreementLink = null;
        this.cookieName = 'user_cookie_consent';
        this.cookieExpiry = 365; // дней
        
        this.init();
    }
    
    init() {
        // Проверяем, есть ли уже согласие
        if (this.getCookie(this.cookieName)) {
            return;
        }
        
        // Создаем popup если его нет в DOM
        this.createPopup();
        
        // Инициализируем элементы
        this.initElements();
        
        // Привязываем события
        this.bindEvents();
        
        // Показываем popup с задержкой
        setTimeout(() => {
            this.showPopup();
        }, 1000);
    }
    
    createPopup() {
        // Проверяем, есть ли уже popup в DOM
        if (document.getElementById('cookie-popup')) {
            return;
        }
        
        const popupHTML = `
            <div id="cookie-popup" class="cookie-popup">
                <div class="cookie-content">
                    <div class="cookie-header">
                        <h3>Уведомление о cookie-файлах</h3>
                        <button id="cookie-close" class="cookie-close">&times;</button>
                    </div>
                    <div class="cookie-body">
                        <p>Сайт использует Cookie-файлы для обеспечения всех его функций. Оставаясь на данном сайте, вы принимаете условия <a href="#" id="cookie-agreement-link">Соглашения об использовании Cookie-файлов</a>.</p>
                        <div class="cookie-checkbox">
                            <input type="checkbox" id="cookie-consent" required>
                            <label for="cookie-consent">Я принимаю условия использования cookie-файлов</label>
                        </div>
                    </div>
                    <div class="cookie-footer">
                        <button id="cookie-accept" class="cookie-btn cookie-accept-btn" disabled>Принять</button>
                        <button id="cookie-decline" class="cookie-btn cookie-decline-btn">Отклонить</button>
                    </div>
                </div>
            </div>
            
            <div id="cookie-agreement-modal" class="cookie-modal">
                <div class="cookie-modal-content">
                    <div class="cookie-modal-header">
                        <h2>Соглашение об использовании Cookie-файлов</h2>
                        <button id="modal-close" class="cookie-close">&times;</button>
                    </div>
                    <div class="cookie-modal-body">
                        <p>Настоящее Соглашение определяет порядок использования cookie-файлов пользователями сайта, администратором которого является Гражданин РФ Зантимиров Т., зарегистрированный в качестве самозанятого, в соответствии с Федеральным законом от 27.11.2018 N 422-ФЗ (ред. от 29.11.2024) "О проведении эксперимента по установлению специального налогового режима "Налог на профессиональный доход" (далее — «Оператор»).</p>
                        
                        <h3>1. Общие положения</h3>
                        <p>1.1. Оператор использует cookie-файлы и аналогичные технологии (web-beacons, пиксели и пр.) для улучшения пользовательского опыта, персонализации контента и рекламы, а также для анализа трафика и функционирования Сайта.</p>
                        <p>1.2. Использование Сайта означает согласие Пользователя с настоящим Соглашением и условиями обработки файлов cookie.</p>
                        <p>1.3. Если Пользователь не согласен с условиями использования cookie, он обязан прекратить использование Сайта либо изменить настройки своего браузера в соответствующем разделе управления cookie.</p>
                        
                        <h3>2. Что такое cookie-файлы</h3>
                        <p>2.1. Cookie-файл — это небольшой фрагмент данных, отправляемый веб-сервером и сохраняемый на устройстве пользователя. Он позволяет сохранять информацию о действиях, предпочтениях и настройках пользователя на сайте.</p>
                        
                        <h3>3. Цели использования cookie-файлов</h3>
                        <p>3.1. Оператор использует cookie-файлы в следующих целях:</p>
                        <ul>
                            <li>Обеспечение корректной работы Сайта;</li>
                            <li>Упрощение навигации и взаимодействия с сервисами;</li>
                            <li>Хранение пользовательских предпочтений и параметров сеанса;</li>
                            <li>Анализ поведения посетителей и улучшение структуры, дизайна и содержания Сайта;</li>
                            <li>Проведение маркетинговых и рекламных кампаний, в том числе персонализированной рекламы;</li>
                            <li>Повышение уровня информационной безопасности и предотвращение мошенничества.</li>
                        </ul>
                        
                        <h3>4. Виды cookie-файлов</h3>
                        <p>4.1. На Сайте могут использоваться следующие виды cookie:</p>
                        <ul>
                            <li>Обязательные — необходимы для корректной работы сайта и его функционала;</li>
                            <li>Функциональные — сохраняют пользовательские предпочтения;</li>
                            <li>Аналитические — собирают обезличенную статистику о пользовании сайтом;</li>
                            <li>Рекламные — используются для отображения персонализированной рекламы и проведения маркетинговых кампаний.</li>
                        </ul>
                        
                        <h3>5. Сторонние cookie-файлы</h3>
                        <p>5.1. Оператор может использовать сторонние сервисы, такие как Яндекс.Метрика, Google Analytics, VK Pixel, Meta Pixel, и др., которые также могут размещать cookie-файлы на устройстве пользователя в соответствии с их политиками конфиденциальности.</p>
                        
                        <h3>6. Управление cookie-файлами</h3>
                        <p>6.1. Пользователь может в любой момент изменить настройки использования cookie-файлов в браузере, включая блокировку всех cookie или уведомления об их отправке.</p>
                        <p>6.2. Обратите внимание: отключение или удаление cookie может повлиять на функциональность отдельных разделов Сайта.</p>
                        
                        <h3>7. Обработка персональных данных</h3>
                        <p>7.1. Cookie-файлы могут содержать данные, относящиеся к персональной информации пользователя (например, IP-адрес, информация об устройстве и браузере), обработка которых осуществляется в соответствии с Политикой конфиденциальности и Федеральным законом РФ №152-ФЗ «О персональных данных».</p>
                        
                        <h3>8. Изменения и дополнения</h3>
                        <p>8.1. Оператор оставляет за собой право вносить изменения в настоящее Соглашение. Актуальная версия всегда доступна на данной странице.</p>
                        <p>8.2. Продолжение использования Сайта после публикации изменений означает согласие Пользователя с обновлёнными условиями.</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', popupHTML);
    }
    
    initElements() {
        this.cookiePopup = document.getElementById('cookie-popup');
        this.cookieModal = document.getElementById('cookie-agreement-modal');
        this.cookieConsent = document.getElementById('cookie-consent');
        this.acceptBtn = document.getElementById('cookie-accept');
        this.declineBtn = document.getElementById('cookie-decline');
        this.closeBtn = document.getElementById('cookie-close');
        this.modalCloseBtn = document.getElementById('modal-close');
        this.agreementLink = document.getElementById('cookie-agreement-link');
    }
    
    bindEvents() {
        // Обработчик чекбокса
        this.cookieConsent.addEventListener('change', () => {
            this.acceptBtn.disabled = !this.cookieConsent.checked;
        });
        
        // Обработчики кнопок
        this.acceptBtn.addEventListener('click', () => {
            this.acceptCookies();
        });
        
        this.declineBtn.addEventListener('click', () => {
            this.declineCookies();
        });
        
        this.closeBtn.addEventListener('click', () => {
            this.hidePopup();
        });
        
        // Обработчики модального окна
        this.agreementLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showModal();
        });
        
        this.modalCloseBtn.addEventListener('click', () => {
            this.hideModal();
        });
        
        // Закрытие модального окна по клику на фон
        this.cookieModal.addEventListener('click', (e) => {
            if (e.target === this.cookieModal) {
                this.hideModal();
            }
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideModal();
            }
        });
    }
    
    showPopup() {
        this.cookiePopup.classList.add('show');
    }
    
    hidePopup() {
        this.cookiePopup.classList.remove('show');
        setTimeout(() => {
            this.cookiePopup.style.display = 'none';
        }, 300);
    }
    
    showModal() {
        this.cookieModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    hideModal() {
        this.cookieModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    acceptCookies() {
        this.setCookie(this.cookieName, 'accepted', this.cookieExpiry);
        this.hidePopup();
        console.log('Cookies accepted');
    }
    
    declineCookies() {
        this.setCookie(this.cookieName, 'declined', this.cookieExpiry);
        this.hidePopup();
        console.log('Cookies declined');
    }
    
    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
    
    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}

// Инициализация cookie popup после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    new CookiePopup();
});

// Альтернативный способ инициализации, если DOM уже загружен
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        new CookiePopup();
    });
} else {
    new CookiePopup();
}

