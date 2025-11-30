document.addEventListener("DOMContentLoaded", () => {
  initRegistroParticipantes();
  initRegistroPartner();
});

// ОДИН общий URL
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwujfN5d-o-ZVSVuG0sDDgR14DP2Ja0bB6DeEpCKaecvJdYPjP9hMYQatwfrGyzMB0BKA/exec";

/* ==========================================================
   1) ФОРМА УЧАСТНИКОВ (Hoja 1) — ШЛЁМ URL-ENCODED
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
      body: data, // → e.parameter.*
    }).catch((err) => {
      console.error("Error envío participantes:", err);
    });

    alert("Registro enviado. ¡Gracias!");
    // registroForm.reset();
  });
}

/* ==========================================================
   2) ФОРМА PARTNER (Hoja 2) — ТОЖЕ URL-ENCODED
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
  kitCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        kitCheckboxes.forEach((other) => {
          if (other !== this) other.checked = false;
        });
      }
    });
  });

  registroKitForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const tipo = document.querySelector('input[name="tipoCliente"]:checked');
    if (!tipo) {
      alert("Por favor elige el tipo de alta (Persona Física o Empresarial).");
      return;
    }

    const datos = {
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
      datos.rfc = document.getElementById("emRfc").value.trim();
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
      alert("Por favor elige un Paquete de Inicio.");
      return;
    }
    datos.paqueteInicio = kit.value;

    datos.partnerInvito = document.getElementById("partnerInvito").value.trim();

    const data = new URLSearchParams();
    data.append("formType", "partner");
    data.append("tipoAlta", datos.tipoAlta);
    data.append("nombre", datos.nombre);
    data.append("segundoNombre", datos.segundoNombre);
    data.append("apellidos", datos.apellidos);
    data.append("correo", datos.correo);
    data.append("telefono", datos.telefono);
    data.append("rfcCurp", datos.rfcCurp);
    data.append("rfc", datos.rfc);
    data.append("regimenFiscal", datos.regimenFiscal);
    data.append("nombreLegalEmpresa", datos.nombreLegalEmpresa);
    data.append("calle", datos.calle);
    data.append("privada", datos.privada);
    data.append("colonia", datos.colonia);
    data.append("ciudad", datos.ciudad);
    data.append("estado", datos.estado);
    data.append("cp", datos.cp);
    data.append("paqueteInicio", datos.paqueteInicio);
    data.append("partnerInvito", datos.partnerInvito);

    fetch(SCRIPT_URL, {
      method: "POST",
      body: data, // → e.parameter.*
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
