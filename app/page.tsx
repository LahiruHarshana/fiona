import SriLankanCinematicHome from "@/components/SriLankanCinematicHome";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("home");

export default function Home() {
  return <SriLankanCinematicHome />;
}
