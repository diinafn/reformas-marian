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

// Año del pie de página
document.querySelectorAll(".year").forEach((el) => (el.textContent = new Date().getFullYear()));
