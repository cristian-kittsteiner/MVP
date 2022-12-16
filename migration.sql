DROP TABLE IF EXISTS minions;

CREATE TABLE minions(
    id SERIAL PRIMARY KEY,
    name TEXT,
    owns BOOLEAN,
    location TEXT
)