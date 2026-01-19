document.addEventListener("DOMContentLoaded", () => {
  initRegistroParticipantes();
  initRegistroPartner();
});

// === Unico URL (Google Apps Script Web App) ===
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqrGe0v-rhKIH8do4vF2mwzdZ_0Ykk5GlAO6BkCtsMs15kiFanX4ML8sGLJFuO1JSd2Q/exec";

/* ==========================================================
   1) FORMULARIO PARTICIPANTES (Hoja 1)
   ========================================================== */
function initRegistroParticipantes() {
  const registroForm = document.getElementById("registroForm");
  if (!registroForm) return;

  registroForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const especialidad = document.getElementById("especialidad").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const celular = document.getElementById("celular").value.trim();

    if (!especialidad || !nombre || !celular) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const data = new URLSearchParams();
    data.append("formType", "participantes");
    data.append("especialidad", especialidad);
    data.append("nombre", nombre);
    data.append("celular", celular);

    fetch(SCRIPT_URL, {
      method: "POST",
      body: data,
    }).catch((err) => {
      console.error("Error envío participantes:", err);
    });

    alert("Registro enviado. ¡Gracias!");
  });
}

/* ==========================================================
   2) FORMULARIO PARTNER (Hoja 2)
   ========================================================== */

const PARTNER_KITS = [
  {
    id: "advanced",
    title: "Advanced Kit",
    tagline:
      "Step up your journey! The Advanced Kit offers you extended resources and wider range of tools to deepen your knowledge, strengthen your training, and support you in building a thriving business. With added value and variety, it’s the perfect choice for Partners ready to take the next level in their success.",
    price: "Mex$19,435.00",
    savings: "Ahorras 45 %",
    credits: "90.00 cr",
    priceNoSub: "Mex$35,323.00",
    img: "1.png",
    items: [
      "7 EssentOil+, 300 ml",
      "3 EssentOil+, 100 ml",
      "3 BalanceTest",
      "2 Xtend, 60 tablets",
      "2 ZinoBiotic+, 180 g",
      "2 Skin Serum, 50 ml",
      "2 Viv^+, 60 tablets",
      "10 Dosage Cups",
      "10 Zinzino Lookbook",
      "1 Express Start",
      "1-month access to Zinzino's GoCore App, our digital educational Partner tool with videos & audios",
    ],
  },
  {
    id: "health",
    title: "Health Kit",
    price: "Mex$14,575.00",
    savings: "Ahorras 48 %",
    credits: "65.00 cr",
    priceNoSub: "Mex$27,950.00",
    img: "2.png",
    items: [
      "3 EssentOil+, 300 ml",
      "5 EssentOil+, 100 ml",
      "4 BalanceTest",
      "2 Xtend, 60 tablets",
      "2 ZinoBiotic+, 180 g",
      "10 Dosage Cups",
      "10 Zinzino Lookbook",
      "1 Express Start",
      "1-month access to Zinzino's GoCore App, our digital educational Partner tool with videos & audios",
    ],
  },
  {
    id: "ultimate",
    title: "Ultimate Kit",
    badge: "Refund Campaign",
    tagline:
      "Kickstart your Zinzino journey by investing in our top-selling products with an amazing opportunity to get a full refund after 12 months!",
    extra:
      "Here’s all you need you to do:\n• Keep your monthly Z4F AutoOrder active for one full year.\n• Gain 25 Premier Kit Customers.\n• Qualify for the A-Team by the end of the 12th month.",
    price: "Mex$24,675.00",
    savings: "Ahorras 64 %",
    credits: "150.00 cr",
    priceNoSub: "Mex$67,700.00",
    img: "3.png",
    items: [
      "10 EssentOil+ Orange Lemon Mint, 300 ml",
      "10 BalanceTest",
      "4 EssentOil+ Orange Lemon Mint, 100 ml",
      "3 ZinoBiotic+",
      "3 Xtend",
      "3 Viv^+",
      "1 Skin Serum, 50 ml",
      "10 Dosage Cups",
      "10 Zinzino Lookbook",
      "1 Express Start",
      "1-month access to Zinzino's GoCore App, our digital educational Partner tool with videos & audios",
    ],
  },
  {
    id: "ultimate_practitioners",
    title: "Ultimate Practitioners Kit",
    badge: "Refund Campaign",
    tagline:
      "Kickstart your Zinzino journey by investing in our top-selling products with an amazing opportunity to get a full refund after 12 months!",
    extra:
      "Here’s all you need you to do:\n• Keep your monthly Z4F AutoOrder active for one full year.\n• Gain 25 Premier Kit Customers.\n• Qualify for the A-Team by the end of the 12th month.",
    price: "Mex$24,675.00",
    savings: "Ahorras 64 %",
    credits: "150.00 cr",
    priceNoSub: "Mex$68,400.00",
    img: "4.png",
    items: [
      "15 BalanceOil+, 300 ml",
      "15 BalanceOil, 100 ml",
      "10 BalanceTest",
      "10 Dosage Cups",
      "10 Zinzino Lookbook",
      "1 Express Start",
      "1-month access to Zinzino's GoCore App, our digital educational Partner tool with videos & audios",
    ],
  },
  {
    id: "ultimate_sanki",
    title: "Ultimate Sanki Kit",
    price: "Mex$24,675.00",
    savings: "Ahorras 43 %",
    credits: "150.00 cr",
    priceNoSub: "Mex$42,979.00",
    img: "5.png",
    items: [
      "12 BelAge",
      "10 Kronuit Fire 2.0",
      "5 Inner 7 con Yuzim",
      "5 Hasaki Chocolate",
      "1 Express Start",
      "1-month access to Zinzino's GoCore App, our digital educational Partner tool with videos & audios",
    ],
  },
  {
    id: "ultimate_mixed",
    title: "Ultimate Mixed Kit",
    price: "Mex$24,675.00",
    savings: "Ahorras 58 %",
    credits: "150.00 cr",
    priceNoSub: "Mex$58,946.00",
    img: "6.png",
    items: [
      "4 BelAge",
      "2 Kronuit Fire 2.0",
      "2 Inner 7 con Yuzim",
      "2 Hasaki Chocolate",
      "4 EssentOil+, 300 ml",
      "10 BalanceTest",
      "1 Express Start",
      "1-month access to Zinzino's GoCore App, our digital educational Partner tool with videos & audios",
    ],
  },
  {
    id: "custom",
    title: "Paquete personalizado",
    tagline:
      "Si en tu web hay muchas opciones, usa esta opción para escribir exactamente lo que necesitas.",
    price: "(a definir)",
    savings: "",
    credits: "",
    priceNoSub: "",
    img: "custom-kit.svg",
    isCustom: true,
    items: [],
  },
];

function initRegistroPartner() {
  const registroKitForm = document.getElementById("registroKitForm");
  if (!registroKitForm) return;

  // Render kits
  const kitsGrid = document.getElementById("kitsGrid");
  if (kitsGrid) {
    kitsGrid.innerHTML = PARTNER_KITS.map(renderKitCard).join("");
  }

  const customKitFields = document.getElementById("customKitFields");

  // PF/EMP toggle
  const tipoRadios = document.querySelectorAll('input[name="tipoCliente"]');
  const datosPF = document.getElementById("datosPF");
  const datosEMP = document.getElementById("datosEMP");

  function actualizarVisibilidadTipo() {
    const tipo = document.querySelector('input[name="tipoCliente"]:checked');
    if (!tipo) {
      datosPF.classList.add("hidden");
      datosEMP.classList.add("hidden");
      return;
    }
    if (tipo.value === "persona_fisica") {
      datosPF.classList.remove("hidden");
      datosEMP.classList.add("hidden");
    } else {
      datosEMP.classList.remove("hidden");
      datosPF.classList.add("hidden");
    }
  }

  tipoRadios.forEach((r) => r.addEventListener("change", actualizarVisibilidadTipo));

  // Kit selection UI
  function updateKitSelectionUI() {
    const radios = document.querySelectorAll('.kit-radio');
    radios.forEach((r) => {
      const card = r.closest('.kit-option');
      if (!card) return;
      if (r.checked) card.classList.add('selected');
      else card.classList.remove('selected');
    });

    const selected = document.querySelector('input[name="kit"]:checked');
    if (!customKitFields) return;
    if (selected && selected.value === "custom") {
      customKitFields.classList.remove("hidden");
    } else {
      customKitFields.classList.add("hidden");
    }
  }

  document.addEventListener('change', (e) => {
    if (e.target && e.target.matches('input[name="kit"]')) {
      updateKitSelectionUI();
    }
  });

  // Initial state
  updateKitSelectionUI();

  registroKitForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const tipo = document.querySelector('input[name="tipoCliente"]:checked');
    if (!tipo) {
      alert("Por favor elige el tipo de alta (Persona Física o Empresarial)." );
      return;
    }

    const kitRadio = document.querySelector('input[name="kit"]:checked');
    if (!kitRadio) {
      alert("Por favor elige un Paquete de Inicio.");
      return;
    }

    const kitData = PARTNER_KITS.find((k) => k.id === kitRadio.value);

    // === Ddatos PF/EMP ===
    let nombre = "";
    let segundoNombre = "";
    let apellidos = "";
    let correo = "";
    let telefono = "";
    let rfcCurp = "";
    let rfc = "";
    let regimenFiscal = "";
    let nombreLegalEmpresa = "";
    let calle = "";
    let privada = "";
    let colonia = "";
    let ciudad = "";
    let estado = "";
    let cp = "";

    if (tipo.value === "persona_fisica") {
      nombre = document.getElementById("pfNombre").value.trim();
      segundoNombre = document.getElementById("pfSegundoNombre").value.trim();
      apellidos = document.getElementById("pfApellidos").value.trim();
      correo = document.getElementById("pfCorreo").value.trim();
      telefono = document.getElementById("pfTelefono").value.trim();
      rfcCurp = document.getElementById("pfRfcCurp").value.trim();

      calle = document.getElementById("pfCalle").value.trim();
      privada = document.getElementById("pfPrivada").value.trim();
      colonia = document.getElementById("pfColonia").value.trim();
      ciudad = document.getElementById("pfCiudad").value.trim();
      estado = document.getElementById("pfEstado").value.trim();
      cp = document.getElementById("pfCP").value.trim();
    } else {
      nombre = document.getElementById("emNombre").value.trim();
      segundoNombre = document.getElementById("emSegundoNombre").value.trim();
      apellidos = document.getElementById("emApellidos").value.trim();
      rfc = document.getElementById("emRfc").value.trim();
      regimenFiscal = document.getElementById("emRegimenFiscal").value.trim();
      nombreLegalEmpresa = document.getElementById("emNombreLegal").value.trim();
      correo = document.getElementById("emCorreo").value.trim();
      telefono = document.getElementById("emTelefono").value.trim();

      calle = document.getElementById("emCalle").value.trim();
      privada = document.getElementById("emPrivada").value.trim();
      colonia = document.getElementById("emColonia").value.trim();
      ciudad = document.getElementById("emCiudad").value.trim();
      estado = document.getElementById("emEstado").value.trim();
      cp = document.getElementById("emCP").value.trim();
    }

    const partnerInvito = document.getElementById("partnerInvito").value.trim();

    // Custom kit fields (optional)
    const customKitTitle = document.getElementById("customKitTitle")?.value.trim() || "";
    const customKitPrice = document.getElementById("customKitPrice")?.value.trim() || "";
    const customKitCredits = document.getElementById("customKitCredits")?.value.trim() || "";
    const customKitItems = document.getElementById("customKitItems")?.value.trim() || "";

    if (kitRadio.value === "custom") {
      // For the custom option, require at least a description
      if (!customKitTitle && !customKitItems) {
        alert("Por favor completa el paquete personalizado (mínimo el nombre o el contenido).");
        return;
      }
    }

    // Build summary string for Sheets
    const summary = buildKitSummary(kitData, {
      customKitTitle,
      customKitPrice,
      customKitCredits,
    });

    const data = new URLSearchParams();
    data.append("formType", "partner");
    data.append("tipoAlta", tipo.value);
    data.append("nombre", nombre);
    data.append("segundoNombre", segundoNombre);
    data.append("apellidos", apellidos);
    data.append("correo", correo);
    data.append("telefono", telefono);
    data.append("rfcCurp", rfcCurp);
    data.append("rfc", rfc);
    data.append("regimenFiscal", regimenFiscal);
    data.append("nombreLegalEmpresa", nombreLegalEmpresa);
    data.append("calle", calle);
    data.append("privada", privada);
    data.append("colonia", colonia);
    data.append("ciudad", ciudad);
    data.append("estado", estado);
    data.append("cp", cp);

    data.append("paqueteId", kitRadio.value);
    data.append("paqueteInicio", summary);
    data.append("partnerInvito", partnerInvito);

    // Additional kit info (safe to ignore if Apps Script not updated)
    if (kitData) {
      data.append("paqueteContenido", (kitData.items || []).join("\n"));
    }

    // Custom fields (safe to ignore if Apps Script not updated)
    data.append("customKitTitle", customKitTitle);
    data.append("customKitPrice", customKitPrice);
    data.append("customKitCredits", customKitCredits);
    data.append("customKitItems", customKitItems);

    fetch(SCRIPT_URL, {
      method: "POST",
      body: data,
    })
      .then(() => {
        alert("Registro guardado correctamente.");
        registroKitForm.reset();
        datosPF.classList.add("hidden");
        datosEMP.classList.add("hidden");
        if (customKitFields) customKitFields.classList.add("hidden");
        updateKitSelectionUI();
      })
      .catch((err) => {
        console.error("Error envío partner:", err);
        alert("Error al guardar registro.");
      });
  });
}

function renderKitCard(kit) {
  const id = `kit_${kit.id}`;
  const metaParts = [];

  if (kit.price && kit.price !== "(a definir)") {
    const savingsPart = kit.savings ? ` (${kit.savings})` : "";
    metaParts.push(`<div class=\"kit-price\">${escapeHtml(kit.price)}${escapeHtml(savingsPart)}</div>`);
  } else {
    metaParts.push(`<div class=\"kit-price\">${escapeHtml(kit.price || "")}</div>`);
  }

  const metaLine =
    [
      kit.credits ? `Créditos: ${kit.credits}` : "",
      kit.priceNoSub ? `Precio sin suscripción: ${kit.priceNoSub}` : "",
    ]
      .filter(Boolean)
      .join(" • ");

  const badgeHtml = kit.badge
    ? `<div class=\"kit-badge\">${escapeHtml(kit.badge)}</div>`
    : "";

  const descriptionHtml = kit.tagline
    ? `<div class=\"kit-description\">${escapeHtml(kit.tagline)}</div>`
    : "";

  const extraHtml = kit.extra
    ? `<div class=\"kit-description\">${escapeHtml(kit.extra).replace(/\n/g, "<br>")}</div>`
    : "";

  const detailsHtml = (kit.items && kit.items.length)
    ? `<details class=\"kit-details\"><summary>Ver contenido del paquete</summary><ul class=\"kit-items\">${kit.items
        .map((it) => `<li>${escapeHtml(it)}</li>`)
        .join("")}</ul></details>`
    : kit.isCustom
    ? `<details class=\"kit-details\"><summary>¿Cómo funciona?</summary><ul class=\"kit-items\"><li>Elige esta opción y completa los campos de “Paquete personalizado”.</li><li>Escribe productos + cantidades (puedes copiar y pegar).</li></ul></details>`
    : "";

  return `
    <label class="kit-option" for="${id}">
      <div class="kit-header">
        <input type="radio" class="kit-radio" id="${id}" name="kit" value="${escapeHtml(kit.id)}" />
        <div>
          <div class="kit-title">${escapeHtml(kit.title)}</div>
          ${badgeHtml}
          ${metaParts.join("")}
          ${metaLine ? `<div class="kit-meta">${escapeHtml(metaLine)}</div>` : ""}
        </div>
      </div>
      <img src="${escapeHtml(kit.img)}" alt="${escapeHtml(kit.title)}" class="kit-img" />
      ${descriptionHtml}
      ${extraHtml}
      ${detailsHtml}
    </label>
  `;
}

function buildKitSummary(kit, custom) {
  if (!kit) return "";

  if (kit.id !== "custom") {
    const parts = [kit.title];
    if (kit.price) parts.push(kit.price);
    if (kit.savings) parts.push(kit.savings);
    if (kit.credits) parts.push(kit.credits);
    if (kit.priceNoSub) parts.push(`Sin suscripción: ${kit.priceNoSub}`);
    return parts.join(" | ");
  }

  const parts = ["Paquete personalizado"];
  if (custom.customKitTitle) parts.push(custom.customKitTitle);
  if (custom.customKitPrice) parts.push(custom.customKitPrice);
  if (custom.customKitCredits) parts.push(custom.customKitCredits);
  return parts.join(" | ");
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
