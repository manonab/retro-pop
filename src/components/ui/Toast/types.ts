import {JSX, ReactNode} from "react";

export enum ToastType {
    SUCCESS = "success",
    ERROR = "error",
    INFO = "info",
    WARNING = "warning",
}

export type ToastProps = {
    type: ToastType;
    description: ReactNode | JSX.Element;
};

export type ToastItem = ToastProps & { id: string; isOpen: boolean };
