"use client";

import * as RadixToast from "@radix-ui/react-toast";
import { PropsWithChildren, useCallback, useState, Children } from "react";
import { ToastContext } from "./context";
import { Toast } from "./Toast";
import type { ToastItem, ToastProps } from "./types";

export function AppToastProvider({ children }: PropsWithChildren) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const openToast = useCallback((params: ToastProps) => {
        const id = Math.random().toString(32).slice(2);
        const newToast: ToastItem = { id, isOpen: true, ...params };
        setToasts((curr) => [...curr, newToast]);
    }, []);

    const closeToast = useCallback((id: string) => {
        setToasts((curr) => curr.map(t => (t.id === id ? { ...t, isOpen: false } : t)));
        setTimeout(() => setToasts((curr) => curr.filter(t => t.id !== id)), 220);
    }, []);

    const toastNodes = (
        <>
            {Children.toArray(toasts.map(t => <Toast onClose={closeToast} {...t} />))}

        </>
    );

    return (
        <ToastContext.Provider value={{ openToast }}>
            <RadixToast.Provider>
                <>
                    {children}
                    {toastNodes}
                    <RadixToast.Viewport className="fixed right-4 top-6 z-[2147483647] flex w-[390px] max-w-[100vw] list-none flex-col gap-2 outline-none" />
                </>
            </RadixToast.Provider>
        </ToastContext.Provider>
    );
}
