import { defaultLocale } from "@/i18n/routing";
import { permanentRedirect } from "next/navigation";

export default function Home() {
  permanentRedirect(`/${defaultLocale}`);
}
