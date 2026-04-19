// 1: add renderSelections function for trackedAnimalSelection
// 2: add code that changes trackedAnimalStatusRadioGroup to hidden/visible and required/disabled based on trackedAnimalSelection
// 3: add code to insert a new report that has an associated trackedAnimal
// 4: add code that changes the status of the previously mentioned trackedAnimal when the report is submitted
// 5: add page to submit/create new trackedAnimal
// 6: add table to view/edit trackedAnimals

const reportForm = document.getElementById("report-form");

function escapeSql(value) {
    return String(value).replace(/'/g, "''");
}

function renderSpeciesSelection(rows) {
    const speciesSelection = document.getElementById("species-selection");
    speciesSelection.innerHTML = "";

    for (let row of rows) {
        speciesSelection.innerHTML += `<option value="${row.SpeciesID}">${row.CommonName}</option>`;
    }
};

const renderSelections = async () => {
    const speciesResult = await runQuery("SELECT * FROM Species");

    if (speciesResult?.success && Array.isArray(speciesResult.data)) {
        renderSpeciesSelection(speciesResult.data);
    }

    if (speciesResult?.error) {
        console.error("Data load error", {speciesResult});
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

    const mostRecentLocationResults = await runQuery(`SELECT MAX(LocationID) FROM Location;`);
    if (mostRecentLocationResults?.error) {
        console.error("Failed to get location when submitting", { mostRecentLocationResults });
        alert("Unable to complete report submission.");
        return;
    }

    const lastGivenLocation = mostRecentLocationResults.data[0]["MAX(LocationID)"];

    const evidenceFileInput = document.getElementById("evidence-file-input");

    const fileName = evidenceFileInput.value;
    
    const fileExtention = fileName.substring(fileName.lastIndexOf('.')+1, fileName.length);

    let evidenceType = "Sighting";
    switch(fileExtention) {
        case "png" :
        case "jpeg":
        case "jpg":
            evidenceType = "Photographic";
            break;

        case "mp3":
            evidenceType = "Audio";
            break;
        
        case "mp4":
            evidenceType = "Video";
            break;

        case "doc":
        case "docx":
        case "txt":
            evidenceType = "Sighting";
            break;
    }

    const evidenceDescription = document.getElementById("evidence-description-input").value.trim();

    
    const evidenceSaveResult = await runQuery(`INSERT INTO Evidence (Filename, EvidenceType, Description) VALUES ('${fileName}', '${evidenceType}', '${evidenceDescription}');`);
    if (evidenceSaveResult?.error) {
        console.error("Location save failed", { evidenceSaveResult });
        alert("Unable to save evidence.");
        return;
    }

    const mostRecentEvidenceResults = await runQuery(`SELECT MAX(EvidenceID) FROM Evidence;`);
    if (mostRecentEvidenceResults?.error) {
        console.error("Failed to get evidence when submitting", { mostRecentEvidenceResults });
        alert("Unable to complete report submission.");
        return;
    }

    console.log(mostRecentEvidenceResults);

    const lastGivenEvidence = mostRecentEvidenceResults.data[0]["MAX(EvidenceID)"];
    

    const currentDate = new Date();

    const loggerUsername = sessionStorage.getItem("loggedInUser");
    if (!loggerUsername) {
        alert("You must be logged in to submit a report.");
        console.log("Logged in user value: ", sessionStorage.getItem("loggedInUser"))
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
    const evidenceID = lastGivenEvidence;
    const reportDate = currentDate.toISOString().substring(0, 10);
    const speciesID = document.getElementById("species-selection").value;
    const reportType = document.querySelector('input[name="report-type-input"]:checked').value;
    const description = document.getElementById("description-input").value;

    console.log(`loggerID: ${loggerID}, locationID: ${locationID}, evidenceID: ${evidenceID}, reportDate: ${reportDate}, speciesID: ${speciesID}, reportType: ${reportType}, description: ${description}`);


    const escapedDescription = escapeSql(description);
    const insertResult = await runQuery(`INSERT INTO Report (LoggerID, LocationID, EvidenceID, ReportDate, SpeciesID, ReportType, ReportDescription) VALUES (${loggerID}, ${locationID}, ${evidenceID}, '${reportDate}', ${speciesID}, '${reportType}', '${escapedDescription}')`);

    if (insertResult?.error) {
        console.error("Report save failed", { insertResult });
        alert("Unable to save report.");
        return;
    } else if (insertResult?.success) {
        alert("Report submitted successfully");
    } else {
        console.log(insertResult);
        alert("Something went wrong submitting the report");
    }

    reportForm.reset();

    renderSelections();
});