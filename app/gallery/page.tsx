"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryImage { url: string; name: string }

export default function GalleryPage() {
  const { t } = useLanguage();
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [displayIndex, setDisplayIndex] = useState<number | null>(null)
  const [isFading, setIsFading] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

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

  // Preload adjacent images when modal is open for snappier navigation
  useEffect(() => {
    if (displayIndex === null || images.length === 0) return
    const next = (displayIndex + 1) % images.length
    const prev = (displayIndex - 1 + images.length) % images.length
    try {
      const nextImg = new window.Image()
      nextImg.src = images[next].url
      const prevImg = new window.Image()
      prevImg.src = images[prev].url
    } catch {}
  }, [displayIndex, images])

  // Keyboard navigation for a modern, accessible modal experience
  const goToIndex = (idx: number) => {
    if (images.length === 0) return
    setIsFading(true)
    // Fade out then swap image; fade-in completes on load
    setTimeout(() => {
      setDisplayIndex(idx)
      setIsImageLoaded(false)
    }, 120)
  }

  const goPrev = () => {
    if (displayIndex === null) return
    const prev = (displayIndex - 1 + images.length) % images.length
    goToIndex(prev)
  }

  const goNext = () => {
    if (displayIndex === null) return
    const next = (displayIndex + 1) % images.length
    goToIndex(next)
  }

  useEffect(() => {
    if (selectedIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (images.length === 0) return
      if (e.key === 'ArrowLeft') {
        goPrev()
      } else if (e.key === 'ArrowRight') {
        goNext()
      } else if (e.key === 'Escape') {
        setSelectedIndex(null)
        setDisplayIndex(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedIndex, images, displayIndex])

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
          {images.map((image, idx) => (
            <button
              key={image.url}
              className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow focus:outline-none"
              onClick={() => { setSelectedIndex(idx); setDisplayIndex(idx); setIsImageLoaded(false); setIsFading(false); }}
            >
              <Image
                src={image.url}
                alt={image.name || 'Gallery image'}
                fill
                className="object-cover transition-transform hover:scale-105 duration-300"
                sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                priority={idx < 6}
                unoptimized
              />
            </button>
          ))}
        </div>

        {selectedIndex !== null && displayIndex !== null && images[displayIndex] && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedIndex(null)}
          >
            <div
              className="bg-transparent overflow-visible"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative inline-block group rounded-xl overflow-hidden shadow-2xl">
                {/* Use a native img to let the container fit the photo exactly, eliminating side bars */}
                <img
                  src={images[displayIndex].url}
                  alt={images[displayIndex].name || 'Gallery image'}
                  className={`max-w-[90vw] max-h-[85vh] w-auto h-auto transition-opacity duration-300 ${isFading || !isImageLoaded ? 'opacity-0' : 'opacity-100'}`}
                  decoding="async"
                  onLoad={() => { setIsImageLoaded(true); setIsFading(false); }}
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={goPrev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-white p-2 rounded-full border border-white/30 bg-white/20 backdrop-blur-sm shadow-md hover:bg-white/30 transition"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={goNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-white p-2 rounded-full border border-white/30 bg-white/20 backdrop-blur-sm shadow-md hover:bg-white/30 transition"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}