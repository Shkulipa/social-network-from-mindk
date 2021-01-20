CREATE DATABASE test1;

CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name_user VARCHAR(255),
    email_user VARCHAR(255),
    password_user VARCHAR(255)
);