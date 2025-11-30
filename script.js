document.addEventListener("DOMContentLoaded", () => {
  initRegistroParticipantes();
  initRegistroPartner();
});

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwujfN5d-o-ZVSVuG0sDDgR14DP2Ja0bB6DeEpCKaecvJdYPjP9hMYQatwfrGyzMB0BKA/exec";

/* =========================  Hoja 1  ========================= */
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

    fetch(SCRIPT_URL, { method: "POST", body: data });
    alert("Registro enviado. ¡Gracias!");
  });
}

/* =========================  Hoja 2  ========================= */
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

  registroKitForm.addEventListener("submit", async function (e) {
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

    // берём ВСЕ поля формы "как есть"
    const fd = new FormData(registroKitForm);

    // добавляем/правим служебные поля
    fd.set("formType", "partner"); // чтобы doPost понял, что это вторая форма
    fd.set("tipoAlta", tipo.value); // своё имя для типа
    fd.delete("tipoCliente"); // исходное имя радиокнопок не нужно

    // kit и partnerInvito гарантированно внутри формы, но сделаем явно
    fd.set("paqueteInicio", kit.value);
    // partnerInvito уже есть в fd как <input name="partnerInvito">

    // конвертируем в URLSearchParams (как и раньше)
    const data = new URLSearchParams(fd);

    await fetch(SCRIPT_URL, {
      method: "POST",
      body: data,
    });

    alert("Registro guardado correctamente.");

    registroKitForm.reset();
    datosPF.classList.add("hidden");
    datosEMP.classList.add("hidden");
    kitCheckboxes.forEach((c) => (c.checked = false));
  });
}
