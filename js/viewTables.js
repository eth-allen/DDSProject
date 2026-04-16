const loggerTableBody = document.getElementById("logger-table-body");
const locationTableBody = document.getElementById("location-table-body");
const evidenceTableBody = document.getElementById("evidence-table-body");
const speciesTableBody = document.getElementById("species-table-body");
const reportsTableBody = document.getElementById("reports-table-body");

const tablePanels = {
    loggers: document.querySelector('[data-table-panel="loggers"]'),
    locations: document.querySelector('[data-table-panel="locations"]'),
    evidence: document.querySelector('[data-table-panel="evidence"]'),
    species: document.querySelector('[data-table-panel="species"]'),
    reports: document.querySelector('[data-table-panel="reports"]')
};

const tableTabButtons = [...document.querySelectorAll("[data-table-tab]")];

const editModal = document.getElementById("edit-modal");
const editModalCloseButton = document.getElementById("edit-modal-close");
const editModalTitle = document.getElementById("edit-modal-title");

const loggerEditSection = document.getElementById("logger-edit-section");
const locationEditSection = document.getElementById("location-edit-section");
const evidenceEditSection = document.getElementById("evidence-edit-section");
const speciesEditSection = document.getElementById("species-edit-section");
const reportEditSection = document.getElementById("report-edit-section");

const loggerEditForm = document.getElementById("logger-edit-form");
const locationEditForm = document.getElementById("location-edit-form");
const evidenceEditForm = document.getElementById("evidence-edit-form");
const speciesEditForm = document.getElementById("species-edit-form");
const reportEditForm = document.getElementById("report-edit-form");

const loggerEditCancelButton = document.getElementById("logger-edit-cancel");
const locationEditCancelButton = document.getElementById("location-edit-cancel");
const evidenceEditCancelButton = document.getElementById("evidence-edit-cancel");
const speciesEditCancelButton = document.getElementById("species-edit-cancel");
const reportEditCancelButton = document.getElementById("report-edit-cancel");

const editForenameInput = document.getElementById("edit-forename-input");
const editSurnameInput = document.getElementById("edit-surname-input");
const editEmailInput = document.getElementById("edit-email-input");
const editCountryInput = document.getElementById("edit-country-input");
const editLatitudeInput = document.getElementById("edit-latitude-input");
const editLongitudeInput = document.getElementById("edit-longitude-input");
const editEvidenceTypeInput = document.getElementById("edit-evidence-type-input");
const editEvidenceDescInput = document.getElementById("edit-evidence-desc-input");
const editSpeciesNameInput = document.getElementById("edit-species-name-input");
const editSpeciesStatusInput = document.getElementById("edit-species-status-input");
const editReportLoggerIdInput = document.getElementById("edit-report-logger-id-input");
const editReportLocationIdInput = document.getElementById("edit-report-location-id-input");
const editReportEvidenceIdInput = document.getElementById("edit-report-evidence-id-input");
const editReportDateInput = document.getElementById("edit-report-date-input");
const editReportSpeciesIdInput = document.getElementById("edit-report-species-id-input");
const editReportTypeInput = document.getElementById("edit-report-type-input");
const editReportDescriptionInput = document.getElementById("edit-report-description-input");

let currentLoggerRows = [];
let currentLocationRows = [];
let currentEvidenceRows = [];
let currentSpeciesRows = [];
let currentReportRows = [];

let editingLoggerId = null;
let editingLocationId = null;
let editingEvidenceId = null;
let editingSpeciesId = null;
let editingReportId = null;

const hasTableView = Boolean(loggerTableBody || locationTableBody || evidenceTableBody || speciesTableBody || reportsTableBody);
const hasEditModal = Boolean(editModal && editModalCloseButton && editModalTitle);

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function escapeSql(value) {
    return String(value).replace(/'/g, "''");
}

function isPositiveInteger(value) {
    return /^\d+$/.test(String(value));
}

function toDateInputValue(value) {
    if (!value) return "";
    return String(value).slice(0, 10);
}

function setActiveTableTab(tabName) {
    Object.entries(tablePanels).forEach(([name, panel]) => {
        if (panel) {
            panel.classList.toggle("is-active", name === tabName);
        }
    });

    tableTabButtons.forEach((button) => {
        const isActive = button.dataset.tableTab === tabName;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
        button.tabIndex = isActive ? 0 : -1;
    });
}

function openEditModal(title, activeSection) {
    if (!hasEditModal || !activeSection) {
        return;
    }

    [loggerEditSection, locationEditSection, evidenceEditSection, speciesEditSection, reportEditSection].forEach((section) => {
        if (!section) return;
        section.classList.remove("is-active");
    });

    activeSection.classList.add("is-active");
    editModalTitle.textContent = title;
    editModal.classList.add("is-open");
    editModal.setAttribute("aria-hidden", "false");
}

function getRowById(rows, rowIdKey, id) {
    return rows.find((row) => String(row[rowIdKey]) === String(id));
}

function closeEditModal() {
    editingLoggerId = null;
    editingLocationId = null;
    editingEvidenceId = null;
    editingSpeciesId = null;
    editingReportId = null;

    if (!hasEditModal) {
        return;
    }

    editModal.classList.remove("is-open");
    editModal.setAttribute("aria-hidden", "true");
    [loggerEditSection, locationEditSection, evidenceEditSection, speciesEditSection, reportEditSection].forEach((section) => {
        if (!section) return;
        section.classList.remove("is-active");
    });
}

function renderTableBody(tableBody, rows, rowRenderer, emptyColspan) {
    if (!tableBody) {
        return;
    }

    if (!Array.isArray(rows) || rows.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="${emptyColspan}">No records found.</td></tr>`;
        return;
    }

    tableBody.innerHTML = rows.map(rowRenderer).join("");
}

function renderLoggers(rows) {
    currentLoggerRows = rows;
    renderTableBody(loggerTableBody, rows, (row) => `
        <tr>
            <td>${escapeHtml(row.LoggerID)}</td>
            <td>${escapeHtml(row.Forename)}</td>
            <td>${escapeHtml(row.Surname)}</td>
            <td>${escapeHtml(row.Email)}</td>
            <td>
                <button type="button" data-action="edit" data-id="${escapeHtml(row.LoggerID)}">Edit</button>
                <button type="button" data-action="delete" data-id="${escapeHtml(row.LoggerID)}">Delete</button>
            </td>
        </tr>
    `, 5);
}

function renderLocations(rows) {
    currentLocationRows = rows;
    renderTableBody(locationTableBody, rows, (row) => `
        <tr>
            <td>${escapeHtml(row.LocationID)}</td>
            <td>${escapeHtml(row.Country)}</td>
            <td>${escapeHtml(row.Latitude)}</td>
            <td>${escapeHtml(row.Longitude)}</td>
            <td>
                <button type="button" data-action="edit" data-id="${escapeHtml(row.LocationID)}">Edit</button>
                <button type="button" data-action="delete" data-id="${escapeHtml(row.LocationID)}">Delete</button>
            </td>
        </tr>
    `, 5);
}

function renderEvidence(rows) {
    currentEvidenceRows = rows;
    renderTableBody(evidenceTableBody, rows, (row) => `
        <tr>
            <td>${escapeHtml(row.EvidenceID)}</td>
            <td>${escapeHtml(row.EvidenceType)}</td>
            <td>${escapeHtml(row.Description)}</td>
            <td>
                <button type="button" data-action="edit" data-id="${escapeHtml(row.EvidenceID)}">Edit</button>
                <button type="button" data-action="delete" data-id="${escapeHtml(row.EvidenceID)}">Delete</button>
            </td>
        </tr>
    `, 4);
}

function renderSpecies(rows) {
    currentSpeciesRows = rows;
    renderTableBody(speciesTableBody, rows, (row) => `
        <tr>
            <td>${escapeHtml(row.SpeciesID)}</td>
            <td>${escapeHtml(row.Name)}</td>
            <td>${escapeHtml(row.Status)}</td>
            <td>
                <button type="button" data-action="edit" data-id="${escapeHtml(row.SpeciesID)}">Edit</button>
                <button type="button" data-action="delete" data-id="${escapeHtml(row.SpeciesID)}">Delete</button>
            </td>
        </tr>
    `, 4);
}

function renderReports(rows) {
    currentReportRows = rows;
    renderTableBody(reportsTableBody, rows, (row) => `
        <tr>
            <td>${escapeHtml(row.ReportID)}</td>
            <td>${escapeHtml(row.LoggerID)}</td>
            <td>${escapeHtml(row.LocationID)}</td>
            <td>${escapeHtml(row.EvidenceID)}</td>
            <td>${escapeHtml(row.ReportDate)}</td>
            <td>${escapeHtml(row.SpeciesID)}</td>
            <td>${escapeHtml(row.ReportType)}</td>
            <td>${escapeHtml(row.ReportDescription)}</td>
            <td>
                <button type="button" data-action="edit" data-id="${escapeHtml(row.ReportID)}">Edit</button>
                <button type="button" data-action="delete" data-id="${escapeHtml(row.ReportID)}">Delete</button>
            </td>
        </tr>
    `, 9);
}

const renderTables = async () => {
    if (!hasTableView || typeof runQuery !== "function") {
        return;
    }

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
};

async function deleteWithReports(reportColumnName, tableName, idColumnName, id) {
    await runQuery(`DELETE FROM Report WHERE ${reportColumnName} = ${id}`);
    return runQuery(`DELETE FROM ${tableName} WHERE ${idColumnName} = ${id}`);
}

if (tableTabButtons.length) {
    tableTabButtons.forEach((button) => {
        button.addEventListener("click", () => setActiveTableTab(button.dataset.tableTab));
    });
}

if (loggerTableBody) {
    loggerTableBody.addEventListener("click", async (event) => {
        const btn = event.target.closest("button[data-action]");
        if (!btn) return;

        const id = btn.dataset.id;
        if (!isPositiveInteger(id)) return;

        if (btn.dataset.action === "edit") {
            const row = getRowById(currentLoggerRows, "LoggerID", id);
            if (!row || !editForenameInput || !editSurnameInput || !editEmailInput) return;

            editingLoggerId = Number(id);
            editForenameInput.value = row.Forename ?? "";
            editSurnameInput.value = row.Surname ?? "";
            editEmailInput.value = row.Email ?? "";
            openEditModal(`Edit Logger #${id}`, loggerEditSection);
            return;
        }

        if (btn.dataset.action === "delete" && confirm(`Delete Logger ID ${id}?`)) {
            const result = await deleteWithReports("LoggerID", "Logger", "LoggerID", id);
            if (!result?.success) {
                alert(result?.error || "Unable to delete Logger.");
                return;
            }
            await renderTables();
        }
    });
}

if (locationTableBody) {
    locationTableBody.addEventListener("click", async (event) => {
        const btn = event.target.closest("button[data-action]");
        if (!btn) return;

        const id = btn.dataset.id;
        if (!isPositiveInteger(id)) return;

        if (btn.dataset.action === "edit") {
            const row = getRowById(currentLocationRows, "LocationID", id);
            if (!row || !editCountryInput || !editLatitudeInput || !editLongitudeInput) return;

            editingLocationId = Number(id);
            editCountryInput.value = row.Country ?? "";
            editLatitudeInput.value = row.Latitude ?? "";
            editLongitudeInput.value = row.Longitude ?? "";
            openEditModal(`Edit Location #${id}`, locationEditSection);
            return;
        }

        if (btn.dataset.action === "delete" && confirm(`Delete Location ID ${id}?`)) {
            const result = await deleteWithReports("LocationID", "Location", "LocationID", id);
            if (!result?.success) {
                alert(result?.error || "Unable to delete Location.");
                return;
            }
            await renderTables();
        }
    });
}

if (evidenceTableBody) {
    evidenceTableBody.addEventListener("click", async (event) => {
        const btn = event.target.closest("button[data-action]");
        if (!btn) return;

        const id = btn.dataset.id;
        if (!isPositiveInteger(id)) return;

        if (btn.dataset.action === "edit") {
            const row = getRowById(currentEvidenceRows, "EvidenceID", id);
            if (!row || !editEvidenceTypeInput || !editEvidenceDescInput) return;

            editingEvidenceId = Number(id);
            editEvidenceTypeInput.value = row.EvidenceType ?? "";
            editEvidenceDescInput.value = row.Description ?? "";
            openEditModal(`Edit Evidence #${id}`, evidenceEditSection);
            return;
        }

        if (btn.dataset.action === "delete" && confirm(`Delete Evidence ID ${id}?`)) {
            const result = await deleteWithReports("EvidenceID", "Evidence", "EvidenceID", id);
            if (!result?.success) {
                alert(result?.error || "Unable to delete Evidence.");
                return;
            }
            await renderTables();
        }
    });
}

if (speciesTableBody) {
    speciesTableBody.addEventListener("click", async (event) => {
        const btn = event.target.closest("button[data-action]");
        if (!btn) return;

        const id = btn.dataset.id;
        if (!isPositiveInteger(id)) return;

        if (btn.dataset.action === "edit") {
            const row = getRowById(currentSpeciesRows, "SpeciesID", id);
            if (!row || !editSpeciesNameInput || !editSpeciesStatusInput) return;

            editingSpeciesId = Number(id);
            editSpeciesNameInput.value = row.Name ?? "";
            editSpeciesStatusInput.value = row.Status ?? "Low";
            openEditModal(`Edit Species #${id}`, speciesEditSection);
            return;
        }

        if (btn.dataset.action === "delete" && confirm(`Delete Species ID ${id}?`)) {
            const result = await deleteWithReports("SpeciesID", "Species", "SpeciesID", id);
            if (!result?.success) {
                alert(result?.error || "Unable to delete Species.");
                return;
            }
            await renderTables();
        }
    });
}

if (reportsTableBody) {
    reportsTableBody.addEventListener("click", async (event) => {
        const btn = event.target.closest("button[data-action]");
        if (!btn) return;

        const id = btn.dataset.id;
        if (!isPositiveInteger(id)) return;

        if (btn.dataset.action === "edit") {
            const row = getRowById(currentReportRows, "ReportID", id);
            if (!row || !reportEditSection || !editReportLoggerIdInput || !editReportLocationIdInput || !editReportEvidenceIdInput || !editReportDateInput || !editReportSpeciesIdInput || !editReportTypeInput || !editReportDescriptionInput) return;

            editingReportId = Number(id);
            editReportLoggerIdInput.value = row.LoggerID ?? "";
            editReportLocationIdInput.value = row.LocationID ?? "";
            editReportEvidenceIdInput.value = row.EvidenceID ?? "";
            editReportDateInput.value = toDateInputValue(row.ReportDate);
            editReportSpeciesIdInput.value = row.SpeciesID ?? "";
            editReportTypeInput.value = row.ReportType ?? "";
            editReportDescriptionInput.value = row.ReportDescription ?? "";
            openEditModal(`Edit Report #${id}`, reportEditSection);
            return;
        }

        if (btn.dataset.action === "delete" && confirm(`Delete Report ID ${id}?`)) {
            const result = await runQuery(`DELETE FROM Report WHERE ReportID = ${id}`);
            if (!result?.success) {
                alert(result?.error || "Unable to delete Report.");
                return;
            }
            await renderTables();
        }
    });
}

if (loggerEditForm) {
    loggerEditForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!editingLoggerId || !editForenameInput || !editSurnameInput || !editEmailInput) return;

        const forename = editForenameInput.value.trim();
        const surname = editSurnameInput.value.trim();
        const email = editEmailInput.value.trim();

        if (!forename || !surname || !email) {
            alert("Please fill all Logger fields.");
            return;
        }

        const query = `UPDATE Logger SET Forename = '${escapeSql(forename)}', Surname = '${escapeSql(surname)}', Email = '${escapeSql(email)}' WHERE LoggerID = ${editingLoggerId}`;
        const result = await runQuery(query);
        if (!result?.success) {
            alert(result?.error || "Unable to update Logger.");
            return;
        }

        closeEditModal();
        await renderTables();
    });
}

if (locationEditForm) {
    locationEditForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!editingLocationId || !editCountryInput || !editLatitudeInput || !editLongitudeInput) return;

        const country = editCountryInput.value.trim();
        const latitude = Number(editLatitudeInput.value);
        const longitude = Number(editLongitudeInput.value);

        if (!country || !Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            alert("Please provide valid Location values.");
            return;
        }

        const query = `UPDATE Location SET Country = '${escapeSql(country)}', Latitude = ${latitude}, Longitude = ${longitude} WHERE LocationID = ${editingLocationId}`;
        const result = await runQuery(query);
        if (!result?.success) {
            alert(result?.error || "Unable to update Location.");
            return;
        }

        closeEditModal();
        await renderTables();
    });
}

if (evidenceEditForm) {
    evidenceEditForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!editingEvidenceId || !editEvidenceTypeInput || !editEvidenceDescInput) return;

        const evidenceType = editEvidenceTypeInput.value.trim();
        const description = editEvidenceDescInput.value.trim();

        if (!evidenceType || !description) {
            alert("Please fill all Evidence fields.");
            return;
        }

        const query = `UPDATE Evidence SET EvidenceType = '${escapeSql(evidenceType)}', Description = '${escapeSql(description)}' WHERE EvidenceID = ${editingEvidenceId}`;
        const result = await runQuery(query);
        if (!result?.success) {
            alert(result?.error || "Unable to update Evidence.");
            return;
        }

        closeEditModal();
        await renderTables();
    });
}

if (speciesEditForm) {
    speciesEditForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!editingSpeciesId || !editSpeciesNameInput || !editSpeciesStatusInput) return;

        const name = editSpeciesNameInput.value.trim();
        const status = editSpeciesStatusInput.value;

        if (!name || !status) {
            alert("Please fill all Species fields.");
            return;
        }

        const query = `UPDATE Species SET Name = '${escapeSql(name)}', Status = '${escapeSql(status)}' WHERE SpeciesID = ${editingSpeciesId}`;
        const result = await runQuery(query);
        if (!result?.success) {
            alert(result?.error || "Unable to update Species.");
            return;
        }

        closeEditModal();
        await renderTables();
    });
}

if (reportEditForm) {
    reportEditForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!editingReportId || !editReportLoggerIdInput || !editReportLocationIdInput || !editReportEvidenceIdInput || !editReportDateInput || !editReportSpeciesIdInput || !editReportTypeInput || !editReportDescriptionInput) return;

        const loggerId = Number(editReportLoggerIdInput.value);
        const locationId = Number(editReportLocationIdInput.value);
        const evidenceId = Number(editReportEvidenceIdInput.value);
        const reportDate = editReportDateInput.value;
        const speciesId = Number(editReportSpeciesIdInput.value);
        const reportType = editReportTypeInput.value.trim();
        const reportDescription = editReportDescriptionInput.value.trim();

        if (![loggerId, locationId, evidenceId, speciesId].every((value) => Number.isInteger(value) && value > 0) || !reportDate || !reportType || !reportDescription) {
            alert("Please provide valid Report values.");
            return;
        }

        const query = `UPDATE Report SET LoggerID = ${loggerId}, LocationID = ${locationId}, EvidenceID = ${evidenceId}, ReportDate = '${escapeSql(reportDate)}', SpeciesID = ${speciesId}, ReportType = '${escapeSql(reportType)}', ReportDescription = '${escapeSql(reportDescription)}' WHERE ReportID = ${editingReportId}`;
        const result = await runQuery(query);
        if (!result?.success) {
            alert(result?.error || "Unable to update Report.");
            return;
        }

        closeEditModal();
        await renderTables();
    });
}

if (hasEditModal) {
    editModalCloseButton.addEventListener("click", closeEditModal);

    editModal.addEventListener("click", (event) => {
        if (event.target === editModal) closeEditModal();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && editModal.classList.contains("is-open")) closeEditModal();
    });

    [loggerEditCancelButton, locationEditCancelButton, evidenceEditCancelButton, speciesEditCancelButton, reportEditCancelButton]
        .filter(Boolean)
        .forEach((button) => button.addEventListener("click", closeEditModal));
}

document.addEventListener("DOMContentLoaded", () => {
    if (tableTabButtons.length) {
        const defaultTab = tableTabButtons.find((button) => button.classList.contains("is-active"))?.dataset.tableTab || tableTabButtons[0].dataset.tableTab;
        setActiveTableTab(defaultTab);
    }

    renderTables();
});

