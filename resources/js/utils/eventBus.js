import Vue from "vue";

// Định nghĩa class EventBus, nơi quản lý các sự kiện và lắng nghe các sự kiện
class EventBus {
    constructor() {
        // Kiểm tra xem instance đã tồn tại chưa, nếu chưa thì tạo một instance mới
        if (!EventBus.instance) {
            // Tạo một instance Vue để quản lý các sự kiện
            this.bus = new Vue();
            // Gán instance vào EventBus để đảm bảo chỉ có một instance duy nhất
            EventBus.instance = this;
        }
        return EventBus.instance;
    }

    /**
     * Đăng ký lắng nghe sự kiện
     * @param {string} event - Tên sự kiện
     * @param {Function} handler - Hàm xử lý sự kiện khi sự kiện được phát
     */
    on(event, handler) {
        // Lắng nghe sự kiện và gọi handler khi sự kiện đó được phát
        this.bus.$on(event, handler);
    }

    /**
     * Đăng ký lắng nghe sự kiện chỉ một lần
     * @param {string} event - Tên sự kiện
     * @param {Function} handler - Hàm xử lý sự kiện khi sự kiện được phát
     */
    once(event, handler) {
        // Lắng nghe sự kiện nhưng chỉ xử lý một lần, sau khi sự kiện được phát, sẽ tự động hủy
        this.bus.$once(event, handler);
    }

    /**
     * Hủy lắng nghe sự kiện
     * @param {string} event - Tên sự kiện cần hủy
     * @param {Function} handler - Hàm xử lý sự kiện cần hủy (nếu có)
     */
    off(event, handler) {
        // Nếu có handler thì chỉ hủy handler cụ thể, nếu không thì hủy toàn bộ sự kiện
        if (handler) {
            this.bus.$off(event, handler);
        } else {
            this.bus.$off(event); // Hủy tất cả listener của sự kiện này
        }
    }

    /**
     * Kích hoạt sự kiện
     * @param {string} event - Tên sự kiện
     * @param  {...any} args - Các tham số truyền kèm theo khi phát sự kiện
     */
    emit(event, ...args) {
        // Phát sự kiện và truyền các tham số đi kèm
        this.bus.$emit(event, ...args);
    }
}

// Tạo một instance duy nhất của EventBus
const eventBusInstance = new EventBus();

// Định nghĩa plugin để gắn eventBusInstance vào Vue prototype, cho phép sử dụng như this.$bus
export default {
    install(Vue) {
        Vue.prototype.$bus = eventBusInstance;
    },
};

// Xuất instance để có thể sử dụng trực tiếp nếu không muốn inject vào Vue.prototype
export {eventBusInstance as EventBus};
