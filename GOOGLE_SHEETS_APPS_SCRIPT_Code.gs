/**
 * Google Apps Script (Web App) example for this project.
 *
 * 1) Create a Google Spreadsheet.
 * 2) Extensions -> Apps Script.
 * 3) Paste this code, set SPREADSHEET_ID.
 * 4) Deploy -> New deployment -> Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 5) Copy the Web App URL and paste it into script.js as SCRIPT_URL.
 */

const SPREADSHEET_ID = "PASTE_SPREADSHEET_ID_HERE";

const SHEET_PARTICIPANTES = "Participantes";
const SHEET_PARTNER = "Partner";

function doGet() {
  return ok_("ok");
}

function doPost(e) {
  const p = (e && e.parameter) ? e.parameter : {};
  const formType = (p.formType || "").toLowerCase();

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  if (formType === "participantes") {
    const headers = ["Timestamp", "Especialidad", "Nombre", "Celular"];
    const sh = getOrCreateSheet_(ss, SHEET_PARTICIPANTES, headers);
    sh.appendRow([
      new Date(),
      p.especialidad || "",
      p.nombre || "",
      p.celular || "",
    ]);
    return ok_("saved");
  }

  if (formType === "partner") {
    const headers = [
      "Timestamp",
      "Tipo alta",
      "Nombre",
      "Segundo nombre",
      "Apellidos",
      "Correo",
      "Teléfono",
      "RFC/CURP (PF)",
      "RFC (EMP)",
      "Regimen fiscal",
      "Nombre legal empresa",
      "Calle",
      "Privada",
      "Colonia",
      "Ciudad",
      "Estado",
      "CP",
      "Paquete ID",
      "Paquete (resumen)",
      "Paquete (contenido)",
      "Custom título",
      "Custom precio",
      "Custom créditos",
      "Custom contenido/obs",
      "Partner que invitó",
    ];

    const sh = getOrCreateSheet_(ss, SHEET_PARTNER, headers);

    sh.appendRow([
      new Date(),
      p.tipoAlta || "",
      p.nombre || "",
      p.segundoNombre || "",
      p.apellidos || "",
      p.correo || "",
      p.telefono || "",
      p.rfcCurp || "",
      p.rfc || "",
      p.regimenFiscal || "",
      p.nombreLegalEmpresa || "",
      p.calle || "",
      p.privada || "",
      p.colonia || "",
      p.ciudad || "",
      p.estado || "",
      p.cp || "",
      p.paqueteId || "",
      p.paqueteInicio || "",
      p.paqueteContenido || "",
      p.customKitTitle || "",
      p.customKitPrice || "",
      p.customKitCredits || "",
      p.customKitItems || "",
      p.partnerInvito || "",
    ]);

    return ok_("saved");
  }

  return ok_("unknown formType");
}

function getOrCreateSheet_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);

  if (sh.getLastRow() === 0 && headers && headers.length) {
    sh.appendRow(headers);
  }

  return sh;
}

function ok_(text) {
  return ContentService
    .createTextOutput(String(text))
    .setMimeType(ContentService.MimeType.TEXT);
}
