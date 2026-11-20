// =========================================================
//  Tarjeta de cliente frecuente — MODO DEMOSTRACIÓN
//  Los datos se guardan en localStorage de este navegador.
//  Versión final: Firestore (negocios/{id}/tarjetas/{telefono}) +
//  QR de un solo uso que genera la caja de cada negocio,
//  igual que la plantilla de La Central pero multi-negocio.
// =========================================================
import { NEGOCIOS, LEALTAD } from "./datos.js";
import { ico, colones } from "./iconos.js";

const $ = s => document.querySelector(s);
const esc = t => String(t ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const NEG = NEGOCIOS.filter(n => n.tarjeta);
const marca = { "mundo-patitas": ["patitas", "pata"], "delicias-vivi": ["vivi", "burger"] };

const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const leer = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };

let actual = new URLSearchParams(location.search).get("n");
if (!NEG.some(n => n.id === actual)) actual = NEG[0].id;
let cliente = leer("ceci_cliente", null);

const clave = () => `ceci_tarjeta_${actual}_${cliente.telefono}`;
const tarjeta = () => leer(clave(), { sellos: 0, canjes: 0, historial: [] });

function pestanas() {
  $("#pestanas").innerHTML = NEG.map(n =>
    `<button class="${n.id === actual ? "activa" : ""}" data-id="${n.id}"><img src="${n.logo}" alt="">${esc(n.nombre)}</button>`).join("");
  $("#pestanas").querySelectorAll("button").forEach(b => b.onclick = () => {
    actual = b.dataset.id; history.replaceState(null, "", "?n=" + actual); pintar();
  });
}

function registro() {
  $("#contenido").innerHTML = `
  <div class="caja">
    <h3>Saque su tarjeta</h3>
    <p>Solo la primera vez. Con su número de teléfono puede consultar sus sellos cuando quiera.</p>
    <form id="form" novalidate>
      <label for="nombre">Nombre</label>
      <input id="nombre" type="text" autocomplete="name" maxlength="60" placeholder="Ej. María Fernández">
      <label for="tel">Número de teléfono</label>
      <input id="tel" type="tel" inputmode="numeric" maxlength="9" placeholder="8888-8888">
      <label class="acepto"><input id="acepto" type="checkbox"> Acepto que Ceci's guarde mi nombre y teléfono solo para la tarjeta de cliente frecuente.</label>
      <div class="error" id="error"></div>
      <button class="btn btn-primario w100" type="submit">Crear mi tarjeta</button>
    </form>
  </div>`;
  $("#tel").oninput = e => { const d = e.target.value.replace(/\D/g, "").slice(0, 8); e.target.value = d.length > 4 ? d.slice(0, 4) + "-" + d.slice(4) : d; };
  $("#form").onsubmit = e => {
    e.preventDefault();
    const nombre = $("#nombre").value.trim(), telefono = $("#tel").value.replace(/\D/g, "");
    if (nombre.length < 3) return $("#error").textContent = "Escriba su nombre (al menos 3 letras).";
    if (!/^[2-8]\d{7}$/.test(telefono)) return $("#error").textContent = "El teléfono debe tener 8 dígitos.";
    if (!$("#acepto").checked) return $("#error").textContent = "Para continuar, marque la casilla de aceptación.";
    cliente = { nombre, telefono }; guardar("ceci_cliente", cliente); pintar();
  };
}

function vistaTarjeta(animar = -1) {
  const n = NEG.find(x => x.id === actual), L = LEALTAD[actual], t = tarjeta();
  const [clase, icono] = marca[actual] || ["patitas", "sello"];
  const llena = t.sellos >= L.meta;
  const sellos = Array.from({ length: L.meta }, (_, i) =>
    `<i class="${i < t.sellos ? "on" : ""} ${i === animar ? "pop" : ""}">${i < t.sellos ? ico(icono) : ""}</i>`).join("");
  const telTxt = cliente.telefono.slice(0, 4) + "-" + cliente.telefono.slice(4);

  $("#contenido").innerHTML = `
  <div class="tl ${clase}">
    <div class="fila"><img src="${n.logo}" alt=""><div><h3>${esc(n.nombre)}</h3><small>Tarjeta de cliente frecuente</small></div></div>
    <div><div class="nombre-cli">${esc(cliente.nombre)}</div><small>Tel. ${telTxt}</small></div>
    <div class="sellos">${sellos}</div>
    <div class="barra-prog"><i style="width:${Math.min(100, t.sellos / L.meta * 100)}%"></i></div>
    <div class="pie"><span>${llena ? "¡Tarjeta completa!" : `${t.sellos} de ${L.meta} sellos · le faltan ${L.meta - t.sellos}`}</span><b>${t.canjes} canje${t.canjes === 1 ? "" : "s"}</b></div>
  </div>

  ${llena ? `<div class="premio-listo" style="margin-top:16px">${ico("regalo")}<span>Ganó: ${esc(L.premio)}. Muéstrele esta pantalla a la caja para canjearlo.</span></div>` : ""}

  <div class="caja">
    <h3>Cómo suma sellos</h3>
    <p>Un sello por cada compra de <b style="color:#fff">${colones(L.montoMinimo)}</b> o más en ${esc(n.nombre)}. Al pagar, pida el QR en la caja y escanéelo con la cámara de su celular. Con ${L.meta} sellos: <b style="color:#fff">${esc(L.premio.toLowerCase())}</b>.</p>
  </div>

  <div class="caja demo">
    <span class="chip">SOLO PARA LA DEMOSTRACIÓN</span>
    <h3>Simular la caja</h3>
    <p>En la versión final estos botones no existen para el cliente: la caja genera un QR de un solo uso que vence en minutos, y el canje lo hace el personal desde su panel.</p>
    <div class="botones">
      <button class="btn btn-primario" id="bSello" ${llena ? "disabled style='opacity:.5'" : ""}>${ico("qr")} Escanear QR de la caja</button>
      <button class="btn btn-borde" id="bCanje" ${llena ? "" : "disabled style='opacity:.4'"}>${ico("regalo")} Canjear premio</button>
    </div>
  </div>

  ${t.historial.length ? `<div class="caja"><h3>Movimientos</h3><ul class="hist">${t.historial.slice(0, 8).map(h =>
      `<li><span>${esc(h.texto)}</span><span>${new Date(h.fecha).toLocaleString("es-CR", { dateStyle: "short", timeStyle: "short" })}</span></li>`).join("")}</ul></div>` : ""}

  <button class="salir" id="bSalir">No soy ${esc(cliente.nombre.split(" ")[0])} · usar otro número</button>`;

  $("#bSello").onclick = () => {
    const t2 = tarjeta(); if (t2.sellos >= L.meta) return;
    t2.sellos++; t2.historial.unshift({ texto: "Sello por compra", fecha: Date.now() });
    guardar(clave(), t2); vistaTarjeta(t2.sellos - 1);
  };
  $("#bCanje").onclick = () => {
    const t2 = tarjeta(); if (t2.sellos < L.meta) return;
    t2.sellos = 0; t2.canjes++; t2.historial.unshift({ texto: "Premio canjeado", fecha: Date.now() });
    guardar(clave(), t2); vistaTarjeta();
  };
  $("#bSalir").onclick = () => { localStorage.removeItem("ceci_cliente"); cliente = null; pintar(); };
}

function pintar() { pestanas(); cliente ? vistaTarjeta() : registro(); }
pintar();
