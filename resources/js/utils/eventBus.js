import Vue from 'vue';

class EventBus {
	constructor() {
		if (!EventBus.instance) {
			this.bus = new Vue();
			EventBus.instance = this;
		}
		return EventBus.instance;
	}

	/**
	 * Đăng ký lắng nghe sự kiện
	 * @param {string} event
	 * @param {Function} handler
	 */
	on(event, handler) {
		this.bus.$on(event, handler);
	}

	/**
	 * Đăng ký lắng nghe sự kiện 1 lần
	 * @param {string} event
	 * @param {Function} handler
	 */
	once(event, handler) {
		this.bus.$once(event, handler);
	}

	/**
	 * Hủy lắng nghe sự kiện
	 * @param {string} event
	 * @param {Function} handler
	 */
	off(event, handler) {
		if (handler) {
			this.bus.$off(event, handler);
		} else {
			this.bus.$off(event);
		}
	}

	/**
	 * Kích hoạt sự kiện
	 * @param {string} event
	 * @param  {...any} args
	 */
	emit(event, ...args) {
		this.bus.$emit(event, ...args);
	}
}

// Tạo một instance duy nhất
const eventBusInstance = new EventBus();

export default {
	install(Vue) {
		Vue.prototype.$bus = eventBusInstance;
	},
};

// Xuất instance để có thể dùng trực tiếp nếu không muốn inject vào Vue.prototype
export { eventBusInstance as EventBus };
