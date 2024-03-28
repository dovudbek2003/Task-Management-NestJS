-- Database
-- CREATE DATABASE task_management;
-- ENUM TYPE
CREATE TYPE role_type AS ENUM ('admin', 'manager', 'worker', 'superAdmin');

CREATE TYPE status_type AS ENUM ('process', 'done', 'took');

-- Tables
-- companies
CREATE TABLE companies(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL UNIQUE
);

-- users
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    login VARCHAR(32) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    full_name VARCHAR(64) NOT NULL,
    company_id INT DEFAULT NULL,
    role role_type NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    last_updated_by INT DEFAULT NULL,
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE
    SET
        NULL,
        CONSTRAINT fk_last_updated_by FOREIGN KEY (last_updated_by) REFERENCES users(id) ON DELETE
    SET
        NULL
);

-- tasks
CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    description TEXT NOT NULL,
    company_id INT NOT NULL,
    parent_id INT DEFAULT NULL,
    day DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    last_updated_by INT DEFAULT NULL,
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE
    SET
        NULL,
        CONSTRAINT fk_last_updated_by FOREIGN KEY (last_updated_by) REFERENCES users(id) ON DELETE
    SET
        NULL
);

-- user_tasks
CREATE TABLE user_tasks(
    id SERIAL PRIMARY KEY,
    user_id INT DEFAULT NULL,
    task_id INT DEFAULT NULL,
    start_at DATE NOT NULL DEFAULT CURRENT_DATE,
    end_at DATE NOT NULL,
    started_date DATE DEFAULT NULL,
    ended_date DATE DEFAULT NULL,
    status status_type NOT NULL DEFAULT 'took',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT NOT NULL,
    last_updated_by INT DEFAULT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE
    SET
        NULL,
        CONSTRAINT fk_task_id FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);