import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    // base
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background " +
    "disabled:pointer-events-none disabled:opacity-50 " +
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                // SOLID (par défaut) — cohérent avec tokens v4
                default:
                    "bg-primary text-primary-foreground hover:bg-primary-hover shadow-soft hover:shadow-warm hover:scale-[1.02]",

                // Dégradé “cassette” défini dans @theme (--background-image-hero-gradient)
                hero:
                    "bg-hero-gradient text-primary-foreground shadow-warm hover:scale-[1.03]",

                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",

                outline:
                    "border border-border bg-card text-foreground shadow-soft hover:bg-accent hover:text-accent-foreground",

                secondary:
                    "bg-secondary text-secondary-foreground shadow-soft hover:bg-secondary/80",

                ghost:
                    "bg-transparent text-foreground hover:bg-muted hover:text-foreground",

                link: "text-accent underline-offset-4 hover:underline",

                // “Retro” à bandes diagonales (arc-en-ciel Polaroid)
                retro:
                    "bg-rainbow-diag text-primary-foreground border-2 border-primary/20 hover:border-primary shadow-card",

                // Variantes fun DA
                electric:
                    "bg-rainbow-blue text-primary-foreground electric-glow hover:brightness-110",
                cyber:
                    "bg-accent text-accent-foreground cyber-glow hover:brightness-110",
                legendary:
                    "bg-primary text-primary-foreground pulse-rainbow hover:scale-[1.03]",
            },

            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                ref={ref}
                className={cn(buttonVariants({ variant, size, className }))}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
