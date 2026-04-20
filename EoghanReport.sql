CREATE OR REPLACE VIEW v_SpeciesAliveReportQuantity AS 
SELECT s.CommonName AS CommonName, COUNT(r.SpeciesID) AS ReportQuantity, s.SpeciesID AS SpeciesID
            FROM Report r
            JOIN Species s ON r.SpeciesID=s.SpeciesID
            WHERE r.ReportType='Animal Spotting'
            GROUP BY r.SpeciesID;

--Select top animals seen alive
SELECT vrq.CommonName, vrq.ReportQuantity, vrq.SpeciesID
            FROM v_SpeciesAliveReportQuantity vrq
            ORDER BY vrq.ReportQuantity DESC
            LIMIT 10;

--Select animals least seen alive
SELECT vrq.CommonName, vrq.ReportQuantity, vrq.SpeciesID
            FROM v_SpeciesAliveReportQuantity vrq
            ORDER BY vrq.ReportQuantity ASC
            LIMIT 10;