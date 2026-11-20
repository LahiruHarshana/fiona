import Image from "next/image";

type PropertyImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  quality?: number;
};

export default function PropertyImage({
  src,
  alt,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className = "aspect-[4/3]",
  quality = 82,
}: PropertyImageProps) {
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        className="object-cover"
      />
    </span>
  );
}
