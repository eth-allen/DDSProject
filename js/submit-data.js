const reportForm = document.getElementById("report-form");


function renderSpeciesSelection(rows) {
    const speciesSelection = document.getElementById("species-selection");
    speciesSelection.innerHTML = "";

    for (let row of rows) {
        speciesSelection.innerHTML += `<option value="${row.SpeciesID}">${row.CommonName}</option>`;
    }
};

function renderTrackedAnimalSelection(rows) {
    const trackedAnimalSelection = document.getElementById("tracked-animal-selection");

    for (let row of rows) {
        trackedAnimalSelection.innerHTML += `<option value="${row.AnimalID}">${row.Name}, ${row.CommonName} (ID: ${row.AnimalID})</option>`;
    }
};

const renderSelections = async () => {
    const speciesResult = await runQuery("SELECT * FROM Species");
    const trackedAnimalResult = await runQuery("SELECT Tracked_Animal.AnimalID, Tracked_Animal.Name, Species.CommonName FROM Tracked_Animal INNER JOIN Species ON Tracked_Animal.SpeciesID=Species.SpeciesID WHERE NOT Tracked_Animal.Status='Dead';");

    if (speciesResult?.success && Array.isArray(speciesResult.data)) {
        renderSpeciesSelection(speciesResult.data);
    }

    if (trackedAnimalResult?.success && Array.isArray(trackedAnimalResult.data)) {
        renderTrackedAnimalSelection(trackedAnimalResult.data);
    }

    if (speciesResult?.error || trackedAnimalResult?.error) {
        console.error("Data load error", {speciesResult, trackedAnimalResult});
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

    const escapedCountry = escapeSql(country);
    const saveResult = await runQuery(`INSERT INTO Location (Country) VALUES ('${escapedCountry}');`);
    if (saveResult?.error) {
        console.error("Location save failed", { saveResult });
        showAlert("Unable to save location.", true);
        return;
    }

    const mostRecentLocationResults = await runQuery(`SELECT MAX(LocationID) FROM Location;`);
    if (mostRecentLocationResults?.error) {
        console.error("Failed to get location when submitting", { mostRecentLocationResults });
        showAlert("Unable to complete report submission.", true);
        return;
    }

    const lastGivenLocation = mostRecentLocationResults.data[0]["MAX(LocationID)"];

    const evidenceType = document.getElementById("evidence-type-selection").value;
    const evidenceDescription = document.getElementById("evidence-description-input").value.trim();
    const escapedEvidenceDescription = escapeSql(evidenceDescription);
    
    const evidenceSaveResult = await runQuery(`INSERT INTO Evidence (EvidenceType, Description) VALUES ('${evidenceType}', '${escapedEvidenceDescription}');`);
    if (evidenceSaveResult?.error) {
        console.error("Location save failed", { evidenceSaveResult });
        showAlert("Unable to save evidence.", true);
        return;
    }

    const mostRecentEvidenceResults = await runQuery(`SELECT MAX(EvidenceID) FROM Evidence;`);
    if (mostRecentEvidenceResults?.error) {
        console.error("Failed to get evidence when submitting", { mostRecentEvidenceResults });
        showAlert("Unable to complete report submission.", true);
        return;
    }

    console.log(mostRecentEvidenceResults);

    const lastGivenEvidence = mostRecentEvidenceResults.data[0]["MAX(EvidenceID)"];
    

    const currentDate = new Date();

    let storedLoggerID = sessionStorage.getItem("loggerID");
    if(storedLoggerID === "" || storedLoggerID === null) {
        showAlert("Cannot submit report because you are not logged into an account!", true);
        return;
    } else {
        storedLoggerID = escapeSql(storedLoggerID);
    }

    const loggerID = storedLoggerID;
    const locationID = lastGivenLocation;
    const evidenceID = lastGivenEvidence;
    const reportDate = currentDate.toISOString().substring(0, 10);
    const speciesID = document.getElementById("species-selection").value;
    const reportType = document.querySelector('input[name="report-type-input"]:checked').value;
    const description = document.getElementById("description-input").value;
    const isTrackedAnimal = document.querySelector('input[name="tracked-animal-question"]:checked').value === "yes";
    const isActionRequired = document.querySelector('input[name="report-action-question"]:checked').value === "yes";
    
    let animalID = null;
    
    if (isTrackedAnimal) {
        const isNewTrackedAnimal = document.querySelector('input[name="new-tracked-animal-question"]:checked').value === "new";

        if (isNewTrackedAnimal) {
            const animalName = document.getElementById("tracked-animal-name").value.trim();
            if (!animalName || !isValidAnimalOrSpeciesName(animalName)) {
                showAlert("Please enter a valid animal name.", true);
                return;
            }
            
            const animalBirthday = document.getElementById("tracked-animal-birthday").value;
            
            const escapedAnimalName = escapeSql(animalName);
            
            const insertAnimalResult = await runQuery(`INSERT INTO Tracked_Animal (SpeciesID, Name, BirthDate, Status) VALUES (${speciesID}, '${escapedAnimalName}', ${animalBirthday ? `'${animalBirthday}'` : 'NULL'}, 'Alive')`);
            
            if (insertAnimalResult?.error) {
                console.error("Animal save failed", { insertAnimalResult });
                showAlert("Unable to save animal.", true);
                return;
            }
            
            const mostRecentAnimalResults = await runQuery(`SELECT MAX(AnimalID) FROM Tracked_Animal;`);
            if (mostRecentAnimalResults?.error) {
                console.error("Failed to get animal when submitting", { mostRecentAnimalResults });
                showAlert("Unable to complete report submission.", true);
                return;
            }
            
            animalID = mostRecentAnimalResults.data[0]["MAX(AnimalID)"];
        }
        else {
            animalID = document.getElementById("tracked-animal-selection").value;
        }
    }
    
    // -- If report is type 'action required' 
    let escapedUrgency = "NULL";
    let escapedIssue = "NULL";
    
    if(isActionRequired) {
        // Gets visual elements to show invalid fields by ID
        document.getElementById("species-selection").value;
        document.getElementById("species-selection").value;

        // Gets input elements by id
        const reportUrgency = document.getElementById("urgency-type-selection").value;
        const issue = document.getElementById("issue-input").value.trim();

        // Validates urgency given
        const validUrgencies = ["Low", "Medium", "High", "Critical"];

        if(!reportUrgency || !(validUrgencies.includes(reportUrgency))) {
            showAlert("Report submission failed. Report urgency given is not valid!", true);
            return; 
        }

        // Valides issue given is within length
        if(issue !== "" && issue.length > 255) {
            showAlert("Report submission failed. Given issue length exceeds max length of 255!", true);
            return;
        }

        escapedUrgency = `'${escapeSql(reportUrgency)}'`;
        escapedIssue = issue !== "" ? `'${escapeSql(issue)}'` : "NULL";
    }

    console.log(`loggerID: ${loggerID}, locationID: ${locationID}, evidenceID: ${evidenceID}, reportDate: ${reportDate}, speciesID: ${speciesID}, reportType: ${reportType}, description: ${description}`);

    const escapedReportDescription = escapeSql(description);

    if (!animalID) {
        const insertResult = await runQuery(`INSERT INTO Report (LoggerID, LocationID, EvidenceID, ReportDate, SpeciesID, ReportType, ReportDescription, UrgencyLevel, IssueObserved) VALUES (${loggerID}, ${locationID}, ${evidenceID}, '${reportDate}', ${speciesID}, '${reportType}', '${escapedReportDescription}', ${escapedUrgency}, ${escapedIssue})`);
        if (insertResult?.error) {
            console.error("Report save failed", { insertResult });
            showAlert("Unable to save report.", true);
            return;
        } 
        else if (insertResult?.success) {
            showAlert("Report submitted successfully", false);
        } 
        else {
            console.log(insertResult);
            showAlert("Something went wrong submitting the report", true);
        }
    }
    else {
        const insertResult = await runQuery(`INSERT INTO Report (LoggerID, LocationID, EvidenceID, ReportDate, SpeciesID, AnimalID, ReportType, ReportDescription, UrgencyLevel, IssueObserved) VALUES (${loggerID}, ${locationID}, ${evidenceID}, '${reportDate}', ${speciesID}, ${animalID}, '${reportType}', '${escapedReportDescription}', ${escapedUrgency}, ${escapedIssue})`);

        if (insertResult?.error) {
            console.error("Report save failed", { insertResult });
            showAlert("Unable to save report.", true);
            return;
        } 
        else if (insertResult?.success) {
            showAlert("Report submitted successfully", false);
        } 
        else {
            console.log(insertResult);
            showAlert("Something went wrong submitting the report", true);
        }
    }

    reportForm.reset();

    renderSelections();
});

// Add a species form
const speciesForm = document.getElementById("species-form");

speciesForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const scientificNameInput = document.getElementById("species-scientific-name-input"); 
    const commonNameInput = document.getElementById("species-common-name-input"); 
    const scientificNameConstraints = document.getElementById("scientificNameConstraints"); 
    const commonNameConstraints = document.getElementById("commonNameConstraints"); 

    const scientificName = scientificNameInput.value.trim();
    const commonName = commonNameInput.value.trim();
    const conservationStatus = document.getElementById("species-conservation-status-input").value;
    
    const escapedScientificName = escapeSql(scientificName);
    const escapedCommonName = escapeSql(commonName);
    const escapedConservationStatus = escapeSql(conservationStatus);
    
    commonNameInput.style.border = "";
    scientificNameInput.style.border = "";
    scientificNameConstraints.style.color = ""; 
    commonNameConstraints.style.color = "";     
    
    // Actually validates the users input 
    let isValid = true;

    if(!isValidAnimalOrSpeciesName(escapedScientificName)) {
        isValid = false;
        console.log("escapedScientificName is invalid. escapedScientificName: " + escapedScientificName);
        scientificNameInput.style.border = "2px solid red";
        scientificNameConstraints.style.color = "red";
    }
    
    if(!isValidAnimalOrSpeciesName(escapedCommonName)) {
        isValid = false;
        console.log("escapedCommonName is invalid. escapedCommonName: " + escapedCommonName);
        commonNameInput.style.border = "2px solid red"; 
        commonNameConstraints.style.color = "red";
    }
    if(isValid) {
        const insertResult = await runQuery(`INSERT INTO Species (ScientificName, CommonName, ConservationStatus) VALUES ('${escapedScientificName}', '${escapedCommonName}', '${escapedConservationStatus}')`);

        if (insertResult?.error) {
            console.error("Species save failed", { insertResult });
            showAlert("Unable to save species.", true);
            return;
        }
        else if (insertResult?.success) {
            showAlert("Species added successfully", false);
            speciesForm.reset();
            renderSelections();
        }
        else {
            console.log(insertResult);
            showAlert("Something went wrong adding the species", true);
        }
    } else {
        showAlert("Unable to save species. One or more of submitted names is invalid", true);
    }
});