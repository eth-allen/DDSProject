CREATE OR REPLACE VIEW v_SpeciesReportDetail AS
SELECT 
    s.SpeciesID,
    s.Name AS SpeciesName,
    s.Status AS ConservationStatus,
    r.ReportID,
    r.LoggerID,
    r.ReportDate,
    loc.Country,
    e.EvidenceType
FROM 
    Species s
INNER JOIN 
    Report r ON s.SpeciesID = r.SpeciesID
LEFT JOIN 
    Location loc ON r.LocationID = loc.LocationID
LEFT JOIN 
    Evidence e ON r.EvidenceID = e.EvidenceID;


CREATE OR REPLACE VIEW v_LoggerPerformance AS
SELECT 
    l.LoggerID,
    l.Forename,
    l.Surname,
    l.Email,
    COUNT(r.ReportID) AS TotalReports,
    COUNT(DISTINCT r.SpeciesID) AS SpeciesReported,
    COUNT(DISTINCT CASE WHEN s.Status = 'High' THEN r.ReportID END) AS HighPriorityReports,
    COUNT(DISTINCT loc.Country) AS CountriesCovered
FROM 
    Logger l
INNER JOIN 
    Report r ON l.LoggerID = r.LoggerID
INNER JOIN 
    Species s ON r.SpeciesID = s.SpeciesID
LEFT JOIN 
    Location loc ON r.LocationID = loc.LocationID
GROUP BY 
    l.LoggerID, l.Forename, l.Surname, l.Email;




-- REPORT 1: High Priority Species Report
-- BUSINESS QUESTION: Which high-priority  species are being 
-- actively reported, where are they being spotted, 
-- and how many loggers are contributing to their documentation?


SELECT 
    vsd.SpeciesName,
    vsd.ConservationStatus,
    COUNT(vsd.ReportID) AS TotalReports,
    COUNT(DISTINCT vsd.LoggerID) AS ActiveContributors,
    COUNT(DISTINCT vsd.Country) AS CountriesDiversity,
    CONCAT(
        DATE_FORMAT(MIN(vsd.ReportDate), '%d %b %Y'), 
        ' - ', 
        DATE_FORMAT(MAX(vsd.ReportDate), '%d %b %Y')
    ) AS ReportingPeriod,
    GROUP_CONCAT(DISTINCT vsd.EvidenceType ORDER BY vsd.EvidenceType SEPARATOR ', ') AS EvidenceTypesUsed
FROM 
    v_SpeciesReportDetail vsd
WHERE 
    vsd.ConservationStatus = 'High'
GROUP BY 
    vsd.SpeciesID, vsd.SpeciesName, vsd.ConservationStatus
HAVING 
    COUNT(vsd.ReportID) > 0
ORDER BY 
    TotalReports DESC, 
    vsd.SpeciesName ASC
LIMIT 15;



-- REPORT 2: Logger Performance and Geographic Coverage
-- BUSINESS QUESTION: Which loggers are most productive in 2024
-- and how diverse is their reporting?


SELECT 
    CONCAT(UPPER(lp.Surname), ', ', lp.Forename) AS LoggerName,
    lp.Email AS ContactEmail,
    COUNT(r.ReportID) AS TotalReports,
    COUNT(DISTINCT r.SpeciesID) AS UniqueSpeciesReported,
    COUNT(DISTINCT CASE WHEN s.Status = 'High' THEN r.ReportID END) AS HighPriorityReports,
    COUNT(DISTINCT loc.Country) AS CountriesCovered
FROM 
    v_LoggerPerformance lp
INNER JOIN 
    Report r ON lp.LoggerID = r.LoggerID
INNER JOIN 
    Species s ON r.SpeciesID = s.SpeciesID
LEFT JOIN 
    Location loc ON r.LocationID = loc.LocationID
WHERE 
    YEAR(r.ReportDate) = 2024
GROUP BY 
    lp.LoggerID, lp.Surname, lp.Forename, lp.Email
HAVING 
    COUNT(r.ReportID) >= 5
ORDER BY 
    TotalReports DESC,
    HighPriorityReports DESC,
    LoggerName ASC
LIMIT 20;


-- REPORT 3: Geographic Hotspot Analysis by Country 
-- BUSINESS QUESTION: What countries have the most loggers
-- and have a high diversity of species being reported?

SELECT 
    loc.Country,
    COUNT(DISTINCT r.SpeciesID) AS TotalSpeciesDiversity,
    COUNT(DISTINCT r.ReportID) AS TotalObservations,
    COUNT(DISTINCT r.LoggerID) AS TotalContributingLoggers,
    COUNT(DISTINCT 
        CASE 
            WHEN s.Status = 'High' THEN r.SpeciesID 
        END
    ) AS HighPrioritySpeciesCount,
    DATE_FORMAT(MAX(r.ReportDate), '%d %b %Y') AS LastObservationDate
FROM 
    Location loc
INNER JOIN 
    Report r ON loc.LocationID = r.LocationID
INNER JOIN 
    Species s ON r.SpeciesID = s.SpeciesID
GROUP BY 
    loc.Country
HAVING 
    HighPrioritySpeciesCount > 0
ORDER BY 
    HighPrioritySpeciesCount DESC,
    TotalSpeciesDiversity DESC,
    TotalObservations DESC
LIMIT 25;



