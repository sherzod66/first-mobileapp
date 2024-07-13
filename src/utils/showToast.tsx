import Toast from "react-native-toast-message";

export const showErrToast = (text: string) => {
  Toast.show({
    type: "error",
    position: "top",
    autoHide: true,
    text1: text,
    topOffset: 50,
    // @ts-ignore
    duration: 3000,
  });
};

export const showSuccessToast = (text: string) => {
  Toast.show({
    type: "success",
    position: "top",
    autoHide: true,
    text1: text,
    topOffset: 50,
    // @ts-ignore
    duration: 3000,
  });
};
