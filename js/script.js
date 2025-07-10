/**
 * Cookie banner logic.
 * © 2025
 */
(() => {
  const STORAGE_KEY = 'cookieConsentUntil';
  const DAYS_TO_EXPIRE = 365;

  const banner   = document.getElementById('cookie-banner');
  const checkbox = document.getElementById('cookie-checkbox');
  const accept   = document.getElementById('cookie-accept');

  //--- Helpers ---------------------------------------------------------------
  const now  = () => new Date().getTime();
  const days = d => d * 24 * 60 * 60 * 1000;

  const consentValid = () => {
    const expiry = localStorage.getItem(STORAGE_KEY);
    return expiry && Number(expiry) > now();
  };

  const saveConsent = () => {
    localStorage.setItem(STORAGE_KEY, String(now() + days(DAYS_TO_EXPIRE)));
  };

  //--- Init ------------------------------------------------------------------
  if (!consentValid()) {
    banner.hidden = false;                   // показать баннер
    document.body.style.overflow = 'hidden'; // при желании блокируем скролл
  }

  //--- Events ----------------------------------------------------------------
  checkbox.addEventListener('change', () => {
    accept.disabled = !checkbox.checked;
  });

  accept.addEventListener('click', () => {
    if (!checkbox.checked) return; // безопасная проверка

    saveConsent();
    banner.remove();
    document.body.style.overflow = ''; // разблокируем скролл
  });
})();
