/**
 * Downscales and re-encodes oversized source photos so Astro never has to work
 * from multi-megabyte originals. Run with:
 *   node scripts/normalize-source-images.mjs
 */
import sharp from 'sharp'
import { rename, unlink } from 'node:fs/promises'
import path from 'node:path'

const MAX_EDGE = 1600

/** @type {{ file: string, toJpeg?: boolean }[]} */
const targets = [
    { file: 'src/assets/images/about/industrial-technician.png', toJpeg: true },
    { file: 'src/assets/images/about/pneumatic-components.png', toJpeg: true },
    { file: 'src/assets/images/projects/waterproofing-roof-finished.jpg' },
    {
        file: 'src/assets/images/projects/waterproofing-membrane-application.jpg',
    },
    { file: 'src/assets/images/projects/custom-gear-manufacturing.jpg' },
    { file: 'src/assets/images/projects/stainless-steel-machining.jpg' },
]

for (const { file, toJpeg } of targets) {
    const output = toJpeg ? file.replace(/\.png$/, '.jpg') : `${file}.tmp.jpg`

    const info = await sharp(file)
        .flatten({ background: '#ffffff' })
        .resize({
            width: MAX_EDGE,
            height: MAX_EDGE,
            fit: 'inside',
            withoutEnlargement: true,
        })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(output)

    if (toJpeg) {
        await unlink(file)
    } else {
        await rename(output, file)
    }

    console.log(
        `${path.basename(toJpeg ? output : file)} -> ${info.width}x${info.height} (${(info.size / 1024).toFixed(0)} kB)`
    )
}
