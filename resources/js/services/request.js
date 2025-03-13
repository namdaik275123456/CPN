import api from "./api";

/**
 * Gửi request GET để lấy dữ liệu từ API
 * @param {String} url - Đường dẫn API
 * @param {Object} params - Tham số query gửi kèm
 */
export function getRequest(url, params = {}) {
    return api.get(url, {
        params,
    });
}

/**
 * Gửi request POST để thêm mới dữ liệu
 * @param {String} url - Đường dẫn API
 * @param {Object} data - Dữ liệu cần gửi
 * @param {Object} config - Cấu hình bổ sung (nếu cần)
 */
export function postRequest(url, data, config = {}) {
    return api.post(url, data, config);
}

/**
 * Gửi request PUT để chỉnh sửa dữ liệu
 * @param {String} url - Đường dẫn API
 * @param {Object} data - Dữ liệu cập nhật
 * @param {Object} config - Cấu hình bổ sung (nếu cần)
 */
export function putRequest(url, data, config = {}) {
    return api.put(url, data, config);
}

/**
 * Gửi request PATCH để cập nhật một phần dữ liệu
 * @param {String} url - Đường dẫn API
 * @param {Object} data - Dữ liệu cập nhật
 * @param {Object} config - Cấu hình bổ sung (nếu cần)
 */
export function patchRequest(url, data, config = {}) {
    return api.patch(url, data, config);
}

/**
 * Gửi request DELETE để xóa dữ liệu
 * @param {String} url - Đường dẫn API
 * @param {Object} config - Cấu hình bổ sung (nếu cần)
 */
export function deleteRequest(url, config = {}) {
    return api.delete(url, config);
}

/**
 * Gửi file lên server (hỗ trợ 1 hoặc nhiều file)
 * @param {String} url - Đường dẫn API
 * @param {File|FileList|Array} files - 1 file hoặc danh sách file
 * @param {Object} extraData - Dữ liệu bổ sung gửi kèm
 * @param {Object} config - Cấu hình bổ sung (nếu cần)
 */
export function uploadRequest(url, files, extraData = {}, config = {}) {
    const formData = new FormData();

    if (Array.isArray(files)) {
        files.forEach((file, index) => {
            formData.append(`files[${index}]`, file);
        });
    } else {
        formData.append("file", files);
    }

    // Nếu có thêm dữ liệu khác, thêm vào formData
    Object.keys(extraData).forEach((key) => {
        formData.append(key, extraData[key]);
    });

    return api.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        ...config,
    });
}

/**
 * Gửi request với method tùy chỉnh
 * @param {String} method - Phương thức HTTP (GET, POST, PUT, DELETE, PATCH)
 * @param {String} url - Đường dẫn API
 * @param {Object} data - Dữ liệu cần gửi
 * @param {Object} config - Cấu hình bổ sung (nếu cần)
 */
export function customRequest(method, url, data = {}, config = {}) {
    return api.request({
        method,
        url,
        data,
        ...config,
    });
}
