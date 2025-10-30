"use client";
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

interface RandomizedGalleryProps {
  images?: GalleryImage[];
  count?: number;
}

export function RandomizedGallery({ images, count = 5 }: RandomizedGalleryProps) {
  const [fetchedImages, setFetchedImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If images are not provided via props, fetch from the gallery API
    if (!images || images.length === 0) {
      const load = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch('/api/gallery/list');
          if (!res.ok) throw new Error('Failed to load gallery');
          const data = await res.json();
          const apiImages: { url: string; name: string }[] = data.images || [];
          const mapped: GalleryImage[] = apiImages.map((img, idx) => ({
            id: idx,
            src: img.url,
            alt: img.name || 'Gallery image',
          }));
          setFetchedImages(mapped);
        } catch (e: any) {
          setError(e?.message || 'Unexpected error');
          setFetchedImages([]);
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, [images]);

  // Choose source images: prefer props if provided, else fetched
  const sourceImages = images && images.length > 0 ? images : fetchedImages;

  // Shuffle and select random subset memoized on sourceImages changes
  const randomImages = useMemo(() => {
    if (!sourceImages || sourceImages.length === 0) return [];
    const shuffled = [...sourceImages].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }, [sourceImages, count]);

  if (loading && randomImages.length === 0) {
    return null;
  }

  if (error && randomImages.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-5 gap-4 mx-auto max-w-fit">
      {randomImages.map((image) => (
        <div key={image.id} className="h-96 relative overflow-hidden rounded-md">
          <Image
            src={image.src}
            alt={image.alt}
            width={220}
            height={310}
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}