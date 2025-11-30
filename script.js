document.addEventListener("DOMContentLoaded", () => {
  initRegistroParticipantes();
  initRegistroPartner();
});

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwujfN5d-o-ZVSVuG0sDDgR14DP2Ja0bB6DeEpCKaecvJdYPjP9hMYQatwfrGyzMB0BKA/exec";

/* ==========================================================
   1) ФОРМА УЧАСТНИКОВ (Hoja 1)
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

    const data = {
      formType: "participantes",
      especialidad,
      nombre,
      celular,
    };

    const body = new URLSearchParams();
    Object.keys(data).forEach((k) => body.append(k, data[k] || ""));

    fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    }).catch((err) => console.error("Error envío participantes:", err));

    alert("Registro enviado. ¡Gracias!");
    // registroForm.reset();
  });
}

/* ==========================================================
   2) ФОРМА PARTNER (Hoja 2)
   ========================================================== */
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
  kitCheckboxes.forEach((box) =>
    box.addEventListener("change", function () {
      if (this.checked) {
        kitCheckboxes.forEach((c) => {
          if (c !== this) c.checked = false;
        });
      }
    })
  );

  registroKitForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const tipo = document.querySelector('input[name="tipoCliente"]:checked');
    if (!tipo) {
      alert("Selecciona Persona Física o Empresarial.");
      return;
    }

    const datos = {
      formType: "partner",
      tipoAlta: tipo.value,
      nombre: "",
      segundoNombre: "",
      apellidos: "",
      correo: "",
      telefono: "",
      rfcCurp: "",
      regimenFiscal: "",
      nombreLegalEmpresa: "",
      calle: "",
      privada: "",
      colonia: "",
      ciudad: "",
      estado: "",
      cp: "",
      paqueteInicio: "",
      partnerInvito: "",
    };

    if (tipo.value === "persona_fisica") {
      datos.nombre = document.getElementById("pfNombre").value.trim();
      datos.segundoNombre = document
        .getElementById("pfSegundoNombre")
        .value.trim();
      datos.apellidos = document.getElementById("pfApellidos").value.trim();
      datos.correo = document.getElementById("pfCorreo").value.trim();
      datos.telefono = document.getElementById("pfTelefono").value.trim();
      datos.rfcCurp = document.getElementById("pfRfcCurp").value.trim();

      datos.calle = document.getElementById("pfCalle").value.trim();
      datos.privada = document.getElementById("pfPrivada").value.trim();
      datos.colonia = document.getElementById("pfColonia").value.trim();
      datos.ciudad = document.getElementById("pfCiudad").value.trim();
      datos.estado = document.getElementById("pfEstado").value.trim();
      datos.cp = document.getElementById("pfCP").value.trim();
    } else {
      datos.nombre = document.getElementById("emNombre").value.trim();
      datos.segundoNombre = document
        .getElementById("emSegundoNombre")
        .value.trim();
      datos.apellidos = document.getElementById("emApellidos").value.trim();
      datos.rfcCurp = document.getElementById("emRfc").value.trim();
      datos.regimenFiscal = document
        .getElementById("emRegimenFiscal")
        .value.trim();
      datos.nombreLegalEmpresa = document
        .getElementById("emNombreLegal")
        .value.trim();
      datos.correo = document.getElementById("emCorreo").value.trim();
      datos.telefono = document.getElementById("emTelefono").value.trim();

      datos.calle = document.getElementById("emCalle").value.trim();
      datos.privada = document.getElementById("emPrivada").value.trim();
      datos.colonia = document.getElementById("emColonia").value.trim();
      datos.ciudad = document.getElementById("emCiudad").value.trim();
      datos.estado = document.getElementById("emEstado").value.trim();
      datos.cp = document.getElementById("emCP").value.trim();
    }

    const kit = document.querySelector(".kit-checkbox:checked");
    if (!kit) {
      alert("Selecciona un paquete.");
      return;
    }
    datos.paqueteInicio = kit.value;

    datos.partnerInvito = document.getElementById("partnerInvito").value.trim();

    const body = new URLSearchParams();
    Object.keys(datos).forEach((k) => body.append(k, datos[k] || ""));

    fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    })
      .then(() => {
        alert("Registro guardado correctamente.");
        registroKitForm.reset();
        datosPF.classList.add("hidden");
        datosEMP.classList.add("hidden");
        kitCheckboxes.forEach((c) => (c.checked = false));
      })
      .catch((err) => {
        console.error("Error envío partner:", err);
        alert("Error al guardar registro.");
      });
  });
}
