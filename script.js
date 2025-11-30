document.addEventListener("DOMContentLoaded", () => {
  initRegistroParticipantes();
  initRegistroPartner();
});

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwujfN5d-o-ZVSVuG0sDDgR14DP2Ja0bB6DeEpCKaecvJdYPjP9hMYQatwfrGyzMB0BKA/exec";

/* ====================== Hoja 1 ====================== */
function initRegistroParticipantes() {
  const registroForm = document.getElementById("registroForm");
  if (!registroForm) return;

  registroForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const especialidad = document.getElementById("especialidad").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const celular = document.getElementById("celular").value.trim();

    if (!especialidad || !nombre || !celular) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const payload = {
      formType: "participantes",
      especialidad,
      nombre,
      celular,
    };

    await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((err) => console.error("Error envío participantes:", err));

    alert("Registro enviado. ¡Gracias!");
  });
}

/* ====================== Hoja 2 ====================== */
function initRegistroPartner() {
  const registroKitForm = document.getElementById("registroKitForm");
  if (!registroKitForm) return;

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

  tipoRadios.forEach((r) =>
    r.addEventListener("change", actualizarVisibilidadTipo)
  );

  const kitCheckboxes = document.querySelectorAll(".kit-checkbox");
  kitCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        kitCheckboxes.forEach((other) => {
          if (other !== this) other.checked = false;
        });
      }
    });
  });

  registroKitForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const tipo = document.querySelector('input[name="tipoCliente"]:checked');
    if (!tipo) {
      alert("Por favor elige el tipo de alta.");
      return;
    }

    const kit = document.querySelector(".kit-checkbox:checked");
    if (!kit) {
      alert("Por favor elige un Paquete de Inicio.");
      return;
    }

    let payload = {
      formType: "partner",
      tipoAlta: tipo.value,
      nombre: "",
      segundoNombre: "",
      apellidos: "",
      correo: "",
      telefono: "",
      rfcCurp: "",
      rfc: "",
      regimenFiscal: "",
      nombreLegalEmpresa: "",
      calle: "",
      privada: "",
      colonia: "",
      ciudad: "",
      estado: "",
      cp: "",
      paqueteInicio: kit.value,
      partnerInvito: document.getElementById("partnerInvito").value.trim(),
    };

    if (tipo.value === "persona_fisica") {
      payload.nombre = document.getElementById("pfNombre").value.trim();
      payload.segundoNombre = document
        .getElementById("pfSegundoNombre")
        .value.trim();
      payload.apellidos = document.getElementById("pfApellidos").value.trim();
      payload.correo = document.getElementById("pfCorreo").value.trim();
      payload.telefono = document.getElementById("pfTelefono").value.trim();
      payload.rfcCurp = document.getElementById("pfRfcCurp").value.trim();

      payload.calle = document.getElementById("pfCalle").value.trim();
      payload.privada = document.getElementById("pfPrivada").value.trim();
      payload.colonia = document.getElementById("pfColonia").value.trim();
      payload.ciudad = document.getElementById("pfCiudad").value.trim();
      payload.estado = document.getElementById("pfEstado").value.trim();
      payload.cp = document.getElementById("pfCP").value.trim();
    } else {
      payload.nombre = document.getElementById("emNombre").value.trim();
      payload.segundoNombre = document
        .getElementById("emSegundoNombre")
        .value.trim();
      payload.apellidos = document.getElementById("emApellidos").value.trim();
      payload.rfc = document.getElementById("emRfc").value.trim();
      payload.regimenFiscal = document
        .getElementById("emRegimenFiscal")
        .value.trim();
      payload.nombreLegalEmpresa = document
        .getElementById("emNombreLegal")
        .value.trim();
      payload.correo = document.getElementById("emCorreo").value.trim();
      payload.telefono = document.getElementById("emTelefono").value.trim();

      payload.calle = document.getElementById("emCalle").value.trim();
      payload.privada = document.getElementById("emPrivada").value.trim();
      payload.colonia = document.getElementById("emColonia").value.trim();
      payload.ciudad = document.getElementById("emCiudad").value.trim();
      payload.estado = document.getElementById("emEstado").value.trim();
      payload.cp = document.getElementById("emCP").value.trim();
    }

    await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((err) => {
      console.error("Error envío partner:", err);
      alert("Error al guardar registro.");
      return;
    });

    alert("Registro guardado correctamente.");

    registroKitForm.reset();
    datosPF.classList.add("hidden");
    datosEMP.classList.add("hidden");
    kitCheckboxes.forEach((c) => (c.checked = false));
  });
}
