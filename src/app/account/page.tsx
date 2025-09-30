import Account from "@/components/account/Account";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Mon compte",
};

export default function Page() {
    return <Account />;
}
