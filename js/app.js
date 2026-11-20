import { CENTRO, NEGOCIOS, LEALTAD, SALON } from "./datos.js";
import { ico, icoWA, wa, colones } from "./iconos.js";

const $ = s => document.querySelector(s);
const esc = t => String(t ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const conTarjeta = NEGOCIOS.filter(n => n.tarjeta);

// ---------- hero y menú ----------
$("#heroLema").textContent = CENTRO.lema;
$("#icoFlecha").outerHTML = ico("flecha");
$("#heroDatos").innerHTML = `
  <span>${ico("pin")} 350 m norte de la Basílica</span>
  <a href="tel:${CENTRO.telefono.replace("-", "")}" style="text-decoration:none"><span>${ico("tel")} ${esc(CENTRO.telefono)}</span></a>`;
$("#hamb").innerHTML = ico("menu");
$("#hamb").onclick = () => $("#menu").classList.toggle("abierto");
document.querySelectorAll("#menu a").forEach(a => a.onclick = () => $("#menu").classList.remove("abierto"));

const palabras = ["Mundo Patitas", "Delicias Vivi", "Salón de Eventos Ceci", "Tarjeta de cliente frecuente", "Plazoleta de comidas", "Cartago"];
$("#cinta").innerHTML = [...palabras, ...palabras].map(p => `<span>${p}</span>`).join("");

// ---------- grilla de negocios ----------
$("#grillaNegocios").innerHTML = NEGOCIOS.map(n => n.tipo === "publicidad" ? `
  <a class="tarjeta-neg publi aparecer" href="${wa(CENTRO.whatsapp, "Hola, me interesa anunciar mi negocio en el sitio de Ceci's.")}" target="_blank" rel="noopener">
    <div class="logo-vacio">${ico("megafono")}</div>
    <h3>${esc(n.nombre)}</h3><div class="cat">${esc(n.categoria)}</div>
    <p>${esc(n.descripcion)}</p>
    <span class="ver-mas">Anunciarse aquí ${ico("flecha")}</span>
  </a>` : `
  <a class="tarjeta-neg aparecer" href="#${n.id}" style="--c:${n.color};--suave:${n.colorSuave}">
    <img class="logo" src="${n.logo}" alt="Logo de ${esc(n.nombre)}">
    <h3>${esc(n.nombre)}</h3><div class="cat">${esc(n.categoria)}</div>
    <p>${esc(n.descripcion)}</p>
    ${n.tarjeta ? `<span class="etiqueta-sellos">${ico("sello")} Cliente frecuente</span>` : ""}
    <span class="ver-mas">Conocer más ${ico("flecha")}</span>
  </a>`).join("");

// ---------- secciones de cada negocio ----------
function seccionNegocio(n) {
  const el = document.getElementById(n.id);
  if (!el) return;
  const L = LEALTAD[n.id];
  const secundaria = n.promo ? `<div class="secundaria"><img src="${n.promo}" alt="Promoción en ${esc(n.nombre)}"></div>` : "";
  el.innerHTML = `
  <div class="envoltura">
    <div class="fotos aparecer"><div class="principal"><img src="${n.foto}" alt="${esc(n.nombre)}" loading="lazy"></div>${secundaria}</div>
    <div class="aparecer">
      <div class="encabezado"><img src="${n.logo}" alt=""><span class="ojo">${esc(n.categoria)}</span></div>
      <h2>${esc(n.nombre)}</h2>
      <p class="intro">${esc(n.descripcion)}</p>
      <div class="lista">${n.destacados.map(d => `<span>${esc(d)}</span>`).join("")}</div>
      ${L ? `<p class="intro" style="font-size:.95rem;margin:-6px 0 24px">${ico("sello").replace("<svg", '<svg style="width:18px;height:18px;vertical-align:-3px;margin-right:6px"')}Un sello por cada compra de ${colones(L.montoMinimo)} o más · ${L.meta} sellos = ${esc(L.premio.toLowerCase())}.</p>` : ""}
      <div class="acciones">
        <a class="btn btn-primario" href="${wa(n.whatsapp, `Hola ${n.nombre}, les escribo desde el sitio de Ceci's.`)}" target="_blank" rel="noopener">${icoWA} Escribir por WhatsApp</a>
        ${n.tarjeta ? `<a class="btn btn-claro" href="tarjeta.html?n=${n.id}">Mi tarjeta</a>` : ""}
      </div>
    </div>
  </div>`;
}
NEGOCIOS.forEach(seccionNegocio);

// ---------- tarjetas de lealtad (vista previa) ----------
const marca = { "mundo-patitas": ["patitas", "pata"], "delicias-vivi": ["vivi", "burger"] };
$("#tarjetasLealtad").innerHTML = conTarjeta.map(n => {
  const L = LEALTAD[n.id]; const [clase, icono] = marca[n.id] || ["patitas", "sello"];
  const ejemplo = Math.min(3, L.meta);
  const sellos = Array.from({ length: L.meta }, (_, i) => `<i class="${i < ejemplo ? "on" : ""}">${i < ejemplo ? ico(icono) : ""}</i>`).join("");
  return `
  <a class="tl ${clase} aparecer" href="tarjeta.html?n=${n.id}">
    <div class="fila"><img src="${n.logo}" alt=""><div><h3>${esc(n.nombre)}</h3><small>Compras desde ${colones(L.montoMinimo)}</small></div></div>
    <div class="sellos">${sellos}</div>
    <div class="pie"><span>${ico("regalo").replace("<svg", '<svg style="width:18px;height:18px;vertical-align:-3px;margin-right:6px"')}${esc(L.premio)}</span><b>Ver mi tarjeta →</b></div>
  </a>`;
}).join("");

// ---------- salón ----------
$("#salon").innerHTML = `
  <div class="envoltura">
    <div class="foto aparecer"><img src="${SALON.foto}" alt="${esc(SALON.nombre)} decorado" loading="lazy"></div>
    <div class="aparecer">
      <span class="ojo">${ico("fiesta").replace("<svg", '<svg style="width:18px;height:18px"')} Eventos</span>
      <h2>${esc(SALON.nombre)}</h2>
      <p class="intro">${esc(SALON.texto)}</p>
      <ul>${SALON.incluye.map(i => `<li>${ico("check")}${esc(i)}</li>`).join("")}</ul>
      <p class="capacidad">Capacidad: ${esc(SALON.capacidad)}</p>
      <a class="btn btn-primario" href="${wa(SALON.whatsapp, "Hola, quisiera cotizar el Salón de Eventos Ceci. Fecha: ___ · Tipo de evento: ___ · Personas: ___")}" target="_blank" rel="noopener">${icoWA} Cotizar mi evento</a>
    </div>
  </div>`;

// ---------- visítenos ----------
$("#datosVisita").innerHTML = `
  <div class="dato">${ico("pin")}<div><b>Dirección</b><a href="${CENTRO.mapsUrl}" target="_blank" rel="noopener">${esc(CENTRO.direccion)}</a></div></div>
  <div class="dato">${ico("tel")}<div><b>Teléfono del centro comercial</b><a href="tel:${CENTRO.telefono.replace("-", "")}">${esc(CENTRO.telefono)}</a></div></div>
  <div class="dato">${ico("reloj")}<div style="flex:1"><b>Horario</b>${CENTRO.horario.map(([d, h]) => `<div class="horario-fila"><span>${esc(d)}</span><span>${esc(h)}</span></div>`).join("")}</div></div>
  <div class="dato">${ico("pago")}<div><b>Formas de pago</b><span>${CENTRO.pagos.map(esc).join(" · ")}</span></div></div>
  <img class="fachada" src="assets/img/fachada.jpg" alt="Fachada del Centro Comercial Ceci's" loading="lazy">`;
$("#mapa").src = CENTRO.mapaEmbed;
$("#btnLocal").href = wa(CENTRO.whatsapp, "Hola, quisiera información sobre locales o publicidad en Ceci's.");
$("#waFlotante").href = wa(CENTRO.whatsapp, "Hola Ceci's, les escribo desde el sitio web.");
$("#waFlotante").innerHTML = icoWA;

// ---------- animación al hacer scroll ----------
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll(".aparecer").forEach(el => io.observe(el));
