import sharp from 'sharp'

const { data, info } = await sharp('src/assets/images/brand/logo-primary.png')
    .flatten({ background: '#ffffff' })
    .raw()
    .toBuffer({ resolveWithObject: true })

const counts = new Map()
for (let i = 0; i < data.length; i += info.channels) {
    const key = `${data[i]},${data[i + 1]},${data[i + 2]}`
    counts.set(key, (counts.get(key) ?? 0) + 1)
}

const toHex = (key) =>
    '#' +
    key
        .split(',')
        .map((n) => Number(n).toString(16).padStart(2, '0'))
        .join('')

;[...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .forEach(([key, count]) =>
        console.log(
            toHex(key),
            key,
            `${((count / (info.width * info.height)) * 100).toFixed(1)}%`
        )
    )
