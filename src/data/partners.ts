import type { ImageMetadata } from 'astro'

import abb from '@images/partners/abb.png'
import alcave from '@images/partners/alcave.png'
import allenBradley from '@images/partners/allen-bradley.png'
import apolloValves from '@images/partners/apollo-valves.png'
import aralven from '@images/partners/aralven.png'
import autonics from '@images/partners/autonics.png'
import avic from '@images/partners/avic.png'
import baumer from '@images/partners/baumer.png'
import cabel from '@images/partners/cabel.png'
import elecon from '@images/partners/elecon.png'
import endressHauser from '@images/partners/endress-hauser.png'
import exceline from '@images/partners/exceline.png'
import festo from '@images/partners/festo.png'
import gates from '@images/partners/gates.png'
import hansenTechnologies from '@images/partners/hansen-technologies.png'
import honeywell from '@images/partners/honeywell.png'
import hyundai from '@images/partners/hyundai.png'
import linkBelt from '@images/partners/link-belt.png'
import omron from '@images/partners/omron.png'
import sigmaCable from '@images/partners/sigma-cable.png'
import stanley from '@images/partners/stanley.png'
import telemecanique from '@images/partners/telemecanique.png'
import yaxun from '@images/partners/yaxun.png'

export interface Partner {
    name: string
    logo: ImageMetadata
}

export const partners: Partner[] = [
    { name: 'ABB', logo: abb },
    { name: 'Festo', logo: festo },
    { name: 'Omron', logo: omron },
    { name: 'Honeywell', logo: honeywell },
    { name: 'Allen-Bradley', logo: allenBradley },
    { name: 'Endress+Hauser', logo: endressHauser },
    { name: 'Baumer', logo: baumer },
    { name: 'Autonics', logo: autonics },
    { name: 'Telemecanique', logo: telemecanique },
    { name: 'Gates', logo: gates },
    { name: 'Apollo Valves', logo: apolloValves },
    { name: 'Hansen Technologies', logo: hansenTechnologies },
    { name: 'Link-Belt', logo: linkBelt },
    { name: 'Hyundai', logo: hyundai },
    { name: 'Stanley', logo: stanley },
    { name: 'Yaxun', logo: yaxun },
    { name: 'AVIC', logo: avic },
    { name: 'Exceline', logo: exceline },
    { name: 'Sigma Cable', logo: sigmaCable },
    { name: 'Cabel', logo: cabel },
    { name: 'Elecon', logo: elecon },
    { name: 'Aralven', logo: aralven },
    { name: 'Alcave', logo: alcave },
]
