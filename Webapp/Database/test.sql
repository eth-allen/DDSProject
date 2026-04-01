-- Test data for Endangered Species Tracker

-- Insert Logger data
INSERT INTO Logger (Forename, Surname, Email) VALUES
('John', 'Smith', 'john.smith@example.com'),
('Sarah', 'Johnson', 'sarah.johnson@example.com'),
('Michael', 'Williams', 'michael.williams@example.com');

-- Insert Location data
INSERT INTO Location (Country, Latitude, Longitude) VALUES
('Brazil', -23.550520, -46.633309),
('Kenya', -1.286389, 36.817223),
('Indonesia', -6.200000, 106.816666),
('India', 28.704060, 77.102493),
('Madagascar', -18.879109, 47.507620);

-- Insert Evidence data
INSERT INTO Evidence (EvidenceType, Description) VALUES
('Sighting', 'Direct observation of animal in natural habitat'),
('Track', 'Footprints or paw marks found'),
('Droppings', 'Animal feces collected for analysis'),
('Hair', 'Hair samples collected from environment'),
('Sound', 'Audio recording of animal calls');

-- Insert Species data
INSERT INTO Species (Name, Status) VALUES
('Amazon River Dolphin', 'High'),
('Black Rhino', 'High'),
('Mountain Gorilla', 'High'),
('Bengal Tiger', 'Medium'),
('African Elephant', 'Low');

-- Insert Report data
INSERT INTO Report (LoggerID, LocationID, EvidenceID, ReportDate, ReportDescription) VALUES
(1, 1, 1, '2025-03-15', 'Observed pink river dolphin near river bank'),
(2, 2, 2, '2025-03-18', 'Found fresh black rhino tracks in savanna'),
(3, 3, 3, '2025-03-20', 'Collected droppings for genetic analysis'),
(1, 4, 5, '2025-03-22', 'Recorded tiger calls at night'),
(2, 5, 1, '2025-03-25', 'Spotted lemur troop in forest canopy');
