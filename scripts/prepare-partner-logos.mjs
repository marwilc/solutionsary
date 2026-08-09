/**
 * Normalizes the partner logos downloaded from the legacy Canva site into a
 * consistent set of trimmed, transparent PNGs with a uniform height.
 *
 * Run once with: node scripts/prepare-partner-logos.mjs
 * Source files are expected in /tmp/partner-logos (see README).
 */
import sharp from 'sharp'
import path from 'node:path'
import { mkdir } from 'node:fs/promises'

const SOURCE_DIR = '/tmp/partner-logos'
const OUTPUT_DIR = 'src/assets/images/partners'
const TARGET_HEIGHT = 160

/** @type {{ index: number, slug: string, invert?: boolean, crop?: 'top' | 'bottom' }[]} */
const logos = [
    { index: 22, slug: 'apollo-valves' },
    { index: 7, slug: 'yaxun' },
    { index: 18, slug: 'aralven', invert: true },
    { index: 8, slug: 'festo' },
    { index: 11, slug: 'hansen-technologies' },
    { index: 26, slug: 'hyundai' },
    { index: 13, slug: 'stanley' },
    { index: 10, slug: 'link-belt' },
    { index: 16, slug: 'gates' },
    { index: 4, slug: 'baumer' },
    { index: 19, slug: 'sigma-cable' },
    { index: 25, slug: 'elecon' },
    { index: 5, slug: 'omron' },
    { index: 23, slug: 'alcave' },
    { index: 6, slug: 'honeywell' },
    { index: 9, slug: 'abb' },
    { index: 12, slug: 'allen-bradley' },
    { index: 14, slug: 'avic' },
    { index: 15, slug: 'exceline' },
    { index: 17, slug: 'endress-hauser', crop: 'top' },
    { index: 17, slug: 'telemecanique', crop: 'bottom' },
    { index: 20, slug: 'cabel' },
    { index: 21, slug: 'autonics' },
]

await mkdir(OUTPUT_DIR, { recursive: true })

for (const { index, slug, invert, crop } of logos) {
    const source = path.join(
        SOURCE_DIR,
        `partner-${String(index).padStart(2, '0')}.png`
    )

    let pipeline = sharp(source).ensureAlpha()

    if (crop) {
        const { width = 0, height = 0 } = await sharp(source).metadata()
        // This source packs two brands into a single asset, split roughly at 72%.
        const splitAt = Math.round(height * 0.72)
        pipeline = pipeline.extract({
            left: 0,
            top: crop === 'top' ? 0 : splitAt,
            width,
            height: crop === 'top' ? splitAt : height - splitAt,
        })
    }

    if (invert) {
        // The source is a white knockout logo, unusable on a light background.
        pipeline = pipeline.negate({ alpha: false })
    }

    const info = await pipeline
        .trim({ threshold: 12 })
        .resize({
            height: TARGET_HEIGHT,
            fit: 'inside',
            withoutEnlargement: false,
        })
        .png({ compressionLevel: 9, palette: true })
        .toFile(path.join(OUTPUT_DIR, `${slug}.png`))

    console.log(`${slug}.png -> ${info.width}x${info.height} (${info.size} B)`)
}
