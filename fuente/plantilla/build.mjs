// =========================================================
//  BUILD — arma dist/ a partir de negocio.js + src/ + assets/
//  Uso: node fuente/plantilla/build.mjs <carpeta-del-negocio> <carpeta-de-salida>
//  (en Ceci's se llama desde construir.mjs, en la raíz del repo)
//  Sin dependencias: solo Node 18+.
//
//  Placeholders en src/:
//    {{ruta.dato}}   → texto escapado (ej. {{nombre}}, {{hero.titulo}})
//    {{{bloque}}}    → HTML generado aquí (badges, historia, stats)
//    <!--@modulo-->…<!--/@modulo-->  → se quita si MODULOS[modulo] es false
// =========================================================
import { readFileSync, writeFileSync, rmSync, mkdirSync, cpSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { pathToFileURL } from "node:url";

import { resolve } from "node:path";
const PLANTILLA = new URL(".", import.meta.url).pathname;
const RAIZ = resolve(process.argv[2] || ".");                 // carpeta del negocio (negocio.js + assets/)
const SRC = join(PLANTILLA, "src"), COMUN = join(PLANTILLA, "comun"), ASSETS = join(RAIZ, "assets");
const DIST = resolve(process.argv[3] || join(RAIZ, "dist"));
const CI = !!process.env.CI;

const N = await import(pathToFileURL(join(RAIZ, "negocio.js")).href + "?t=" + Date.now());
const { NEGOCIO, MODULOS = {}, CONFIG, LEALTAD, FIREBASE } = N;
const { icono } = await import(pathToFileURL(join(SRC, "iconos.js")).href);

const errores = [], avisos = [];
const esc = t => String(t ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// ---------- validación ----------
if (!/^[a-z0-9-]{2,30}$/.test(NEGOCIO.id || "")) errores.push("NEGOCIO.id: solo minúsculas, números y guiones (2–30).");
for (const k of ["primario", "primarioOsc", "acento", "acentoOsc"])
  if (!/^#[0-9a-fA-F]{6}$/.test(NEGOCIO.colores?.[k] || "")) errores.push(`NEGOCIO.colores.${k} debe ser hex tipo #2F7D57.`);
if (CONFIG.whatsapp && !/^506\d{8}$/.test(CONFIG.whatsapp)) errores.push('CONFIG.whatsapp: formato "506" + 8 dígitos, sin espacios.');
if (!CONFIG.telefonos?.length) errores.push("CONFIG.telefonos: poné al menos un teléfono.");
const DEMO = !!FIREBASE.demo;   // tarjeta de demostración: guarda en el navegador, sin Firebase
const sinFirebase = DEMO || String(FIREBASE.config.projectId).startsWith("PEGAR");
if (DEMO) avisos.push("Tarjeta en MODO DEMOSTRACIÓN (localStorage). Para producción: FIREBASE.demo = false y pegar el firebaseConfig.");
else if (sinFirebase) (CI ? errores : avisos).push("FIREBASE.config todavía dice PEGAR… (pegá el firebaseConfig del proyecto).");
if (LEALTAD && !(LEALTAD.meta >= 1 && LEALTAD.meta <= 30)) errores.push("LEALTAD.meta debe ser entre 1 y 30.");
for (const k of ["qrMinutos", "esperaMinutos"]) if (LEALTAD?.[k] !== undefined && !(Number.isInteger(LEALTAD[k]) && LEALTAD[k] >= 0)) errores.push(`LEALTAD.${k} debe ser un número entero.`);
const pendientes = JSON.stringify(N).match(/Por confirmar|PENDIENTE/g);
if (pendientes) avisos.push(`Hay ${pendientes.length} dato(s) "Por confirmar" en negocio.js.`);

// ---------- variables para las plantillas ----------
const anios = NEGOCIO.fundado ? new Date().getFullYear() - NEGOCIO.fundado : "";
const vars = {
  ...NEGOCIO,
  version: Date.now().toString(36),   // evita que el navegador use negocio.js viejo tras un cambio
  config: { correo: "", notaPedido: "Nota para la cocina", notaPedidoEj: "Ej: sin cebolla, salsa aparte…", ...CONFIG },
  menu: { nav: "Menú", verBoton: "Ver menú →", buscarEj: "Buscar producto…", ...(NEGOCIO.menu || {}) },
  volver: { texto: "", enlace: "../", ...(NEGOCIO.volver || {}) },
  lealtad: { qr: false, qrMinutos: 3, esperaMinutos: 120, ...LEALTAD },
  telefono1: CONFIG.telefonos[0],
  telefonosTexto: CONFIG.telefonos.join(" · "),
  badgesHtml: (NEGOCIO.hero.badges || []).map(([ico, txt], i) =>
    `<div class="badge b${i + 1}"><span>${icono(ico) || esc(ico)}</span> ${esc(txt)}</div>`).join("\n      "),
  historiaImgsHtml: (NEGOCIO.historia.imagenes || []).map(([src, alt]) =>
    `<img src="${esc(src)}" alt="${esc(alt)}">`).join("\n      "),
  montoTexto: LEALTAD ? "₡" + Number(LEALTAD.montoMinimo).toLocaleString("es-CR").replace(/\s|,/g, ".") : "",
  premioTexto: LEALTAD ? String(LEALTAD.premio).toLowerCase() : "",
  reglaComo: LEALTAD?.qr ? "Al pagar, pedí el QR en la caja y escanealo con tu celular (o decí tu número de teléfono)."
                        : "Al pagar, decí tu número de teléfono en la caja.",
  historiaClase: (NEGOCIO.historia.imagenes || []).length ? "" : " sin-fotos",
  historiaParrafosHtml: (NEGOCIO.historia.parrafos || []).map(p => `<p>${esc(p)}</p>`).join("\n      "),
  statsHtml: (NEGOCIO.historia.stats || []).map(([v, e]) => v === "{anios}"
    ? `<div><b class="anios">${anios}</b><small>${esc(e)}</small></div>`
    : `<div><b>${String(v).startsWith("ico:") ? icono(v.slice(4)) : esc(v)}</b><small>${esc(e)}</small></div>`).join("\n        ")
};
const obtener = ruta => ruta.split(".").reduce((o, k) => o?.[k], vars);

function render(texto, archivo) {
  // módulos apagados
  const MOD = { ...MODULOS, demo: DEMO, volver: !!NEGOCIO.volver, personal: !DEMO && !!MODULOS.tarjeta };
  texto = texto.replace(/<!--@(\w+)-->([\s\S]*?)<!--\/@\1-->/g, (_, m, cuerpo) => MOD[m] ? cuerpo : "");
  // íconos:  [[ico:nombre]]  → SVG en línea (src/iconos.js)
  texto = texto.replace(/\[\[ico:([\w-]+)\]\]/g, (_, n) => icono(n) || (errores.push(`${archivo}: no existe el ícono "${n}"`), ""));
  texto = texto.replace(/\{\{\{([\w.]+)\}\}\}/g, (_, r) => {
    const v = obtener(r); if (v === undefined) errores.push(`${archivo}: falta el bloque {{{${r}}}}`); return v ?? "";
  });
  texto = texto.replace(/\{\{([\w.]+)\}\}/g, (_, r) => {
    const v = obtener(r);
    if (v === undefined || typeof v === "object") { errores.push(`${archivo}: falta el dato {{${r}}} en negocio.js`); return ""; }
    return esc(v);
  });
  return texto;
}

// ---------- armar dist/ ----------
rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(COMUN, DIST, { recursive: true });
cpSync(ASSETS, DIST, { recursive: true });
cpSync(join(RAIZ, "negocio.js"), join(DIST, "negocio.js"));

const SOLO_TARJETA = ["personal.html", "tarjeta.js", "firebase-config.js", "firebase-demo.js"];
for (const f of readdirSync(SRC)) {
  if (statSync(join(SRC, f)).isDirectory()) continue;
  if (f === "firestore.rules") continue;
  if (!MODULOS.tarjeta && SOLO_TARJETA.includes(f)) continue;
  if (!MODULOS.granja && f === "granja.html") continue;
  if (DEMO && f === "personal.html") continue;
  if (!DEMO && f === "firebase-demo.js") continue;
  const ruta = join(SRC, f);
  if ([".html", ".js", ".css"].includes(extname(f))) {
    let out = render(readFileSync(ruta, "utf8"), f);
    // Modo demo: la tarjeta usa un Firestore falso en el navegador (src/firebase-demo.js)
    if (DEMO && f === "tarjeta.js") out = out.replace(/"https:\/\/www\.gstatic\.com\/firebasejs\/[\d.]+\/firebase-[\w-]+\.js"/g, '"./firebase-demo.js"');
    writeFileSync(join(DIST, f), out);
  }
  else cpSync(ruta, join(DIST, f));
}

// reglas de Firestore (fuera de dist/: no se publican como archivo)
if (MODULOS.tarjeta && !DEMO) writeFileSync(join(RAIZ, "firestore.rules"), render(readFileSync(join(SRC, "firestore.rules"), "utf8"), "firestore.rules"));

// firebase.json y .firebaserc generados desde negocio.js
const hosting = {
  ...(FIREBASE.hostingSite ? { site: FIREBASE.hostingSite } : {}),
  public: "dist",
  cleanUrls: true,
  headers: [
    { source: "**/*.@(jpg|jpeg|png|webp|svg|ttf|woff2)", headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }] },
    { source: "**/*.@(html|js)", headers: [{ key: "Cache-Control", value: "no-cache" }] },
    { source: "/personal", headers: [{ key: "X-Robots-Tag", value: "noindex" }] }
  ]
};
const firebaseJson = { hosting, ...(MODULOS.tarjeta ? { firestore: { rules: "firestore.rules" } } : {}) };
if (!DEMO) writeFileSync(join(RAIZ, "firebase.json"), JSON.stringify(firebaseJson, null, 2) + "\n");
if (!sinFirebase) writeFileSync(join(RAIZ, ".firebaserc"), JSON.stringify({ projects: { default: FIREBASE.config.projectId } }, null, 2) + "\n");

// ---------- resultado ----------
avisos.forEach(a => console.log("⚠️  " + a));
if (errores.length) {
  errores.forEach(e => console.error("❌ " + e));
  console.error(`\nBuild falló con ${errores.length} error(es).`);
  process.exit(1);
}
console.log(`✔ ${NEGOCIO.nombre}: ${DIST.split("/").pop()}/ listo` + (MODULOS.tarjeta ? " (con tarjeta de sellos)" : "") +
  (sinFirebase ? "" : ` · proyecto ${FIREBASE.config.projectId}${FIREBASE.hostingSite ? " · sitio " + FIREBASE.hostingSite : ""}`));
