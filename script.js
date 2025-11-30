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
      body: data,
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

  registroKitForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const tipo = document.querySelector('input[name="tipoCliente"]:checked');
    if (!tipo) {
      alert("Por favor elige el tipo de alta.");
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
      datos.nombre = pfNombre.value.trim();
      datos.segundoNombre = pfSegundoNombre.value.trim();
      datos.apellidos = pfApellidos.value.trim();
      datos.correo = pfCorreo.value.trim();
      datos.telefono = pfTelefono.value.trim();
      datos.rfcCurp = pfRfcCurp.value.trim();

      datos.calle = pfCalle.value.trim();
      datos.privada = pfPrivada.value.trim();
      datos.colonia = pfColonia.value.trim();
      datos.ciudad = pfCiudad.value.trim();
      datos.estado = pfEstado.value.trim();
      datos.cp = pfCP.value.trim();
    } else {
      datos.nombre = emNombre.value.trim();
      datos.segundoNombre = emSegundoNombre.value.trim();
      datos.apellidos = emApellidos.value.trim();
      datos.rfc = emRfc.value.trim();
      datos.regimenFiscal = emRegimenFiscal.value.trim();
      datos.nombreLegalEmpresa = emNombreLegal.value.trim();
      datos.correo = emCorreo.value.trim();
      datos.telefono = emTelefono.value.trim();

      datos.calle = emCalle.value.trim();
      datos.privada = emPrivada.value.trim();
      datos.colonia = emColonia.value.trim();
      datos.ciudad = emCiudad.value.trim();
      datos.estado = emEstado.value.trim();
      datos.cp = emCP.value.trim();
    }

    const kit = document.querySelector(".kit-checkbox:checked");
    if (!kit) {
      alert("Por favor elige un Paquete de Inicio.");
      return;
    }
    datos.paqueteInicio = kit.value;

    datos.partnerInvito = partnerInvito.value.trim();

    // отправка
    const data = new URLSearchParams();
    data.append("formType", "partner");
    Object.keys(datos).forEach((key) => data.append(key, datos[key] || ""));

    await fetch(SCRIPT_URL, {
      method: "POST",
      body: data,
    });

    alert("Registro guardado correctamente.");

    // СБРОС — теперь ПОСЛЕ отправки, правильно
    registroKitForm.reset();
    datosPF.classList.add("hidden");
    datosEMP.classList.add("hidden");
    kitCheckboxes.forEach((c) => (c.checked = false));
  });
}
