// =========================================================
//  NEGOCIO.JS — Mundo Patitas (dentro de Centro Comercial Ceci's)
//  Después de editar, desde la raíz del repo:  node construir.mjs
//  PENDIENTE = confirmar con el negocio.
// =========================================================

export const NEGOCIO = {
  id: "mundo-patitas",
  nombre: "Mundo Patitas",
  nombreCorto: "Mundo Patitas",
  lema: "Todo para tu perro y tu gato",
  fundado: null,
  soporte: "ISCR Tech (iscrtech.com)",
  volver: { texto: "Centro Comercial Ceci's", enlace: "../" },

  seo: {
    titulo: "Mundo Patitas | Tienda de mascotas en Centro Comercial Ceci's, Cartago",
    descripcion: "Alimento NutriSource, arena, snacks, juguetes y accesorios para perros y gatos. Pedí por WhatsApp y sumá sellos con tu tarjeta de cliente frecuente.",
    ogTitulo: "Mundo Patitas · Tienda de mascotas",
    ogDescripcion: "Alimento de calidad y accesorios para tu mascota, en Centro Comercial Ceci's.",
    ogImagen: "img/portada.jpg"
  },

  colores: { primario: "#1A9BA1", primarioOsc: "#127379", acento: "#E4672B", acentoOsc: "#C24F17" },

  hero: {
    etiqueta: "Centro Comercial Ceci's · Cartago",
    tituloScript: "Porque ellos",
    titulo: "también merecen lo mejor.",
    texto: "Alimento de calidad, arena, snacks, juguetes y accesorios para perros y gatos. Armá tu pedido y pasalo a recoger.",
    imagen: "img/portada.jpg",
    imagenAlt: "Interior de la tienda Mundo Patitas",
    badges: [["paw-print", "Perros y gatos"], ["award", "Cliente frecuente"]]
  },

  historia: {
    script: "Nosotros",
    titulo: "Una tienda hecha para consentir a tu mascota.",
    parrafos: [
      "En Mundo Patitas encontrás lo que tu perro o tu gato necesita, en un solo lugar: alimento para cada etapa, arena, premios, collares, pecheras, juguetes y artículos de higiene.",
      "Somos distribuidores de NutriSource, alimento de alta calidad con opciones para cachorros, adultos, razas grandes, control de peso y fórmulas sin granos."
    ],
    imagenes: [["img/tienda.jpg", "Estantes de alimento y accesorios"], ["img/nutrisource.jpg", "Línea de alimento NutriSource"]],
    stats: [["ico:paw-print", "Perros y gatos"], ["NutriSource", "Distribuidores"], ["ico:award", "Cliente frecuente"]]
  },

  menu: {
    nav: "Productos",
    verBoton: "Ver productos →",
    buscarEj: "Buscar producto (ej. cachorro, arena, pechera)…",
    script: "Nuestros",
    titulo: "Productos",
    notaPrep: "Lo alistamos en",
    nota: "Precios de ejemplo para la propuesta (por confirmar con la tienda). Agregá productos, tocá <b>Ver pedido</b> y elegí a qué hora pasás a retirarlo."
  },

  cta: { titulo: "¿Ya sabés qué necesita tu mascota?", texto: "Armá tu pedido y lo tenemos listo cuando pasés." }
};

// Slider debajo del header (afiche: true = arte completo, sin texto encima)
export const PROMOS = [
  { imagen: "img/nutrisource.jpg", alt: "NutriSource: nutrición de calidad para una vida mejor", afiche: true }
];

export const MODULOS = { tarjeta: true, granja: false };

export const CONFIG = {
  whatsapp: "50688807387",             // PENDIENTE: confirmar que es el número de Mundo Patitas
  telefonos: ["8880-7387"],
  correo: "",
  tiempoPrep: "10–20 min",
  retiroOpciones: [20, 30, 60],
  retiroMinimo: 20,
  notaPedido: "Nota para la tienda",
  notaPedidoEj: "Ej: para gato adulto, ¿tienen otro sabor?…",
  direccion: "Centro Comercial Ceci's, 350 m norte de la Basílica de los Ángeles, Cartago",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Centro+Comercial+Ceci%27s+Cartago+Costa+Rica",
  mapaEmbed: "https://maps.google.com/maps?q=350+norte+Bas%C3%ADlica+de+los+%C3%81ngeles+Cartago+Costa+Rica&z=16&output=embed",
  horario: [["Lunes a sábado", "Por confirmar"], ["Domingo", "Por confirmar"]],   // PENDIENTE
  pagos: ["Efectivo", "SINPE Móvil", "Tarjeta"]                                   // PENDIENTE
};

/* MENÚ — PENDIENTE: lista real de productos y precios de la tienda */
const U = { unidad: "unid" };
export const MENU = {
  "Alimento perro": [
    { titulo: "NutriSource perro", ico: "bone", sub: "Bolsas de 2,27 kg (5 lb)", ...U, platos: [
      { nombre: "NutriSource Cachorro raza grande", precio: 15500 },
      { nombre: "NutriSource Adulto Small Bites", precio: 14500 },
      { nombre: "NutriSource Pollo y arroz", precio: 13900 },
      { nombre: "NutriSource Weight Management", precio: 14900 },
      { nombre: "NutriSource Grain Free pollo y pavo", precio: 16900 },
      { nombre: "NutriSource Senior", precio: 14900 }
    ]}
  ],
  "Alimento gato": [
    { titulo: "Gatos", ico: "paw-print", ...U, platos: [
      { nombre: "NutriSource Classic gato (pollo y arroz)", precio: 13500 },
      { nombre: "NutriSource Grain Free gato (salmón)", precio: 15900 },
      { nombre: "Lata Whiskas", precio: 1200 },
      { nombre: "Sobre húmedo para gato", precio: 800 }
    ]}
  ],
  "Arena": [
    { titulo: "Arena para gato", ico: "package", ...U, platos: [
      { nombre: "Cat Litter +Pets 4,5 kg", precio: 4500 },
      { nombre: "Cat Litter +Pets 9 kg", precio: 8200 }
    ]}
  ],
  "Snacks": [
    { titulo: "Premios y snacks", ico: "gift", ...U, platos: [
      { nombre: "Huesitos masticables", precio: 2500 },
      { nombre: "Galletas para perro", precio: 2200 },
      { nombre: "Snack cremoso para gato", precio: 1500 }
    ]}
  ],
  "Accesorios": [
    { titulo: "Paseo y accesorios", ico: "store", ...U, platos: [
      { nombre: "Collar ajustable", precio: 3500 },
      { nombre: "Pechera", precio: 7500 },
      { nombre: "Correa", precio: 4500 },
      { nombre: "Juguete de hule", precio: 3000 },
      { nombre: "Pañales de entrenamiento (paquete)", precio: 6500 }
    ]}
  ]
};

/* TARJETA DE CLIENTE FRECUENTE — propia de Mundo Patitas */
export const LEALTAD = {
  meta: 10,                     // PENDIENTE
  montoMinimo: 10000,           // PENDIENTE
  modo: "porCompra",
  premio: "Snack o juguete de regalo",   // PENDIENTE
  qr: true, qrMinutos: 3, esperaMinutos: 120
};

/* FIREBASE — demo: true guarda en el navegador (propuesta).
   Producción: un proyecto Firebase para todo Ceci's, con los datos de
   cada negocio separados y su propio personal (ver README). */
export const FIREBASE = {
  demo: true,
  config: { apiKey: "DEMO", authDomain: "", projectId: "demo-cecis", storageBucket: "", messagingSenderId: "", appId: "" },
  hostingSite: ""
};
