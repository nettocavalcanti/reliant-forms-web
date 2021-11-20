import { ToastsStore } from 'react-toasts';

function error(msg) {
    ToastsStore.error(msg);
}

function success(msg) {
    ToastsStore.success(msg);
}

function warning(msg) {
    ToastsStore.info(msg);
}

const ToastMessage = {
    error: error,
    success: success,
    warning: warning
}

export default ToastMessage;