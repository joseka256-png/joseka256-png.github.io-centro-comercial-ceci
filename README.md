# Centro Comercial Ceci's — sitio web (propuesta)

Un solo sitio (un dominio y un hosting) para todo el centro comercial, con una página completa para cada negocio:

| Ruta | Qué es |
| --- | --- |
| `/` | Inicio de Ceci's: negocios, cliente frecuente, Salón de Eventos Ceci, cómo llegar |
| `/mundo-patitas/` | Página completa de Mundo Patitas: productos con carrito y pedido por WhatsApp, tarjeta de cliente frecuente, nosotros, visítanos |
| `/delicias-vivi/` | Igual, para Delicias Vivi |

Con dominio quedaría: `cecis.com`, `cecis.com/mundo-patitas`, `cecis.com/delicias-vivi`.

## Cómo se edita

- **Inicio de Ceci's:** `js/datos.js` (textos, teléfonos, espacios publicitarios, salón) y fotos en `assets/img/`.
- **Cada negocio:** `fuente/negocios/<id>/negocio.js` (menú, precios, colores, tarjeta) y sus fotos/logo en `fuente/negocios/<id>/assets/`.
  Después de editar: **`node construir.mjs`** (Node 18+) → regenera las carpetas `mundo-patitas/` y `delicias-vivi/`. Subir todo a Git.
- **Plantilla** (igual a la de La Central / Soda La Casita): `fuente/plantilla/`. No se edita por negocio.
- **Negocio nuevo con página propia:** copiar `fuente/negocios/delicias-vivi/` con otro nombre, editar su `negocio.js`, `node construir.mjs`, y en `js/datos.js` agregarlo a `NEGOCIOS`.

Todo lo marcado `PENDIENTE` hay que confirmarlo con cada negocio. Los precios de los menús son de ejemplo.

## Tarjeta de cliente frecuente

- **Cada negocio tiene su propia tarjeta y su propia administración de sellos.** Un sello de Mundo Patitas no aparece en Delicias Vivi.
- **Hoy en modo demostración** (`FIREBASE.demo: true`): los datos se guardan solo en el navegador (`src/firebase-demo.js`) y hay botones para simular la caja.

### Paso a producción (cuando el cliente apruebe)

1. Un proyecto de Firebase para todo Ceci's (cuenta iscrtech.apps@gmail.com): un solo hosting y dominio.
2. Datos separados por negocio: `negocios/{idNegocio}/tarjetas/{telefono}` y `negocios/{idNegocio}/codigos/{qr}`, con las reglas anti-abuso de la plantilla (QR de un solo uso, vence en minutos, espera mínima entre sellos).
3. Personal: `staff/{uid}` con el campo `negocio`. Las reglas solo dejan que el personal de un negocio vea y selle las tarjetas de **su** negocio.
4. Panel `/mundo-patitas/personal` y `/delicias-vivi/personal`, cada uno con sus usuarios.
5. En cada `negocio.js`: `FIREBASE.demo = false` y el `firebaseConfig` del proyecto. Ajustar `tarjeta.js`, `personal.html` y `firestore.rules` de la plantilla a las rutas `negocios/{id}/…`.
6. Repo privado + deploy automático a Firebase Hosting + dominio.
