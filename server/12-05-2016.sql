DELIMITER $$
DROP PROCEDURE IF EXISTS sp_ins_png_usuario_estandar$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ins_png_usuario_estandar`(IN `pusuario` VARCHAR(50), IN `pnombres` VARCHAR(30), IN `papellidos` VARCHAR(30), IN `psexo` CHAR(1), IN `pfechanac` DATE, IN `ppais` INT, IN `pcorreo` VARCHAR(50), IN `pclave` VARCHAR(30), IN `ptelefono` VARCHAR(20))
    NO SQL
INSERT INTO `png_usuario`( `usuario`, `nombres`, `apellidos`,
                          `sexo`, `fecha_nac`, `fecha_crea`, `id_pais`,
                          `email`, `id_tipo`, `clave_acceso`,
                          `foto`, `preferencias`, `telefono`, `estado`)
VALUES (pusuario,pnombres,papellidos,psexo,pfechanac,now(),
        ppais,pcorreo,2,pclave,'','',ptelefono,1)$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_sel_seg_usuario$$
  CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_sel_seg_usuario`(IN `nombreUsuario` VARCHAR(50), IN `password` VARCHAR(30))
      MODIFIES SQL DATA
  SELECT  `id` ,  `usuario` ,  `nombres` ,  `apellidos` ,  `sexo` ,  `fecha_nac` ,  `fecha_crea` ,  `id_pais` ,  `email` ,  `id_tipo` ,  `foto` ,  `preferencias` ,  `ult_fecha_modif` ,  `telefono` ,  `estado`
  FROM  `png_usuario`
  WHERE usuario =  nombreUsuario
  AND clave_acceso = password$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_sel_png_pais$$
CREATE DEFINER =  `root`@`localhost` PROCEDURE  `sp_sel_png_pais` ( ) NOT DETERMINISTIC READS SQL DATA SQL SECURITY DEFINER SELECT *
FROM png_pais$$
DELIMITER ;

INSERT INTO  `png_pais` (  `nombre` ,  `cod_pais` ) VALUES ('Guatemala',  'GT')
INSERT INTO  `png_pais` (  `nombre` ,  `cod_pais` ) VALUES ('El Salvador',  'SV')
INSERT INTO  `png_pais` (  `nombre` ,  `cod_pais` ) VALUES ('Alemania',  'DE')
INSERT INTO `png_estado`(`tabla`, `descripcion`, `id_estado`) VALUES ('png_usuario','Activo', 1)
INSERT INTO `png_estado`(`tabla`, `descripcion`, `id_estado`) VALUES ('png_usuario','Inactivo', 0)
INSERT INTO `png_tipo`(`tabla`, `descripcion`, `id_tipo`) VALUES ('png_usuario','Administrador',1)
INSERT INTO `png_tipo`(`tabla`, `descripcion`, `id_tipo`) VALUES ('png_usuario','Estandar',2)
ALTER TABLE  `png_usuario` CHANGE  `clave_acceso`  `clave_acceso` VARCHAR( 50 ) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL ;
