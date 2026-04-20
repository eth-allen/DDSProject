CREATE OR REPLACE VIEW v_SpeciesAliveReportQuantity AS 
SELECT s.CommonName AS CommonName, COUNT(r.SpeciesID) AS ReportQuantity, s.SpeciesID AS SpeciesID
            FROM Report r
            JOIN Species s ON r.SpeciesID=s.SpeciesID
            WHERE r.ReportType='Animal Spotting'
            GROUP BY r.SpeciesID;

CREATE OR REPLACE VIEW v_EvidenceReportTypeAmounts AS
SELECT r.ReportType AS ReportType, e.EvidenceType AS EvidenceType, COUNT(e.EvidenceType) AS EvidenceTypeCount
            FROM Report r 
            JOIN Evidence e ON r.EvidenceID=e.EvidenceID
            GROUP BY r.ReportType, e.EvidenceType;

-- Report Title: Report on Least Reported Species
-- Business Question: Which species get the least reports?
-- Why this report is useful: It is good at informing the public about animals that may be overlooked. It can also show which animals need to most attention in terms of preservation.
-- Tables used: Report, Species
SELECT vrq.CommonName, vrq.ReportQuantity, vrq.SpeciesID
            FROM v_SpeciesAliveReportQuantity vrq
            ORDER BY vrq.ReportQuantity DESC
            LIMIT 10;

-- Report Title: Poaching Evidence Type Distribution Report
-- Business Question: How does the distrubution of evidence types change based on the report type?
-- Why this report is useful: By showing which evidence types are more common among reports specifically about poaching, it can give hints as to how to spot and catch poachers in the future.
-- Tables used: Report, Evidence
SELECT vera.ReportType, vera.EvidenceType, vera.EvidenceTypeCount
            FROM v_EvidenceReportTypeAmounts vera
            WHERE vera.ReportType='Poaching';

-- Report Title: Report Amounts Tracked by Time
-- Business Question: How many reports were submitted each month?
-- Why this report is useful: This is important as it helps track how much the site is being used and might give hints on how to get more people to report the animals and incidents they encounter to us.
-- Tables used: Report, Species
SELECT YEAR(r.ReportDate) AS Year, MONTH(r.ReportDate) AS Month, COUNT(MONTH(r.ReportDate)) AS ReportsPerMonth, COUNT(DISTINCT s.SpeciesID) AS UniqueSpeciesReports
            FROM Report r
            JOIN Species s
            ON r.SpeciesID=s.SpeciesID
            GROUP BY YEAR(r.ReportDate), MONTH(r.ReportDate);