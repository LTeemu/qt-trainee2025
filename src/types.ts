export type AlertType = "success" | "error" | "info";

export type AlertState = {
    type: AlertType;
    message: string | React.ReactNode;
    isVisible: boolean;
};

export type AlertProps = {
    type: AlertType;
    message: string | React.ReactNode;
    onClose: () => void;
    containerClassName?: string;
    title?: string;
};

export type ProtectedRouteProps = {
    element: React.ReactElement;
};