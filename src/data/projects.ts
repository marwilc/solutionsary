import type { ImageMetadata } from 'astro'

import civilWorksWallAfter from '@images/projects/civil-works-wall-after.jpg'
import civilWorksWallBefore from '@images/projects/civil-works-wall-before.jpg'
import concreteSlabPouring from '@images/projects/concrete-slab-pouring.jpg'
import customGearManufacturing from '@images/projects/custom-gear-manufacturing.jpg'
import industrialEquipmentAfter from '@images/projects/industrial-equipment-after.jpg'
import industrialEquipmentBefore from '@images/projects/industrial-equipment-before.jpg'
import machiningWeldingAfter from '@images/projects/machining-welding-after.png'
import machiningWeldingBefore from '@images/projects/machining-welding-before.png'
import pipelineInsulation from '@images/projects/pipeline-insulation.jpg'
import plantPipingAfter from '@images/projects/plant-piping-after.jpg'
import plantPipingBefore from '@images/projects/plant-piping-before.jpg'
import stainlessSteelMachining from '@images/projects/stainless-steel-machining.jpg'
import waterproofingMembraneApplication from '@images/projects/waterproofing-membrane-application.jpg'
import waterproofingRoofFinished from '@images/projects/waterproofing-roof-finished.jpg'

export type ProjectCategory =
    'Obras civiles' | 'Mantenimiento' | 'Tornería' | 'Impermeabilización'

interface ProjectImage {
    src: ImageMetadata
    alt: string
}

export interface Project {
    id: string
    title: string
    category: ProjectCategory
    summary: string
    /** When a "before" image exists the card renders an interactive comparison. */
    before?: ProjectImage
    after: ProjectImage
}

export const projects: Project[] = [
    {
        id: 'civil-works-access-stairs',
        title: 'Recuperación de muro y escalera de acceso',
        category: 'Obras civiles',
        summary:
            'Demolición del muro agrietado, vaciado nuevo, acabado en friso y señalización de peldaños según norma de seguridad.',
        before: {
            src: civilWorksWallBefore,
            alt: 'Muro de concreto agrietado y desprendido antes de la intervención',
        },
        after: {
            src: civilWorksWallAfter,
            alt: 'Muro reconstruido con friso gris y escalera de acceso señalizada en amarillo',
        },
    },
    {
        id: 'industrial-equipment-overhaul',
        title: 'Reacondicionamiento de equipo de proceso',
        category: 'Mantenimiento',
        summary:
            'Desmontaje, reparación estructural, cambio de accionamiento y pintura de protección del equipo en sitio.',
        before: {
            src: industrialEquipmentBefore,
            alt: 'Técnicos desmontando el interior de un equipo de proceso deteriorado',
        },
        after: {
            src: industrialEquipmentAfter,
            alt: 'Equipo de proceso reacondicionado y pintado, con nuevo accionamiento amarillo',
        },
    },
    {
        id: 'plant-piping-refurbishment',
        title: 'Rehabilitación de tuberías de planta',
        category: 'Mantenimiento',
        summary:
            'Sustitución de tramos corroídos, reordenamiento del tendido y codificación por colores de las líneas de servicio.',
        before: {
            src: plantPipingBefore,
            alt: 'Tuberías corroídas y desordenadas junto a un tanque de proceso',
        },
        after: {
            src: plantPipingAfter,
            alt: 'Tuberías rehabilitadas y codificadas por color en el área de tanques',
        },
    },
    {
        id: 'machining-bearing-housing',
        title: 'Recuperación de alojamiento de rodamiento',
        category: 'Tornería',
        summary:
            'Relleno por soldadura y mecanizado posterior para devolver la tolerancia original a una pieza crítica de producción.',
        before: {
            src: machiningWeldingBefore,
            alt: 'Proceso de relleno por soldadura sobre el alojamiento de un rodamiento',
        },
        after: {
            src: machiningWeldingAfter,
            alt: 'Alojamiento de rodamiento mecanizado y listo para montaje',
        },
    },
    {
        id: 'roof-waterproofing',
        title: 'Impermeabilización de techo industrial',
        category: 'Impermeabilización',
        summary:
            'Aplicación de manto asfáltico con soplete sobre losa de galpón, incluyendo tratamiento de juntas y remates.',
        before: {
            src: waterproofingMembraneApplication,
            alt: 'Operario aplicando manto asfáltico con soplete sobre la losa del techo',
        },
        after: {
            src: waterproofingRoofFinished,
            alt: 'Techo industrial completamente impermeabilizado con manto aluminizado',
        },
    },
    {
        id: 'concrete-slab',
        title: 'Vaciado de losa de concreto',
        category: 'Obras civiles',
        summary:
            'Encofrado, armado y vaciado de losa para ampliación de área operativa dentro de planta.',
        after: {
            src: concreteSlabPouring,
            alt: 'Vaciado de losa de concreto en obra dentro de una planta industrial',
        },
    },
    {
        id: 'stainless-steel-shaft',
        title: 'Mecanizado y soldadura en acero inoxidable',
        category: 'Tornería',
        summary:
            'Fabricación de eje con brida en acero inoxidable, mecanizado bajo plano y pulido final.',
        after: {
            src: stainlessSteelMachining,
            alt: 'Eje de acero inoxidable con brida mecanizada sobre mesa de trabajo del taller',
        },
    },
    {
        id: 'custom-gear',
        title: 'Fabricación de piñones a la medida',
        category: 'Tornería',
        summary:
            'Piñones y engranajes fabricados a partir de la pieza original o del plano del cliente.',
        after: {
            src: customGearManufacturing,
            alt: 'Piñón de acero fabricado a la medida sobre la bancada del torno',
        },
    },
    {
        id: 'pipeline-insulation',
        title: 'Aislamiento térmico de tuberías',
        category: 'Mantenimiento',
        summary:
            'Instalación de aislamiento térmico y recubrimiento en líneas de vapor y proceso.',
        after: {
            src: pipelineInsulation,
            alt: 'Líneas de tubería con aislamiento térmico instalado en planta',
        },
    },
]
