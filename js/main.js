// Menú móvil
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
}

// Formulario de presupuesto: abre WhatsApp con el mensaje ya escrito
const form = document.getElementById("presupuesto-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const msg =
      `Hola, quiero pedir presupuesto.\n` +
      `Nombre: ${d.get("nombre")}\n` +
      `Teléfono: ${d.get("telefono")}\n` +
      `Tipo de reforma: ${d.get("servicio")}\n` +
      `Zona: ${d.get("zona") || "-"}\n` +
      `Detalles: ${d.get("mensaje") || "-"}`;
    window.open(`https://wa.me/34642722175?text=${encodeURIComponent(msg)}`, "_blank");
  });
}

// Filtros de la galería de trabajos
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.toggle("active", b === btn));
    const f = btn.dataset.filter;
    document.querySelectorAll("#galeria figure").forEach((fig) => {
      fig.hidden = f !== "todos" && !fig.dataset.cats.split(" ").includes(f);
    });
  });
});

// Visor de fotos a pantalla completa
const lbLinks = document.querySelectorAll("a.lb");
if (lbLinks.length) {
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.hidden = true;
  lb.innerHTML =
    '<button class="lb-close" aria-label="Cerrar">×</button>' +
    '<button class="lb-prev" aria-label="Foto anterior">‹</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<button class="lb-next" aria-label="Foto siguiente">›</button>';
  document.body.appendChild(lb);
  const img = lb.querySelector("img");
  const cap = lb.querySelector("figcaption");
  let current = 0;
  const visible = () => [...lbLinks].filter((a) => !a.closest("figure").hidden);
  const show = (i) => {
    const list = visible();
    current = (i + list.length) % list.length;
    img.src = list[current].href;
    img.alt = cap.textContent = list[current].dataset.caption;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    lb.hidden = true;
    document.body.style.overflow = "";
  };
  lbLinks.forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      show(visible().indexOf(a));
    })
  );
  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
  lb.querySelector(".lb-next").addEventListener("click", () => show(current + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
}

// Año del pie de página
document.querySelectorAll(".year").forEach((el) => (el.textContent = new Date().getFullYear()));
