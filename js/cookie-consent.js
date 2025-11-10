/**
 * Cookie Consent Banner
 * Displays a consent banner tailored to the Kind VGN Link theme.
 */
(function () {
    var CONSENT_STORAGE_KEY = 'kv_cookie_consent';
    var CONSENT_COOKIE_NAME = 'kv_cookie_consent';
    var BANNER_ID = 'kv-cookie-banner';

    function hasConsent() {
        try {
            if (window.localStorage && localStorage.getItem(CONSENT_STORAGE_KEY) === 'accepted') {
                return true;
            }
        } catch (error) {
            // localStorage might be unavailable or disabled (Safari private mode, etc.)
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

    function removeBanner() {
        var banner = document.getElementById(BANNER_ID);
        if (banner && banner.parentNode) {
            banner.parentNode.removeChild(banner);
        }
    }

    function createButton(label, className, onClick) {
        var button = document.createElement('button');
        button.className = className;
        button.type = 'button';
        button.textContent = label;
        button.addEventListener('click', onClick);
        return button;
    }

    function buildBanner() {
        if (document.getElementById(BANNER_ID)) {
            return;
        }

        var banner = document.createElement('div');
        banner.id = BANNER_ID;
        banner.className = 'kv-cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-live', 'polite');
        banner.setAttribute('aria-label', 'Cookie consent notification');

        var message = document.createElement('span');
        message.textContent = 'Kind VGN Link uses cookies, including Google services, to deliver features, personalise content, and analyse traffic.';

        var acceptButton = createButton('Accept cookies', 'kv-cookie-button kv-cookie-button-accept', function () {
            rememberConsent();
            removeBanner();
        });

        var manageButton = document.createElement('a');
        manageButton.href = '#';
        manageButton.className = 'kv-cookie-button kv-cookie-button-manage';
        manageButton.textContent = 'Manage choices';
        manageButton.addEventListener('click', handleManageChoices);

        banner.appendChild(message);
        banner.appendChild(manageButton);
        banner.appendChild(acceptButton);

        document.body.appendChild(banner);
    }

    function init() {
        if (hasConsent()) {
            return;
        }

        buildBanner();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
