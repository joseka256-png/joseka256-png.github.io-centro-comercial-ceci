// =========================================================
//  DATOS.JS — único archivo que se edita para cambiar textos,
//  teléfonos, negocios y la tarjeta de cliente frecuente.
//  Cliente: Centro Comercial Ceci's (Cartago) · ISCR Tech
//  Todo lo que dice PENDIENTE hay que confirmarlo con el cliente.
// =========================================================

export const CENTRO = {
  nombre: "Centro Comercial Ceci's",
  nombreCorto: "Ceci's",
  lema: "Comida, mascotas y buenos ratos, a pasos de la Basílica.",
  telefono: "8847-2461",
  whatsapp: "50688472461",
  direccion: "350 m norte de la Basílica de Nuestra Señora de los Ángeles, Cartago",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Centro+Comercial+Ceci%27s+Cartago+Costa+Rica",
  mapaEmbed: "https://maps.google.com/maps?q=350+norte+Bas%C3%ADlica+de+los+%C3%81ngeles+Cartago+Costa+Rica&z=16&output=embed",
  horario: [                                  // PENDIENTE: confirmar horario real
    ["Lunes a sábado", "Por confirmar"],
    ["Domingo", "Por confirmar"]
  ],
  pagos: ["Efectivo", "SINPE Móvil", "Tarjeta"]  // PENDIENTE: confirmar
};

// =========================================================
//  NEGOCIOS
//  tarjeta: true  → usa la tarjeta de cliente frecuente
//  tipo: "publicidad" → espacio solo de anuncio (sin tarjeta)
// =========================================================
export const NEGOCIOS = [
  {
    id: "mundo-patitas",
    nombre: "Mundo Patitas",
    categoria: "Tienda de mascotas",
    logo: "assets/img/logo-mundo-patitas.webp",
    foto: "assets/img/mundo-patitas-tienda.jpg",
    promo: "assets/img/nutrisource-promo.jpg",
    color: "#1FA6AC", colorOsc: "#127C82", colorSuave: "#E3F6F6",
    telefono: "8880-7387",                    // PENDIENTE: confirmar que este número es de Mundo Patitas
    whatsapp: "50688807387",
    descripcion: "Todo para perros y gatos: alimento de calidad, arena, snacks, juguetes y accesorios. Distribuidores de NutriSource.",
    destacados: ["Alimento NutriSource", "Arena para gato", "Snacks y premios", "Collares y pecheras", "Juguetes", "Higiene y cuidado"],
    tarjeta: true
  },
  {
    id: "delicias-vivi",
    nombre: "Delicias Vivi",
    categoria: "Comidas rápidas · desde 2016",
    logo: "assets/img/logo-delicias-vivi.jpg",
    foto: "assets/img/plazoleta.jpg",
    color: "#7A1F1A", colorOsc: "#561410", colorSuave: "#FFF3D6", acento: "#F5B921",
    telefono: "8847-2461",                    // PENDIENTE: número propio de Delicias Vivi
    whatsapp: "50688472461",
    descripcion: "Empanadas, hamburguesas, bocadillos y antojitos para compartir en la plazoleta de Ceci's.",
    destacados: ["Empanadas", "Hamburguesas", "Bocadillos", "Nachos", "Papas supreme", "Hot dogs"],
    tarjeta: true
  },
  {
    id: "espacio-1",
    tipo: "publicidad",
    nombre: "Próximamente",                   // PENDIENTE: nombre del negocio
    categoria: "Espacio publicitario",
    descripcion: "Un negocio más del centro comercial se suma muy pronto."
  },
  {
    id: "espacio-2",
    tipo: "publicidad",
    nombre: "Próximamente",                   // PENDIENTE: nombre del negocio
    categoria: "Espacio publicitario",
    descripcion: "Un negocio más del centro comercial se suma muy pronto."
  }
];

// =========================================================
//  TARJETA DE CLIENTE FRECUENTE (por negocio)
//  PENDIENTE: monto mínimo, meta de sellos y premio con cada dueño.
// =========================================================
export const LEALTAD = {
  "mundo-patitas": { meta: 10, montoMinimo: 10000, premio: "Un snack o juguete de regalo" },
  "delicias-vivi": { meta: 8,  montoMinimo: 5000,  premio: "Una hamburguesa gratis" }
};

// =========================================================
//  SALÓN DE EVENTOS CECI
// =========================================================
export const SALON = {
  nombre: "Salón de Eventos Ceci",
  foto: "assets/img/salon-eventos.jpg",
  texto: "Un espacio techado, decorado y listo para celebrar: cumpleaños, baby showers, bautizos, primeras comuniones, reuniones familiares y de empresa.",
  incluye: ["Mesas y sillas", "Decoración de telas", "Jardín vertical para fotos", "Área techada"],   // PENDIENTE: confirmar
  capacidad: "Por confirmar",                 // PENDIENTE
  whatsapp: "50688472461"
};
