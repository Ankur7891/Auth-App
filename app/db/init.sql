CREATE TABLE users (
    username TEXT PRIMARY KEY NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
