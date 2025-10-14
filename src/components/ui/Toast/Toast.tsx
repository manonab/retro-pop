"use client";

import * as RadixToast from "@radix-ui/react-toast";
import { Children, type ReactNode, JSX, RefAttributes } from "react";
import {CheckCircle2, Info, TriangleAlert, XCircle, X as CloseIcon, LucideProps} from "lucide-react";
import { ToastType } from "./types";

const TOAST_DURATION = 5000;


const STYLE: {
    [ToastType.SUCCESS]: {
        bg: string;
        text: string;
        close: string;
        Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    };
    [ToastType.ERROR]: {
        bg: string;
        text: string;
        close: string;
        Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    };
    [ToastType.INFO]: {
        bg: string;
        text: string;
        close: string;
        Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    };
    [ToastType.WARNING]: {
        bg: string;
        text: string;
        close: string;
        Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    }
} = {
    [ToastType.SUCCESS]: { bg: "bg-teal-50",   text: "text-teal-800",   close: "#14B8A6", Icon: CheckCircle2 },
    [ToastType.ERROR]:   { bg: "bg-red-50",    text: "text-red-800",    close: "#F87171", Icon: XCircle },
    [ToastType.INFO]:    { bg: "bg-blue-50",   text: "text-gray-800",   close: "#9CA3AF", Icon: Info },
    [ToastType.WARNING]: { bg: "bg-yellow-50", text: "text-yellow-800", close: "#FACC15", Icon: TriangleAlert },
};

type Props = {
    id: string;
    type: ToastType;
    description: ReactNode;
    isOpen: boolean;
    onClose: (id: string) => void;
    duration?: number;
};

export function Toast({id, type, description, isOpen, onClose, duration = TOAST_DURATION }: Props) {
    const { bg, text, close, Icon } = STYLE[type];

    const content: JSX.Element = <>{Children.toArray(description as any)}</>;

    return (
        <RadixToast.Root
            key={id}
            className={`relative flex w-full items-start gap-5 rounded-md p-4 ${bg}
        shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
        data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
        data-[state=closed]:animate-hide data-[state=open]:animate-slideIn
        data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]`}
            open={isOpen}
            onOpenChange={(open) => { if (!open) onClose(id); }}
            duration={duration}
            data-testid="toast"
        >
            <div data-testid="toastIcon" className="pt-[3px]">
                <Icon />
            </div>

            <RadixToast.Description className={`font-aauxmedium text-base ${text}`}>
                {content}
            </RadixToast.Description>

            <RadixToast.Close aria-label="Fermer" className="absolute right-2.5 top-2.5">
                <CloseIcon aria-hidden color={close} className="h-4 w-4" />
            </RadixToast.Close>
        </RadixToast.Root>
    );
}
