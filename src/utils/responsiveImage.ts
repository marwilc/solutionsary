import type { ImageMetadata } from 'astro'

interface ResponsiveImageAttributes {
    widths: number[]
    width: number
}

/**
 * Builds the `widths` and `width` attributes for `<Image>`, clamped to the
 * image's intrinsic size.
 *
 * The project photos come straight from phones and range from 282 px to 1600 px
 * wide. Without clamping, Astro upscales the small ones into files heavier than
 * the originals, and emits a full size fallback for the big ones that no
 * layout ever needs.
 */
export const responsiveImage = (
    image: ImageMetadata,
    candidates: number[]
): ResponsiveImageAttributes => {
    const widths = [
        ...new Set(candidates.map((width) => Math.min(width, image.width))),
    ].sort((a, b) => a - b)

    return { widths, width: widths[widths.length - 1]! }
}
