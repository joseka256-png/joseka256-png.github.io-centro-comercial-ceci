// =========================================================
//  FIRESTORE DE DEMOSTRACIÓN — solo para propuestas (FIREBASE.demo = true)
//  Imita las funciones de Firebase que usa tarjeta.js, pero guarda
//  todo en localStorage de este navegador. NO es para producción.
// =========================================================
import { NEGOCIO } from "./negocio.js?v=mwp7zkgo";

const PREFIJO = "demo_" + NEGOCIO.id + ":";
const oyentes = new Map();
const ahora = () => ({ _ms: Date.now(), toDate() { return new Date(this._ms); } });
const leer = ruta => { try { const v = JSON.parse(localStorage.getItem(PREFIJO + ruta)); return v ? revivir(v) : null; } catch { return null; } };
const revivir = o => { for (const k in o) if (o[k] && o[k]._ms) o[k] = { _ms: o[k]._ms, toDate() { return new Date(this._ms); } }; return o; };
const avisar = ruta => (oyentes.get(ruta) || []).forEach(f => f());
function escribir(ruta, datos) {
  try { localStorage.setItem(PREFIJO + ruta, JSON.stringify(datos)); } catch {}
  avisar(ruta);
}
const resolverTS = d => { const o = {}; for (const k in d) o[k] = d[k] === "__ts__" ? ahora() : d[k]; return o; };
const snap = ruta => { const d = leer(ruta); return { exists: () => !!d, data: () => d, id: ruta.split("/").pop() }; };

export const initializeApp = c => ({ c });
export const getFirestore = () => ({});
export const initializeAppCheck = () => {};
export class ReCaptchaEnterpriseProvider {}
export const serverTimestamp = () => "__ts__";
export const doc = (db, ...partes) => ({ ruta: partes.join("/") });
export const getDoc = async r => snap(r.ruta);
export const setDoc = async (r, d) => escribir(r.ruta, resolverTS(d));
export const updateDoc = async (r, d) => escribir(r.ruta, { ...(leer(r.ruta) || {}), ...resolverTS(d) });
export function onSnapshot(r, cb) {
  const f = () => cb(snap(r.ruta));
  oyentes.set(r.ruta, [...(oyentes.get(r.ruta) || []), f]);
  setTimeout(f, 0);
  return () => oyentes.set(r.ruta, (oyentes.get(r.ruta) || []).filter(x => x !== f));
}
export function writeBatch() {
  const ops = [];
  return {
    set: (r, d) => ops.push(() => setDoc(r, d)),
    update: (r, d) => ops.push(() => updateDoc(r, d)),
    commit: async () => { for (const o of ops) await o(); }
  };
}

// ---------- Controles de la demostración (simulan la caja) ----------
const telActual = () => { try { return localStorage.getItem(NEGOCIO.id + "_tel"); } catch { return null; } };
export function demoSello(meta) {
  const tel = telActual(); if (!tel) return "Primero creá o consultá una tarjeta.";
  const t = leer("tarjetas/" + tel); if (!t) return "Primero creá o consultá una tarjeta.";
  if (t.sellos >= meta) return "La tarjeta está llena: canjeá el premio.";
  escribir("tarjetas/" + tel, { ...t, sellos: t.sellos + 1, actualizada: ahora() });
  return "";
}
export function demoCanje(meta) {
  const tel = telActual(); const t = tel && leer("tarjetas/" + tel);
  if (!t) return "Primero creá o consultá una tarjeta.";
  if (t.sellos < meta) return `Faltan ${meta - t.sellos} sellos para el premio.`;
  escribir("tarjetas/" + tel, { ...t, sellos: 0, canjes: (t.canjes || 0) + 1, actualizada: ahora() });
  return "";
}
