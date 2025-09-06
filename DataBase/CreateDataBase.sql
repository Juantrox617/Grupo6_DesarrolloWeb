DROP database if exists foro;
CREATE database foro;
use foro;

CREATE TABLE catedratico (
	id INT NOT NULL auto_increment, 
	nombre VARCHAR (50),
	PRIMARY KEY (id)
	);
	
CREATE TABLE curso(
	id INT NOT NULL auto_increment,
	codigo INT NOT NULL,
	creditos INT,
	nombre VARCHAR (50),
	seccion VARCHAR (50),
	cat_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (cat_id) references catedratico(id)
	);

CREATE TABLE usuario(
	carnet INT NOT NULL,
	nombres VARCHAR (50),
	apellidos VARCHAR(50),
	contrasena VARCHAR(50),
	correo VARCHAR(50),
	PRIMARY KEY(carnet)
	);

CREATE TABLE asignacion(
	id INT NOT NULL auto_increment,
	hora_asignado TIMESTAMP default current_TIMESTAMP,
	cur_id INT,
	usu_carnet INT,
	PRIMARY KEY (id),
	FOREIGN KEY (cur_id) references curso(id),
	FOREIGN KEY (usu_carnet) references usuario(carnet)
	);

CREATE TABLE aprobado(
	id INT NOT NULL auto_increment,
	hora_aprobado TIMESTAMP default current_TIMESTAMP,
	usu_carnet INT,
	cur_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (usu_carnet) references usuario(carnet),
	FOREIGN KEY (cur_id) references curso(id)
	);

CREATE TABLE publicacion(
	id INT NOT NULL auto_increment,
	titulo VARCHAR(100),
	hora_creado TIMESTAMP default current_TIMESTAMP,
	mensaje VARCHAR(500),
	usu_carnet INT,
	cur_id INT,
	cat_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (usu_carnet) references usuario(carnet),
	FOREIGN KEY (cur_id) references curso(id),
	FOREIGN KEY (cat_id) references catedratico(id)
	);

CREATE TABLE comentario(
	id INT NOT NULL auto_increment,
	mensaje VARCHAR(500),
	usu_carnet INT,
	pub_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (usu_carnet) references usuario(carnet),
	FOREIGN KEY (pub_id) references publicacion(id)
	);