-- =============================================================
-- WILDLIFE REPORTING SYSTEM — BUSINESS SQL REPORTS
-- =============================================================

-- PLACEHOLDER REPORTS FOR HOMEPAGE DASHBOARD 

-- =============================================================
-- REPORT 1: High-Risk Species Sighting Summary by Country
-- =============================================================


-- View: Aggregates high-status species sightings per country
CREATE OR REPLACE VIEW vw_high_status_sightings AS
SELECT
    lo.Country,
    sp.Name                             AS SpeciesName,
    sp.Status                           AS ConservationStatus,
    ev.EvidenceType,
    r.ReportDate,
    CONCAT(lg.Forename, ' ', lg.Surname) AS LoggerName
FROM Report r
INNER JOIN Location lo  ON r.LocationID  = lo.LocationID
INNER JOIN Species  sp  ON r.SpeciesID   = sp.SpeciesID
INNER JOIN Evidence ev  ON r.EvidenceID  = ev.EvidenceID
INNER JOIN Logger   lg  ON r.LoggerID    = lg.LoggerID
WHERE sp.Status = 'High';

-- Report query against the view
SELECT
    Country,
    COUNT(*)                                        AS TotalHighStatusSightings,
    COUNT(DISTINCT SpeciesName)                     AS UniqueHighStatusSpecies,
    -- Most frequently used evidence type per country
    -- (outer GROUP BY country, then sorted within)
    GROUP_CONCAT(
        DISTINCT EvidenceType
        ORDER BY EvidenceType
        SEPARATOR ' | '
    )                                               AS EvidenceTypesUsed,
    MIN(ReportDate)                                 AS EarliestReport,
    MAX(ReportDate)                                 AS LatestReport,
    -- Span in days between first and last report for the country
    DATEDIFF(MAX(ReportDate), MIN(ReportDate))      AS SurveySpanDays
FROM vw_high_status_sightings
GROUP BY Country
HAVING COUNT(*) >= 2                   -- Only countries with meaningful volume
ORDER BY TotalHighStatusSightings DESC
LIMIT 10;


-- =============================================================
-- REPORT 2: Logger Activity & Evidence Contribution Audit
-- =============================================================


-- View: Joins loggers to their reports (including those with none)
CREATE OR REPLACE VIEW vw_logger_activity AS
SELECT
    lg.LoggerID,
    CONCAT(lg.Forename, ' ', lg.Surname)    AS LoggerName,
    lg.Email,
    r.ReportID,
    r.ReportDate,
    sp.Status                               AS SpeciesConservationStatus,
    ev.EvidenceType
FROM Logger lg
LEFT JOIN Report   r   ON lg.LoggerID   = r.LoggerID
LEFT JOIN Species  sp  ON r.SpeciesID   = sp.SpeciesID
LEFT JOIN Evidence ev  ON r.EvidenceID  = ev.EvidenceID;

-- Report query against the view
SELECT
    LoggerID,
    LoggerName,
    Email,
    COUNT(ReportID)                         AS TotalReports,
    -- Null reports mean the logger has never submitted
    CASE
        WHEN COUNT(ReportID) = 0 THEN 'Inactive'
        WHEN COUNT(ReportID) BETWEEN 1 AND 4 THEN 'Low Activity'
        WHEN COUNT(ReportID) BETWEEN 5 AND 9 THEN 'Moderate Activity'
        ELSE 'High Activity'
    END                                     AS ActivityBand,
    COUNT(DISTINCT EvidenceType)            AS EvidenceTypeDiversity,
    -- Proportion of this logger's reports that concern high-risk species
    ROUND(
        100.0 * SUM(CASE WHEN SpeciesConservationStatus = 'High' THEN 1 ELSE 0 END)
        / NULLIF(COUNT(ReportID), 0),
        1
    )                                       AS PctHighStatusReports,
    MIN(ReportDate)                         AS FirstReportDate,
    MAX(ReportDate)                         AS LastReportDate
FROM vw_logger_activity
GROUP BY LoggerID, LoggerName, Email
ORDER BY TotalReports DESC, LoggerName ASC;


-- =============================================================
-- REPORT 3: Monthly Sighting Trends with Rolling Species Diversity
-- =============================================================


-- View: Extracts time dimensions and species risk from each report
CREATE OR REPLACE VIEW vw_monthly_trends AS
SELECT
    r.ReportID,
    YEAR(r.ReportDate)                          AS ReportYear,
    MONTH(r.ReportDate)                         AS ReportMonth,
    -- Full month label for readability in output
    DATE_FORMAT(r.ReportDate, '%Y-%m')          AS YearMonth,
    sp.SpeciesID,
    sp.Name                                     AS SpeciesName,
    sp.Status                                   AS ConservationStatus,
    lo.Country,
    ev.EvidenceType
FROM Report r
INNER JOIN Species  sp ON r.SpeciesID  = sp.SpeciesID
INNER JOIN Location lo ON r.LocationID = lo.LocationID
INNER JOIN Evidence ev ON r.EvidenceID = ev.EvidenceID;

-- Report query against the view
SELECT
    YearMonth,
    COUNT(ReportID)                                 AS TotalReports,
    COUNT(DISTINCT SpeciesID)                       AS UniqueSpeciesRecorded,
    COUNT(DISTINCT Country)                         AS CountriesCovered,
    -- Absolute count of high-risk records that month
    SUM(CASE WHEN ConservationStatus = 'High'   THEN 1 ELSE 0 END) AS HighRiskSightings,
    SUM(CASE WHEN ConservationStatus = 'Medium' THEN 1 ELSE 0 END) AS MediumRiskSightings,
    SUM(CASE WHEN ConservationStatus = 'Low'    THEN 1 ELSE 0 END) AS LowRiskSightings,
    -- Percentage of that month's reports that are high-risk
    ROUND(
        100.0 * SUM(CASE WHEN ConservationStatus = 'High' THEN 1 ELSE 0 END)
        / COUNT(ReportID),
        1
    )                                               AS PctHighRisk,
    -- Most common evidence type for the month
    (
        SELECT EvidenceType
        FROM vw_monthly_trends inner_v
        WHERE inner_v.YearMonth = outer_v.YearMonth
        GROUP BY EvidenceType
        ORDER BY COUNT(*) DESC
        LIMIT 1
    )                                               AS DominantEvidenceType
FROM vw_monthly_trends outer_v
WHERE ReportYear BETWEEN 2023 AND 2025   -- Constrain to relevant reporting window
GROUP BY YearMonth
HAVING COUNT(ReportID) >= 1
ORDER BY YearMonth ASC;
