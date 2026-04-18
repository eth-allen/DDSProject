const reportForm = document.getElementById("report-form");

function escapeSql(value) {
    return String(value).replace(/'/g, "''");
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
        locationSelection.innerHTML += `<option value="${row.LocationID}">${row.Latitude}, ${row.Longitude} (Country: ${row.Country})</option>`;
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

const renderSelections = async () => {
    const [evidenceResult, speciesResult] = await Promise.all([
        runQuery("SELECT * FROM Evidence"),
        runQuery("SELECT * FROM Species")
    ]);

    if (evidenceResult?.success && Array.isArray(evidenceResult.data)) {
        renderEvidenceSelection(evidenceResult.data);
    }

    if (speciesResult?.success && Array.isArray(speciesResult.data)) {
        renderSpeciesSelection(speciesResult.data);
    }

    if (evidenceResult?.error || speciesResult?.error) {
        console.error("Data load error", {evidenceResult, speciesResult});
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const countryNamesResult = await runQuery("SELECT Country FROM Location GROUP BY Country");

    if (countryNamesResult?.success && Array.isArray(countryNamesResult.data)) {
        for (let i = 0; i < countryNamesResult.data.length; i++) {
            const countryNamesDatalist = document.getElementById("country-names");

            countryNamesDatalist.innerHTML += `<option value="${countryNamesResult.data[i].Country}"></option>`;
        }
    }
    if (countryNamesResult?.error) {
        console.error("Error getting country names", {countryNamesResult});
    }

    renderSelections();
});

reportForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const country = document.getElementById("country-input").value.trim();
    const latitude = Number(document.getElementById("latitude-input").value);
    const longitude = Number(document.getElementById("longitude-input").value);

    const escapedCountry = escapeSql(country);
    const saveResult = await runQuery(`INSERT INTO Location (Country, Latitude, Longitude) VALUES ('${escapedCountry}', ${latitude}, ${longitude});`);
    if (saveResult?.error) {
        console.error("Location save failed", { saveResult });
        alert("Unable to save location.");
        return;
    }

    const mostRecentLocationResults = await runQuery(`SELECT MAX(LocationID) FROM Location`);
    if (mostRecentLocationResults?.error) {
        console.error("Failed to get location when submitting", { mostRecentLocationResults });
        alert("Unable to complete report submission.");
        return;
    }

    const lastGivenLocation = mostRecentLocationResults.data[0]["MAX(LocationID)"];

    const currentDate = new Date();

    const loggerUsername = sessionStorage.getItem("loggedInUser");
    if (!loggerUsername) {
        alert("You must be logged in to submit a report.");
        return;
    }

    const escapedUsername = escapeSql(loggerUsername);
    const loggerIDQueryResult = await runQuery(`SELECT LoggerID, Username FROM Logger WHERE Username = '${escapedUsername}'`);
    if (loggerIDQueryResult?.error || !loggerIDQueryResult?.success || !Array.isArray(loggerIDQueryResult.data) || loggerIDQueryResult.data.length === 0) {
        console.error("Failed to get user id when submitting", { loggerIDQueryResult });
        alert("Unable to find your account details.");
        return;
    }

    const loggerID = loggerIDQueryResult.data[0].LoggerID;
    const locationID = lastGivenLocation;
    const evidenceID = document.getElementById("evidence-selection").value;
    const reportDate = currentDate.toISOString().substring(0, 10);
    const speciesID = document.getElementById("species-selection").value;
    const description = document.getElementById("description-input").value;

    const escapedDescription = escapeSql(description);
    const insertResult = await runQuery(`INSERT INTO Report (LoggerID, LocationID, EvidenceID, ReportDate, SpeciesID, ReportDescription) VALUES (${loggerID}, ${locationID}, ${evidenceID}, '${reportDate}', ${speciesID}, '${escapedDescription}')`);

    if (insertResult?.error) {
        console.error("Report save failed", { insertResult });
        alert("Unable to save report.");
        return;
    }

    reportForm.reset();

    renderSelections();
});