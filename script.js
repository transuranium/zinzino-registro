// script.js

document.addEventListener("DOMContentLoaded", () => {
  initRegistroParticipantes();
  initRegistroPartner();
});

/**
 * 1) ФОРМА УЧАСТНИКОВ (первый файл, форма с id="registroForm")
 *    Отправка в Google Apps Script + алерт "Registro enviado".
 */
function initRegistroParticipantes() {
  const registroForm = document.getElementById("registroForm");
  if (!registroForm) return; // если этой формы нет на странице

  registroForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const especialidad = document.getElementById("especialidad").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const celular = document.getElementById("celular").value.trim();

    if (!especialidad || !nombre || !celular) {
      alert("Por favor completa todos los campos.");
      return;
    }

    // URL твоего Apps Script (как у тебя уже было)
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwBFiFGOMj9E-y7j7s015wKQDUiuUbW_pNnOIOtWnuuRR3bhnWxW8xh8Ydth2gD1NW_CA/exec";

    // Отправка данных в Google Таблицу
    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        especialidad: especialidad,
        nombre: nombre,
        celular: celular,
      }),
    });

    alert("Registro enviado. ¡Gracias!");
    // Если нужно очищать форму:
    // registroForm.reset();
  });
}

/**
 * 2) ФОРМА ПАРТНЁРОВ (второй файл, форма с id="registroKitForm")
 *    Логика показа блоков + выбор только одного пакета.
 *    Пока что только собирает данные и показывает alert + console.log,
 *    как в твоём исходном коде. Когда скажешь – добавим сюда fetch().
 */
function initRegistroPartner() {
  const registroKitForm = document.getElementById("registroKitForm");
  if (!registroKitForm) return; // если на странице нет второй формы

  // Mostrar/ocultar bloques según tipo de alta
  const tipoRadios = document.querySelectorAll('input[name="tipoCliente"]');
  const datosPF = document.getElementById("datosPF");
  const datosEMP = document.getElementById("datosEMP");

  function actualizarVisibilidadTipo() {
    const seleccion = document.querySelector(
      'input[name="tipoCliente"]:checked'
    );

    if (!seleccion) {
      datosPF.classList.add("hidden");
      datosEMP.classList.add("hidden");
      return;
    }

    if (seleccion.value === "persona_fisica") {
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

  // Принудительно только один чекбокс (kit)
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

  // Отправка формы — пока только сбор и вывод данных
  registroKitForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const tipo = document.querySelector('input[name="tipoCliente"]:checked');
    if (!tipo) {
      alert("Por favor elige el tipo de alta (Persona Física o Empresarial).");
      return;
    }

    const datos = {
      tipoAlta: tipo.value,
    };

    if (tipo.value === "persona_fisica") {
      // mínimos obligatorios
      const nombre = document.getElementById("pfNombre").value.trim();
      const apellidos = document.getElementById("pfApellidos").value.trim();
      const tel = document.getElementById("pfTelefono").value.trim();

      if (!nombre || !apellidos || !tel) {
        alert(
          "Para Persona Física llena al menos Nombre, Apellidos y Teléfono Móvil."
        );
        return;
      }

      datos.nombre = nombre;
      datos.segundoNombre = document
        .getElementById("pfSegundoNombre")
        .value.trim();
      datos.apellidos = apellidos;
      datos.correo = document.getElementById("pfCorreo").value.trim();
      datos.telefono = tel;
      datos.rfcCurp = document.getElementById("pfRfcCurp").value.trim();

      datos.direccion = {
        calle: document.getElementById("pfCalle").value.trim(),
        privada: document.getElementById("pfPrivada").value.trim(),
        colonia: document.getElementById("pfColonia").value.trim(),
        ciudad: document.getElementById("pfCiudad").value.trim(),
        estado: document.getElementById("pfEstado").value.trim(),
        cp: document.getElementById("pfCP").value.trim(),
      };
    } else {
      // empresariales – тоже делаем пару полей обязательными
      const nombreLegal = document.getElementById("emNombreLegal").value.trim();
      const tel = document.getElementById("emTelefono").value.trim();
      const correo = document.getElementById("emCorreo").value.trim();

      if (!nombreLegal || !tel || !correo) {
        alert(
          "Para alta Empresarial llena al menos Nombre Legal de la Empresa, Teléfono Móvil y Correo."
        );
        return;
      }

      datos.nombre = document.getElementById("emNombre").value.trim();
      datos.segundoNombre = document
        .getElementById("emSegundoNombre")
        .value.trim();
      datos.apellidos = document.getElementById("emApellidos").value.trim();
      datos.rfc = document.getElementById("emRfc").value.trim();
      datos.regimenFiscal = document
        .getElementById("emRegimenFiscal")
        .value.trim();
      datos.nombreLegal = nombreLegal;
      datos.correo = correo;
      datos.telefono = tel;

      datos.direccionEnvio = {
        calle: document.getElementById("emCalle").value.trim(),
        privada: document.getElementById("emPrivada").value.trim(),
        colonia: document.getElementById("emColonia").value.trim(),
        ciudad: document.getElementById("emCiudad").value.trim(),
        estado: document.getElementById("emEstado").value.trim(),
        cp: document.getElementById("emCP").value.trim(),
      };
    }

    const kitSeleccionado = document.querySelector(".kit-checkbox:checked");
    if (!kitSeleccionado) {
      alert("Por favor elige un Paquete de Inicio.");
      return;
    }
    datos.paqueteInicio = kitSeleccionado.value;

    // Пока просто показываем данные, как было
    alert("Datos listos para enviar:\n\n" + JSON.stringify(datos, null, 2));
    console.log("Registro listo:", datos);

    // Здесь позже добавим fetch() к Apps Script (второй лист).
  });
}
