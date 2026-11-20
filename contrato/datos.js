// =========================================================
//  DATOS DEL CONTRATO ANUAL — Centro Comercial Ceci's (paquete)
//  Los negocios, productos y reglas de sellos salen solos de
//  js/datos.js y fuente/negocios/*/negocio.js.
//  Lo que se deja "" sale como línea en blanco para llenar a mano.
//
//  Generar:  node contrato/generar.mjs
//  Resultado: contrato/salida/contrato-centro-comercial-ceci.html (y .pdf si hay Chrome)
//
//  ⚠️ Este repo es público: NO subas aquí cédulas ni cuentas.
//     Usá una copia local: contrato/datos.local.js (ignorada por Git, tiene prioridad).
// =========================================================

export const PROVEEDOR = {
  marca: "ISCR Tech",
  marcaLarga: "Inventions Software Costa Rica",
  nombre: "Ing. José Grey Redondo Ramírez",
  cedula: "",
  telefono: "8690-1930",
  correo: "",
  web: "iscrtech.com",
  sinpe: "",
  cuenta: "",
  titularCuenta: ""
};

export const CONTRATO = {
  razonSocial: "",
  cedulaJuridica: "",
  representante: "",        // dueño de Ceci's, Mundo Patitas y Delicias Vivi
  cedulaRepresentante: "",
  direccion: "350 m norte de la Basílica de los Ángeles, Cartago",
  telefono: "8847-2461",
  correo: "",

  inicio: "",               // "2026-12-01" → calcula las 12 fechas de pago
  diaPago: 5,
  arranque: "",             // cobro único al firmar. "" = en blanco · 0 = no aplica
  mensualidad: "",          // paquete completo, en colones (ej. 70000)
  cambiosMes: 12,           // cambios incluidos por mes, para todo el sitio
  horaExtra: "",
  diasAvisoRenovacion: 30,
  diasGraciaPago: 10,

  panelDueno: true,         // incluye panel del dueño (ve los sellos de todos sus negocios)
  publicidadIncluida: 2,    // espacios publicitarios incluidos en el inicio

  lugarFirma: "Cartago",
  fechaFirma: ""
};
