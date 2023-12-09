import { ToastOptions, toast } from 'react-toastify';

const toastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};
export const ErrorAlert = (data: string) => {
  toast.error(data, toastOptions);
};
export const SuccessAlert = (data: string) => {
  toast.success(data, toastOptions);
};
export const WarningAlert = (data: string) => {
  toast.warning(data, toastOptions);
};
