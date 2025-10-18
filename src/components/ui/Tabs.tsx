"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

/* ========= Root ========= */
const Tabs = TabsPrimitive.Root;

/* ========= Variants & sizes ========= */
type TabsVariant = "vhs" | "pill" | "underline";
type TabsSize = "sm" | "md";

const listBase =
    "inline-flex items-center justify-start gap-1 rounded-xl bg-card/80 backdrop-blur border border-border p-1 text-muted-foreground";
const listSize: Record<TabsSize, string> = {
    sm: "h-10",
    md: "h-12",
};

const triggerBase =
    "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--retro-violet))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
const triggerSize: Record<TabsSize, string> = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-sm rounded-lg",
};

/* ACTIVE styles selon variant (utilise data-[state=active]) */
const triggerVariant: Record<TabsVariant, string> = {
    vhs: cn(
        "data-[state=active]:text-white data-[state=active]:shadow",
        "data-[state=active]:bg-[linear-gradient(120deg,hsl(var(--retro-violet)),hsl(var(--retro-rose)))]"
    ),
    pill: cn(
        "data-[state=active]:text-[hsl(var(--retro-violet))] data-[state=active]:bg-white",
        "data-[state=active]:border data-[state=active]:border-[hsl(var(--retro-violet))]"
    ),
    underline: cn(
        "rounded-none",
        "relative after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:scale-x-0 after:rounded",
        "after:bg-[linear-gradient(90deg,hsl(var(--retro-violet)),hsl(var(--retro-rose)),hsl(var(--retro-blue)))]",
        "data-[state=active]:text-[hsl(var(--foreground))] data-[state=active]:after:scale-x-100",
        "after:transition-transform after:origin-left"
    ),
};

/* ========= TabsList ========= */
type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    size?: TabsSize;
    variant?: TabsVariant;
    fullWidth?: boolean; // répartit l'espace
    classNameInner?: string; // pour wrapper interne flex
};
const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    TabsListProps
>(({ className, classNameInner, size = "md", variant = "vhs", fullWidth = false, children, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(listBase, listSize[size], variant === "underline" && "rounded-md", className)}
        {...props}
    >
        <div className={cn("flex gap-1", fullWidth && "w-full *:flex-1", classNameInner)}>
            {children}
        </div>
    </TabsPrimitive.List>
));
TabsList.displayName = TabsPrimitive.List.displayName;

/* ========= TabsTrigger ========= */
type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    size?: TabsSize;
    variant?: TabsVariant;
};
const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    TabsTriggerProps
>(({ className, size = "md", variant = "vhs", ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(triggerBase, triggerSize[size], triggerVariant[variant], className)}
        {...props}
    />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/* ========= TabsContent ========= */
const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--retro-violet))] focus-visible:ring-offset-2",
            className
        )}
        {...props}
    />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
