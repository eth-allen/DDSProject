SELECT Species.CommonName, COUNT(Report.SpeciesID)
            FROM Report
            JOIN Species ON Report.SpeciesID=Species.SpeciesID
            WHERE Report.ReportType='Animal Spotting'
            GROUP BY Report.SpeciesID
            ORDER BY COUNT(Report.SpeciesID) DESC
            LIMIT 10;