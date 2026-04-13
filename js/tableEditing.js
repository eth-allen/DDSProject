
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

    function renderLoggerSelection(rows) {
        const loggerSelection = document.getElementById("logger-selection");
        loggerSelection.innerHTML = "";

        for (let row of rows) {
            loggerSelection.innerHTML += `<option value="${row.LoggerID}">${row.Forename} ${row.Surname} (ID: ${row.LoggerID})</option>`;
        }
    }

    function renderLocationSelection(rows) {
        const locationSelection = document.getElementById("location-selection");
        locationSelection.innerHTML = "";

        for (let row of rows) {
            locationSelection.innerHTML += `<option value="${row.LocationID}">${row.Latitude}, ${row.Longitude}</option>`;
        }
    }

    function renderEvidenceSelection(rows) {
        const evidenceSelection = document.getElementById("evidence-selection");
        evidenceSelection.innerHTML = "";

        for (let row of rows) {
            evidenceSelection.innerHTML += `<option value="${row.EvidenceID}">${row.Description} (ID: ${row.EvidenceID})</option>`;
        }
    };

    function renderSpeciesSelection(rows) {
        const speciesSelection = document.getElementById("species-selection");
        speciesSelection.innerHTML = "";

        for (let row of rows) {
            speciesSelection.innerHTML += `<option value="${row.SpeciesID}">${row.Name}</option>`;
        }
    };

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
                        <td>${row.DateSubmitted ?? ""}</td>
                        <td>${row.Species ?? ""}</td>
                        <td>${row.ReportType ?? ""}</td>
                        <td>${row.Description ?? ""}</td>
                    </tr>
                `).join("");
    }

    const renderTables = async () => {
        const [loggerResult, locationResult, evidenceResult, speciesResult, reportResult] = await Promise.all([
            runQuery("SELECT * FROM Logger"),
            runQuery("SELECT * FROM Location"),
            runQuery("SELECT * FROM Evidence"),
            runQuery("SELECT * FROM Species"),
            runQuery("SELECT * FROM Report")
        ]);

        if (loggerResult?.success && Array.isArray(loggerResult.data)) {
            renderLoggers(loggerResult.data);
            renderLoggerSelection(loggerResult.data);
        }

        if (locationResult?.success && Array.isArray(locationResult.data)) {
            renderLocations(locationResult.data);
            renderLocationSelection(locationResult.data);
        }

        if (evidenceResult?.success && Array.isArray(evidenceResult.data)) {
            renderEvidenceSelection(evidenceResult.data);
        }

        if (speciesResult?.success && Array.isArray(speciesResult.data)) {
            renderSpeciesSelection(speciesResult.data);
        }

        if (reportResult?.success && Array.isArray(reportResult.data)) {
            renderReports(reportResult.data);
        }

        if (loggerResult?.error || locationResult?.error || evidenceResult?.error || speciesResult?.error || reportResult?.error) {
            console.error("Data load error", { loggerResult, locationResult, evidenceResult, speciesResult, reportResult });
        }
    }

    document.addEventListener("DOMContentLoaded", renderTables);

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

            const deleteResult = await runQuery(`DELETE FROM Logger WHERE LoggerID = ${row.LoggerID};`);
            if (deleteResult?.error) {
                console.error("Logger delete failed", { deleteResult });
                alert("Unable to delete this logger.");
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

            const deleteResult = await runQuery(`DELETE FROM Location WHERE LocationID = ${row.LocationID};`);
            if (deleteResult?.error) {
                console.error("Location delete failed", { deleteResult });
                alert("Unable to delete this location.");
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
    const locationForm = document.getElementById("location-form");
    const reportForm = document.getElementById("report-form");

    document.addEventListener("DOMContentLoaded", renderTables);

    loggerForm.addEventListener("submit", async () => {
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
            alert("Unable to save location.");
            return;
        }

        closeEditModal();
        await renderTables();
    });

    loggerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const forename = document.getElementById("forename-input").value.trim();
        const surname = document.getElementById("surname-input").value.trim();
        const email = document.getElementById("email-input").value.trim();

        if (!forename || !surname || !email) {
            alert("Please fill in all logger fields.");
            return;
        } //this is redundant I think because html already marks these fields as manditory

        const saveResult = await runQuery(`INSERT INTO Logger (Forename, Surname, Email) VALUES ('${escapeSql(forename)}', '${escapeSql(surname)}', '${escapeSql(email)}');`);
        if (saveResult?.error) {
            console.error("Logger save failed", { saveResult });
            alert("Unable to save logger.");
            return;
        }

        loggerForm.reset();
        renderTables();
    });

    locationForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const country = document.getElementById("country-input").value.trim();
        const latitude = Number(document.getElementById("latitude-input").value);
        const longitude = Number(document.getElementById("longitude-input").value);

        if (!country || !Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            alert("Please enter a valid country, latitude, and longitude.");
            return;
        }

        const saveResult = await runQuery(`INSERT INTO Location (Country, Latitude, Longitude) VALUES ('${escapeSql(country)}', ${latitude}, ${longitude});`);
        if (saveResult?.error) {
            console.error("Location save failed", { saveResult });
            alert("Unable to save location.");
            return;
        }

        locationForm.reset();
        renderTables();
    });

    reportForm.addEventListener("submit", async () => {
        event.preventDefault();
        
        const currentDate = new Date();

        const loggerID = document.getElementById("logger-selection").value;
        const locationID = document.getElementById("location-selection").value;
        const evidenceID = document.getElementById("evidence-selection").value;
        const reportDate = currentDate.toISOString.substring(0, 10);
        const speciesID = document.getElementById("species-selection").value;
        const description = document.getElementById("description-input").value;

        const insertResult = await runQuery(`INSERT INTO Report (LoggerID, LocationID, EvidenceID, ReportDate, SpeciesID, ReportDescription) VALUES (${loggerID}, ${locationID}, ${evidenceID}, '${reportDate}', ${speciesID}, '${description}')`);
        
        if (insertResult?.error) {
            console.error("Data load error", {insertResult});
        }
        
        renderTables();
    }); //finish after all selectors are in