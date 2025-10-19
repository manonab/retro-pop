"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/Input";

export default function SearchBox({ initialQuery = "" }: { initialQuery?: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const sp = useSearchParams();

    return (
        <div className="max-w-xl">
            <Input
                defaultValue={initialQuery}
                placeholder='Chercher… (ex: "Nintendo")'
                onChange={(e) => {
                    const q = e.target.value;
                    const params = new URLSearchParams(sp.toString());
                    if (q) {
                        params.set("q", q);
                        params.delete("page");
                    } else {
                        params.delete("q");
                        params.delete("page");
                    }
                    router.replace(`${pathname}?${params.toString()}`);
                }}
                className="w-full"
            />
        </div>
    );
}
