'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'
import { AspectRatio } from '@/components/ui/aspect-ratio'

interface LazyImageProps {
  alt: string
  src: string
  className?: string
  AspectRatioClassName?: string
  fallback?: string
  ratio: number
  inView?: boolean
}

export function LazyImage({
  alt,
  src,
  ratio,
  fallback,
  inView = false,
  className,
  AspectRatioClassName,
}: LazyImageProps) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const imgRef = React.useRef<HTMLImageElement | null>(null)
  const isInView = useInView(ref, { once: true })

  const [imgSrc, setImgSrc] = React.useState<string | undefined>(
    inView ? undefined : src,
  )
  const [isLoading, setIsLoading] = React.useState(true)

  const handleError = () => {
    if (fallback) {
      setImgSrc(fallback)
    }
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  React.useEffect(() => {
    if (inView && isInView && !imgSrc) {
      setImgSrc(src)
    }
  }, [inView, isInView, src, imgSrc])

  React.useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      handleLoad()
    }
  }, [imgSrc])

  return (
    <AspectRatio
      ref={ref}
      ratio={ratio}
      className={cn(
        'relative size-full overflow-hidden rounded-lg border border-border/50',
        AspectRatioClassName,
      )}
    >
      {/* Skeleton / fallback */}
      <motion.div
        className={cn(
          'bg-gradient-to-r from-muted via-muted/50 to-muted absolute inset-0 animate-pulse rounded-lg transition-opacity will-change-[opacity]',
          !isLoading && 'opacity-0',
        )}
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {imgSrc && (
        <motion.img
          ref={imgRef}
          alt={alt}
          src={imgSrc}
          className={cn(
            'size-full rounded-lg object-cover opacity-0 transition-opacity duration-300 will-change-[opacity]',
            !isLoading && 'opacity-100',
            className,
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
          fetchPriority={inView ? 'high' : 'low'}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: !isLoading ? 1 : 0, scale: !isLoading ? 1 : 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </AspectRatio>
  )
}
