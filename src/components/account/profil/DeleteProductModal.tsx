"use client";

import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import {ToastType, useToast} from "@/components/ui/Toast";

type DeleteProductModalProps = {
    productId: string;
    productTitle?: string;
    trigger: React.ReactElement;
    onDeleted?: () => void;
    invalidateKeys?: (string | unknown[])[];
    userId: string;
};

export default function DeleteProductModal({
                                               productId,
                                               productTitle,
                                               trigger,
                                               onDeleted,
                                               userId
                                           }: DeleteProductModalProps) {
    const [open, setOpen] = React.useState(false);
    const [confirming, setConfirming] = React.useState(false);
    const { openToast } = useToast();
    const qc = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            const { error } = await supabase.from("products").delete().eq("id", productId);
            if (error) throw error;
        },
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ["my-products", userId] });
            openToast({
                type: ToastType.SUCCESS,
                description: productTitle
                    ? <>“{productTitle}” a été supprimée.</>
                    : <>Annonce supprimée.</>,
            });
            setOpen(false);
            setConfirming(false);
            onDeleted?.();
        },
        onError: (err: any) => {
            openToast({
                type: ToastType.ERROR,
                description: <>Erreur de suppression : {err.message}</>,
            });
            setConfirming(false);
        },
    });

    const handleDelete = () => {
        if (confirming) return;
        setConfirming(true);
        mutation.mutate();
    };

    return (
        <Dialog open={open} onOpenChange={(v) => !confirming && setOpen(v)}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Supprimer cette annonce ?</DialogTitle>
                    <DialogDescription>
                        {productTitle
                            ? `“${productTitle}” sera définitivement supprimée. Cette action est irréversible.`
                            : "Cette annonce sera définitivement supprimée. Cette action est irréversible."}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="gap-2 sm:gap-2">
                    <Button variant="outline" disabled={confirming} onClick={() => setOpen(false)}>
                        Annuler
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={confirming}
                    >
                        {confirming ? "Suppression..." : "Supprimer"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
