CREATE TABLE Logger (
    LoggerID  INT           AUTO_INCREMENT PRIMARY KEY,
    Forename  VARCHAR(50)   NOT NULL,
    Surname   VARCHAR(50)   NOT NULL,
    Email     VARCHAR(255)  NOT NULL UNIQUE
);

CREATE TABLE Location (
    LocationID  INT           AUTO_INCREMENT PRIMARY KEY,
    Country     VARCHAR(50)   NOT NULL,
    Latitude    DECIMAL(9,6)  NOT NULL,
    Longitude   DECIMAL(9,6)  NOT NULL
);

CREATE TABLE Evidence (
    EvidenceID    INT           AUTO_INCREMENT PRIMARY KEY,
    EvidenceType  VARCHAR(50)   NOT NULL,
    Description   VARCHAR(255)  NOT NULL
);

CREATE TABLE Species (
    SpeciesID  INT                                    AUTO_INCREMENT PRIMARY KEY,
    Name       VARCHAR(100)                          NOT NULL,
    Status     ENUM('Low', 'Medium', 'High')        NOT NULL
);

CREATE TABLE Report (
    ReportID           INT                                                AUTO_INCREMENT PRIMARY KEY,
    LoggerID           INT                                                NOT NULL,
    LocationID         INT                                                NOT NULL,
    EvidenceID         INT                                                NOT NULL,
    ReportDate         DATE                                               NOT NULL,
    SpeciesID          INT                                                NOT NULL,
    ReportType         ENUM('Image', 'Video', 'Audio', 'Documentation')   NOT NULL DEFAULT 'Documentation',
    ReportDescription  VARCHAR(255)                                   NOT NULL,
    FOREIGN KEY (LoggerID)    REFERENCES Logger(LoggerID),
    FOREIGN KEY (LocationID)  REFERENCES Location(LocationID),
    FOREIGN KEY (EvidenceID)  REFERENCES Evidence(EvidenceID),
    FOREIGN KEY (SpeciesID)   REFERENCES Species(SpeciesID)
);