# Centro Comercial Ceci's — sitio web (propuesta)

Sitio del Centro Comercial Ceci's (350 m norte de la Basílica, Cartago). Propuesta de ISCR Tech, publicada en GitHub Pages mientras el cliente la aprueba.

## Qué tiene

- **Inicio** con los negocios del centro comercial.
- **Mundo Patitas** y **Delicias Vivi**: sección propia y **tarjeta de cliente frecuente**.
- **2 espacios publicitarios** (`tipo: "publicidad"` en `js/datos.js`) para los negocios que faltan.
- **Salón de Eventos Ceci** con cotización por WhatsApp.
- **Cómo llegar**: mapa, teléfono, horario y formas de pago.
- `tarjeta.html`: billetera de tarjetas (un solo registro por teléfono, una tarjeta por negocio). **Hoy en modo demostración** (localStorage).

## Cómo se edita

Todo el contenido está en **`js/datos.js`** (textos, teléfonos, negocios, reglas de sellos, salón). Las fotos van en `assets/img/`. Los datos marcados `PENDIENTE` hay que confirmarlos con el cliente.

Para agregar un negocio de publicidad con nombre: cambiar `nombre`, `categoria` y `descripcion` del `espacio-1` / `espacio-2`. Para que use tarjeta: agregar `logo`, `color`, `tarjeta: true` y su regla en `LEALTAD`.

Vista local: `npx serve .`

## Paso a producción (cuando el cliente apruebe)

1. Proyecto de Firebase propio del centro comercial (cuenta iscrtech.apps@gmail.com).
2. Tarjetas en Firestore **por negocio**: `negocios/{idNegocio}/tarjetas/{telefono}` y `negocios/{idNegocio}/codigos/{qr}`, con las mismas reglas anti-abuso de la plantilla de La Central (QR de un solo uso, vence en minutos, espera mínima entre sellos).
3. Personal: `staff/{uid}` con el campo `negocio`, para que la caja de Mundo Patitas solo pueda sellar tarjetas de Mundo Patitas y la de Delicias Vivi solo las suyas.
4. Panel `/personal` por negocio (buscar cliente, generar QR, canjear).
5. Repo privado + deploy automático a Firebase Hosting + dominio.
