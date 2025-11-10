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
            if (window.localStorage) {
                var stored = localStorage.getItem(CONSENT_STORAGE_KEY);
                if (stored === 'accepted' || stored === 'rejected') {
                    return true;
                }
            }
        } catch (error) {
            // localStorage might be unavailable or disabled (Safari private mode, etc.)
        }

        var cookieMatch = document.cookie.match(new RegExp(CONSENT_COOKIE_NAME + '=(accepted|rejected)'));
        return !!cookieMatch;
    }

    function rememberConsent(value) {
        try {
            if (window.localStorage) {
                localStorage.setItem(CONSENT_STORAGE_KEY, value || 'accepted');
            }
        } catch (error) {
            // Ignore storage errors
        }

        var maxAge = 60 * 60 * 24 * 365; // 1 year
        document.cookie = CONSENT_COOKIE_NAME + '=' + (value || 'accepted') + '; path=/; max-age=' + maxAge;
    }

    function handleReject(event) {
        event.preventDefault();
        rememberConsent('rejected');
        removeBanner();
        showNotification('Cookies rejected. Only essential features will run.');
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

    function showNotification(message) {
        var notification = document.createElement('div');
        notification.className = 'kv-cookie-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(function () {
            notification.classList.add('visible');
        }, 10);

        setTimeout(function () {
            notification.classList.remove('visible');
            setTimeout(function () {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
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
        message.textContent = 'We use cookies to make Kind VGN Link work better for you and to understand how our visitors use the site.';

        var acceptButton = createButton('Accept cookies', 'kv-cookie-button kv-cookie-button-accept', function () {
            rememberConsent('accepted');
            removeBanner();
            showNotification('Thanks for accepting cookies. Enjoy the full experience!');
        });

        var rejectButton = createButton('Reject cookies', 'kv-cookie-button kv-cookie-button-reject', handleReject);

        banner.appendChild(message);
        banner.appendChild(acceptButton);
        banner.appendChild(rejectButton);

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
