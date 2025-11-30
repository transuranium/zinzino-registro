document.addEventListener("DOMContentLoaded", () => {
  initRegistroParticipantes();
  initRegistroPartner();
});

// ОДИН общий URL
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

    const data = new URLSearchParams();
    data.append("formType", "participantes");
    data.append("especialidad", especialidad);
    data.append("nombre", nombre);
    data.append("celular", celular);

    fetch(SCRIPT_URL, {
      method: "POST",
      body: data, // ← классический form-POST
    }).catch((err) => {
      console.error("Error envío participantes:", err);
    });

    alert("Registro enviado. ¡Gracias!");
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

  // показать / скрыть PF / EMP
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

  // только один kit
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

    const kit = document.querySelector(".kit-checkbox:checked");
    if (!kit) {
      alert("Por favor elige un Paquete de Inicio.");
      return;
    }

    // === собираем ДАННЫЕ (PF или EMP) ===
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
      nombreLegalEmpresa = document
        .getElementById("emNombreLegal")
        .value.trim();
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
    data.append("paqueteInicio", kit.value);
    data.append("partnerInvito", partnerInvito); // ← колонка R

    fetch(SCRIPT_URL, {
      method: "POST",
      body: data, // e.parameter.* на стороне Apps Script
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
