import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { SanityImage as SanityImageType } from '@/types';

interface SanityImageProps {
  image: SanityImageType | string | Record<string, unknown> | undefined | null;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function SanityImage({ 
  image, 
  alt, 
  fill, 
  width, 
  height, 
  className, 
  sizes, 
  priority 
}: SanityImageProps) {
  if (!image) return null;

  let src = '';
  try {
    if (typeof image === 'string') {
      src = image; 
      // Sadece Sanity CDN linkleriyse formatı WebP'ye zorla
      if (src.includes('cdn.sanity.io') && !src.includes('fm=')) {
        src += src.includes('?') ? '&fm=webp' : '?fm=webp';
      }
    } else if (image.asset) {
      src = urlFor(image).format('webp').url();
    }
  } catch {
    return null;
  }

  if (!src) return null;

  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={true} 
    />
  );
}
