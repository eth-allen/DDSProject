// Readable DOM helper for this page.
const byId = (id) => document.getElementById(id);

const tableBodyByKey = {
    logger: byId("logger-table-body"),
    location: byId("location-table-body"),
    evidence: byId("evidence-table-body"),
    species: byId("species-table-body"),
    report: byId("reports-table-body"),
    trackedAnimal: byId("tracked-animals-table-body")
};

const tablePanelByTab = {
    loggers: document.querySelector('[data-table-panel="loggers"]'),
    locations: document.querySelector('[data-table-panel="locations"]'),
    evidence: document.querySelector('[data-table-panel="evidence"]'),
    species: document.querySelector('[data-table-panel="species"]'),
    reports: document.querySelector('[data-table-panel="reports"]'),
    "tracked-animals": document.querySelector('[data-table-panel="tracked-animals"]')
};

const tableTabButtons = [...document.querySelectorAll("[data-table-tab]")];

const editModal = {
    root: byId("edit-modal"),
    title: byId("edit-modal-title"),
    close: byId("edit-modal-close"),
    sections: {
        logger: byId("logger-edit-section"),
        location: byId("location-edit-section"),
        evidence: byId("evidence-edit-section"),
        species: byId("species-edit-section"),
        report: byId("report-edit-section"),
        trackedAnimal: byId("tracked-animals-edit-section")
    }
};

const editFormByKey = {
    logger: byId("logger-edit-form"),
    location: byId("location-edit-form"),
    evidence: byId("evidence-edit-form"),
    species: byId("species-edit-form"),
    report: byId("report-edit-form"),
    trackedAnimal: byId("tracked-animals-edit-form")
};

const cancelEditButtons = [
    byId("logger-edit-cancel"),
    byId("location-edit-cancel"),
    byId("evidence-edit-cancel"),
    byId("species-edit-cancel"),
    byId("report-edit-cancel"),
    byId("tracked-animals-edit-cancel")
].filter(Boolean);

const editFieldByTable = {
    logger: {
        forename: byId("edit-forename-input"),
        surname: byId("edit-surname-input"),
        email: byId("edit-email-input")
    },
    location: { country: byId("edit-country-input") },
    evidence: {
        type: byId("edit-evidence-type-input"),
        description: byId("edit-evidence-desc-input")
    },
    species: {
        scientificName: byId("edit-species-scientific-name-input"),
        commonName: byId("edit-species-name-input"),
        conservationStatus: byId("edit-species-status-input")
    },
    report: {
        loggerId: byId("edit-report-logger-id-input"),
        locationId: byId("edit-report-location-id-input"),
        evidenceId: byId("edit-report-evidence-id-input"),
        date: byId("edit-report-date-input"),
        speciesId: byId("edit-report-species-id-input"),
        type: byId("edit-report-type-input"),
        description: byId("edit-report-description-input")
    },
    trackedAnimal: {
        name: byId("edit-tracked-animals-name-input"),
        speciesId: byId("edit-tracked-animals-species-id-input"),
        birthDate: byId("edit-tracked-animals-birth-date-input"),
        status: byId("edit-tracked-animals-status-input")
    }
};

const cachedRowsByTable = {
    logger: [],
    location: [],
    evidence: [],
    species: [],
    report: [],
    trackedAnimal: []
};

const activeEdit = { key: null, id: null };
const hasAnyTableBody = Object.values(tableBodyByKey).some(Boolean);
const hasEditModal = Boolean(editModal.root && editModal.title && editModal.close);

const escapeHtml = (value) => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const escapeSql = (value) => String(value).replace(/'/g, "''");
const isPositiveIntegerText = (value) => /^\d+$/.test(String(value));
const toDateInputValue = (value) => (value ? String(value).slice(0, 10) : "");

function findRowById(rows, idKey, id) {
    return rows.find((row) => String(row[idKey]) === String(id));
}

function validateNoNumberName(value, label) {
    if (!value) return `${label} is required`;
    if (!isValidAnimalOrSpeciesName(value)) {
        return `${label}: letters, spaces, hyphens, and apostrophes only (no numbers)`;
    }
    return null;
}

function clearInputBorders(...inputs) {
    inputs.filter(Boolean).forEach((input) => {
        input.style.border = "";
    });
}

function addValidationError(input, message, validationErrors) {
    if (input) input.style.border = "2px solid red";
    validationErrors.push(message);
}

// Toggle visible panel and ARIA state for tabs.
function setActiveTableTab(tabName) {
    Object.entries(tablePanelByTab).forEach(([panelName, panel]) => {
        panel?.classList.toggle("is-active", panelName === tabName);
    });

    tableTabButtons.forEach((button) => {
        const isActive = button.dataset.tableTab === tabName;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
        button.tabIndex = isActive ? 0 : -1;
    });
}

// Open modal and switch to the correct form section.
function openEditModal(title, sectionKey) {
    if (!hasEditModal || !editModal.sections[sectionKey]) return;

    Object.values(editModal.sections).forEach((section) => {
        section?.classList.remove("is-active");
    });

    editModal.sections[sectionKey].classList.add("is-active");
    editModal.title.textContent = title;
    editModal.root.classList.add("is-open");
    editModal.root.setAttribute("aria-hidden", "false");
}

// Close modal and clear active editing state.
function closeEditModal() {
    activeEdit.key = null;
    activeEdit.id = null;
    if (!hasEditModal) return;

    editModal.root.classList.remove("is-open");
    editModal.root.setAttribute("aria-hidden", "true");
    Object.values(editModal.sections).forEach((section) => {
        section?.classList.remove("is-active");
    });
}

function renderTableBody(tableBody, rows, rowRenderer, emptyColspan) {
    if (!tableBody) return;

    tableBody.innerHTML = Array.isArray(rows) && rows.length
        ? rows.map(rowRenderer).join("")
        : `<tr><td colspan="${emptyColspan}">No records found.</td></tr>`;
}

async function runQueryChecked(query) {
    const result = await runQuery(query);
    if (!result?.success) throw new Error(result?.error || "Database query failed.");
    return result;
}

// Verify parent key exists before updating child rows.
async function foreignKeyExists(tableName, keyColumn, value) {
    const numericValue = Number(value);
    if (!Number.isInteger(numericValue) || numericValue < 1) return false;

    const query = `SELECT 1 AS matchFound FROM ${tableName} WHERE ${keyColumn} = ${numericValue} LIMIT 1`;
    const result = await runQuery(query);
    return Boolean(result?.success && Array.isArray(result.data) && result.data.length);
}

// Convert raw SQL errors into short user-friendly alerts.
function toFriendlyConstraintError(rawError) {
    const message = String(rawError || "");
    if (!message) return "Unable to update record.";

    if (message.includes("Tracked_Animal_ibfk_1") || (message.includes("Tracked_Animal") && message.includes("SpeciesID"))) {
        return "Species ID does not exist. Please enter a valid Species ID.";
    }
    if (message.includes("Report") && message.includes("LoggerID")) {
        return "Logger ID does not exist. Please enter a valid Logger ID.";
    }
    if (message.includes("Report") && message.includes("LocationID")) {
        return "Location ID does not exist. Please enter a valid Location ID.";
    }
    if (message.includes("Report") && message.includes("EvidenceID")) {
        return "Evidence ID does not exist. Please enter a valid Evidence ID.";
    }
    if (message.includes("Report") && message.includes("SpeciesID")) {
        return "Species ID does not exist. Please enter a valid Species ID.";
    }
    if (/ibfk|foreign key constraint fails|cannot add or update a child row|constraint/i.test(message)) {
        return "One or more linked IDs are invalid. Please check related IDs and try again.";
    }

    return message;
}

const resequenceReportIds = async () => {
    await runQueryChecked("SET @next_report_id := 0");
    await runQueryChecked("UPDATE Report SET ReportID = (@next_report_id := @next_report_id + 1) ORDER BY ReportID");
};

// Delete parent rows safely with FK checks and ID resequencing.
async function deleteParentAndResequence(tableName, idColumn, reportForeignKeyColumn, id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId < 1) {
        return { success: false, error: "Invalid ID." };
    }

    const foreignKeyConstraints = {
        Logger: [{ table: "Report", column: "LoggerID" }],
        Location: [{ table: "Report", column: "LocationID" }],
        Evidence: [{ table: "Report", column: "EvidenceID" }],
        Species: [
            { table: "Report", column: "SpeciesID" },
            { table: "Tracked_Animal", column: "SpeciesID" }
        ],
        Tracked_Animal: [{ table: "Report", column: "AnimalID" }]
    };

    try {
        if (foreignKeyConstraints[tableName]) {
            for (const constraint of foreignKeyConstraints[tableName]) {
                const countResult = await runQuery(`SELECT COUNT(*) as count FROM ${constraint.table} WHERE ${constraint.column} = ${numericId}`);
                if (countResult?.success && countResult.data[0].count > 0) {
                    return {
                        success: false,
                        error: `Cannot delete ${tableName} with ID ${numericId} because ${countResult.data[0].count} record(s) in ${constraint.table} reference it.`
                    };
                }
            }

            await runQueryChecked(`DELETE FROM ${tableName} WHERE ${idColumn} = ${numericId}`);
            if (tableName === "Logger") {
                await runQueryChecked(`UPDATE ${tableName} SET ${idColumn} = ${idColumn} - 1 WHERE ${idColumn} > ${numericId}`);
            }
            return { success: true };
        }

        await runQueryChecked(`DELETE FROM Report WHERE ${reportForeignKeyColumn} = ${numericId}`);
        await resequenceReportIds();
        await runQueryChecked(`DELETE FROM ${tableName} WHERE ${idColumn} = ${numericId}`);
        await runQueryChecked(`UPDATE ${tableName} SET ${idColumn} = ${idColumn} - 1 WHERE ${idColumn} > ${numericId}`);
        await runQueryChecked(`UPDATE Report SET ${reportForeignKeyColumn} = ${reportForeignKeyColumn} - 1 WHERE ${reportForeignKeyColumn} > ${numericId}`);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function deleteReportAndResequence(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId < 1) {
        return { success: false, error: "Invalid ID." };
    }

    try {
        await runQueryChecked(`DELETE FROM Report WHERE ReportID = ${numericId}`);
        await runQueryChecked(`UPDATE Report SET ReportID = ReportID - 1 WHERE ReportID > ${numericId}`);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

const tableConfigByKey = {
    logger: {
        idKey: "LoggerID",
        body: tableBodyByKey.logger,
        emptyColspan: 5,
        label: "Logger",
        listQuery: "SELECT * FROM Logger ORDER BY LoggerID",
        cells: (row) => [row.LoggerID, row.Forename, row.Surname, row.Email],
        onDelete: (id) => deleteParentAndResequence("Logger", "LoggerID", "LoggerID", id)
    },
    location: {
        idKey: "LocationID",
        body: tableBodyByKey.location,
        emptyColspan: 3,
        label: "Location",
        listQuery: "SELECT * FROM Location ORDER BY LocationID",
        cells: (row) => [row.LocationID, row.Country],
        onDelete: (id) => deleteParentAndResequence("Location", "LocationID", "LocationID", id)
    },
    evidence: {
        idKey: "EvidenceID",
        body: tableBodyByKey.evidence,
        emptyColspan: 4,
        label: "Evidence",
        listQuery: "SELECT * FROM Evidence ORDER BY EvidenceID",
        cells: (row) => [row.EvidenceID, row.EvidenceType, row.Description],
        onDelete: (id) => deleteParentAndResequence("Evidence", "EvidenceID", "EvidenceID", id)
    },
    species: {
        idKey: "SpeciesID",
        body: tableBodyByKey.species,
        emptyColspan: 5,
        label: "Species",
        listQuery: "SELECT * FROM Species ORDER BY SpeciesID",
        cells: (row) => [row.SpeciesID, row.ScientificName, row.CommonName, row.ConservationStatus],
        onDelete: (id) => deleteParentAndResequence("Species", "SpeciesID", "SpeciesID", id)
    },
    report: {
        idKey: "ReportID",
        body: tableBodyByKey.report,
        emptyColspan: 9,
        label: "Report",
        listQuery: "SELECT * FROM Report ORDER BY ReportID",
        cells: (row) => [row.ReportID, row.LoggerID, row.LocationID, row.EvidenceID, row.ReportDate, row.SpeciesID, row.ReportType, row.ReportDescription],
        onDelete: (id) => deleteReportAndResequence(id)
    },
    trackedAnimal: {
        idKey: "AnimalID",
        body: tableBodyByKey.trackedAnimal,
        emptyColspan: 6,
        label: "Tracked Animal",
        listQuery: "SELECT AnimalID, Name, SpeciesID, BirthDate, Status FROM Tracked_Animal ORDER BY AnimalID",
        cells: (row) => [row.AnimalID, row.Name, row.SpeciesID, row.BirthDate, row.Status],
        onDelete: (id) => deleteParentAndResequence("Tracked_Animal", "AnimalID", "AnimalID", id)
    }
};

function renderTableRows(tableKey, rows) {
    const tableConfig = tableConfigByKey[tableKey];
    cachedRowsByTable[tableKey] = rows;

    renderTableBody(
        tableConfig.body,
        rows,
        (row) => {
            const cellsHtml = tableConfig.cells(row).map((value) => `<td>${escapeHtml(value)}</td>`).join("");
            const rowId = escapeHtml(row[tableConfig.idKey]);
            return `<tr>${cellsHtml}<td><button class="table-button" type="button" data-action="edit" data-id="${rowId}">Edit</button><button class="table-button" type="button" data-action="delete" data-id="${rowId}">Delete</button></td></tr>`;
        },
        tableConfig.emptyColspan
    );
}

// Load all table data in parallel and render each tab body.
const renderTables = async () => {
    try {
        if (!hasAnyTableBody || typeof runQuery !== "function") return;

        const tableKeys = Object.keys(tableConfigByKey);
        const queryResults = await Promise.all(tableKeys.map((tableKey) => runQuery(tableConfigByKey[tableKey].listQuery)));

        queryResults.forEach((result, index) => {
            if (result?.success) {
                renderTableRows(tableKeys[index], result.data);
            }
        });
    } catch (error) {
        showAlert(`Error loading tables: ${toFriendlyConstraintError(error.message)}`, true);
        console.error("renderTables error:", error);
    }
};

const editHandlerByKey = {
    logger: {
        open: (id, row) => {
            const loggerFields = editFieldByTable.logger;
            clearInputBorders(loggerFields.forename, loggerFields.surname, loggerFields.email);

            activeEdit.key = "logger";
            activeEdit.id = Number(id);
            loggerFields.forename.value = row.Forename ?? "";
            loggerFields.surname.value = row.Surname ?? "";
            loggerFields.email.value = row.Email ?? "";
            openEditModal(`Edit Logger #${id}`, "logger");
        },
        submit: () => {
            const loggerFields = editFieldByTable.logger;
            clearInputBorders(loggerFields.forename, loggerFields.surname, loggerFields.email);

            const forename = loggerFields.forename.value.trim();
            const surname = loggerFields.surname.value.trim();
            const email = loggerFields.email.value.trim();
            if (!forename || !surname || !email) {
                return { ok: false, msg: "Please fill all Logger fields." };
            }

            const validationErrors = [];
            if (!isValidName(forename)) {
                addValidationError(loggerFields.forename, "Forename: Letters, hyphens, and apostrophes only", validationErrors);
            }
            if (!isValidName(surname)) {
                addValidationError(loggerFields.surname, "Surname: Letters, hyphens, and apostrophes only", validationErrors);
            }
            if (!isValidEmail(email)) {
                addValidationError(loggerFields.email, "Email: Must be a valid email address (e.g., user@example.com)", validationErrors);
            }

            if (validationErrors.length > 0) {
                return { ok: false, msg: validationErrors.join(" | ") };
            }

            return {
                ok: true,
                query: `UPDATE Logger SET Forename = '${escapeSql(forename)}', Surname = '${escapeSql(surname)}', Email = '${escapeSql(email)}' WHERE LoggerID = ${activeEdit.id}`,
                err: "Unable to update Logger."
            };
        }
    },
    location: {
        open: (id, row) => {
            const locationFields = editFieldByTable.location;
            activeEdit.key = "location";
            activeEdit.id = Number(id);
            locationFields.country.value = row.Country ?? "";
            openEditModal(`Edit Location #${id}`, "location");
        },
        submit: () => {
            const locationFields = editFieldByTable.location;
            clearInputBorders(locationFields.country);

            const country = locationFields.country.value.trim();
            const validationErrors = [];
            const countryError = validateNoNumberName(country, "Country");
            if (countryError) {
                addValidationError(locationFields.country, countryError, validationErrors);
                return { ok: false, msg: validationErrors.join(" | ") };
            }

            return {
                ok: true,
                query: `UPDATE Location SET Country = '${escapeSql(country)}' WHERE LocationID = ${activeEdit.id}`,
                err: "Unable to update Location."
            };
        }
    },
    evidence: {
        open: (id, row) => {
            const evidenceFields = editFieldByTable.evidence;
            activeEdit.key = "evidence";
            activeEdit.id = Number(id);
            evidenceFields.type.value = row.EvidenceType ?? "";
            evidenceFields.description.value = row.Description ?? "";
            openEditModal(`Edit Evidence #${id}`, "evidence");
        },
        submit: () => {
            const evidenceFields = editFieldByTable.evidence;
            clearInputBorders(evidenceFields.type, evidenceFields.description);

            const type = evidenceFields.type.value.trim();
            const description = evidenceFields.description.value.trim();
            const validationErrors = [];

            if (!type) {
                addValidationError(evidenceFields.type, "Evidence type is required", validationErrors);
            }

            const descriptionError = validateNoNumberName(description, "Description");
            if (descriptionError) {
                addValidationError(evidenceFields.description, descriptionError, validationErrors);
            }

            if (validationErrors.length > 0) {
                return { ok: false, msg: validationErrors.join(" | ") };
            }

            return {
                ok: true,
                query: `UPDATE Evidence SET EvidenceType = '${escapeSql(type)}', Description = '${escapeSql(description)}' WHERE EvidenceID = ${activeEdit.id}`,
                err: "Unable to update Evidence."
            };
        }
    },
    species: {
        open: (id, row) => {
            const speciesFields = editFieldByTable.species;
            activeEdit.key = "species";
            activeEdit.id = Number(id);
            speciesFields.scientificName.value = row.ScientificName ?? "";
            speciesFields.commonName.value = row.CommonName ?? "";
            speciesFields.conservationStatus.value = row.ConservationStatus ?? "Unknown";
            openEditModal(`Edit Species #${id}`, "species");
        },
        submit: () => {
            const speciesFields = editFieldByTable.species;
            clearInputBorders(speciesFields.scientificName, speciesFields.commonName, speciesFields.conservationStatus);

            const scientificName = speciesFields.scientificName.value.trim();
            const commonName = speciesFields.commonName.value.trim();
            const conservationStatus = speciesFields.conservationStatus.value;
            const validationErrors = [];

            const scientificNameError = validateNoNumberName(scientificName, "Scientific name");
            const commonNameError = validateNoNumberName(commonName, "Common name");

            if (scientificNameError) {
                addValidationError(speciesFields.scientificName, scientificNameError, validationErrors);
            }
            if (commonNameError) {
                addValidationError(speciesFields.commonName, commonNameError, validationErrors);
            }
            if (!conservationStatus) {
                addValidationError(speciesFields.conservationStatus, "Conservation status is required", validationErrors);
            }

            if (validationErrors.length > 0) {
                return { ok: false, msg: validationErrors.join(" | ") };
            }

            return {
                ok: true,
                query: `UPDATE Species SET ScientificName = '${escapeSql(scientificName)}', CommonName = '${escapeSql(commonName)}', ConservationStatus = '${escapeSql(conservationStatus)}' WHERE SpeciesID = ${activeEdit.id}`,
                err: "Unable to update Species."
            };
        }
    },
    report: {
        open: (id, row) => {
            const reportFields = editFieldByTable.report;
            activeEdit.key = "report";
            activeEdit.id = Number(id);
            reportFields.loggerId.value = row.LoggerID ?? "";
            reportFields.locationId.value = row.LocationID ?? "";
            reportFields.evidenceId.value = row.EvidenceID ?? "";
            reportFields.date.value = toDateInputValue(row.ReportDate);
            reportFields.speciesId.value = row.SpeciesID ?? "";
            reportFields.type.value = row.ReportType ?? "";
            reportFields.description.value = row.ReportDescription ?? "";
            openEditModal(`Edit Report #${id}`, "report");
        },
        submit: async () => {
            const reportFields = editFieldByTable.report;
            clearInputBorders(
                reportFields.loggerId,
                reportFields.locationId,
                reportFields.evidenceId,
                reportFields.date,
                reportFields.speciesId,
                reportFields.type,
                reportFields.description
            );

            const loggerId = Number(reportFields.loggerId.value);
            const locationId = Number(reportFields.locationId.value);
            const evidenceId = Number(reportFields.evidenceId.value);
            const reportDate = reportFields.date.value;
            const speciesId = Number(reportFields.speciesId.value);
            const reportType = reportFields.type.value.trim();
            const reportDescription = reportFields.description.value.trim();
            const validationErrors = [];

            if (!loggerId || loggerId < 1) addValidationError(reportFields.loggerId, "Logger ID must be a positive number", validationErrors);
            if (!locationId || locationId < 1) addValidationError(reportFields.locationId, "Location ID must be a positive number", validationErrors);
            if (!evidenceId || evidenceId < 1) addValidationError(reportFields.evidenceId, "Evidence ID must be a positive number", validationErrors);
            if (!speciesId || speciesId < 1) addValidationError(reportFields.speciesId, "Species ID must be a positive number", validationErrors);
            if (!reportDate) addValidationError(reportFields.date, "Report date is required", validationErrors);

            const reportTypeError = validateNoNumberName(reportType, "Report type");
            const reportDescriptionError = validateNoNumberName(reportDescription, "Description");
            if (reportTypeError) addValidationError(reportFields.type, reportTypeError, validationErrors);
            if (reportDescriptionError) addValidationError(reportFields.description, reportDescriptionError, validationErrors);

            if (!validationErrors.length) {
                const [loggerExists, locationExists, evidenceExists, speciesExists] = await Promise.all([
                    foreignKeyExists("Logger", "LoggerID", loggerId),
                    foreignKeyExists("Location", "LocationID", locationId),
                    foreignKeyExists("Evidence", "EvidenceID", evidenceId),
                    foreignKeyExists("Species", "SpeciesID", speciesId)
                ]);

                if (!loggerExists) addValidationError(reportFields.loggerId, "Logger ID does not exist", validationErrors);
                if (!locationExists) addValidationError(reportFields.locationId, "Location ID does not exist", validationErrors);
                if (!evidenceExists) addValidationError(reportFields.evidenceId, "Evidence ID does not exist", validationErrors);
                if (!speciesExists) addValidationError(reportFields.speciesId, "Species ID does not exist", validationErrors);
            }

            if (validationErrors.length > 0) {
                return { ok: false, msg: validationErrors.join(" | ") };
            }

            return {
                ok: true,
                query: `UPDATE Report SET LoggerID = ${loggerId}, LocationID = ${locationId}, EvidenceID = ${evidenceId}, ReportDate = '${escapeSql(reportDate)}', SpeciesID = ${speciesId}, ReportType = '${escapeSql(reportType)}', ReportDescription = '${escapeSql(reportDescription)}' WHERE ReportID = ${activeEdit.id}`,
                err: "Unable to update Report."
            };
        }
    },
    trackedAnimal: {
        open: (id, row) => {
            const trackedAnimalFields = editFieldByTable.trackedAnimal;
            activeEdit.key = "trackedAnimal";
            activeEdit.id = Number(id);
            trackedAnimalFields.name.value = row.Name ?? "";
            trackedAnimalFields.speciesId.value = row.SpeciesID ?? "";
            trackedAnimalFields.birthDate.value = toDateInputValue(row.BirthDate);
            trackedAnimalFields.status.value = row.Status ?? "Alive";
            openEditModal(`Edit Tracked Animal #${id}`, "trackedAnimal");
        },
        submit: async () => {
            const trackedAnimalFields = editFieldByTable.trackedAnimal;
            clearInputBorders(trackedAnimalFields.name, trackedAnimalFields.speciesId, trackedAnimalFields.birthDate, trackedAnimalFields.status);

            const name = trackedAnimalFields.name.value.trim();
            const speciesId = Number(trackedAnimalFields.speciesId.value);
            const birthDate = trackedAnimalFields.birthDate.value;
            const status = trackedAnimalFields.status.value;
            const validationErrors = [];

            if (!speciesId || speciesId < 1) addValidationError(trackedAnimalFields.speciesId, "Species ID must be a positive number", validationErrors);
            if (!birthDate) addValidationError(trackedAnimalFields.birthDate, "Birth date is required", validationErrors);
            if (!status) addValidationError(trackedAnimalFields.status, "Status is required", validationErrors);

            const nameError = validateNoNumberName(name, "Name");
            if (nameError) addValidationError(trackedAnimalFields.name, nameError, validationErrors);

            if (!validationErrors.length) {
                const speciesExists = await foreignKeyExists("Species", "SpeciesID", speciesId);
                if (!speciesExists) addValidationError(trackedAnimalFields.speciesId, "Species ID does not exist", validationErrors);
            }

            if (validationErrors.length > 0) {
                return { ok: false, msg: validationErrors.join(" | ") };
            }

            return {
                ok: true,
                query: `UPDATE Tracked_Animal SET Name = ${name ? `'${escapeSql(name)}'` : "NULL"}, SpeciesID = ${speciesId}, BirthDate = '${escapeSql(birthDate)}', Status = '${escapeSql(status)}' WHERE AnimalID = ${activeEdit.id}`,
                err: "Unable to update Tracked Animal."
            };
        }
    }
};

function bindTableActions(tableKey) {
    const tableConfig = tableConfigByKey[tableKey];
    if (!tableConfig.body) return;

    tableConfig.body.addEventListener("click", async (event) => {
        const actionButton = event.target.closest("button[data-action]");
        if (!actionButton) return;

        const rowId = actionButton.dataset.id;
        if (!isPositiveIntegerText(rowId)) return;

        if (actionButton.dataset.action === "edit") {
            const row = findRowById(cachedRowsByTable[tableKey], tableConfig.idKey, rowId);
            if (row) editHandlerByKey[tableKey].open(rowId, row);
            return;
        }

        if (actionButton.dataset.action === "delete" && confirm(`Delete ${tableConfig.label} ID ${rowId}?`)) {
            const deleteResult = await tableConfig.onDelete(rowId);
            if (!deleteResult?.success) {
                return showAlert(toFriendlyConstraintError(deleteResult?.error || `Unable to delete ${tableConfig.label}.`), true);
            }
            await renderTables();
        }
    });
}

// Validate form, run update query, then refresh displayed tables.
function bindEditFormSubmit(tableKey) {
    const editForm = editFormByKey[tableKey];
    if (!editForm) return;

    editForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (activeEdit.key !== tableKey || !activeEdit.id) return;

        const outcome = await Promise.resolve(editHandlerByKey[tableKey].submit());
        if (!outcome.ok) return showAlert(outcome.msg, true);

        const queryResult = await runQuery(outcome.query);
        if (!queryResult?.success) {
            return showAlert(toFriendlyConstraintError(queryResult?.error || outcome.err), true);
        }

        closeEditModal();
        await renderTables();
    });
}

Object.keys(tableConfigByKey).forEach(bindTableActions);
Object.keys(editFormByKey).forEach(bindEditFormSubmit);

// Show readable messages for uncaught runtime errors.
window.addEventListener("error", (event) => {
    showAlert(`Error: ${toFriendlyConstraintError(event.message)}`, true);
    console.error("Global error:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason?.message || "An unexpected error occurred";
    showAlert(`Error: ${toFriendlyConstraintError(reason)}`, true);
    console.error("Unhandled rejection:", event.reason);
});

if (tableTabButtons.length) {
    tableTabButtons.forEach((button) => {
        button.addEventListener("click", () => setActiveTableTab(button.dataset.tableTab));
    });
}

if (hasEditModal) {
    editModal.close.addEventListener("click", closeEditModal);

    editModal.root.addEventListener("click", (event) => {
        if (event.target === editModal.root) closeEditModal();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && editModal.root.classList.contains("is-open")) closeEditModal();
    });

    cancelEditButtons.forEach((button) => button.addEventListener("click", closeEditModal));
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        if (tableTabButtons.length) {
            const defaultTab = tableTabButtons.find((button) => button.classList.contains("is-active"))?.dataset.tableTab || tableTabButtons[0].dataset.tableTab;
            setActiveTableTab(defaultTab);
        }

        await renderTables();
    } catch (error) {
        showAlert(`Error initializing page: ${toFriendlyConstraintError(error.message)}`, true);
        console.error("DOMContentLoaded error:", error);
    }
});

