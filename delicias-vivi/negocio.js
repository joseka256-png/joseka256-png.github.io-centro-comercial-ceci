// =========================================================
//  NEGOCIO.JS — Delicias Vivi (dentro de Centro Comercial Ceci's)
//  Después de editar, desde la raíz del repo:  node construir.mjs
//  PENDIENTE = confirmar con el negocio.
// =========================================================

export const NEGOCIO = {
  id: "delicias-vivi",
  nombre: "Delicias Vivi",
  nombreCorto: "Delicias Vivi",
  lema: "Comidas rápidas desde 2016",
  fundado: 2016,
  soporte: "ISCR Tech (iscrtech.com)",
  volver: { texto: "Centro Comercial Ceci's", enlace: "../" },

  seo: {
    titulo: "Delicias Vivi | Comidas rápidas en Centro Comercial Ceci's, Cartago",
    descripcion: "Empanadas, hamburguesas, bocadillos y antojitos desde 2016. Pedí por WhatsApp y sumá sellos con tu tarjeta de cliente frecuente.",
    ogTitulo: "Delicias Vivi · Comidas rápidas desde 2016",
    ogDescripcion: "Empanadas, hamburguesas, bocadillos y antojitos en Centro Comercial Ceci's.",
    ogImagen: "img/portada.jpg"
  },

  colores: { primario: "#7A1F1A", primarioOsc: "#561410", acento: "#E0A00C", acentoOsc: "#B88206" },

  hero: {
    etiqueta: "Desde 2016 · Centro Comercial Ceci's",
    tituloScript: "Antojos",
    titulo: "hechos al momento.",
    texto: "Empanadas, hamburguesas, bocadillos y antojitos para compartir en la plazoleta de Ceci's. Armá tu pedido y pasalo a recoger.",
    imagen: "img/portada.jpg",
    imagenAlt: "Plazoleta de Delicias Vivi en Centro Comercial Ceci's",
    badges: [["hamburger", "Hecho al momento"], ["award", "Cliente frecuente"]]
  },

  historia: {
    script: "Nuestra historia",
    titulo: "Desde 2016 cocinando para Cartago.",
    parrafos: [
      "Delicias Vivi nació en 2016 con una idea sencilla: comida rápida hecha al momento, con sabor de casa y buen precio.",
      "Hoy te esperamos en la plazoleta del Centro Comercial Ceci's, un espacio techado con luces y mesas para compartir en familia o con los compas."
    ],
    imagenes: [["img/local.jpg", "Mostrador de Delicias Vivi"], ["img/plazoleta.jpg", "Plazoleta de comidas de Ceci's"]],
    stats: [["{anios}", "Años con ustedes"], ["2016", "Desde"], ["ico:award", "Cliente frecuente"]]
  },

  menu: {
    buscarEj: "Buscar en el menú (ej. empanada, nachos)…",
    script: "Nuestro",
    titulo: "Menú",
    notaPrep: "Todo se prepara al momento · tiempo aprox.",
    nota: "Precios de ejemplo para la propuesta (por confirmar con Delicias Vivi). Agregá productos, tocá <b>Ver pedido</b> y elegí a qué hora pasás a retirarlo."
  },

  cta: { titulo: "¿Ya te dio hambre?", texto: "Armá tu pedido y lo tenemos listo a la hora que elijás." }
};

export const PROMOS = [];

export const MODULOS = { tarjeta: true, granja: false };

export const CONFIG = {
  whatsapp: "50688472461",             // PENDIENTE: número propio de Delicias Vivi (hoy: el del centro comercial)
  telefonos: ["8847-2461"],
  correo: "",
  tiempoPrep: "15–25 min",
  retiroOpciones: [20, 30, 45],
  retiroMinimo: 20,
  direccion: "Centro Comercial Ceci's, 350 m norte de la Basílica de los Ángeles, Cartago",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Centro+Comercial+Ceci%27s+Cartago+Costa+Rica",
  mapaEmbed: "https://maps.google.com/maps?q=350+norte+Bas%C3%ADlica+de+los+%C3%81ngeles+Cartago+Costa+Rica&z=16&output=embed",
  horario: [["Lunes a sábado", "Por confirmar"], ["Domingo", "Por confirmar"]],   // PENDIENTE
  pagos: ["Efectivo", "SINPE Móvil", "Tarjeta"]                                   // PENDIENTE
};

/* MENÚ — PENDIENTE: menú real y precios (fotos de las pizarras del local) */
const U = { unidad: "unid" };
export const MENU = {
  "Empanadas": [
    { titulo: "Empanadas", ico: "sandwich", ...U, platos: [
      { nombre: "Empanada de carne", precio: 1200 },
      { nombre: "Empanada de pollo", precio: 1200 },
      { nombre: "Empanada de queso", precio: 1000 },
      { nombre: "Empanada de frijol con queso", precio: 1000 }
    ]}
  ],
  "Hamburguesas": [
    { titulo: "Hamburguesas", ico: "hamburger", ...U, platos: [
      { nombre: "Hamburguesa sencilla", precio: 2800 },
      { nombre: "Hamburguesa con queso", precio: 3200 },
      { nombre: "Hamburguesa doble", precio: 4500 },
      { nombre: "Combo hamburguesa + papas + fresco", precio: 4800 }
    ]}
  ],
  "Bocadillos": [
    { titulo: "Bocadillos", ico: "sandwich", ...U, platos: [
      { nombre: "Hot dog", precio: 2000 },
      { nombre: "Sándwich de jamón y queso", precio: 2200 },
      { nombre: "Tacos ticos (3)", precio: 2800 }
    ]}
  ],
  "Antojitos": [
    { titulo: "Antojitos", ico: "flame", ...U, platos: [
      { nombre: "Nachos", precio: 3800 },
      { nombre: "Papas supreme", precio: 3500 },
      { nombre: "Papas fritas", precio: 1800 }
    ]}
  ],
  "Bebidas": [
    { titulo: "Bebidas", ico: "cup-soda", ...U, platos: [
      { nombre: "Fresco natural", precio: 1200 },
      { nombre: "Gaseosa", precio: 1000 }
    ]}
  ]
};

/* TARJETA DE CLIENTE FRECUENTE — propia de Delicias Vivi */
export const LEALTAD = {
  meta: 8,                      // PENDIENTE
  montoMinimo: 5000,            // PENDIENTE
  modo: "porCompra",
  premio: "Hamburguesa gratis", // PENDIENTE
  qr: true, qrMinutos: 3, esperaMinutos: 120
};

export const FIREBASE = {
  demo: true,
  config: { apiKey: "DEMO", authDomain: "", projectId: "demo-cecis", storageBucket: "", messagingSenderId: "", appId: "" },
  hostingSite: ""
};
