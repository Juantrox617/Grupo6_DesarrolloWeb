delimiter $$
DROP procedure if exists GetAllCatedraticos $$
CREATE procedure GetAllCatedraticos ()
BEGIN
	SELECT * FROM catedratico;
END $$

DROP procedure if exists GetAllUsers $$
CREATE procedure GetAllUsers ()
BEGIN
	SELECT * FROM usuario;
END $$

DROP procedure if exists GetAllCourse $$
CREATE procedure GetAllCourse ()
BEGIN
	SELECT * FROM curso;
END $$

DROP procedure if exists GetAllAsign $$
CREATE procedure GetAllAsign ()
BEGIN
	SELECT a.id,a.hora_asignado,a.usu_carnet,c.codigo,c.creditos,c.nombre,c.seccion
	FROM asignacion a
	INNER JOIN curso c on a.cur_id=c.id;
END $$

DROP procedure if exists GetAllAprobe $$
CREATE procedure GetAllAprobe ()
BEGIN
	SELECT a.id,a.hora_aprobado,a.usu_carnet,c.codigo,c.creditos,c.nombre,c.seccion
	FROM aprobado a
	INNER JOIN curso c on a.cur_id=c.id;
END $$

DROP procedure if exists GetAllPublish $$
CREATE procedure GetAllPublish ()
BEGIN
	SELECT * FROM publicacion;
END $$

DROP procedure if exists GetAllComment $$
CREATE procedure GetAllComment ()
BEGIN
	SELECT * FROM comentario;
END $$

DROP procedure if exists GetKeyUser $$
CREATE procedure GetKeyUser (
	IN p_carnet	INT
)
BEGIN
	SELECT * FROM usuario
	WHERE carnet = p_carnet;
END $$

DROP procedure if exists GetKeyCatedratico $$
CREATE procedure GetKeyCatedratico (
	IN p_id	INT
)
BEGIN
	SELECT * FROM catedratico
	WHERE id = p_id;
END $$

DROP procedure if exists GetKeyCourse $$
CREATE procedure GetKeyCourse (
	IN p_id	INT
)
BEGIN
	SELECT * FROM curso
	WHERE id = p_id;
END $$

DROP procedure if exists GetKeyAsign $$
CREATE procedure GetKeyAsign (
	in p_id INT
	)
BEGIN
	SELECT a.id,a.hora_asignado,a.usu_carnet,c.codigo,c.creditos,c.nombre,c.seccion
	FROM asignacion a
	INNER JOIN curso c on a.cur_id=c.id
	WHERE a.id=p_id;
END $$

DROP procedure if exists GetKeyAprobe $$
CREATE procedure GetKeyAprobe (
	in p_id INT
	)
BEGIN
	SELECT a.id,a.hora_aprobado,a.usu_carnet,c.codigo,c.creditos,c.nombre,c.seccion
	FROM aprobado a
	INNER JOIN curso c on a.cur_id=c.id
	WHERE a.id=p_id;
END $$

DROP procedure if exists GetKeyPublish $$
CREATE procedure GetKeyPublish (
	IN p_id	INT
)
BEGIN
	SELECT * FROM publicacion
	WHERE id = p_id;
END $$

DROP procedure if exists GetKeyComment $$
CREATE procedure GetKeyComment (
	IN p_id	INT
)
BEGIN
	SELECT * FROM comentario
	WHERE id = p_id;
END $$

DROP procedure if exists CreateUser $$
CREATE procedure CreateUser (
	IN p_carnet INT,
	IN p_nombres VARCHAR (50),
	IN p_apellidos VARCHAR(50),
	IN p_contrasena VARCHAR(50),
	IN p_correo VARCHAR(50)
)
BEGIN
	INSERT INTO usuario (carnet,nombres,apellidos,contrasena,correo) values 
	(p_carnet,p_nombres,p_apellidos,p_contrasena,p_correo);
END $$

DROP procedure if exists CreatePublish $$
CREATE procedure CreatePublish (
	p_titulo VARCHAR(100),
	p_mensaje VARCHAR(500),
	p_usu_carnet INT,
	p_cur_id INT,
	p_cat_id INT
)
BEGIN
	INSERT INTO publicacion (titulo,mensaje,usu_carnet,cur_id,cat_id) values 
	(p_titulo,p_mensaje,p_usu_carnet,p_cur_id,p_cat_id);
END $$

DROP procedure if exists UpdateUser $$
CREATE procedure UpdateUser (
	IN p_carnet INT,
	IN p_nombres VARCHAR (50),
	IN p_apellidos VARCHAR(50),
	IN p_contrasena VARCHAR(50),
	IN p_correo VARCHAR(50)
)
BEGIN
	UPDATE usuario 
	SET 
		nombres=p_nombres,
		apellidos=p_apellidos,
		contrasena=p_contrasena,
		correo=p_correo
	WHERE carnet=p_carnet;
END $$


DROP procedure if exists GetPostComment $$
CREATE procedure GetPostComment (
	IN p_pub_id INT
)
BEGIN
	SELECT * FROM comentario
	WHERE pub_id = p_pub_id;
END $$

DROP procedure if exists CreateComment $$
CREATE procedure CreateComment (
	p_mensaje VARCHAR(500),
	p_usu_carnet INT,
	p_pub_id INT
)
BEGIN
	INSERT INTO comentario (mensaje,usu_carnet,pub_id) values 
	(p_mensaje,p_usu_carnet,p_pub_id);
END $$

DROP procedure if exists GetCatedraticoByName $$
CREATE procedure GetCatedraticoByName (
	IN p_nombre VARCHAR(50)
)
BEGIN
	SELECT * FROM catedratico
	WHERE nombre = p_nombre;
END $$

DROP procedure if exists GetCursoByName $$
CREATE procedure GetCursoByName (
	IN p_nombre VARCHAR(50)
)
BEGIN
	SELECT * FROM curso
	WHERE nombre = p_nombre;
END $$

DROP procedure if exists GetAsignByCarnet $$
CREATE procedure GetAsignByCarnet (
	in p_carnet INT
	)
BEGIN
	SELECT a.id,a.hora_asignado,a.usu_carnet,c.codigo,c.creditos,c.nombre,c.seccion
	FROM asignacion a
	INNER JOIN curso c on a.cur_id=c.id
	WHERE a.usu_carnet=p_carnet;
END $$

DROP procedure if exists CreateAsign $$
CREATE procedure CreateAsign (
	p_cur_id INT,
	p_usu_carnet INT
)
BEGIN
	INSERT INTO asignacion (cur_id,usu_carnet) values 
	(p_cur_id,p_usu_carnet);
END $$

DROP procedure if exists DeleteAsign $$
CREATE procedure DeleteAsign (
	p_id INT
)
BEGIN
	DELETE FROM asignacion
	WHERE id=p_id;
END $$

DROP procedure if exists GetAprobeByCarnet $$
CREATE procedure GetAprobeByCarnet (
	in p_carnet INT
	)
BEGIN
	SELECT a.id,a.hora_aprobado,a.usu_carnet,c.codigo,c.creditos,c.nombre,c.seccion
	FROM aprobado a
	INNER JOIN curso c on a.cur_id=c.id
	WHERE a.usu_carnet=p_carnet;
END $$

DROP procedure if exists FilterPostsByCourse $$
CREATE procedure FilterPostsByCourse (
	IN p_cur_codigo INT
)
BEGIN
	SELECT p.id,p.titulo,p.hora_creado,p.mensaje,p.usu_carnet,p.cur_id,p.cat_id
	FROM publicacion p
	INNER JOIN curso c on p.cur_id=c.id
	WHERE c.id=p_cur_codigo;
END $$

DROP procedure if exists FilterPostsByTeacher $$
CREATE procedure FilterPostsByTeacher (
	IN p_cat_id INT
)
BEGIN
	SELECT * FROM publicacion 
	WHERE cat_id = p_cat_id;
END $$

DROP procedure if exists FilterPostsByCourseName $$
CREATE procedure FilterPostsByCourseName (
	IN p_cur_nombre VARCHAR(50)
)
BEGIN
	SELECT p.id,p.titulo,p.hora_creado,p.mensaje,p.usu_carnet,p.cur_id,p.cat_id
	FROM publicacion p
	INNER JOIN curso c on p.cur_id=c.id
	WHERE c.nombre=p_cur_nombre;
END $$

DROP procedure if exists FilterPostsByTeacherName $$
CREATE procedure FilterPostsByTeacherName (
	IN p_cat_nombre VARCHAR(50)
)
BEGIN
	SELECT p.id,p.titulo,p.hora_creado,p.mensaje,p.usu_carnet,p.cur_id,p.cat_id
	FROM publicacion p
	INNER JOIN catedratico c on p.cat_id=c.id
	WHERE c.nombre=p_cat_nombre;
END $$

delimiter ;