CREATE TABLE IF NOT EXISTS authors (
	id SERIAL,
	name VARCHAR(100) UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS books (
	id SERIAL,
	title VARCHAR(100),
	author_id INT,
	description VARCHAR(100),
	PRIMARY KEY (id),
	FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT INTO authors (name) VALUES ('Franz Kafka'), ('Pablo Neruda');
INSERT INTO books (title, author_id, description) VALUES
('El Castillo', 1, 'Publicada póstumamente en 1926, se trata de una obra inconclusa que data de 1922'),
('La Peste', 1, 'La historia trata sobre Gregorio Samsa, cuya transformación en un insecto dificulta la comunicación'),
('Veinte Poemas de Amor y Una Canción Desesperada', 2, 'Una de las célebres obras del poeta chileno Pablo Neruda')
