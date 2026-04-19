const el = (id) => document.getElementById(id);

const tableBodies = {
    logger: el("logger-table-body"),
    location: el("location-table-body"),
    evidence: el("evidence-table-body"),
    species: el("species-table-body"),
    report: el("reports-table-body")
};

const tablePanels = {
    loggers: document.querySelector('[data-table-panel="loggers"]'),
    locations: document.querySelector('[data-table-panel="locations"]'),
    evidence: document.querySelector('[data-table-panel="evidence"]'),
    species: document.querySelector('[data-table-panel="species"]'),
    reports: document.querySelector('[data-table-panel="reports"]')
};

const tableTabButtons = [...document.querySelectorAll("[data-table-tab]")];

const modal = {
    root: el("edit-modal"),
    title: el("edit-modal-title"),
    close: el("edit-modal-close"),
    sections: {
        logger: el("logger-edit-section"),
        location: el("location-edit-section"),
        evidence: el("evidence-edit-section"),
        species: el("species-edit-section"),
        report: el("report-edit-section")
    }
};

const forms = {
    logger: el("logger-edit-form"),
    location: el("location-edit-form"),
    evidence: el("evidence-edit-form"),
    species: el("species-edit-form"),
    report: el("report-edit-form")
};

const cancelButtons = [
    el("logger-edit-cancel"),
    el("location-edit-cancel"),
    el("evidence-edit-cancel"),
    el("species-edit-cancel"),
    el("report-edit-cancel")
].filter(Boolean);

const fields = {
    logger: { forename: el("edit-forename-input"), surname: el("edit-surname-input"), email: el("edit-email-input") },
    location: { country: el("edit-country-input"), latitude: el("edit-latitude-input"), longitude: el("edit-longitude-input") },
    evidence: { type: el("edit-evidence-type-input"), description: el("edit-evidence-desc-input") },
    species: { scientificName: el("edit-species-scientific-name-input"), commonName: el("edit-species-name-input"), conservationStatus: el("edit-species-status-input") },
    report: {
        loggerId: el("edit-report-logger-id-input"),
        locationId: el("edit-report-location-id-input"),
        evidenceId: el("edit-report-evidence-id-input"),
        date: el("edit-report-date-input"),
        speciesId: el("edit-report-species-id-input"),
        type: el("edit-report-type-input"),
        description: el("edit-report-description-input")
    }
};

const rowsCache = { logger: [], location: [], evidence: [], species: [], report: [] };
const editingState = { key: null, id: null };

const hasTableView = Object.values(tableBodies).some(Boolean);
const hasEditModal = Boolean(modal.root && modal.title && modal.close);

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
    return value ? String(value).slice(0, 10) : "";
}

function setActiveTableTab(tabName) {
    Object.entries(tablePanels).forEach(([name, panel]) => panel?.classList.toggle("is-active", name === tabName));
    tableTabButtons.forEach((button) => {
        const isActive = button.dataset.tableTab === tabName;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
        button.tabIndex = isActive ? 0 : -1;
    });
}

function openEditModal(title, key) {
    if (!hasEditModal || !modal.sections[key]) return;
    Object.values(modal.sections).forEach((section) => section?.classList.remove("is-active"));
    modal.sections[key].classList.add("is-active");
    modal.title.textContent = title;
    modal.root.classList.add("is-open");
    modal.root.setAttribute("aria-hidden", "false");
}

function closeEditModal() {
    editingState.key = null;
    editingState.id = null;
    if (!hasEditModal) return;

    modal.root.classList.remove("is-open");
    modal.root.setAttribute("aria-hidden", "true");
    Object.values(modal.sections).forEach((section) => section?.classList.remove("is-active"));
}

function getRowById(rows, idKey, id) {
    return rows.find((row) => String(row[idKey]) === String(id));
}

function renderTableBody(tableBody, rows, rowRenderer, emptyColspan) {
    if (!tableBody) return;
    if (!Array.isArray(rows) || !rows.length) {
        tableBody.innerHTML = `<tr><td colspan="${emptyColspan}">No records found.</td></tr>`;
        return;
    }
    tableBody.innerHTML = rows.map(rowRenderer).join("");
}

async function runQueryChecked(query) {
    const result = await runQuery(query);
    if (!result?.success) throw new Error(result?.error || "Database query failed.");
    return result;
}

async function resequenceReportIds() {
    await runQueryChecked("SET @next_report_id := 0");
    await runQueryChecked("UPDATE Report SET ReportID = (@next_report_id := @next_report_id + 1) ORDER BY ReportID");
}

async function deleteParentAndResequence(tableName, idColumn, reportFkColumn, id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId < 1) return { success: false, error: "Invalid ID." };

    try {
        await runQueryChecked(`DELETE FROM Report WHERE ${reportFkColumn} = ${numericId}`);
        await resequenceReportIds();
        await runQueryChecked(`DELETE FROM ${tableName} WHERE ${idColumn} = ${numericId}`);
        await runQueryChecked(`UPDATE ${tableName} SET ${idColumn} = ${idColumn} - 1 WHERE ${idColumn} > ${numericId}`);
        await runQueryChecked(`UPDATE Report SET ${reportFkColumn} = ${reportFkColumn} - 1 WHERE ${reportFkColumn} > ${numericId}`);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function deleteReportAndResequence(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId < 1) return { success: false, error: "Invalid ID." };

    try {
        await runQueryChecked(`DELETE FROM Report WHERE ReportID = ${numericId}`);
        await runQueryChecked(`UPDATE Report SET ReportID = ReportID - 1 WHERE ReportID > ${numericId}`);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

const tableConfigs = {
    logger: {
        idKey: "LoggerID", body: tableBodies.logger, emptyColspan: 5, label: "Logger",
        listQuery: "SELECT * FROM Logger ORDER BY LoggerID",
        cells: (row) => [row.LoggerID, row.Forename, row.Surname, row.Email],
        onDelete: (id) => deleteParentAndResequence("Logger", "LoggerID", "LoggerID", id)
    },
    location: {
        idKey: "LocationID", body: tableBodies.location, emptyColspan: 5, label: "Location",
        listQuery: "SELECT * FROM Location ORDER BY LocationID",
        cells: (row) => [row.LocationID, row.Country, row.Latitude, row.Longitude],
        onDelete: (id) => deleteParentAndResequence("Location", "LocationID", "LocationID", id)
    },
    evidence: {
        idKey: "EvidenceID", body: tableBodies.evidence, emptyColspan: 4, label: "Evidence",
        listQuery: "SELECT * FROM Evidence ORDER BY EvidenceID",
        cells: (row) => [row.EvidenceID, row.EvidenceType, row.Description],
        onDelete: (id) => deleteParentAndResequence("Evidence", "EvidenceID", "EvidenceID", id)
    },
    species: {
        idKey: "SpeciesID", body: tableBodies.species, emptyColspan: 5, label: "Species",
        listQuery: "SELECT * FROM Species ORDER BY SpeciesID",
        cells: (row) => [row.SpeciesID, row.ScientificName, row.CommonName, row.ConservationStatus],
        onDelete: (id) => deleteParentAndResequence("Species", "SpeciesID", "SpeciesID", id)
    },
    report: {
        idKey: "ReportID", body: tableBodies.report, emptyColspan: 9, label: "Report",
        listQuery: "SELECT * FROM Report ORDER BY ReportID",
        cells: (row) => [row.ReportID, row.LoggerID, row.LocationID, row.EvidenceID, row.ReportDate, row.SpeciesID, row.ReportType, row.ReportDescription],
        onDelete: (id) => deleteReportAndResequence(id)
    }
};

function renderRows(key, rows) {
    const cfg = tableConfigs[key];
    rowsCache[key] = rows;

    renderTableBody(cfg.body, rows, (row) => {
        const cellsHtml = cfg.cells(row).map((value) => `<td>${escapeHtml(value)}</td>`).join("");
        const id = escapeHtml(row[cfg.idKey]);
        return `<tr>${cellsHtml}<td><button type="button" data-action="edit" data-id="${id}">Edit</button><button type="button" data-action="delete" data-id="${id}">Delete</button></td></tr>`;
    }, cfg.emptyColspan);
}

const renderTables = async () => {
    if (!hasTableView || typeof runQuery !== "function") return;

    const keys = Object.keys(tableConfigs);
    const responses = await Promise.all(keys.map((key) => runQuery(tableConfigs[key].listQuery)));
    responses.forEach((res, index) => {
        if (res?.success) renderRows(keys[index], res.data);
    });
};

const editHandlers = {
    logger: {
        open: (id, row) => {
            editingState.key = "logger";
            editingState.id = Number(id);
            fields.logger.forename.value = row.Forename ?? "";
            fields.logger.surname.value = row.Surname ?? "";
            fields.logger.email.value = row.Email ?? "";
            openEditModal(`Edit Logger #${id}`, "logger");
        },
        submit: () => {
            const forename = fields.logger.forename.value.trim();
            const surname = fields.logger.surname.value.trim();
            const email = fields.logger.email.value.trim();
            if (!forename || !surname || !email) return { ok: false, msg: "Please fill all Logger fields." };
            return { ok: true, query: `UPDATE Logger SET Forename = '${escapeSql(forename)}', Surname = '${escapeSql(surname)}', Email = '${escapeSql(email)}' WHERE LoggerID = ${editingState.id}`, err: "Unable to update Logger." };
        }
    },
    location: {
        open: (id, row) => {
            editingState.key = "location";
            editingState.id = Number(id);
            fields.location.country.value = row.Country ?? "";
            fields.location.latitude.value = row.Latitude ?? "";
            fields.location.longitude.value = row.Longitude ?? "";
            openEditModal(`Edit Location #${id}`, "location");
        },
        submit: () => {
            const country = fields.location.country.value.trim();
            const latitude = Number(fields.location.latitude.value);
            const longitude = Number(fields.location.longitude.value);
            if (!country || !Number.isFinite(latitude) || !Number.isFinite(longitude)) return { ok: false, msg: "Please provide valid Location values." };
            return { ok: true, query: `UPDATE Location SET Country = '${escapeSql(country)}', Latitude = ${latitude}, Longitude = ${longitude} WHERE LocationID = ${editingState.id}`, err: "Unable to update Location." };
        }
    },
    evidence: {
        open: (id, row) => {
            editingState.key = "evidence";
            editingState.id = Number(id);
            fields.evidence.type.value = row.EvidenceType ?? "";
            fields.evidence.description.value = row.Description ?? "";
            openEditModal(`Edit Evidence #${id}`, "evidence");
        },
        submit: () => {
            const type = fields.evidence.type.value.trim();
            const description = fields.evidence.description.value.trim();
            if (!type || !description) return { ok: false, msg: "Please fill all Evidence fields." };
            return { ok: true, query: `UPDATE Evidence SET EvidenceType = '${escapeSql(type)}', Description = '${escapeSql(description)}' WHERE EvidenceID = ${editingState.id}`, err: "Unable to update Evidence." };
        }
    },
    species: {
        open: (id, row) => {
            editingState.key = "species";
            editingState.id = Number(id);
            fields.species.scientificName.value = row.ScientificName ?? "";
            fields.species.commonName.value = row.CommonName ?? "";
            fields.species.conservationStatus.value = row.ConservationStatus ?? "Unknown";
            openEditModal(`Edit Species #${id}`, "species");
        },
        submit: () => {
            const scientificName = fields.species.ScientificName.value.trim();
            const commonName = fields.species.CommonName.value.trim();
            const conservationStatus = fields.species.ConservationStatus.value;
            if (!commonName || !conservationStatus) return { ok: false, msg: "Please fill all Species fields." };
            return { ok: true, query: `UPDATE Species SET ScientificName = '${escapeSql(scientificName)}', '${escapeSql(commonName)}', ConservationStatus = '${escapeSql(conservationStatus)}' WHERE SpeciesID = ${editingState.id}`, err: "Unable to update Species." };
        }
    },
    report: {
        open: (id, row) => {
            const f = fields.report;
            editingState.key = "report";
            editingState.id = Number(id);
            f.loggerId.value = row.LoggerID ?? "";
            f.locationId.value = row.LocationID ?? "";
            f.evidenceId.value = row.EvidenceID ?? "";
            f.date.value = toDateInputValue(row.ReportDate);
            f.speciesId.value = row.SpeciesID ?? "";
            f.type.value = row.ReportType ?? "";
            f.description.value = row.ReportDescription ?? "";
            openEditModal(`Edit Report #${id}`, "report");
        },
        submit: () => {
            const f = fields.report;
            const loggerId = Number(f.loggerId.value);
            const locationId = Number(f.locationId.value);
            const evidenceId = Number(f.evidenceId.value);
            const reportDate = f.date.value;
            const speciesId = Number(f.speciesId.value);
            const reportType = f.type.value.trim();
            const reportDescription = f.description.value.trim();

            if (![loggerId, locationId, evidenceId, speciesId].every((value) => Number.isInteger(value) && value > 0) || !reportDate || !reportType || !reportDescription) {
                return { ok: false, msg: "Please provide valid Report values." };
            }

            return {
                ok: true,
                query: `UPDATE Report SET LoggerID = ${loggerId}, LocationID = ${locationId}, EvidenceID = ${evidenceId}, ReportDate = '${escapeSql(reportDate)}', SpeciesID = ${speciesId}, ReportType = '${escapeSql(reportType)}', ReportDescription = '${escapeSql(reportDescription)}' WHERE ReportID = ${editingState.id}`,
                err: "Unable to update Report."
            };
        }
    }
};

function bindTableActions(key) {
    const cfg = tableConfigs[key];
    if (!cfg.body) return;

    cfg.body.addEventListener("click", async (event) => {
        const btn = event.target.closest("button[data-action]");
        if (!btn) return;

        const id = btn.dataset.id;
        if (!isPositiveInteger(id)) return;

        if (btn.dataset.action === "edit") {
            const row = getRowById(rowsCache[key], cfg.idKey, id);
            if (row) editHandlers[key].open(id, row);
            return;
        }

        if (btn.dataset.action === "delete" && confirm(`Delete ${cfg.label} ID ${id}?`)) {
            const result = await cfg.onDelete(id);
            if (!result?.success) {
                alert(result?.error || `Unable to delete ${cfg.label}.`);
                return;
            }
            await renderTables();
        }
    });
}

function bindEditForm(key) {
    const form = forms[key];
    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (editingState.key !== key || !editingState.id) return;

        const outcome = editHandlers[key].submit();
        if (!outcome.ok) {
            alert(outcome.msg);
            return;
        }

        const result = await runQuery(outcome.query);
        if (!result?.success) {
            alert(result?.error || outcome.err);
            return;
        }

        closeEditModal();
        await renderTables();
    });
}

Object.keys(tableConfigs).forEach(bindTableActions);
Object.keys(forms).forEach(bindEditForm);

if (tableTabButtons.length) {
    tableTabButtons.forEach((button) => button.addEventListener("click", () => setActiveTableTab(button.dataset.tableTab)));
}

if (hasEditModal) {
    modal.close.addEventListener("click", closeEditModal);
    modal.root.addEventListener("click", (event) => {
        if (event.target === modal.root) closeEditModal();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.root.classList.contains("is-open")) closeEditModal();
    });
    cancelButtons.forEach((button) => button.addEventListener("click", closeEditModal));
}

document.addEventListener("DOMContentLoaded", () => {
    if (tableTabButtons.length) {
        const defaultTab = tableTabButtons.find((button) => button.classList.contains("is-active"))?.dataset.tableTab || tableTabButtons[0].dataset.tableTab;
        setActiveTableTab(defaultTab);
    }

    renderTables();
});

