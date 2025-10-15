import Dashboard from "@/components/account/Dashboard";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Mon compte",
};

export default function Page() {
    return <Dashboard />;
}
