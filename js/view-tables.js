// In this file, I have created JavaScript logic for the background tasks to make this page work as standard, this includes scraping JSON
// field validation for edit forms and popups for crucial messages

const byId = (id) => document.getElementById(id);

// Global state for tracking active edits
let activeEditTable = null;
let activeEditId = null;

// Local cache for records
const tableCache = {
    logger: [], location: [], evidence: [],
    species: [], report: [], trackedAnimal: []
};

// Table configuration mapping
const tableConfigs = {
    logger: { idKey: "LoggerID", bodyId: "logger-table-body", sqlTable: "Logger", columns: 6, getQuery: "SELECT * FROM Logger ORDER BY LoggerID" },
    location: { idKey: "LocationID", bodyId: "location-table-body", sqlTable: "Location", columns: 3, getQuery: "SELECT * FROM Location ORDER BY LocationID" },
    evidence: { idKey: "EvidenceID", bodyId: "evidence-table-body", sqlTable: "Evidence", columns: 4, getQuery: "SELECT * FROM Evidence ORDER BY EvidenceID" },
    species: { idKey: "SpeciesID", bodyId: "species-table-body", sqlTable: "Species", columns: 5, getQuery: "SELECT * FROM Species ORDER BY SpeciesID" },
    report: { idKey: "ReportID", bodyId: "reports-table-body", sqlTable: "Report", columns: 9, getQuery: "SELECT * FROM Report ORDER BY ReportID" },
    trackedAnimal: { idKey: "AnimalID", bodyId: "tracked-animals-table-body", sqlTable: "Tracked_Animal", columns: 6, getQuery: "SELECT * FROM Tracked_Animal ORDER BY AnimalID" }
};

// Handling errors section

/**
 * Converts technical MySQL errors into user-friendly messages for the user
 */
function getFriendlyErrorMessage(rawError) {
    const errorText = String(rawError).toLowerCase();

    if (errorText.includes("cannot be empty")) {
        return "Update failed: No data was sent to the server. Please try again.";
    }
    if (errorText.includes("foreign key constraint fails")) {
        return "Cannot delete or change: This record is linked to other data in the system.";
    }
    if (errorText.includes("duplicate entry")) {
        return "Update failed: This information is already registered.";
    }

    return "An unexpected error occurred while saving. Please try again.";
}

function showError(msg) {
    const friendlyMsg = getFriendlyErrorMessage(msg);
    if (typeof showAlert === "function") {
        showAlert(friendlyMsg, true);
    } else {
        alert(friendlyMsg);
    }
}

function escapeHtml(text) {
    if (!text) return "";
    return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function escapeSql(text) {
    return String(text).replace(/'/g, "''");
}

function clearValidationEffects() {
    const inputs = document.querySelectorAll('.edit-pane-section input, .edit-pane-section select');
    inputs.forEach(input => { input.style.border = ""; });
}

function applyHighlight(id, isError) {
    const el = byId(id);
    if (el) el.style.border = isError ? "2px solid red" : "";
}

// Managing the data in tables

async function refreshAllTables() {
    for (const key in tableConfigs) {
        const config = tableConfigs[key];
        const result = await runQuery(config.getQuery);
        if (result && result.success) {
            tableCache[key] = result.data;
            renderRows(key, result.data);
        }
    }
}

function renderRows(tableKey, data) {
    const config = tableConfigs[tableKey];
    const tbody = byId(config.bodyId);
    if (!tbody) return;

    if (!data || data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${config.columns}">No records found.</td></tr>`;
        return;
    }

    tbody.innerHTML = data.map(row => {
        let cells = "";
        if (tableKey === 'logger') cells = `<td>${row.LoggerID}</td><td>${escapeHtml(row.Username || "")}</td><td>${escapeHtml(row.Forename)}</td><td>${escapeHtml(row.Surname)}</td><td>${escapeHtml(row.Email)}</td>`;
        else if (tableKey === 'location') cells = `<td>${row.LocationID}</td><td>${escapeHtml(row.Country)}</td>`;
        else if (tableKey === 'evidence') cells = `<td>${row.EvidenceID}</td><td>${row.EvidenceType}</td><td>${escapeHtml(row.Description)}</td>`;
        else if (tableKey === 'species') cells = `<td>${row.SpeciesID}</td><td>${escapeHtml(row.ScientificName)}</td><td>${escapeHtml(row.CommonName)}</td><td>${row.ConservationStatus}</td>`;
        else if (tableKey === 'report') cells = `<td>${row.ReportID}</td><td>${row.LoggerID}</td><td>${row.LocationID}</td><td>${row.EvidenceID}</td><td>${row.ReportDate}</td><td>${row.SpeciesID}</td><td>${escapeHtml(row.ReportType)}</td><td>${escapeHtml(row.ReportDescription)}</td>`;
        else if (tableKey === 'trackedAnimal') cells = `<td>${row.AnimalID}</td><td>${escapeHtml(row.Name || "N/A")}</td><td>${row.SpeciesID}</td><td>${row.BirthDate}</td><td>${row.Status}</td>`;

        const id = row[config.idKey];

        // Role based access class assigning (default is admin-only editing/deleting buttons BUT if its a report + user made the report they can )
        const currentLoggerID = sessionStorage.getItem("loggerID").trim();
        const currentLoggerRole = sessionStorage.getItem("loggerRole").trim();
        
        let buttonClass = "table-button admin-only"; // Default class name is admin only

        if (currentLoggerRole.toLowerCase() === "admin" || (tableKey === 'report' && row.LoggerID == currentLoggerID)) {
            buttonClass = "table-button"; // removes admin-only restriction for edit/delete buttons if logger made specific report
        }

        return `<tr>${cells}<td>
            <button class="${buttonClass}" onclick="handleEditClick('${tableKey}', ${id})">Edit</button>
            <button class="${buttonClass}" onclick="handleDeleteClick('${tableKey}', ${id})">Delete</button>
        </td></tr>`;
    }).join('');
}

// Edit logic for edit panel

function handleEditClick(tableKey, id) {
    activeEditTable = tableKey;
    activeEditId = id;
    const row = tableCache[tableKey].find(r => r[tableConfigs[tableKey].idKey] == id);
    if (!row) return;

    let sectionId = "";
    if (tableKey === 'logger') {
        byId("edit-username-input").value = row.Username || "";
        byId("edit-forename-input").value = row.Forename;
        byId("edit-surname-input").value = row.Surname;
        byId("edit-email-input").value = row.Email;
        sectionId = "logger-edit-section";
    } else if (tableKey === 'location') {
        byId("edit-country-input").value = row.Country;
        sectionId = "location-edit-section";
    } else if (tableKey === 'evidence') {
        byId("edit-evidence-type-input").value = row.EvidenceType;
        byId("edit-evidence-desc-input").value = row.Description;
        sectionId = "evidence-edit-section";
    } else if (tableKey === 'species') {
        byId("edit-species-scientific-name-input").value = row.ScientificName;
        byId("edit-species-name-input").value = row.CommonName;
        byId("edit-species-status-input").value = row.ConservationStatus;
        sectionId = "species-edit-section";
    } else if (tableKey === 'report') {
        byId("edit-report-logger-id-input").value = row.LoggerID;
        byId("edit-report-location-id-input").value = row.LocationID;
        byId("edit-report-evidence-id-input").value = row.EvidenceID;
        byId("edit-report-date-input").value = row.ReportDate.split(' ')[0];
        byId("edit-report-species-id-input").value = row.SpeciesID;
        byId("edit-report-type-input").value = row.ReportType;
        byId("edit-report-description-input").value = row.ReportDescription;
        sectionId = "report-edit-section";
    } else if (tableKey === 'trackedAnimal') {
        byId("edit-tracked-animals-name-input").value = row.Name || "";
        byId("edit-tracked-animals-species-id-input").value = row.SpeciesID;
        byId("edit-tracked-animals-birth-date-input").value = row.BirthDate.split(' ')[0];
        byId("edit-tracked-animals-status-input").value = row.Status;
        sectionId = "tracked-animals-edit-section";
    }

    if (sectionId) openEditPane("Edit Record", sectionId);
}

function openEditPane(title, sectionId) {
    byId("edit-pane-title").textContent = title;
    clearValidationEffects();
    document.querySelectorAll(".edit-pane-section").forEach(sec => sec.classList.remove("is-active"));
    byId(sectionId).classList.add("is-active");
    byId("edit-pane").classList.add("is-open");
    byId("edit-pane").setAttribute("aria-hidden", "false");
}

function closeEditPane() {
    byId("edit-pane").classList.remove("is-open");
    byId("edit-pane").setAttribute("aria-hidden", "true");
}

async function handleDeleteClick(tableKey, id) {
    const config = tableConfigs[tableKey];
    if (!confirm(`Are you sure you want to delete ID ${id}?`)) return;
    const result = await runQuery(`DELETE FROM ${config.sqlTable} WHERE ${config.idKey} = ${id}`);
    if (result.success) refreshAllTables();
    else showError(result.error);
}

// Logic for form submission when editing records

async function handleFormSubmit(e) {
    e.preventDefault();
    clearValidationEffects();
    let query = "";

    // 1. Logger Table Validation
    if (activeEditTable === 'logger') {
        const username = byId("edit-username-input").value.trim();
        const fname = byId("edit-forename-input").value.trim();
        const sname = byId("edit-surname-input").value.trim();
        const email = byId("edit-email-input").value.trim();

        if (!isValidUsername(username)) {
            applyHighlight("edit-username-input", true);
            return showAlert("Invalid Username. Alphanumeric only (3-20 chars).", true);
        }
        if (!isValidName(fname) || /\d/.test(fname)) {
            applyHighlight("edit-forename-input", true);
            return showAlert("Invalid Forename. No numbers or special characters allowed.", true);
        }
        if (!isValidName(sname) || /\d/.test(sname)) {
            applyHighlight("edit-surname-input", true);
            return showAlert("Invalid Surname. No numbers or special characters allowed.", true);
        }
        if (!isValidEmail(email)) {
            applyHighlight("edit-email-input", true);
            return showAlert("Invalid Email. Format: user@example.com", true);
        }
        query = `UPDATE Logger SET Username='${escapeSql(username)}', Forename='${escapeSql(fname)}', Surname='${escapeSql(sname)}', Email='${escapeSql(email)}' WHERE LoggerID = ${activeEditId}`;
    }

    // 2. Location Table Validation
    else if (activeEditTable === 'location') {
        const country = byId("edit-country-input").value.trim();
        if (country.length < 2 || country.length > 100) {
            applyHighlight("edit-country-input", true);
            return showAlert("Country name must be between 2 and 100 characters.", true);
        }
        // Strict Numeric Check added here
        if (/\d/.test(country)) {
            applyHighlight("edit-country-input", true);
            return showAlert("Country name cannot contain numbers.", true);
        }
        query = `UPDATE Location SET Country='${escapeSql(country)}' WHERE LocationID = ${activeEditId}`;
    }

    // 3. Evidence Table Validation
    else if (activeEditTable === 'evidence') {
        const type = byId("edit-evidence-type-input").value;
        const desc = byId("edit-evidence-desc-input").value.trim();
        if (!type) {
            applyHighlight("edit-evidence-type-input", true);
            return showAlert("Evidence type selection is required.", true);
        }
        if (desc.length < 5) {
            applyHighlight("edit-evidence-desc-input", true);
            return showAlert("Description is too short (min 5 characters).", true);
        }
        // Evidence descriptions might legitimately contain numbers (e.g. "Saw 2 bears"), so we don't block them here.
        query = `UPDATE Evidence SET EvidenceType='${type}', Description='${escapeSql(desc)}' WHERE EvidenceID = ${activeEditId}`;
    }

    // 4. Species Table Validation
    else if (activeEditTable === 'species') {
        const sName = byId("edit-species-scientific-name-input").value.trim();
        const cName = byId("edit-species-name-input").value.trim();
        const status = byId("edit-species-status-input").value;

        if (!isValidAnimalOrSpeciesName(sName) || /\d/.test(sName)) {
            applyHighlight("edit-species-scientific-name-input", true);
            return showAlert("Invalid Scientific Name. No numbers allowed.", true);
        }
        if (cName.length < 2 || cName.length > 100) {
            applyHighlight("edit-species-name-input", true);
            return showAlert("Common Name must be 2-100 characters.", true);
        }
        if (!status) {
            applyHighlight("edit-species-status-input", true);
            return showAlert("Conservation status required.", true);
        }
        query = `UPDATE Species SET ScientificName='${escapeSql(sName)}', CommonName='${escapeSql(cName)}', ConservationStatus='${status}' WHERE SpeciesID = ${activeEditId}`;
    }

    // 5. Report Table Validation
    else if (activeEditTable === 'report') {
        const loggerId = parseInt(byId("edit-report-logger-id-input").value);
        const locationId = parseInt(byId("edit-report-location-id-input").value);
        const evidenceId = parseInt(byId("edit-report-evidence-id-input").value);
        const speciesId = parseInt(byId("edit-report-species-id-input").value);
        const date = byId("edit-report-date-input").value;
        const type = byId("edit-report-type-input").value.trim();
        const desc = byId("edit-report-description-input").value.trim();

        if (isNaN(loggerId) || loggerId < 1) { applyHighlight("edit-report-logger-id-input", true); return showAlert("Valid Logger ID required.", true); }
        if (isNaN(locationId) || locationId < 1) { applyHighlight("edit-report-location-id-input", true); return showAlert("Valid Location ID required.", true); }
        if (isNaN(evidenceId) || evidenceId < 1) { applyHighlight("edit-report-evidence-id-input", true); return showAlert("Valid Evidence ID required.", true); }
        if (isNaN(speciesId) || speciesId < 1) { applyHighlight("edit-report-species-id-input", true); return showAlert("Valid Species ID required.", true); }

        if (!date) { applyHighlight("edit-report-date-input", true); return showAlert("Submission date required.", true); }
        if (type.length < 1) {
            applyHighlight("edit-report-type-input", true);
            return showAlert("Report type required.", true);
        }
        // Strict Numeric Check added for Report Type
        if (/\d/.test(type)) {
            applyHighlight("edit-report-type-input", true);
            return showAlert("Report type cannot contain numbers.", true);
        }
        if (desc.length < 5) { applyHighlight("edit-report-description-input", true); return showAlert("Detailed description required.", true); }

        query = `UPDATE Report SET LoggerID=${loggerId}, LocationID=${locationId}, EvidenceID=${evidenceId}, ReportDate='${date}', SpeciesID=${speciesId}, ReportType='${escapeSql(type)}', ReportDescription='${escapeSql(desc)}' WHERE ReportID = ${activeEditId}`;
    }

    // 6. Tracked Animal Table Validation
    else if (activeEditTable === 'trackedAnimal') {
        const name = byId("edit-tracked-animals-name-input").value.trim();
        const speciesId = parseInt(byId("edit-tracked-animals-species-id-input").value);
        const bDate = byId("edit-tracked-animals-birth-date-input").value;
        const status = byId("edit-tracked-animals-status-input").value;

        if (name !== "") {
            if (!isValidAnimalOrSpeciesName(name) || /\d/.test(name)) {
                applyHighlight("edit-tracked-animals-name-input", true);
                return showAlert("Invalid Animal Name. No numbers allowed.", true);
            }
        }
        if (isNaN(speciesId) || speciesId < 1) {
            applyHighlight("edit-tracked-animals-species-id-input", true);
            return showAlert("Valid Species ID required.", true);
        }
        if (!bDate) {
            applyHighlight("edit-tracked-animals-birth-date-input", true);
            return showAlert("Birth date is required.", true);
        }
        if (!status) {
            applyHighlight("edit-tracked-animals-status-input", true);
            return showAlert("Animal status required.", true);
        }

        const nameValue = name ? `'${escapeSql(name)}'` : "NULL";
        query = `UPDATE Tracked_Animal SET Name=${nameValue}, SpeciesID=${speciesId}, BirthDate='${bDate}', Status='${status}' WHERE AnimalID = ${activeEditId}`;
    }

    // Run the update only if validation passed
    try {
        const result = await runQuery(query);
        if (result && result.success) {
            closeEditPane();
            refreshAllTables();
            showAlert("Updated successfully!", false);
        } else {
            showError(result ? result.error : "An unknown error occurred during saving.");
        }
    } catch (err) {
        showError("Database connection failed. Please check your network.");
    }
}



// Initialisation

document.addEventListener("DOMContentLoaded", async () => {
    await refreshAllTables();
    document.querySelectorAll("form").forEach(f => f.addEventListener("submit", handleFormSubmit));
    byId("edit-pane-close").addEventListener("click", closeEditPane);
    document.querySelectorAll("[id$='-edit-cancel']").forEach(b => b.addEventListener("click", closeEditPane));

    // Tab logic
    const tabs = document.querySelectorAll("[data-table-tab]");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.getAttribute("data-table-tab");
            tabs.forEach(t => t.classList.remove("is-active"));
            tab.classList.add("is-active");
            document.querySelectorAll("[data-table-panel]").forEach(p => {
                p.classList.toggle("is-active", p.getAttribute("data-table-panel") === target);
            });
        });
    });
});

