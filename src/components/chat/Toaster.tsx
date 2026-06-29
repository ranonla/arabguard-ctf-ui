import { Toaster } from "react-hot-toast";

const baseOptions = {
  duration: 1500,
  icon: <img src="/logo.svg" alt="ModdieView icon" width="18" height="18" />,
  style: {
    transform: "none",
    animation: "none",
    background: "rgba(0, 0, 0, 0.45)",
    color: "#fff",
    borderRadius: "8px",
    padding: "10px 15px",
    fontSize: "14px",
  },
};

export const ChatToaster = () => {
    return (
      <Toaster
        toasterId="global-toaster"
        toastOptions={baseOptions}
        position="bottom-center"
      />
    )
}