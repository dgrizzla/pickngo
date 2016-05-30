DELIMITER $$
DROP PROCEDURE IF EXISTS sp_sel_seg_usuario$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_sel_seg_usuario`(IN `nombreUsuario` VARCHAR(50))
    MODIFIES SQL DATA
SELECT  `id` , `clave_acceso`, `usuario` ,  `nombres` ,  `apellidos` ,  `sexo` ,  `fecha_nac` ,  `fecha_crea` ,  `id_pais` ,  `email` ,  `id_tipo` ,  `foto` ,  `preferencias` ,  `ult_fecha_modif` ,  `telefono` ,  `estado`
  FROM  `png_usuario`
  WHERE usuario =  nombreUsuario$$
DELIMITER ;

