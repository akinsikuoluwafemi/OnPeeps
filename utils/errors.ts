import {
  ToastContainer,
  toast,
  TypeOptions,
  ToastPosition,
  Theme,
} from "react-toastify";

export const notify = (
  message: string,
  type: TypeOptions = "info",
  position: ToastPosition = "top-right",
  theme: Theme = "light"
) => {
  toast(message, {
    type,
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
  });

  return null;
};
