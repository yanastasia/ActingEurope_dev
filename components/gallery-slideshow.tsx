"use client";
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

interface GallerySlideshowProps {
  count?: number;
  intervalMs?: number;
}

export function GallerySlideshow({ count = 10, intervalMs = 3000 }: GallerySlideshowProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        // Shuffle and limit to count
        const shuffled = [...mapped].sort(() => 0.5 - Math.random());
        setImages(shuffled.slice(0, count));
      } catch (e: any) {
        setError(e?.message || 'Unexpected error');
        setImages([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [count]);

  useEffect(() => {
    if (!images.length) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images, intervalMs]);

  const goPrev = () => {
    if (!images.length) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goNext = () => {
    if (!images.length) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (loading || error || images.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        {images.map((img, i) => (
          <div
            key={img.id}
            className={`absolute inset-0 transition-opacity duration-700 ${i === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              priority={i === currentIndex}
            />
          </div>
        ))}

        {/* Controls */}
        <button
          aria-label="Previous image"
          onClick={goPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next image"
          onClick={goNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrentIndex(i)}
            className={`w-2.5 h-2.5 rounded-full ${i === currentIndex ? 'bg-primary-gold' : 'bg-muted-foreground/40'}`}
          />
        ))}
      </div>
    </div>
  );
}