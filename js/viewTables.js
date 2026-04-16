
//const loggerForm = document.getElementById("logger-form");
//const locationForm = document.getElementById("location-form");

const loggerTableBody = document.getElementById("logger-table-body");
const locationTableBody = document.getElementById("location-table-body");
const editModal = document.getElementById("edit-modal");
const editModalCloseButton = document.getElementById("edit-modal-close");
const editModalTitle = document.getElementById("edit-modal-title");
const loggerEditSection = document.getElementById("logger-edit-section");
const locationEditSection = document.getElementById("location-edit-section");
const loggerEditForm = document.getElementById("logger-edit-form");
const locationEditForm = document.getElementById("location-edit-form");
const loggerEditCancel = document.getElementById("logger-edit-cancel");
const locationEditCancel = document.getElementById("location-edit-cancel");
const editForenameInput = document.getElementById("edit-forename-input");
const editSurnameInput = document.getElementById("edit-surname-input");
const editEmailInput = document.getElementById("edit-email-input");
const editCountryInput = document.getElementById("edit-country-input");
const editLatitudeInput = document.getElementById("edit-latitude-input");
const editLongitudeInput = document.getElementById("edit-longitude-input");

let currentLoggerRows = [];
let currentLocationRows = [];
let editingLoggerId = null;
let editingLocationId = null;

function escapeSql(value) {
    return String(value).replace(/'/g, "''");
}

function openLoggerEditModal(row) {
    editingLoggerId = row.LoggerID;
    editModalTitle.textContent = "Edit Logger";
    loggerEditSection.classList.add("is-active");
    locationEditSection.classList.remove("is-active");
    editModal.classList.add("is-open");
    editModal.setAttribute("aria-hidden", "false");

    editForenameInput.value = row.Forename ?? "";
    editSurnameInput.value = row.Surname ?? "";
    editEmailInput.value = row.Email ?? "";
    editForenameInput.focus();
}

function openLocationEditModal(row) {
    editingLocationId = row.LocationID;
    editModalTitle.textContent = "Edit Location";
    locationEditSection.classList.add("is-active");
    loggerEditSection.classList.remove("is-active");
    editModal.classList.add("is-open");
    editModal.setAttribute("aria-hidden", "false");

    editCountryInput.value = row.Country ?? "";
    editLatitudeInput.value = row.Latitude ?? "";
    editLongitudeInput.value = row.Longitude ?? "";
    editCountryInput.focus();
}

function closeEditModal() {
    editingLoggerId = null;
    editingLocationId = null;
    editModalTitle.textContent = "Edit Logger";
    editModal.classList.remove("is-open");
    editModal.setAttribute("aria-hidden", "true");
    loggerEditSection.classList.remove("is-active");
    locationEditSection.classList.remove("is-active");
    loggerEditForm.reset();
    locationEditForm.reset();
}

async function deleteLoggerWithDependencies(loggerId) {
    const linkedReportsResult = await runQuery(`SELECT ReportID FROM Report WHERE LoggerID = ${loggerId};`);
    if (linkedReportsResult?.error) {
        return linkedReportsResult;
    }

    if (Array.isArray(linkedReportsResult?.data) && linkedReportsResult.data.length > 0) {
        const shouldDeleteReports = confirm(
            `Logger ${loggerId} is used in ${linkedReportsResult.data.length} report(s). Delete those reports as well?`
        );
        if (!shouldDeleteReports) {
            return { cancelled: true };
        }

        const deleteReportsResult = await runQuery(`DELETE FROM Report WHERE LoggerID = ${loggerId};`);
        if (deleteReportsResult?.error) {
            return deleteReportsResult;
        }
    }

    return runQuery(`DELETE FROM Logger WHERE LoggerID = ${loggerId};`);
}

async function deleteLocationWithDependencies(locationId) {
    const linkedReportsResult = await runQuery(`SELECT ReportID FROM Report WHERE LocationID = ${locationId};`);
    if (linkedReportsResult?.error) {
        return linkedReportsResult;
    }

    if (Array.isArray(linkedReportsResult?.data) && linkedReportsResult.data.length > 0) {
        const shouldDeleteReports = confirm(
            `Location ${locationId} is used in ${linkedReportsResult.data.length} report(s). Delete those reports as well?`
        );
        if (!shouldDeleteReports) {
            return { cancelled: true };
        }

        const deleteReportsResult = await runQuery(`DELETE FROM Report WHERE LocationID = ${locationId};`);
        if (deleteReportsResult?.error) {
            return deleteReportsResult;
        }
    }

    return runQuery(`DELETE FROM Location WHERE LocationID = ${locationId};`);
}

function renderLoggerSelection(rows) {
    const loggerSelection = document.getElementById("logger-selection");
    loggerSelection.innerHTML = "";

    for (let row of rows) {
        loggerSelection.innerHTML += `<option value="${row.LoggerID}">${row.Forename} ${row.Surname} (ID: ${row.LoggerID})</option>`;
    }
}



function renderLocations(rows) {
    currentLocationRows = rows;
    locationTableBody.innerHTML = rows.map((row) => `
                <tr>
                    <td>${row.LocationID ?? ""}</td>
                    <td>${row.Country ?? ""}</td>
                    <td>${row.Latitude ?? ""}</td>
                    <td>${row.Longitude ?? ""}</td>
                    <td>
                        <button type="button" data-action="edit" data-id="${row.LocationID}">Edit</button>
                        <button type="button" data-action="delete" data-id="${row.LocationID}">Delete</button>
                    </td>
                </tr>
            `).join("");
}

function renderLoggers(rows) {
    currentLoggerRows = rows;
    loggerTableBody.innerHTML = rows.map((row) => `
                <tr>
                    <td>${row.LoggerID ?? ""}</td>
                    <td>${row.Forename ?? ""}</td>
                    <td>${row.Surname ?? ""}</td>
                    <td>${row.Email ?? ""}</td>
                    <td>
                        <button type="button" data-action="edit" data-id="${row.LoggerID}">Edit</button>
                        <button type="button" data-action="delete" data-id="${row.LoggerID}">Delete</button>
                    </td>
                </tr>
            `).join("");
}

function renderReports(rows) {
    const tbody = document.getElementById("reports-table-body");
    tbody.innerHTML = rows.map((row) => `
                <tr>
                    <td>${row.ReportID ?? ""}</td>
                    <td>${row.LoggerID ?? ""}</td>
                    <td>${row.LocationID ?? ""}</td>
                    <td>${row.EvidenceID ?? ""}</td>
                    <td>${row.ReportDate ?? ""}</td>
                    <td>${row.SpeciesID ?? ""}</td>
                    <td>${row.ReportType ?? ""}</td>
                    <td>${row.ReportDescription ?? ""}</td>
                </tr>
            `).join("");
}

const renderTables = async () => {
    const [loggerResult, locationResult, evidenceResult, speciesResult, reportResult] = await Promise.all([
        runQuery("SELECT * FROM Logger"),
        runQuery("SELECT * FROM Location"),
        runQuery("SELECT * FROM Report")
    ]);

    if (loggerResult?.success && Array.isArray(loggerResult.data)) {
        renderLoggers(loggerResult.data);
    }

    if (locationResult?.success && Array.isArray(locationResult.data)) {
        renderLocations(locationResult.data);
    }

    if (reportResult?.success && Array.isArray(reportResult.data)) {
        renderReports(reportResult.data);
    }

    if (loggerResult?.error || locationResult?.error || reportResult?.error) {
        console.error("Data load error", { loggerResult, locationResult, reportResult });
    }
}

document.addEventListener("DOMContentLoaded", renderTables);

editModalCloseButton.addEventListener("click", closeEditModal);
loggerEditCancel.addEventListener("click", closeEditModal);
locationEditCancel.addEventListener("click", closeEditModal);

editModal.addEventListener("click", (event) => {
    if (event.target === editModal) {
        closeEditModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && editModal.classList.contains("is-open")) {
        closeEditModal();
    }
});

loggerTableBody.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) {
        return;
    }

    const row = currentLoggerRows.find((item) => String(item.LoggerID) === button.dataset.id);
    if (!row) {
        return;
    }

    if (button.dataset.action === "edit") {
        openLoggerEditModal(row);
        return;
    }

    if (button.dataset.action === "delete") {
        const shouldDelete = confirm(`Delete logger ${row.LoggerID}?`);
        if (!shouldDelete) {
            return;
        }

        const deleteResult = await deleteLoggerWithDependencies(row.LoggerID);
        if (deleteResult?.cancelled) {
            return;
        }
        if (deleteResult?.error) {
            console.error("Logger delete failed", { deleteResult });
            alert(`Unable to delete this logger. ${deleteResult.error}`);
            return;
        }

        if (editingLoggerId === row.LoggerID) {
            closeEditModal();
        }

        await renderTables();
    }
});

locationTableBody.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) {
        return;
    }

    const row = currentLocationRows.find((item) => String(item.LocationID) === button.dataset.id);
    if (!row) {
        return;
    }

    if (button.dataset.action === "edit") {
        openLocationEditModal(row);
        return;
    }

    if (button.dataset.action === "delete") {
        const shouldDelete = confirm(`Delete location ${row.LocationID}?`);
        if (!shouldDelete) {
            return;
        }

        const deleteResult = await deleteLocationWithDependencies(row.LocationID);
        if (deleteResult?.cancelled) {
            return;
        }
        if (deleteResult?.error) {
            console.error("Location delete failed", { deleteResult });
            alert(`Unable to delete this location. ${deleteResult.error}`);
            return;
        }

        if (editingLocationId === row.LocationID) {
            closeEditModal();
        }

        await renderTables();
    }
});

const loggerButton = document.getElementById("logger-submit-button");

const loggerForm = document.getElementById("logger-form");

loggerEditForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (editingLoggerId === null) {
        return;
    }

    const forename = editForenameInput.value.trim();
    const surname = editSurnameInput.value.trim();
    const email = editEmailInput.value.trim();

    if (!forename || !surname || !email) {
        alert("Please fill in all logger fields.");
        return;
    }

    const saveResult = await runQuery(`UPDATE Logger SET Forename = '${escapeSql(forename)}', Surname = '${escapeSql(surname)}', Email = '${escapeSql(email)}' WHERE LoggerID = ${editingLoggerId};`);
    if (saveResult?.error) {
        console.error("Logger save failed", { saveResult });
        alert(`Unable to save logger. ${saveResult.error}`);
        return;
    }

    closeEditModal();
    await renderTables();
});

locationEditForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (editingLocationId === null) {
        return;
    }

    const country = editCountryInput.value.trim();
    const latitude = Number(editLatitudeInput.value);
    const longitude = Number(editLongitudeInput.value);

    if (!country || !Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        alert("Please enter a valid country, latitude, and longitude.");
        return;
    }

    const saveResult = await runQuery(`UPDATE Location SET Country = '${escapeSql(country)}', Latitude = ${latitude}, Longitude = ${longitude} WHERE LocationID = ${editingLocationId};`);
    if (saveResult?.error) {
        console.error("Location save failed", { saveResult });
        alert(`Unable to save location. ${saveResult.error}`);
        return;
    }

    closeEditModal();
    await renderTables();
});