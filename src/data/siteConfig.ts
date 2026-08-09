export interface NavigationLink {
    label: string
    href: string
}

const whatsappNumber = '584144126277'
const whatsappMessage =
    'Hola Solutionsary, necesito una cotización para mi empresa.'

export const siteConfig = {
    name: 'Solutionsary',
    legalName: 'Solutions Ary',
    tagline: 'Todas las soluciones industriales en un solo lugar',
    description:
        'Suministros industriales, mantenimiento eléctrico y neumático, obras civiles y tornería en Valencia, Carabobo. Repuestos de marcas líderes con asesoría técnica y servicio post venta.',
    url: 'https://solutionsary.com',
    locale: 'es_VE',
    lang: 'es',
    foundingYear: 2018,

    contact: {
        email: 'supplies@solutionsary.com',
        phoneDisplay: '0414-4126277',
        phoneLink: '+584144126277',
        whatsappNumber,
        whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
        address: {
            street: 'Calle Los Mijaos, Local Nro 89-21, Urb. Trigal Sur',
            city: 'Valencia',
            region: 'Carabobo',
            country: 'Venezuela',
            countryCode: 'VE',
        },
        mapQuery: 'Urbanización Trigal Sur, Valencia, Carabobo, Venezuela',
        openingHours: 'Lunes a viernes, 8:00 a. m. – 5:00 p. m.',
    },

    social: {
        instagram: 'https://www.instagram.com/solutionsary/',
    },

    /**
     * Endpoint used by the contact form. Formspree keeps the site fully static,
     * which is required because the site is deployed to shared hosting with no
     * server side runtime guaranteed.
     */
    contactFormEndpoint: 'https://formspree.io/f/REEMPLAZAR_ID',
} as const

export const navigationLinks: NavigationLink[] = [
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Aliados', href: '#aliados' },
    { label: 'Contacto', href: '#contacto' },
]

export const buildWhatsappUrl = (message: string): string =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
