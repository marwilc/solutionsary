/**
 * Generates the favicon set and the Open Graph image from the logo artwork.
 * Run with: node scripts/generate-brand-assets.mjs
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const LOGO = 'src/assets/images/brand/logo-primary.png'
const LOGO_MONO = 'src/assets/images/brand/logo-mono.png'
const LOGO_WHITE = 'src/assets/images/brand/logo-white.png'
const PUBLIC_DIR = 'public'
const NAVY = '#0a3143'

await mkdir(PUBLIC_DIR, { recursive: true })

/*
 * The supplied "negativo" artwork is a navy monochrome lockup, not a white
 * knockout, so the white variant needed for dark backgrounds is derived from
 * the artwork's own alpha channel.
 */
{
    const { width = 0, height = 0 } = await sharp(LOGO_MONO).metadata()
    const alpha = await sharp(LOGO_MONO)
        .ensureAlpha()
        .extractChannel(3)
        .raw()
        .toBuffer()

    await sharp({
        create: {
            width,
            height,
            channels: 3,
            background: '#ffffff',
        },
    })
        .joinChannel(alpha, { raw: { width, height, channels: 1 } })
        .png()
        .toFile(LOGO_WHITE)
}

const squareIcon = async (size, padding, background) => {
    const inner = size - padding * 2
    const logo = await sharp(LOGO)
        .trim()
        .resize(inner, inner, {
            fit: 'inside',
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .toBuffer()
    const { width = inner, height = inner } = await sharp(logo).metadata()

    return sharp({
        create: {
            width: size,
            height: size,
            channels: 4,
            background,
        },
    })
        .composite([
            {
                input: logo,
                left: Math.round((size - width) / 2),
                top: Math.round((size - height) / 2),
            },
        ])
        .png()
        .toBuffer()
}

const transparent = { r: 0, g: 0, b: 0, alpha: 0 }

await sharp(await squareIcon(32, 2, transparent)).toFile(
    `${PUBLIC_DIR}/favicon-32x32.png`
)
await sharp(await squareIcon(16, 1, transparent)).toFile(
    `${PUBLIC_DIR}/favicon-16x16.png`
)
await sharp(
    await squareIcon(180, 22, { r: 255, g: 255, b: 255, alpha: 1 })
).toFile(`${PUBLIC_DIR}/apple-touch-icon.png`)
await sharp(
    await squareIcon(192, 20, { r: 255, g: 255, b: 255, alpha: 1 })
).toFile(`${PUBLIC_DIR}/icon-192.png`)
await sharp(
    await squareIcon(512, 56, { r: 255, g: 255, b: 255, alpha: 1 })
).toFile(`${PUBLIC_DIR}/icon-512.png`)

// Open Graph card: white logo centred on the brand navy.
const ogLogo = await sharp(LOGO_WHITE)
    .trim()
    .resize(620, 200, { fit: 'inside', background: transparent })
    .toBuffer()
const ogMeta = await sharp(ogLogo).metadata()

const ogText = await sharp({
    text: {
        text: '<span foreground="#8fc6dc" size="26pt" letter_spacing="6000">SUMINISTROS · MANTENIMIENTO · OBRAS CIVILES · TORNERÍA</span>',
        rgba: true,
        width: 1080,
        align: 'center',
    },
})
    .png()
    .toBuffer()
const ogTextMeta = await sharp(ogText).metadata()

await sharp({
    create: { width: 1200, height: 630, channels: 4, background: NAVY },
})
    .composite([
        {
            input: ogLogo,
            left: Math.round((1200 - (ogMeta.width ?? 0)) / 2),
            top: 180,
        },
        {
            input: ogText,
            left: Math.round((1200 - (ogTextMeta.width ?? 0)) / 2),
            top: 420,
        },
    ])
    .png()
    .toFile(`${PUBLIC_DIR}/og-image.png`)

console.log('Brand assets generated in public/')
