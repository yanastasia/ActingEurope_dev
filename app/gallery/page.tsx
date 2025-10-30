"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';

interface GalleryImage { url: string; name: string }

export default function GalleryPage() {
  const { t } = useLanguage();
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/gallery/list')
        if (!res.ok) throw new Error('Failed to load gallery')
        const data = await res.json()
        setImages(data.images || [])
      } catch (e) {
        setError(e instanceof Error ? e.message : t('unexpectedError'))
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [])

  return (
    <main className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-center text-4xl font-bold text-secondary-blue md:text-5xl">
          {t('gallery')}
        </h1>
        <p className="mb-12 text-center text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('galleryDescription') || 'Explore moments from the Acting Europe Festival through our collection of photos capturing performances, workshops, and special events.'}
        </p>

        {loading && (
          <div className="text-center text-muted-foreground">{t('loading')}</div>
        )}
        {error && (
          <div className="text-center text-destructive">{error}</div>
        )}
        {!loading && !error && images.length === 0 && (
          <div className="text-center text-muted-foreground">{t('noImagesYet') || 'No images uploaded yet.'}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image.url} className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <Image
                src={image.url}
                alt={image.name || 'Gallery image'}
                fill
                className="object-cover transition-transform hover:scale-105 duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}