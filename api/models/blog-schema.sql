DROP DATABASE IF EXISTS Blog;
CREATE SCHEMA Blog;
USE Blog;


CREATE TABLE users (
	id INTEGER NOT NULL AUTO_INCREMENT,
    username VARCHAR(45) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    img VARCHAR(255),
    PRIMARY KEY (id)
);


CREATE TABLE posts (
	id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    img VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    category VARCHAR(25) NOT NULL,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    INDEX user_id_idx (user_id ASC) VISIBLE,
    CONSTRAINT user_id
		FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- For-> Error: ER_ACCESS_DENIED_ERROR: Access denied for user ''@'localhost' (using password: NO)
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Blog@1234';