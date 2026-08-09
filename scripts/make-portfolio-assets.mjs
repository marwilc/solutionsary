/**
 * Builds portfolio-ready 1024x768 (4:3) images with a browser chrome mockup.
 * Run: node scripts/make-portfolio-assets.mjs
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const OUT = 'portfolio-assets'
const W = 1024
const H = 768
const NAVY = '#0a3143'
const SHOTS_DIR =
    '/var/folders/cr/8cfmk18d5j7b0v49scdy7lrc0000gn/T/cursor/screenshots'

const shots = [
    {
        src: path.join(SHOTS_DIR, 'portfolio-raw-hero.png'),
        out: '01-thumbnail-hero-1024x768.png',
    },
    {
        src: path.join(SHOTS_DIR, 'portfolio-raw-projects.png'),
        out: '02-projects-1024x768.png',
    },
    {
        src: path.join(SHOTS_DIR, 'portfolio-raw-services.png'),
        out: '03-services-cta-1024x768.png',
    },
    {
        src: path.join(SHOTS_DIR, 'portfolio-raw-contact.png'),
        out: '04-contact-1024x768.png',
    },
]

await mkdir(OUT, { recursive: true })

/** Trim trailing white / near-white columns from browser panel screenshots. */
async function trimRightWhitespace(inputPath) {
    const { data, info } = await sharp(inputPath)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true })

    const { width, height, channels } = info
    let contentRight = 0

    for (let x = width - 1; x >= 0; x -= 1) {
        let nonWhite = 0
        for (let y = 0; y < height; y += 8) {
            const i = (y * width + x) * channels
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]
            if (r < 245 || g < 245 || b < 245) nonWhite += 1
            if (nonWhite > 3) break
        }
        if (nonWhite > 3) {
            contentRight = x
            break
        }
    }

    // Keep a tiny breathing edge, but never wider than the useful UI.
    const cropWidth = Math.min(width, Math.max(900, contentRight + 12))

    return sharp(inputPath).extract({
        left: 0,
        top: 0,
        width: cropWidth,
        height,
    })
}

async function browserChrome(innerWidth, innerHeight) {
    const barH = 36
    const pad = 12
    const radius = 14
    const totalW = innerWidth + pad * 2
    const totalH = innerHeight + barH + pad

    // Traffic lights
    const dots = await Promise.all(
        ['#ff5f57', '#febc2e', '#28c840'].map(async (color, index) => ({
            input: await sharp({
                create: {
                    width: 10,
                    height: 10,
                    channels: 4,
                    background: color,
                },
            })
                .png()
                .toBuffer(),
            left: 18 + index * 16,
            top: 13,
        }))
    )

    const urlPill = await sharp({
        create: {
            width: Math.min(420, totalW - 120),
            height: 18,
            channels: 4,
            background: '#e8eef2',
        },
    })
        .png()
        .toBuffer()

    const chrome = await sharp({
        create: {
            width: totalW,
            height: totalH,
            channels: 4,
            background: '#f4f7f9',
        },
    })
        .composite([
            ...dots,
            {
                input: urlPill,
                left: Math.round((totalW - Math.min(420, totalW - 120)) / 2),
                top: 9,
            },
        ])
        .png()
        .toBuffer()

    return { chrome, barH, pad, totalW, totalH, radius }
}

for (const shot of shots) {
    const trimmed = await trimRightWhitespace(shot.src)
    const trimmedMeta = await trimmed.metadata()

    // Fit the screenshot into the mockup viewport area.
    const maxInnerW = 920
    const maxInnerH = 620
    const fitted = await trimmed
        .clone()
        .resize({
            width: maxInnerW,
            height: maxInnerH,
            fit: 'inside',
            withoutEnlargement: false,
        })
        .png()
        .toBuffer({ resolveWithObject: true })

    const innerW = fitted.info.width
    const innerH = fitted.info.height
    const { chrome, barH, pad, totalW, totalH } = await browserChrome(
        innerW,
        innerH
    )

    const windowBuf = await sharp(chrome)
        .composite([
            {
                input: fitted.data,
                left: pad,
                top: barH,
            },
        ])
        .png()
        .toBuffer()

    // Soft drop shadow layer
    const shadowPad = 28
    const canvasW = totalW + shadowPad * 2
    const canvasH = totalH + shadowPad * 2
    const shadow = await sharp({
        create: {
            width: totalW,
            height: totalH,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0.28 },
        },
    })
        .blur(18)
        .png()
        .toBuffer()

    const framed = await sharp({
        create: {
            width: canvasW,
            height: canvasH,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
    })
        .composite([
            { input: shadow, left: shadowPad + 4, top: shadowPad + 10 },
            { input: windowBuf, left: shadowPad, top: shadowPad },
        ])
        .png()
        .toBuffer()

    // Place framed window on brand navy 1024x768 canvas.
    const framedMeta = await sharp(framed).metadata()
    const scale = Math.min(
        (W - 64) / (framedMeta.width ?? 1),
        (H - 64) / (framedMeta.height ?? 1)
    )
    const scaled = await sharp(framed)
        .resize({
            width: Math.round((framedMeta.width ?? 1) * scale),
            height: Math.round((framedMeta.height ?? 1) * scale),
        })
        .png()
        .toBuffer({ resolveWithObject: true })

    const left = Math.round((W - scaled.info.width) / 2)
    const top = Math.round((H - scaled.info.height) / 2)

    await sharp({
        create: {
            width: W,
            height: H,
            channels: 3,
            background: NAVY,
        },
    })
        .composite([{ input: scaled.data, left, top }])
        .png({ compressionLevel: 9 })
        .toFile(path.join(OUT, shot.out))

    console.log(
        `${shot.out} <- ${trimmedMeta.width}x${trimmedMeta.height} (trimmed)`
    )
}

console.log(`Done. Files in ${OUT}/`)
