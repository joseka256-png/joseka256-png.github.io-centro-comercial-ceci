// =========================================================
//  Arma las páginas de cada negocio del centro comercial.
//  Uso (desde la raíz del repo):  node construir.mjs
//  fuente/negocios/<id>/  →  <id>/   (ej. mundo-patitas/)
//  Las carpetas generadas se suben a Git (GitHub Pages las sirve tal cual).
// =========================================================
import { readdirSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const RAIZ = new URL(".", import.meta.url).pathname;
const NEG = join(RAIZ, "fuente", "negocios");
const soloUno = process.argv[2];

for (const id of readdirSync(NEG)) {
  if (!statSync(join(NEG, id)).isDirectory() || (soloUno && id !== soloUno)) continue;
  execFileSync(process.execPath, [join(RAIZ, "fuente", "plantilla", "build.mjs"), join(NEG, id), join(RAIZ, id)], { stdio: "inherit" });
}
