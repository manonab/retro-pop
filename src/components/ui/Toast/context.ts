"use client"

import { createContext, useContext } from "react";
import { ToastProps } from "./types";

type ToastContextType = {
    openToast: (params: ToastProps) => void;
};

export const ToastContext = createContext<ToastContextType>({
    openToast: () => {},
});

export const useToast = () => {
    return useContext(ToastContext);
};
