import { lodgingBusinessJsonLd } from "@/lib/seo";

export default function StructuredData() {
  const json = JSON.stringify(lodgingBusinessJsonLd()).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
