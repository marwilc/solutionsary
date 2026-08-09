export interface Service {
    id: string
    /** Icon name from the lucide collection. */
    icon: string
    title: string
    description: string
    highlights: string[]
}

export const services: Service[] = [
    {
        id: 'industrial-maintenance',
        icon: 'lucide:cog',
        title: 'Mantenimiento industrial',
        description:
            'Mantenimiento preventivo y correctivo de líneas de producción, con intervención eléctrica, neumática e hidráulica.',
        highlights: [
            'Diagnóstico en sitio',
            'Preventivo y correctivo',
            'Paradas de planta programadas',
        ],
    },
    {
        id: 'industrial-supplies',
        icon: 'lucide:package-search',
        title: 'Suministros industriales',
        description:
            'Venta y distribución de repuestos de marcas líderes en el área hidráulica, eléctrica, instrumentación, refrigeración, calderas y neumática.',
        highlights: [
            'Marcas nacionales e importadas',
            'Búsqueda de repuestos difíciles',
            'Asesoría técnica antes de comprar',
        ],
    },
    {
        id: 'civil-works',
        icon: 'lucide:hard-hat',
        title: 'Obras civiles',
        description:
            'Construcción, albañilería, instalaciones eléctricas, fontanería, soldadura e impermeabilización para instalaciones industriales.',
        highlights: [
            'Impermeabilización de techos',
            'Vaciado de losas y estructuras',
            'Instalaciones eléctricas y sanitarias',
        ],
    },
    {
        id: 'machining',
        icon: 'lucide:circle-dot-dashed',
        title: 'Tornería y mecanizado',
        description:
            'Fabricación de piezas a la medida, piñones, ejes y bujes, además de trabajos de soldadura en acero inoxidable.',
        highlights: [
            'Piezas bajo plano o muestra',
            'Acero inoxidable y aleaciones',
            'Recuperación de piezas críticas',
        ],
    },
]

export interface Differentiator {
    icon: string
    title: string
    description: string
}

export const differentiators: Differentiator[] = [
    {
        icon: 'lucide:layout-grid',
        title: 'Todas las soluciones en un mismo lugar',
        description:
            'Suministro, mantenimiento, obra civil y fabricación de piezas con un solo interlocutor. Menos proveedores, menos tiempo perdido coordinando.',
    },
    {
        icon: 'lucide:truck',
        title: 'Red de proveedores propia',
        description:
            'Trabajamos de la mano con marcas nacionales e internacionales, lo que nos permite garantizar la calidad y el origen de cada repuesto.',
    },
    {
        icon: 'lucide:wrench',
        title: 'Personal técnico calificado',
        description:
            'Nuestro equipo conoce el material industrial que vende. Eso se traduce en mejor asesoría, servicio post venta real y menos reprocesos.',
    },
]

export interface Metric {
    value: string
    label: string
}

export const metrics: Metric[] = [
    { value: '+23', label: 'Marcas representadas' },
    { value: '4', label: 'Líneas de servicio' },
    { value: '24 h', label: 'Respuesta a solicitudes' },
    { value: '100 %', label: 'Asesoría técnica incluida' },
]

export const industries: string[] = [
    'Alimentos y bebidas',
    'Plásticos',
    'Petroquímica',
    'Metalmecánica',
    'Refrigeración',
    'Tratamiento de aguas',
]
