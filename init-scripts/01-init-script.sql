CREATE TABLE airports (
                          ident           varchar(15) NOT NULL,
                          type            varchar(255) NOT NULL,
                          name            varchar(255) NOT NULL,
                          latitude_deg    FLOAT NOT NULL,
                          longitude_deg   FLOAT NOT NULL,
                          municipality    varchar(255),
                          iata_code       varchar(7)
);

COPY airports FROM '/tmp/airports-filtered.csv' WITH CSV DELIMITER '|' QUOTE '"';