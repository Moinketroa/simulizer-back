CREATE TABLE airports
(
    ident         varchar(15)  NOT NULL PRIMARY KEY,
    type          varchar(255) NOT NULL,
    name          varchar(255) NOT NULL,
    latitude_deg  FLOAT        NOT NULL,
    longitude_deg FLOAT        NOT NULL,
    municipality  varchar(255),
    iata_code     varchar(7)
);

COPY airports FROM '/tmp/airports-filtered.csv' WITH CSV DELIMITER '|' QUOTE '"';

CREATE TABLE airport_connections
(
    id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_airport  varchar(15) REFERENCES airports (ident),
    second_airport varchar(15) REFERENCES airports (ident),
    capacity       NUMERIC NOT NULL,
    speed          FLOAT   NOT NULL,
    frequency      FLOAT   NOT NULL,
    loading_time   NUMERIC NOT NULL,
    unloading_time NUMERIC NOT NULL
);

CREATE TABLE travelers
(
    id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    departure_airport   varchar(15) REFERENCES airports (ident),
    destination_airport varchar(15) REFERENCES airports (ident),
    first_name          varchar(255) NOT NULL,
    last_name           varchar(255) NOT NULL,
    created_by          varchar(255) NOT NULL
);

CREATE TABLE travels
(
    id       UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    traveler UUID REFERENCES travelers (id) NOT NULL
);

CREATE TABLE travel_steps
(
    id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    travel_id          UUID REFERENCES travels (id) NOT NULL,
    step_order         INTEGER,
    airport_connection UUID REFERENCES airport_connections (id),
    direction          VARCHAR(31) CHECK (direction IN ('FROM_FIRST_TO_SECOND', 'FROM_SECOND_TO_FIRST'))
);