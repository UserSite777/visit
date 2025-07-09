document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookieConsent');
    const cookieCheckbox = document.getElementById('cookieCheckbox');
    const acceptCookies = document.getElementById('acceptCookies');

    // Проверяем наличие согласия пользователя на использование cookies
    if (!checkCookieConsent()) {
        cookieConsent.style.display = 'flex';
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

    // Обработка нажатия на кнопку "Принять"
    acceptCookies.addEventListener('click', function() {
        if (cookieCheckbox.checked) {
            setCookie("cookie_consent", "true", 365); // Запоминаем согласие на один год
            cookieConsent.style.display = 'none';
        } else {
            alert("Пожалуйста, подтвердите ваше согласие на использование cookies.");
        }
    });
});