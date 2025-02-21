import Cookies from 'cookies-js';

const CookieHelper = {
    set(name, value, options = {}) {
        Cookies.set(name, value, {
            secure: true, // Chỉ gửi cookie qua HTTPS
            domain: window.location.hostname, // Lấy domain hiện tại
            ...options
        });
    },

    get(name) {
        return Cookies.get(name);
    },

    remove(name) {
        Cookies.expire(name);
    }
};

export default CookieHelper;
