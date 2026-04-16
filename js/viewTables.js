const loggerTableBody = document.getElementById("logger-table-body");
const locationTableBody = document.getElementById("location-table-body");
const evidenceTableBody = document.getElementById("evidence-table-body");
const speciesTableBody = document.getElementById("species-table-body");
const reportsTableBody = document.getElementById("reports-table-body");

const editModal = document.getElementById("edit-modal");
const editModalCloseButton = document.getElementById("edit-modal-close");
const editModalTitle = document.getElementById("edit-modal-title");

const loggerEditSection = document.getElementById("logger-edit-section");
const locationEditSection = document.getElementById("location-edit-section");
const evidenceEditSection = document.getElementById("evidence-edit-section");
const speciesEditSection = document.getElementById("species-edit-section");

const loggerEditForm = document.getElementById("logger-edit-form");
const locationEditForm = document.getElementById("location-edit-form");
const evidenceEditForm = document.getElementById("evidence-edit-form");
const speciesEditForm = document.getElementById("species-edit-form");

let currentLoggerRows = [];
let currentLocationRows = [];
let currentEvidenceRows = [];
let currentSpeciesRows = [];

let editingLoggerId = null;
let editingLocationId = null;
let editingEvidenceId = null;
let editingSpeciesId = null;

function escapeSql(value) {
    return String(value).replace(/'/g, "''");
}

function closeEditModal() {
    editingLoggerId = null;
    editingLocationId = null;
    editingEvidenceId = null;
    editingSpeciesId = null;
    editModal.classList.remove("is-open");
    editModal.setAttribute("aria-hidden", "true");
    [loggerEditSection, locationEditSection, evidenceEditSection, speciesEditSection].forEach(s => s.classList.remove("is-active"));
}

function renderLoggers(rows) {
    currentLoggerRows = rows;
    loggerTableBody.innerHTML = rows.map((row) => `
        <tr>
            <td>${row.LoggerID}</td>
            <td>${row.Forename}</td>
            <td>${row.Surname}</td>
            <td>${row.Email}</td>
            <td>
                <button type="button" data-action="edit" data-id="${row.LoggerID}">Edit</button>
                <button type="button" data-action="delete" data-id="${row.LoggerID}">Delete</button>
            </td>
        </tr>
    `).join("");
}

function renderLocations(rows) {
    currentLocationRows = rows;
    locationTableBody.innerHTML = rows.map((row) => `
        <tr>
            <td>${row.LocationID}</td>
            <td>${row.Country}</td>
            <td>${row.Latitude}</td>
            <td>${row.Longitude}</td>
            <td>
                <button type="button" data-action="edit" data-id="${row.LocationID}">Edit</button>
                <button type="button" data-action="delete" data-id="${row.LocationID}">Delete</button>
            </td>
        </tr>
    `).join("");
}

function renderEvidence(rows) {
    currentEvidenceRows = rows;
    evidenceTableBody.innerHTML = rows.map((row) => `
        <tr>
            <td>${row.EvidenceID}</td>
            <td>${row.EvidenceType}</td>
            <td>${row.Description}</td>
            <td>
                <button type="button" data-action="edit" data-id="${row.EvidenceID}">Edit</button>
                <button type="button" data-action="delete" data-id="${row.EvidenceID}">Delete</button>
            </td>
        </tr>
    `).join("");
}

function renderSpecies(rows) {
    currentSpeciesRows = rows;
    speciesTableBody.innerHTML = rows.map((row) => `
        <tr>
            <td>${row.SpeciesID}</td>
            <td>${row.Name}</td>
            <td>${row.Status}</td>
            <td>
                <button type="button" data-action="edit" data-id="${row.SpeciesID}">Edit</button>
                <button type="button" data-action="delete" data-id="${row.SpeciesID}">Delete</button>
            </td>
        </tr>
    `).join("");
}

function renderReports(rows) {
    reportsTableBody.innerHTML = rows.map((row) => `
        <tr>
            <td>${row.ReportID}</td>
            <td>${row.LoggerID}</td>
            <td>${row.LocationID}</td>
            <td>${row.EvidenceID}</td>
            <td>${row.ReportDate}</td>
            <td>${row.SpeciesID}</td>
            <td>${row.ReportType}</td>
            <td>${row.ReportDescription}</td>
        </tr>
    `).join("");
}

const renderTables = async () => {
    const [loggerRes, locationRes, evidenceRes, speciesRes, reportRes] = await Promise.all([
        runQuery("SELECT * FROM Logger"),
        runQuery("SELECT * FROM Location"),
        runQuery("SELECT * FROM Evidence"),
        runQuery("SELECT * FROM Species"),
        runQuery("SELECT * FROM Report")
    ]);

    if (loggerRes?.success) renderLoggers(loggerRes.data);
    if (locationRes?.success) renderLocations(locationRes.data);
    if (evidenceRes?.success) renderEvidence(evidenceRes.data);
    if (speciesRes?.success) renderSpecies(speciesRes.data);
    if (reportRes?.success) renderReports(reportRes.data);
}

evidenceTableBody.addEventListener("click", async (e) => {
    const btn = e.target.closest("button[data-action='delete']");
    if (!btn) return;
    const id = btn.dataset.id;
    if (confirm(`Delete Evidence ID ${id}?`)) {
        await runQuery(`DELETE FROM Report WHERE EvidenceID = ${id}`);
        await runQuery(`DELETE FROM Evidence WHERE EvidenceID = ${id}`);
        renderTables();
    }
});

speciesTableBody.addEventListener("click", async (e) => {
    const btn = e.target.closest("button[data-action='delete']");
    if (!btn) return;
    const id = btn.dataset.id;
    if (confirm(`Delete Species ID ${id}?`)) {
        await runQuery(`DELETE FROM Report WHERE SpeciesID = ${id}`);
        await runQuery(`DELETE FROM Species WHERE SpeciesID = ${id}`);
        renderTables();
    }
});

document.addEventListener("DOMContentLoaded", renderTables);
editModalCloseButton.addEventListener("click", closeEditModal);

editModal.addEventListener("click", (event) => {
    if (event.target === editModal) closeEditModal();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && editModal.classList.contains("is-open")) closeEditModal();
});
