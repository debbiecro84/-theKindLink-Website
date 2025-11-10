/**
 * Google Cookie Consent Banner
 * Loads Google's cookiechoices library and displays a consent banner across the site.
 */
(function () {
    var CONSENT_STORAGE_KEY = 'kv_cookie_consent';
    var CONSENT_COOKIE_NAME = 'kv_cookie_consent';

    function hasConsent() {
        try {
            if (window.localStorage && localStorage.getItem(CONSENT_STORAGE_KEY) === 'accepted') {
                return true;
            }
        } catch (error) {
            // localStorage might be unavailable (Safari private mode, etc.)
        }

        return document.cookie.indexOf(CONSENT_COOKIE_NAME + '=accepted') !== -1;
    }

    function rememberConsent() {
        try {
            if (window.localStorage) {
                localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted');
            }
        } catch (error) {
            // Ignore storage errors
        }

        var maxAge = 60 * 60 * 24 * 365; // 1 year
        document.cookie = CONSENT_COOKIE_NAME + '=accepted; path=/; max-age=' + maxAge;
    }

    function handleManageChoices(event) {
        event.preventDefault();

        if (typeof openModal === 'function') {
            openModal('privacyModal');
            return;
        }

        // Fallback to navigate to a privacy page if available.
        var fallbackLink = document.querySelector('a[href*="privacy"]');
        if (fallbackLink) {
            window.location.href = fallbackLink.getAttribute('href');
        } else {
            window.location.href = '/privacy.html';
        }
    }

    function configureBanner() {
        if (!window.cookieChoices) {
            return;
        }

        var message = 'Kind VGN Link uses cookies from Google and its partners to deliver services and analyse traffic.';
        var dismissText = 'Accept cookies';
        var learnMoreText = 'Manage choices';

        cookieChoices.showCookieConsentBar(message, dismissText, learnMoreText, '#');

        var banner = document.querySelector('.cookie-choices-info');
        if (!banner) {
            return;
        }

        banner.classList.add('kv-cookie-banner');
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-live', 'polite');

        var buttons = banner.querySelectorAll('.cookie-choices-button');
        if (!buttons.length) {
            return;
        }

        var acceptButton = buttons[0];
        if (acceptButton) {
            acceptButton.addEventListener('click', rememberConsent, { once: true });
        }

        var manageButton = buttons[1];
        if (manageButton) {
            manageButton.addEventListener('click', handleManageChoices);
        }
    }

    function loadGoogleCookieChoices() {
        if (document.querySelector('script[data-cookiechoices="google"]')) {
            configureBanner();
            return;
        }

        var script = document.createElement('script');
        script.src = 'https://www.gstatic.com/hostedlibs/cookiechoices/1/cookiechoices.min.js';
        script.async = true;
        script.setAttribute('data-cookiechoices', 'google');
        script.onload = configureBanner;

        document.head.appendChild(script);
    }

    if (hasConsent()) {
        return;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadGoogleCookieChoices);
    } else {
        loadGoogleCookieChoices();
    }
})();


