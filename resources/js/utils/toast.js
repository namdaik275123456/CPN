import Vue from 'vue';
import Notify from 'simple-notify';
import 'simple-notify/dist/simple-notify.css';

const VARIANT = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
};

const TITLE = {
    SUCCESS: 'Thành công',
    ERROR: 'Lỗi',
    WARNING: 'Cảnh báo',
    INFO: 'Thông tin',
};

const DEFAULT_OPTIONS = {
    position: 'right top',
    autotimeout: 3000,
    autoclose: true,
    showIcon: true,
    showCloseButton: true,
    effect: 'fade',
    type: 'outline',
    gap: 20,
    distance: 20,
};

const activeToasts = new Set();

const ToastService = {
    showToast(variant, content, options = {}) {
        const toast = new Notify({
            title: options.title || TITLE[variant] || 'Thông báo',
            text: content,
            status: VARIANT[variant] || 'info',
            position: options.position ?? DEFAULT_OPTIONS.position,
            autotimeout: options.autotimeout ?? DEFAULT_OPTIONS.autotimeout,
            autoclose: options.autoclose ?? DEFAULT_OPTIONS.autoclose,
            showIcon: options.showIcon ?? DEFAULT_OPTIONS.showIcon,
            showCloseButton: options.showCloseButton ?? DEFAULT_OPTIONS.showCloseButton,
            effect: options.effect ?? DEFAULT_OPTIONS.effect,
            type: options.type ?? DEFAULT_OPTIONS.type,
            gap: options.gap ?? DEFAULT_OPTIONS.gap,
            distance: options.distance ?? DEFAULT_OPTIONS.distance,
            customClass: options.customClass || '',
            customIcon: options.customIcon || '',
        });
        activeToasts.add(toast);
        return toast;
    },
    clearAll() {
        activeToasts.forEach(toast => toast.close());
        activeToasts.clear();
    }
};

Vue.use({
    install(Vue) {
        Vue.prototype.$toast = {
            success(content, options) {
                return ToastService.showToast('SUCCESS', content, options);
            },
            error(content, options) {
                return ToastService.showToast('ERROR', content, options);
            },
            warning(content, options) {
                return ToastService.showToast('WARNING', content, options);
            },
            info(content, options) {
                return ToastService.showToast('INFO', content, options);
            },
            custom(content, options) {
                return ToastService.showToast(null, content, options);
            },
            clearAll() {
                return ToastService.clearAll();
            }
        };

        Vue.mixin({
            created() {
                this.$toast = Vue.prototype.$toast;
            },
        });
    },
});

export default ToastService;
