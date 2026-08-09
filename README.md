# Solutionsary

Landing page de **Solutions Ary**, empresa de suministros industriales, mantenimiento, obras civiles y tornería con sede en Valencia, Carabobo.

Sitio estático construido con [Astro](https://astro.build) y [Tailwind CSS 4](https://tailwindcss.com). El resultado del build es HTML, CSS e imágenes optimizadas que se suben directamente al hosting, sin necesidad de Node en el servidor.

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Comandos

| Comando                | Qué hace                                                       |
| ---------------------- | -------------------------------------------------------------- |
| `npm install`          | Instala las dependencias                                        |
| `npm run dev`          | Servidor de desarrollo en `http://localhost:4321`               |
| `npm run build`        | Genera el sitio estático en `dist/`                             |
| `npm run preview`      | Sirve el contenido de `dist/` para revisarlo antes de publicar  |
| `npm run check`        | Valida tipos y plantillas de Astro                              |
| `npm run format`       | Formatea el código con Prettier                                 |

## Estructura

```
src/
  assets/images/       Fotos y logos originales; Astro genera AVIF/WebP con srcset
    about/             Imágenes de la sección Nosotros
    brand/             Logotipos (color, monocromo y knockout blanco)
    partners/          Logos de aliados comerciales normalizados
    projects/          Fotos de trabajos ejecutados
  components/
    sections/          Una pieza por sección de la página
    ui/                Piezas reutilizables (Button, Section, SectionHeading, ...)
  data/                Contenido editable sin tocar el markup
  layouts/             BaseLayout con SEO, Open Graph y JSON-LD
  pages/               index.astro compone las secciones
  styles/global.css    Design tokens de marca y utilidades
public/                Favicons, manifest, robots.txt y og-image
scripts/               Utilidades de preparación de assets (uso puntual)
```

## Editar contenido

Casi todo el contenido vive en `src/data` y no requiere tocar componentes:

- **`siteConfig.ts`**: teléfono, correo, dirección, WhatsApp, redes y endpoint del formulario.
- **`services.ts`**: líneas de servicio, diferenciales, métricas y sectores atendidos.
- **`projects.ts`**: trabajos ejecutados. Si un proyecto incluye `before`, la tarjeta muestra automáticamente el comparador antes/después.
- **`partners.ts`**: aliados comerciales del carrusel.

Para agregar una imagen nueva, colóquela en la subcarpeta correspondiente de `src/assets/images` e impórtela desde el archivo de datos. Astro se encarga de generar los formatos y tamaños.

## Formulario de contacto

El sitio es 100 % estático, por lo que el formulario se envía a un servicio externo. En `src/data/siteConfig.ts`:

```ts
contactFormEndpoint: 'https://formspree.io/f/REEMPLAZAR_ID',
```

Reemplace `REEMPLAZAR_ID` por el identificador real del formulario (por ejemplo de [Formspree](https://formspree.io)). Mientras el valor siga siendo el marcador de posición, el formulario muestra un aviso y sugiere WhatsApp en su lugar.

Si el hosting soporta PHP, la alternativa es apuntar `contactFormEndpoint` a un `contact.php` propio colocado en la raíz del sitio; el envío se hace por `fetch` con `FormData`, así que basta con que el script responda `200`.

## Despliegue a cPanel

### 1. Generar el paquete

```bash
npm run build
```

El sitio queda en `dist/`. También puede generar un zip listo para subir:

```bash
npm run package:cpanel
```

Eso crea `solutionsary-cpanel.zip` en la raíz del proyecto (ignorado por git).

### 2. Subir a cPanel

**Opción A — File Manager (recomendada si es la primera vez)**

1. Entre a cPanel → **Administrador de archivos**.
2. Abra `public_html` (o la carpeta del dominio adicional / subdominio).
3. Si hay un sitio viejo, haga una copia de seguridad y luego borre su contenido.
4. Suba `solutionsary-cpanel.zip` y extráigalo **dentro** de esa carpeta.
5. Confirme que en la raíz quedan: `index.html`, `.htaccess`, `assets/`, `404.html`, `robots.txt`, `sitemap-index.xml` y los favicons. Luego borre el zip del servidor.

**Opción B — FTP / SFTP (FileZilla, Cyberduck, etc.)**

1. Conéctese con el usuario FTP del hosting.
2. Suba **el contenido de `dist/`** (no la carpeta `dist` en sí) a `public_html/`.
3. Active la vista de archivos ocultos y confirme que `.htaccess` también se subió.

### 3. Dominio canónico

El build y el `.htaccess` ya apuntan a `https://solutionsary.com` (sin www, con HTTPS forzado). Si el dominio canónico cambia, actualice `site` en `astro.config.mjs` y `url` en `src/data/siteConfig.ts`, regenerue el paquete y vuelva a subir.

### 4. Verificar después de publicar

Abra estas URLs y confirme que responden:

- `https://solutionsary.com/`
- `http://solutionsary.com/` (debe redirigir a HTTPS)
- `https://www.solutionsary.com/` (debe redirigir a la versión sin www)
- `https://solutionsary.com/robots.txt`
- `https://solutionsary.com/sitemap-index.xml`
- `https://solutionsary.com/og-image.png`
- Una ruta inventada, por ejemplo `https://solutionsary.com/no-existe` (debe mostrar la página 404)

Los archivos dentro de `dist/assets/` llevan un hash en el nombre, así que el `.htaccess` los cachea un año. El HTML se sirve sin caché larga para que cada despliegue se vea de inmediato.

## Scripts de assets

`scripts/` contiene utilidades que se ejecutan de forma puntual, no en cada build:

- `generate-brand-assets.mjs`: genera favicons, íconos del manifest, la imagen de Open Graph y la variante blanca del logotipo. Ejecútelo si cambia el logo.
- `normalize-source-images.mjs`: reduce y recomprime fotos originales demasiado pesadas antes de que Astro las procese. Ejecútelo al agregar fotos que superen los 1600 px o el megabyte.
- `prepare-partner-logos.mjs`: normaliza los logos de aliados (recorte, altura uniforme, transparencia). Requiere los archivos originales en `/tmp/partner-logos`.
- `sample-logo-colors.mjs`: imprime los colores dominantes del logotipo, usado para derivar la paleta de `global.css`.

## Notas de diseño

- La paleta de `src/styles/global.css` se derivó de los dos colores reales del logotipo: el teal `#276e90` (`brand-600`) y el navy `#0a3143` (`brand-900`). El azul `#1D308F` que usaba el sitio anterior no correspondía a la marca.
- El ámbar (`accent-*`) se usa solo como acento funcional: badges, indicador de foco e íconos sobre fondo oscuro. Hace eco de las marcas de seguridad presentes en las fotos de obra.
- El indicador de foco combina un anillo ámbar con un halo navy para mantenerse visible tanto sobre las secciones claras como sobre las oscuras.
