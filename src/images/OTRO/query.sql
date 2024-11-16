




-- bd_next.tbl2_fases_prod_acabados definition

CREATE TABLE `tbl2_fases_prod_acabados` (
  `idx` int(6) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_cab_orden` int(6) unsigned zerofill DEFAULT NULL,
  `responsable_acabados` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `precio_acabados` float DEFAULT NULL,
  `fec_salida_acabados` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_salida_acabados` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_salida_acabados` int(8) unsigned DEFAULT NULL,
  `fec_ingreso_acabados` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso_acabados` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_ingreso_acabados` int(8) unsigned DEFAULT NULL,
  `fec_ingreso_acabados2` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso_acabados2` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_ingreso_acabados2` int(8) unsigned DEFAULT NULL,
  `fec_ingreso_acabados3` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso_acabados3` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_ingreso_acabados3` int(8) unsigned DEFAULT NULL,
  `fec_termino_acabados` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fallas_acabados` int(6) unsigned DEFAULT NULL,
  `fallas_tela_acabados` int(6) unsigned DEFAULT NULL,
  `piezas_incomp_acabados` int(6) unsigned DEFAULT NULL,
  `auditoria_acabados` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `estado_acabados` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `observaciones_fase_acabados` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci COMMENT='tabla de registro de ordenes de produccion';

-- bd_next.tbl2_fases_prod_bordado definition

CREATE TABLE `tbl2_fases_prod_bordado` (
  `idx` int(6) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_cab_orden` int(6) unsigned zerofill DEFAULT NULL,
  `responsable_bordado` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `precio_bordado` float DEFAULT NULL,
  `fec_salida_bordado` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_salida_bordado` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_salida_bordado` int(8) unsigned DEFAULT NULL,
  `fec_ingreso_bordado` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso_bordado` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_ingreso_bordado` int(8) unsigned DEFAULT NULL,
  `fec_ingreso_bordado2` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso_bordado2` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_ingreso_bordado2` int(8) unsigned DEFAULT NULL,
  `fec_ingreso_bordado3` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso_bordado3` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_ingreso_bordado3` int(8) unsigned DEFAULT NULL,
  `fec_termino_bordado` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fallas_bordado` int(6) unsigned DEFAULT NULL,
  `fallas_tela_bordado` int(6) unsigned DEFAULT NULL,
  `piezas_incomp_bordado` int(6) unsigned DEFAULT NULL,
  `auditoria_bordado` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `estado_bordado` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `observaciones_fase_bordado` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci COMMENT='tabla de registro de ordenes de produccion';


-- bd_next.tbl2_fases_prod_confeccion definition

CREATE TABLE `tbl2_fases_prod_confeccion` (
  `idx` int(6) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_cab_orden` int(6) unsigned zerofill DEFAULT NULL,
  `responsable_confeccion` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `precio_confeccion` float DEFAULT NULL,
  `fec_salida_confeccion` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_salida_confeccion` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_salida_confeccion` int(8) unsigned DEFAULT NULL,
  `fec_ingreso_confeccion` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso_confeccion` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_ingreso_confeccion` int(8) unsigned DEFAULT NULL,
  `fec_ingreso_confeccion2` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso_confeccion2` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_ingreso_confeccion2` int(8) unsigned DEFAULT NULL,
  `fec_ingreso_confeccion3` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso_confeccion3` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_ingreso_confeccion3` int(8) unsigned DEFAULT NULL,
  `fec_termino_confeccion` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fallas_confeccion` int(6) unsigned DEFAULT NULL,
  `fallas_tela_confeccion` int(6) unsigned DEFAULT NULL,
  `piezas_incomp_confeccion` int(6) unsigned DEFAULT NULL,
  `auditoria_confeccion` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `estado_confeccion` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `observaciones_fase_confeccion` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci COMMENT='tabla de registro de ordenes de produccion';

-- bd_next.tbl2_fases_prod_estampado definition

CREATE TABLE `tbl2_fases_prod_estampado` (
  `idx` int(6) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_cab_orden` int(6) unsigned zerofill DEFAULT NULL,
  `responsable_estampado` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `precio_estampado` float DEFAULT NULL,
  `fec_salida_estampado` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_salida_estampado` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_salida_estampado` int(8) unsigned DEFAULT NULL,
  `fec_ingreso_estampado` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso_estampado` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_ingreso_estampado` int(8) unsigned DEFAULT NULL,
  `fec_ingreso_estampado2` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso_estampado2` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_ingreso_estampado2` int(8) unsigned DEFAULT NULL,
  `fec_ingreso_estampado3` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso_estampado3` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_ingreso_estampado3` int(8) unsigned DEFAULT NULL,
  `fec_termino_estampado` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fallas_estampado` int(6) unsigned DEFAULT NULL,
  `fallas_tela_estampado` int(6) unsigned DEFAULT NULL,
  `piezas_incomp_estampado` int(6) unsigned DEFAULT NULL,
  `auditoria_estampado` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `estado_estampado` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `observaciones_fase_estampado` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci COMMENT='tabla de registro de ordenes de produccion';


-- bd_next.tbl2_fases_prod_hojacorte definition

CREATE TABLE `tbl2_fases_prod_hojacorte` (
  `idx` int(6) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_cab_orden` int(6) unsigned zerofill DEFAULT NULL,
  `ruta_proceso` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`ruta_proceso`)),
  `numero_corte` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `combo1_corte` int(8) unsigned DEFAULT NULL,
  `combo2_corte` int(8) unsigned DEFAULT NULL,
  `combo3_corte` int(8) unsigned DEFAULT NULL,
  `combo4_corte` int(8) unsigned DEFAULT NULL,
  `combo5_corte` int(8) unsigned DEFAULT NULL,
  `combo6_corte` int(8) unsigned DEFAULT NULL,
  `combo7_corte` int(8) unsigned DEFAULT NULL,
  `combo8_corte` int(8) unsigned DEFAULT NULL,
  `combo9_corte` int(8) unsigned DEFAULT NULL,
  `combo10_corte` int(8) unsigned DEFAULT NULL,
  `combo11_corte` int(8) unsigned DEFAULT NULL,
  `combo12_corte` int(8) unsigned DEFAULT NULL,
  `combo13_corte` int(8) unsigned DEFAULT NULL,
  `combo14_corte` int(8) unsigned DEFAULT NULL,
  `estado_corte` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `observaciones_fase_hojacorte` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci COMMENT='tabla de registro de ordenes de produccion';


-- bd_next.tbl2_fases_prod_lavanderia definition

CREATE TABLE `tbl2_fases_prod_lavanderia` (
  `idx` int(6) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_cab_orden` int(6) unsigned zerofill DEFAULT NULL,
  `responsable_lavanderia` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `precio_lavanderia` float DEFAULT NULL,
  `fec_salida_lavanderia` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_salida_lavanderia` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_salida_lavanderia` int(8) unsigned DEFAULT NULL,
  `fec_ingreso_lavanderia` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso_lavanderia` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_ingreso_lavanderia` int(8) unsigned DEFAULT NULL,
  `fec_ingreso_lavanderia2` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso_lavanderia2` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_ingreso_lavanderia2` int(8) unsigned DEFAULT NULL,
  `fec_ingreso_lavanderia3` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso_lavanderia3` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_ingreso_lavanderia3` int(8) unsigned DEFAULT NULL,
  `fec_termino_lavanderia` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fallas_lavanderia` int(6) unsigned DEFAULT NULL,
  `fallas_tela_lavanderia` int(6) unsigned DEFAULT NULL,
  `piezas_incomp_lavanderia` int(6) unsigned DEFAULT NULL,
  `auditoria_lavanderia` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `estado_lavanderia` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `observaciones_fase_lavanderia` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci COMMENT='tabla de registro de ordenes de produccion';


-- bd_next.tbl2_fases_prod_molde definition

CREATE TABLE `tbl2_fases_prod_molde` (
  `idx` int(6) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_cab_orden` int(6) unsigned zerofill DEFAULT NULL,
  `responsable` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `molde` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `muestra` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `lavado` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cliente_corte` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `tizado` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `estado_molde` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `observaciones_fase_molde` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci COMMENT='tabla de registro de ordenes de produccion';


-- bd_next.tbl2_fases_prod_ojalboton definition

CREATE TABLE `tbl2_fases_prod_ojalboton` (
  `idx` int(6) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_cab_orden` int(6) unsigned zerofill DEFAULT NULL,
  `responsable_hojalboton` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `precio_hojalboton` float DEFAULT NULL,
  `fec_salida_hojalboton` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_salida_hojalboton` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_salida_hojalboton` int(8) unsigned DEFAULT NULL,
  `fec_ingreso_hojalboton` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso_hojalboton` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_ingreso_hojalboton` int(8) unsigned DEFAULT NULL,
  `fec_ingreso_hojalboton2` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso_hojalboton2` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_ingreso_hojalboton2` int(8) unsigned DEFAULT NULL,
  `fec_ingreso_hojalboton3` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso_hojalboton3` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cantidad_ingreso_hojalboton3` int(8) unsigned DEFAULT NULL,
  `fec_termino_hojalboton` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fallas_hojalboton` int(6) unsigned DEFAULT NULL,
  `fallas_tela_hojalboton` int(6) unsigned DEFAULT NULL,
  `piezas_incomp_hojalboton` int(6) unsigned DEFAULT NULL,
  `auditoria_hojalboton` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `estado_hojalboton` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `observaciones_fase_ojalboton` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci COMMENT='tabla de registro de ordenes de produccion';


-- bd_next.tbl2_fases_prod_ordenes definition

CREATE TABLE `tbl2_fases_prod_ordenes` (
  `idx` int(6) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `oc` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `cliente` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fec_emitida` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fec_entrega` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `marca` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `producto` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `base` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `precio` double(15,2) DEFAULT NULL,
  `modelos` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `combo1_orden` int(8) unsigned DEFAULT NULL,
  `combo2_orden` int(8) unsigned DEFAULT NULL,
  `combo3_orden` int(8) unsigned DEFAULT NULL,
  `combo4_orden` int(8) unsigned DEFAULT NULL,
  `combo5_orden` int(8) unsigned DEFAULT NULL,
  `combo6_orden` int(8) unsigned DEFAULT NULL,
  `combo7_orden` int(8) unsigned DEFAULT NULL,
  `combo8_orden` int(8) unsigned DEFAULT NULL,
  `combo9_orden` int(8) unsigned DEFAULT NULL,
  `combo10_orden` int(8) unsigned DEFAULT NULL,
  `combo11_orden` int(8) unsigned DEFAULT NULL,
  `combo12_orden` int(8) unsigned DEFAULT NULL,
  `combo13_orden` int(8) unsigned DEFAULT NULL,
  `combo14_orden` int(8) unsigned DEFAULT NULL,
  `estado_orden` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `observaciones_fase_orden` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci COMMENT='tabla de registro de ordenes de produccion';


-- bd_next.tbl2_fases_prod_telas definition

CREATE TABLE `tbl2_fases_prod_telas` (
  `idx` int(6) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_cab_orden` int(6) unsigned zerofill DEFAULT NULL,
  `orden_pedido` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fec_pedido` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `proveedor` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `tela` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `articulo` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `guia_ingreso` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `estado_telas` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `observaciones_fase_telas` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci COMMENT='tabla de registro de ordenes de produccion';


-- ====================================================================================================================================

insert into 

select *from jefferson_cabecera
select *from jefferson_detalle 
select *from tbl2_fases_prod_ordenes
select *from tbl2_fases_prod_telas
select *from tbl2_fases_prod_molde
select *From tbl2_fases_prod_hojacorte tfph 

truncate tbl2_fases_prod_ordenes
truncate tbl2_fases_prod_telas
truncate tbl2_fases_prod_molde
truncate tbl2_fases_prod_hojacorte

insert into tbl2_fases_prod_ordenes (
    oc, cliente, fec_emitida, fec_entrega, marca, producto, base, precio, modelos, 
    combo1_orden, combo2_orden, combo3_orden, combo4_orden, combo5_orden, 
    combo6_orden, combo7_orden, combo8_orden, combo9_orden, combo10_orden, 
    combo11_orden, combo12_orden, combo13_orden, combo14_orden, estado_orden, 
    observaciones_fase_orden
)
select 
    oc, cliente, fec_emitida, fec_entrega, marca, producto, base, precio, modelos, 
    combo1_orden, combo2_orden, combo3_orden, combo4_orden, combo5_orden, 
    combo6_orden, combo7_orden, combo8_orden, combo9_orden, combo10_orden, 
    combo11_orden, combo12_orden, combo13_orden, combo14_orden, 'PENDIENTE', 
    observaciones_fase_orden 
from jefferson_cabecera

insert into tbl2_fases_prod_telas 
select 0,tb1.idx,tb2.orden_pedido,tb2.fec_pedido,tb2.proveedor,tb2.tela,tb2.articulo,tb2.guia_ingreso,tb2.estado_telas,tb2.observaciones_fase_telas,NOW() from jefferson_detalle tb2
inner join jefferson_cabecera tb1 on tb1.idx = tb2.idx 

insert into tbl2_fases_prod_molde
select 0,tb1.idx,tb2.responsable,tb2.molde,tb2.muestra,tb2.lavado,tb2.cliente_corte,tb2.tizado,tb2.estado_molde,tb2.observaciones_fase_molde,NOW() from jefferson_detalle tb2
inner join jefferson_cabecera tb1 on tb1.idx = tb2.idx 

select *from jefferson_detalle

insert into tbl2_fases_prod_confeccion
select 0,tb1.idx, tb2.responsable_confeccion , tb2.precio_confeccion , tb2.fec_salida_confeccion ,tb2.guia_salida_confeccion ,tb2.cantidad_salida_confeccion ,tb2.fec_ingreso_confeccion ,
tb2.guia_ingreso_confeccion ,tb2.cantidad_ingreso_confeccion ,tb2.fec_ingreso_confeccion2 ,tb2.guia_ingreso_confeccion2 ,tb2.cantidad_ingreso_confeccion2 ,tb2.fec_ingreso_confeccion3 ,
tb2.guia_ingreso_confeccion3 ,tb2.cantidad_ingreso_confeccion3 ,tb2.fec_termino_confeccion ,tb2.fallas_confeccion ,tb2.fallas_tela_confeccion ,tb2.piezas_incomp_confeccion ,tb2.auditoria_confeccion ,
 tb2.estado_confeccion ,tb2.observaciones_fase_confeccion, NOW() 
from jefferson_detalle tb2
inner join jefferson_cabecera tb1 on tb1.idx = tb2.idx 

insert into tbl2_fases_prod_estampado 
select 0,tb1.idx, tb2.responsable_estampado , tb2.precio_estampado , tb2.fec_salida_estampado ,tb2.guia_salida_estampado ,tb2.cantidad_salida_estampado ,tb2.fec_ingreso_estampado ,
tb2.guia_ingreso_estampado ,tb2.cantidad_ingreso_estampado ,tb2.fec_ingreso_estampado2 ,tb2.guia_ingreso_estampado2 ,tb2.cantidad_ingreso_estampado2 ,tb2.fec_ingreso_estampado3 ,
tb2.guia_ingreso_estampado3 ,tb2.cantidad_ingreso_estampado3 ,tb2.fec_termino_estampado ,tb2.fallas_estampado ,tb2.fallas_tela_estampado ,tb2.piezas_incomp_estampado ,tb2.auditoria_estampado ,
 tb2.estado_estampado ,'', NOW() 
from jefferson_detalle tb2
inner join jefferson_cabecera tb1 on tb1.idx = tb2.idx 

insert into tbl2_fases_prod_lavanderia 
select 0,tb1.idx, tb2.responsable_lavanderia , tb2.precio_lavanderia , tb2.fec_salida_lavanderia ,tb2.guia_salida_lavanderia ,tb2.cantidad_salida_lavanderia ,tb2.fec_ingreso_lavanderia ,
tb2.guia_ingreso_lavanderia ,tb2.cantidad_ingreso_lavanderia ,tb2.fec_ingreso_lavanderia2 ,tb2.guia_ingreso_lavanderia2 ,tb2.cantidad_ingreso_lavanderia2 ,tb2.fec_ingreso_lavanderia3 ,
tb2.guia_ingreso_lavanderia3 ,tb2.cantidad_ingreso_lavanderia3 ,tb2.fec_termino_lavanderia ,tb2.fallas_lavanderia ,tb2.fallas_tela_lavanderia ,tb2.piezas_incomp_lavanderia ,tb2.auditoria_lavanderia ,
 tb2.estado_lavanderia ,tb2.observaciones_fase_lavanderia, NOW() 
from jefferson_detalle tb2
inner join jefferson_cabecera tb1 on tb1.idx = tb2.idx 

insert into tbl2_fases_prod_bordado 
select 0,tb1.idx, tb2.responsable_bordado , tb2.precio_bordado , tb2.fec_salida_bordado ,tb2.guia_salida_bordado ,tb2.cantidad_salida_bordado ,tb2.fec_ingreso_bordado ,
tb2.guia_ingreso_bordado ,tb2.cantidad_ingreso_bordado ,tb2.fec_ingreso_bordado2 ,tb2.guia_ingreso_bordado2 ,tb2.cantidad_ingreso_bordado2 ,tb2.fec_ingreso_bordado3 ,
tb2.guia_ingreso_bordado3 ,tb2.cantidad_ingreso_bordado3 ,tb2.fec_termino_bordado ,tb2.fallas_bordado ,tb2.fallas_tela_bordado ,tb2.piezas_incomp_bordado ,tb2.auditoria_bordado ,
 tb2.estado_bordado ,tb2.observaciones_fase_bordado, NOW() 
from jefferson_detalle tb2
inner join jefferson_cabecera tb1 on tb1.idx = tb2.idx 

insert into tbl2_fases_prod_acabados 
select 0,tb1.idx, tb2.responsable_acabados , tb2.precio_acabados , tb2.fec_salida_acabados ,tb2.guia_salida_acabados ,tb2.cantidad_salida_acabados ,tb2.fec_ingreso_acabados ,
tb2.guia_ingreso_acabados ,tb2.cantidad_ingreso_acabados ,tb2.fec_ingreso_acabados2 ,tb2.guia_ingreso_acabados2 ,tb2.cantidad_ingreso_acabados2 ,tb2.fec_ingreso_acabados3 ,
tb2.guia_ingreso_acabados3 ,tb2.cantidad_ingreso_acabados3 ,tb2.fec_termino_acabados ,tb2.fallas_acabados ,tb2.fallas_tela_acabados ,tb2.piezas_incomp_acabados ,tb2.auditoria_acabados ,
 tb2.estado_acabados ,tb2.observaciones_fase_acabados, NOW() 
from jefferson_detalle tb2
inner join jefferson_cabecera tb1 on tb1.idx = tb2.idx 

select *From tbl2_fases_prod_confeccion tfpc 

truncate tbl2_fases_prod_acabados   
select *from tbl2_fases_prod_acabados   
select *from jefferson_detalle
2024526PANTALONSEMIPITILLO ZELEMSKY


-- bd_next.view_produccionordenes source
drop view viewProduccionOrdenes
create or replace
algorithm = UNDEFINED view `BD_FACTURADOR`.`viewProduccionOrdenes` as
select
    `tfpo`.`idx` as `idx`,
    `tfpo`.`oc` as `oc`,
    `tfpo`.`cliente` as `cliente`,
    `tfpo`.`fec_emitida` as `fec_emitida`,
    `tfpo`.`fec_entrega` as `fec_entrega`,
    `tfpo`.`marca` as `marca`,
    `tfpo`.`producto` as `producto`,
    `tfpo`.`base` as `base`,
    `tfpo`.`precio` as `precio`,
    `tfpo`.`modelos` as `modelos`,
    `tfpo`.`combo1_orden` as `combo1_orden`,
    `tfpo`.`combo2_orden` as `combo2_orden`,
    `tfpo`.`combo3_orden` as `combo3_orden`,
    `tfpo`.`combo4_orden` as `combo4_orden`,
    `tfpo`.`combo5_orden` as `combo5_orden`,
    `tfpo`.`combo6_orden` as `combo6_orden`,
    `tfpo`.`combo7_orden` as `combo7_orden`,
    `tfpo`.`combo8_orden` as `combo8_orden`,
    `tfpo`.`combo9_orden` as `combo9_orden`,
    `tfpo`.`combo10_orden` as `combo10_orden`,
    `tfpo`.`combo11_orden` as `combo11_orden`,
    `tfpo`.`combo12_orden` as `combo12_orden`,
    `tfpo`.`combo13_orden` as `combo13_orden`,
    `tfpo`.`combo14_orden` as `combo14_orden`,
    `tfpo`.`estado_orden` as `estado_orden`,
    `tfpo`.`observaciones_fase_orden` as `observaciones_fase_orden`,
    `tfpt`.`orden_pedido` as `orden_pedido`,
    `tfpt`.`fec_pedido` as `fec_pedido`,
    `tfpt`.`proveedor` as `proveedor`,
    `tfpt`.`tela` as `tela`,
    `tfpt`.`articulo` as `articulo`,
    `tfpt`.`guia_ingreso` as `guia_ingreso`,
    `tfpt`.`estado_telas` as `estado_telas`,
    `tfpt`.`observaciones_fase_telas` as `observaciones_fase_telas`,
    `tfpm`.`responsable` as `responsable`,
    `tfpm`.`molde` as `molde`,
    `tfpm`.`muestra` as `muestra`,
    `tfpm`.`lavado` as `lavado`,
    `tfpm`.`cliente_corte` as `cliente_corte`,
    `tfpm`.`tizado` as `tizado`,
    `tfpm`.`estado_molde` as `estado_molde`,
    `tfpm`.`observaciones_fase_molde` as `observaciones_fase_molde`,
    `tfph`.`numero_corte` as `numero_corte`,
    `tfph`.`ruta_proceso` as `ruta_proceso`,
    `tfph`.`combo1_corte` as `combo1_corte`,
    `tfph`.`combo2_corte` as `combo2_corte`,
    `tfph`.`combo3_corte` as `combo3_corte`,
    `tfph`.`combo4_corte` as `combo4_corte`,
    `tfph`.`combo5_corte` as `combo5_corte`,
    `tfph`.`combo6_corte` as `combo6_corte`,
    `tfph`.`combo7_corte` as `combo7_corte`,
    `tfph`.`combo8_corte` as `combo8_corte`,
    `tfph`.`combo9_corte` as `combo9_corte`,
    `tfph`.`combo10_corte` as `combo10_corte`,
    `tfph`.`combo11_corte` as `combo11_corte`,
    `tfph`.`combo12_corte` as `combo12_corte`,
    `tfph`.`combo13_corte` as `combo13_corte`,
    `tfph`.`combo14_corte` as `combo14_corte`,
    `tfph`.`estado_corte` as `estado_corte`,
    `tfph`.`observaciones_fase_hojacorte` as `observaciones_fase_hojacorte`,
    `tfpc`.`responsable_confeccion` as `responsable_confeccion`,
    `tfpc`.`precio_confeccion` as `precio_confeccion`,
    `tfpc`.`fec_salida_confeccion` as `fec_salida_confeccion`,
    `tfpc`.`guia_salida_confeccion` as `guia_salida_confeccion`,
    `tfpc`.`cantidad_salida_confeccion` as `cantidad_salida_confeccion`,
    `tfpc`.`fec_ingreso_confeccion` as `fec_ingreso_confeccion`,
    `tfpc`.`guia_ingreso_confeccion` as `guia_ingreso_confeccion`,
    `tfpc`.`cantidad_ingreso_confeccion` as `cantidad_ingreso_confeccion`,
    `tfpc`.`fec_ingreso_confeccion2` as `fec_ingreso_confeccion2`,
    `tfpc`.`guia_ingreso_confeccion2` as `guia_ingreso_confeccion2`,
    `tfpc`.`cantidad_ingreso_confeccion2` as `cantidad_ingreso_confeccion2`,
    `tfpc`.`fec_ingreso_confeccion3` as `fec_ingreso_confeccion3`,
    `tfpc`.`guia_ingreso_confeccion3` as `guia_ingreso_confeccion3`,
    `tfpc`.`cantidad_ingreso_confeccion3` as `cantidad_ingreso_confeccion3`,
    `tfpc`.`fec_termino_confeccion` as `fec_termino_confeccion`,
    `tfpc`.`fallas_confeccion` as `fallas_confeccion`,
    `tfpc`.`fallas_tela_confeccion` as `fallas_tela_confeccion`,
    `tfpc`.`piezas_incomp_confeccion` as `piezas_incomp_confeccion`,
    `tfpc`.`auditoria_confeccion` as `auditoria_confeccion`,
    `tfpc`.`estado_confeccion` as `estado_confeccion`,
    `tfpc`.`observaciones_fase_confeccion` as `observaciones_fase_confeccion`,
    `tfpoj`.`responsable_hojalboton` as `responsable_hojalboton`,
    `tfpoj`.`precio_hojalboton` as `precio_hojalboton`,
    `tfpoj`.`fec_salida_hojalboton` as `fec_salida_hojalboton`,
    `tfpoj`.`guia_salida_hojalboton` as `guia_salida_hojalboton`,
    `tfpoj`.`cantidad_salida_hojalboton` as `cantidad_salida_hojalboton`,
    `tfpoj`.`fec_ingreso_hojalboton` as `fec_ingreso_hojalboton`,
    `tfpoj`.`guia_ingreso_hojalboton` as `guia_ingreso_hojalboton`,
    `tfpoj`.`cantidad_ingreso_hojalboton` as `cantidad_ingreso_hojalboton`,
    `tfpoj`.`fec_ingreso_hojalboton2` as `fec_ingreso_hojalboton2`,
    `tfpoj`.`guia_ingreso_hojalboton2` as `guia_ingreso_hojalboton2`,
    `tfpoj`.`cantidad_ingreso_hojalboton2` as `cantidad_ingreso_hojalboton2`,
    `tfpoj`.`fec_ingreso_hojalboton3` as `fec_ingreso_hojalboton3`,
    `tfpoj`.`guia_ingreso_hojalboton3` as `guia_ingreso_hojalboton3`,
    `tfpoj`.`cantidad_ingreso_hojalboton3` as `cantidad_ingreso_hojalboton3`,
    `tfpoj`.`fec_termino_hojalboton` as `fec_termino_hojalboton`,
    `tfpoj`.`fallas_hojalboton` as `fallas_hojalboton`,
    `tfpoj`.`fallas_tela_hojalboton` as `fallas_tela_hojalboton`,
    `tfpoj`.`piezas_incomp_hojalboton` as `piezas_incomp_hojalboton`,
    `tfpoj`.`auditoria_hojalboton` as `auditoria_hojalboton`,
    `tfpoj`.`estado_hojalboton` as `estado_hojalboton`,
    `tfpoj`.`observaciones_fase_ojalboton` as `observaciones_fase_ojalboton`,
    `tfpe`.`responsable_estampado` as `responsable_estampado`,
    `tfpe`.`precio_estampado` as `precio_estampado`,
    `tfpe`.`fec_salida_estampado` as `fec_salida_estampado`,
    `tfpe`.`guia_salida_estampado` as `guia_salida_estampado`,
    `tfpe`.`cantidad_salida_estampado` as `cantidad_salida_estampado`,
    `tfpe`.`fec_ingreso_estampado` as `fec_ingreso_estampado`,
    `tfpe`.`guia_ingreso_estampado` as `guia_ingreso_estampado`,
    `tfpe`.`cantidad_ingreso_estampado` as `cantidad_ingreso_estampado`,
    `tfpe`.`fec_ingreso_estampado2` as `fec_ingreso_estampado2`,
    `tfpe`.`guia_ingreso_estampado2` as `guia_ingreso_estampado2`,
    `tfpe`.`cantidad_ingreso_estampado2` as `cantidad_ingreso_estampado2`,
    `tfpe`.`fec_ingreso_estampado3` as `fec_ingreso_estampado3`,
    `tfpe`.`guia_ingreso_estampado3` as `guia_ingreso_estampado3`,
    `tfpe`.`cantidad_ingreso_estampado3` as `cantidad_ingreso_estampado3`,
    `tfpe`.`fec_termino_estampado` as `fec_termino_estampado`,
    `tfpe`.`fallas_estampado` as `fallas_estampado`,
    `tfpe`.`fallas_tela_estampado` as `fallas_tela_estampado`,
    `tfpe`.`piezas_incomp_estampado` as `piezas_incomp_estampado`,
    `tfpe`.`auditoria_estampado` as `auditoria_estampado`,
    `tfpe`.`estado_estampado` as `estado_estampado`,
    `tfpe`.`observaciones_fase_estampado` as `observaciones_fase_estampado`,
    `tfpl`.`responsable_lavanderia` as `responsable_lavanderia`,
    `tfpl`.`precio_lavanderia` as `precio_lavanderia`,
    `tfpl`.`fec_salida_lavanderia` as `fec_salida_lavanderia`,
    `tfpl`.`guia_salida_lavanderia` as `guia_salida_lavanderia`,
    `tfpl`.`cantidad_salida_lavanderia` as `cantidad_salida_lavanderia`,
    `tfpl`.`fec_ingreso_lavanderia` as `fec_ingreso_lavanderia`,
    `tfpl`.`guia_ingreso_lavanderia` as `guia_ingreso_lavanderia`,
    `tfpl`.`cantidad_ingreso_lavanderia` as `cantidad_ingreso_lavanderia`,
    `tfpl`.`fec_ingreso_lavanderia2` as `fec_ingreso_lavanderia2`,
    `tfpl`.`guia_ingreso_lavanderia2` as `guia_ingreso_lavanderia2`,
    `tfpl`.`cantidad_ingreso_lavanderia2` as `cantidad_ingreso_lavanderia2`,
    `tfpl`.`fec_ingreso_lavanderia3` as `fec_ingreso_lavanderia3`,
    `tfpl`.`guia_ingreso_lavanderia3` as `guia_ingreso_lavanderia3`,
    `tfpl`.`cantidad_ingreso_lavanderia3` as `cantidad_ingreso_lavanderia3`,
    `tfpl`.`fec_termino_lavanderia` as `fec_termino_lavanderia`,
    `tfpl`.`fallas_lavanderia` as `fallas_lavanderia`,
    `tfpl`.`fallas_tela_lavanderia` as `fallas_tela_lavanderia`,
    `tfpl`.`piezas_incomp_lavanderia` as `piezas_incomp_lavanderia`,
    `tfpl`.`auditoria_lavanderia` as `auditoria_lavanderia`,
    `tfpl`.`estado_lavanderia` as `estado_lavanderia`,
    `tfpl`.`observaciones_fase_lavanderia` as `observaciones_fase_lavanderia`,
    `tfpb`.`responsable_bordado` as `responsable_bordado`,
    `tfpb`.`precio_bordado` as `precio_bordado`,
    `tfpb`.`fec_salida_bordado` as `fec_salida_bordado`,
    `tfpb`.`guia_salida_bordado` as `guia_salida_bordado`,
    `tfpb`.`cantidad_salida_bordado` as `cantidad_salida_bordado`,
    `tfpb`.`fec_ingreso_bordado` as `fec_ingreso_bordado`,
    `tfpb`.`guia_ingreso_bordado` as `guia_ingreso_bordado`,
    `tfpb`.`cantidad_ingreso_bordado` as `cantidad_ingreso_bordado`,
    `tfpb`.`fec_ingreso_bordado2` as `fec_ingreso_bordado2`,
    `tfpb`.`guia_ingreso_bordado2` as `guia_ingreso_bordado2`,
    `tfpb`.`cantidad_ingreso_bordado2` as `cantidad_ingreso_bordado2`,
    `tfpb`.`fec_ingreso_bordado3` as `fec_ingreso_bordado3`,
    `tfpb`.`guia_ingreso_bordado3` as `guia_ingreso_bordado3`,
    `tfpb`.`cantidad_ingreso_bordado3` as `cantidad_ingreso_bordado3`,
    `tfpb`.`fec_termino_bordado` as `fec_termino_bordado`,
    `tfpb`.`fallas_bordado` as `fallas_bordado`,
    `tfpb`.`fallas_tela_bordado` as `fallas_tela_bordado`,
    `tfpb`.`piezas_incomp_bordado` as `piezas_incomp_bordado`,
    `tfpb`.`auditoria_bordado` as `auditoria_bordado`,
    `tfpb`.`estado_bordado` as `estado_bordado`,
    `tfpb`.`observaciones_fase_bordado` as `observaciones_fase_bordado`,
    `tfpa`.`responsable_acabados` as `responsable_acabados`,
    `tfpa`.`precio_acabados` as `precio_acabados`,
    `tfpa`.`fec_salida_acabados` as `fec_salida_acabados`,
    `tfpa`.`guia_salida_acabados` as `guia_salida_acabados`,
    `tfpa`.`cantidad_salida_acabados` as `cantidad_salida_acabados`,
    `tfpa`.`fec_ingreso_acabados` as `fec_ingreso_acabados`,
    `tfpa`.`guia_ingreso_acabados` as `guia_ingreso_acabados`,
    `tfpa`.`cantidad_ingreso_acabados` as `cantidad_ingreso_acabados`,
    `tfpa`.`fec_ingreso_acabados2` as `fec_ingreso_acabados2`,
    `tfpa`.`guia_ingreso_acabados2` as `guia_ingreso_acabados2`,
    `tfpa`.`cantidad_ingreso_acabados2` as `cantidad_ingreso_acabados2`,
    `tfpa`.`fec_ingreso_acabados3` as `fec_ingreso_acabados3`,
    `tfpa`.`guia_ingreso_acabados3` as `guia_ingreso_acabados3`,
    `tfpa`.`cantidad_ingreso_acabados3` as `cantidad_ingreso_acabados3`,
    `tfpa`.`fec_termino_acabados` as `fec_termino_acabados`,
    `tfpa`.`fallas_acabados` as `fallas_acabados`,
    `tfpa`.`fallas_tela_acabados` as `fallas_tela_acabados`,
    `tfpa`.`piezas_incomp_acabados` as `piezas_incomp_acabados`,
    `tfpa`.`auditoria_acabados` as `auditoria_acabados`,
    `tfpa`.`estado_acabados` as `estado_acabados`,
    `tfpa`.`observaciones_fase_acabados` as `observaciones_fase_acabados`,
    if(`tfpa`.`estado_acabados` is not null,
    'ACABADOS',
    if(`tfpb`.`estado_bordado` is not null,
    'BORDADO',
    if(`tfpl`.`estado_lavanderia` is not null,
    'LAVANDERIA',
    if(`tfpe`.`estado_estampado` is not null,
    'ESTAMPADO',
    if(`tfpoj`.`estado_hojalboton` is not null,
    'OJAL BOTON',
    if(`tfpc`.`estado_confeccion` is not null,
    'CONFECCION',
    if(`tfph`.`estado_corte` is not null,
    'CORTE',
    if(`tfpm`.`estado_molde` is not null,
    'MOLDES',
    if(`tfpt`.`estado_telas` is not null,
    'TELAS',
    'ORDENES'))))))))) as `status`
from
    (((((((((`BD_FACTURADOR`.`tbl2_fases_prod_ordenes` `tfpo`
left join `BD_FACTURADOR`.`tbl2_fases_prod_telas` `tfpt` on
    (`tfpo`.`idx` = `tfpt`.`id_cab_orden`))
left join `BD_FACTURADOR`.`tbl2_fases_prod_molde` `tfpm` on
    (`tfpo`.`idx` = `tfpm`.`id_cab_orden`))
left join `BD_FACTURADOR`.`tbl2_fases_prod_hojacorte` `tfph` on
    (`tfpo`.`idx` = `tfph`.`id_cab_orden`))
left join `BD_FACTURADOR`.`tbl2_fases_prod_confeccion` `tfpc` on
    (`tfpo`.`idx` = `tfpc`.`id_cab_orden`))
left join `BD_FACTURADOR`.`tbl2_fases_prod_ojalboton` `tfpoj` on
    (`tfpo`.`idx` = `tfpoj`.`id_cab_orden`))
left join `BD_FACTURADOR`.`tbl2_fases_prod_estampado` `tfpe` on
    (`tfpo`.`idx` = `tfpe`.`id_cab_orden`))
left join `BD_FACTURADOR`.`tbl2_fases_prod_lavanderia` `tfpl` on
    (`tfpo`.`idx` = `tfpl`.`id_cab_orden`))
left join `BD_FACTURADOR`.`tbl2_fases_prod_bordado` `tfpb` on
    (`tfpo`.`idx` = `tfpb`.`id_cab_orden`))
left join `BD_FACTURADOR`.`tbl2_fases_prod_acabados` `tfpa` on
    (`tfpo`.`idx` = `tfpa`.`id_cab_orden`));

select *From jefferson_cabecera jc 
select *from jefferson_detalle jd 

select *from viewProduccionOrdenes
select *From tbl2_fases_prod_ordenes tfpo 
inner join tbl2_fases_prod_hojacorte tfph on tfpo.idx = tfph.id_cab_orden 
where tfpo.oc = '2024526'

select *from tbl2_
   
select *from tbl2_fases_prod_confeccion tfpc 
select *from tbl2_fases_prod_ojalboton tfpo 
select *from tbl2_fases_prod_estampado tfpe 
select *from tbl2_fases_prod_acabados tfpa 
select *from tbl2_fases_prod_confeccion tfpc 

select *From view_ProduccionOrdenes limit 20

select fec_entrega,fec_emitida,datediff(fec_entrega,fec_emitida) as dias_produccion,datediff(fec_entrega,date(now())) as dias_pendientes,
(fallas_tela_confeccion + fallas_tela_hojalboton + fallas_tela_estampado + fallas_tela_lavanderia + fallas_tela_bordado + fallas_tela_acabados) as total_fallas_telas,
(piezas_incomp_confeccion + piezas_incomp_hojalboton + piezas_incomp_estampado + piezas_incomp_lavanderia + piezas_incomp_bordado + piezas_incomp_bordado + piezas_incomp_acabados) as total_fallas_incompletos,
(cantidad_ingreso_acabados + cantidad_ingreso_acabados2 + cantidad_ingreso_acabados3) as total_despacho,
(fallas_confeccion + fallas_hojalboton + fallas_estampado + fallas_lavanderia + fallas_bordado + fallas_acabados) as total_fallas,
((combo1_corte + combo3_corte + combo4_corte + combo5_corte + combo6_corte + combo7_corte + combo8_corte + combo9_corte + combo10_corte + combo11_corte + combo12_corte + combo13_corte + combo14_corte) - 
(fallas_confeccion + fallas_hojalboton + fallas_estampado + fallas_lavanderia + fallas_bordado + fallas_acabados) - 
(cantidad_ingreso_acabados + cantidad_ingreso_acabados2 + cantidad_ingreso_acabados3)) as tota, 
0 as prendas_x_cuadrar 
from viewProduccionOrdenes vp 
where idx = 1 and oc = 2024526

select *from viewProduccionOrdenes where oc = 2024526

select *from tbl2_operaciones_op too 
select *from tbl2_fases_prod_acabados tfpa where precio_acabados is not null
select *from tbl2_fases_prod_confeccion tfpc 

select *from tbl2_fases_prod_hojacorte tfph 
select *from tbl2_fases_prod_ordenes tfpo

select *from tbl2_almacen ta where ruc_ = '20522094120'
select *From tbl2_vendedor tv where ruc = '20522094120' and id_tienda = 462

select *from viewProduccionOrdenes
select *from tbl2_almacen_metas tam en
select *from tbl2_almacen_metas tam 
select *from tbl2_almacen_gastos


select *from tbl2_almacen_gastos 
drop table tbl2_almacen_gastos

select *from tbl2_almacen ta where ruc_ = '20522094120'
select *from tbl2_productos where ruc_ = '20522094120' and

a
select *from tbl2_concepto_gastos
select *from tbl2_almacen_gastos

DELETE FROM tbl2_almacen_gastos WHERE idx = 3

SELECT tb1.*,tb2.concepto 
FROM tbl2_almacen_gastos tb1 inner join tbl2_concepto_gastos tb2 ON tb1.id_concepto_gasto = tb2.idx 
WHERE tb1.ruc_ = '20522094120' and tb1.id_almacen_CAB = 388 and tb1.anio_gasto = 2024 and tb1.mes_gasto = 11

insert into tbl2_almacen_gastos(ruc_,id_almacen_CAB,anio_gasto,mes_gasto,id_concepto_gasto,importe_gasto)
values('20522094120',388,2024,11,1,234.23)

CREATE TABLE `tbl2_almacen_gastos` (
  `idx` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `ruc_` varchar(11) COLLATE utf8_spanish2_ci NOT NULL,
  `id_almacen_CAB` int(10) unsigned zerofill NOT NULL,  
  `anio_gasto` int(4) unsigned zerofill NOT NULL,
  `mes_gasto` int(2) unsigned zerofill NOT NULL,
  `id_concepto_gasto` int(4) unsigned zerofill NOT NULL,
  -- `concepto` enum('ALQ','MANT','FDPR','PUBL','LUZ','AGUA','INTER','PLL') COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'e' COMMENT 'Alquiler,Mantenimiento, Fondo de promosion, Publicidad, Luz, Agua, Internet, Arbitrios, Planilla',
  `importe_gasto` double(10,2) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci COMMENT='Listado de gastos x mes';

select *from tbl2_concepto_gastos

CREATE TABLE `tbl2_concepto_gastos` (
  `idx` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `ruc_` varchar(11) COLLATE utf8_spanish2_ci NOT NULL,
  `codigo` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `concepto` varchar(120) COLLATE utf8_spanish2_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci COMMENT='Listado concepto de gastos';


select *from tbl2_almacen_mov_cab tamc where id_comprobante_CAB = 1
select *from tbl2_almacen_mov_det tamd where id_comprobante_CAB = 22
select *from tbl2_almacen_precios tap 
select *from tbl2_concepto_gastos
select *from tbl2_almacen_metas tam 

insert into tbl2_concepto_gastos(ruc_,codigo,concepto)
values('20522094120','ALQ','ALQUILER')
insert into tbl2_concepto_gastos(ruc_,codigo,concepto)
values('20522094120','MANT','MANTENIMIENTO')
insert into tbl2_concepto_gastos(ruc_,codigo,concepto)
values('20522094120','FDPR','FONDO DE PROMOCION')
insert into tbl2_concepto_gastos(ruc_,codigo,concepto)
values('20522094120','PUBL','PUBLICIDAD')
insert into tbl2_concepto_gastos(ruc_,codigo,concepto)
values('20522094120','LUZ','LUZ')
insert into tbl2_concepto_gastos(ruc_,codigo,concepto)
values('20522094120','AGUA','AGUA')
insert into tbl2_concepto_gastos(ruc_,codigo,concepto)
values('20522094120','INTER','INTERNET')
insert into tbl2_concepto_gastos(ruc_,codigo,concepto)
values('20522094120','PLL','PLANILLA')

select *from tbl2_almacen ta 
select *from tbl2_almacen_gastos

select *from tbl2_almacen where ruc_ = '20522094120'
select *from tbl2_fases_prod_hojacorte tfph where  

select tfph.ruta_proceso,tfpo.* From tbl2_fases_prod_ordenes tfpo 
inner join tbl2_fases_prod_hojacorte tfph on tfpo.idx = tfph.id_cab_orden

select *from tbl2_fases_prod_molde tfpm 
select *from tbl2_fases_prod_confeccion tfpc 
select *From tbl2_fases_prod_estampado tfpe
select * from viewProduccionOrdenes

-- BD_FACTURADOR.viewProduccionOrdenes source
select *from viewProduccionOrdenes

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `BD_FACTURADOR`.`viewProduccionOrdenes` AS
select
    `tfpo`.`idx` AS `idx`,
    `tfpo`.`oc` AS `oc`,
    `tfpo`.`cliente` AS `cliente`,
    `tfpo`.`fec_emitida` AS `fec_emitida`,
    `tfpo`.`fec_entrega` AS `fec_entrega`,
    `tfpo`.`marca` AS `marca`,
    `tfpo`.`producto` AS `producto`,
    `tfpo`.`base` AS `base`,
    `tfpo`.`precio` AS `precio`,
    `tfpo`.`modelos` AS `modelos`,
    `tfpo`.`combo1_orden` AS `combo1_orden`,
    `tfpo`.`combo2_orden` AS `combo2_orden`,
    `tfpo`.`combo3_orden` AS `combo3_orden`,
    `tfpo`.`combo4_orden` AS `combo4_orden`,
    `tfpo`.`combo5_orden` AS `combo5_orden`,
    `tfpo`.`combo6_orden` AS `combo6_orden`,
    `tfpo`.`combo7_orden` AS `combo7_orden`,
    `tfpo`.`combo8_orden` AS `combo8_orden`,
    `tfpo`.`combo9_orden` AS `combo9_orden`,
    `tfpo`.`combo10_orden` AS `combo10_orden`,
    `tfpo`.`combo11_orden` AS `combo11_orden`,
    `tfpo`.`combo12_orden` AS `combo12_orden`,
    `tfpo`.`combo13_orden` AS `combo13_orden`,
    `tfpo`.`combo14_orden` AS `combo14_orden`,
    `tfpo`.`estado_orden` AS `estado_orden`,
    `tfpo`.`observaciones_fase_orden` AS `observaciones_fase_orden`,
    `tfpt`.`orden_pedido` AS `orden_pedido`,
    `tfpt`.`fec_pedido` AS `fec_pedido`,
    `tfpt`.`proveedor` AS `proveedor`,
    `tfpt`.`tela` AS `tela`,
    `tfpt`.`articulo` AS `articulo`,
    `tfpt`.`guia_ingreso` AS `guia_ingreso`,
    `tfpt`.`estado_telas` AS `estado_telas`,
    `tfpt`.`observaciones_fase_telas` AS `observaciones_fase_telas`,
    `tfpm`.`responsable` AS `responsable`,
    `tfpm`.`molde` AS `molde`,
    `tfpm`.`muestra` AS `muestra`,
    `tfpm`.`lavado` AS `lavado`,
    `tfpm`.`cliente_corte` AS `cliente_corte`,
    `tfpm`.`tizado` AS `tizado`,
    `tfpm`.`estado_molde` AS `estado_molde`,
    `tfpm`.`observaciones_fase_molde` AS `observaciones_fase_molde`,
    `tfph`.`numero_corte` AS `numero_corte`,
    `tfph`.`ruta_proceso` AS `ruta_proceso`,
    `tfph`.`combo1_corte` AS `combo1_corte`,
    `tfph`.`combo2_corte` AS `combo2_corte`,
    `tfph`.`combo3_corte` AS `combo3_corte`,
    `tfph`.`combo4_corte` AS `combo4_corte`,
    `tfph`.`combo5_corte` AS `combo5_corte`,
    `tfph`.`combo6_corte` AS `combo6_corte`,
    `tfph`.`combo7_corte` AS `combo7_corte`,
    `tfph`.`combo8_corte` AS `combo8_corte`,
    `tfph`.`combo9_corte` AS `combo9_corte`,
    `tfph`.`combo10_corte` AS `combo10_corte`,
    `tfph`.`combo11_corte` AS `combo11_corte`,
    `tfph`.`combo12_corte` AS `combo12_corte`,
    `tfph`.`combo13_corte` AS `combo13_corte`,
    `tfph`.`combo14_corte` AS `combo14_corte`,
    `tfph`.`estado_corte` AS `estado_corte`,
    `tfph`.`observaciones_fase_hojacorte` AS `observaciones_fase_hojacorte`,
    `tfpc`.`responsable_confeccion` AS `responsable_confeccion`,
    `tfpc`.`precio_confeccion` AS `precio_confeccion`,
    `tfpc`.`fec_salida_confeccion` AS `fec_salida_confeccion`,
    `tfpc`.`guia_salida_confeccion` AS `guia_salida_confeccion`,
    `tfpc`.`cantidad_salida_confeccion` AS `cantidad_salida_confeccion`,
    `tfpc`.`fec_ingreso_confeccion` AS `fec_ingreso_confeccion`,
    `tfpc`.`guia_ingreso_confeccion` AS `guia_ingreso_confeccion`,
    `tfpc`.`cantidad_ingreso_confeccion` AS `cantidad_ingreso_confeccion`,
    `tfpc`.`fec_ingreso_confeccion2` AS `fec_ingreso_confeccion2`,
    `tfpc`.`guia_ingreso_confeccion2` AS `guia_ingreso_confeccion2`,
    `tfpc`.`cantidad_ingreso_confeccion2` AS `cantidad_ingreso_confeccion2`,
    `tfpc`.`fec_ingreso_confeccion3` AS `fec_ingreso_confeccion3`,
    `tfpc`.`guia_ingreso_confeccion3` AS `guia_ingreso_confeccion3`,
    `tfpc`.`cantidad_ingreso_confeccion3` AS `cantidad_ingreso_confeccion3`,
    `tfpc`.`fec_termino_confeccion` AS `fec_termino_confeccion`,
    `tfpc`.`fallas_confeccion` AS `fallas_confeccion`,
    `tfpc`.`fallas_tela_confeccion` AS `fallas_tela_confeccion`,
    `tfpc`.`piezas_incomp_confeccion` AS `piezas_incomp_confeccion`,
    `tfpc`.`auditoria_confeccion` AS `auditoria_confeccion`,
    `tfpc`.`estado_confeccion` AS `estado_confeccion`,
    `tfpc`.`observaciones_fase_confeccion` AS `observaciones_fase_confeccion`,
    `tfpoj`.`responsable_hojalboton` AS `responsable_hojalboton`,
    `tfpoj`.`precio_hojalboton` AS `precio_hojalboton`,
    `tfpoj`.`fec_salida_hojalboton` AS `fec_salida_hojalboton`,
    `tfpoj`.`guia_salida_hojalboton` AS `guia_salida_hojalboton`,
    `tfpoj`.`cantidad_salida_hojalboton` AS `cantidad_salida_hojalboton`,
    `tfpoj`.`fec_ingreso_hojalboton` AS `fec_ingreso_hojalboton`,
    `tfpoj`.`guia_ingreso_hojalboton` AS `guia_ingreso_hojalboton`,
    `tfpoj`.`cantidad_ingreso_hojalboton` AS `cantidad_ingreso_hojalboton`,
    `tfpoj`.`fec_ingreso_hojalboton2` AS `fec_ingreso_hojalboton2`,
    `tfpoj`.`guia_ingreso_hojalboton2` AS `guia_ingreso_hojalboton2`,
    `tfpoj`.`cantidad_ingreso_hojalboton2` AS `cantidad_ingreso_hojalboton2`,
    `tfpoj`.`fec_ingreso_hojalboton3` AS `fec_ingreso_hojalboton3`,
    `tfpoj`.`guia_ingreso_hojalboton3` AS `guia_ingreso_hojalboton3`,
    `tfpoj`.`cantidad_ingreso_hojalboton3` AS `cantidad_ingreso_hojalboton3`,
    `tfpoj`.`fec_termino_hojalboton` AS `fec_termino_hojalboton`,
    `tfpoj`.`fallas_hojalboton` AS `fallas_hojalboton`,
    `tfpoj`.`fallas_tela_hojalboton` AS `fallas_tela_hojalboton`,
    `tfpoj`.`piezas_incomp_hojalboton` AS `piezas_incomp_hojalboton`,
    `tfpoj`.`auditoria_hojalboton` AS `auditoria_hojalboton`,
    `tfpoj`.`estado_hojalboton` AS `estado_hojalboton`,
    `tfpoj`.`observaciones_fase_ojalboton` AS `observaciones_fase_ojalboton`,
    `tfpe`.`responsable_estampado` AS `responsable_estampado`,
    `tfpe`.`precio_estampado` AS `precio_estampado`,
    `tfpe`.`fec_salida_estampado` AS `fec_salida_estampado`,
    `tfpe`.`guia_salida_estampado` AS `guia_salida_estampado`,
    `tfpe`.`cantidad_salida_estampado` AS `cantidad_salida_estampado`,
    `tfpe`.`fec_ingreso_estampado` AS `fec_ingreso_estampado`,
    `tfpe`.`guia_ingreso_estampado` AS `guia_ingreso_estampado`,
    `tfpe`.`cantidad_ingreso_estampado` AS `cantidad_ingreso_estampado`,
    `tfpe`.`fec_ingreso_estampado2` AS `fec_ingreso_estampado2`,
    `tfpe`.`guia_ingreso_estampado2` AS `guia_ingreso_estampado2`,
    `tfpe`.`cantidad_ingreso_estampado2` AS `cantidad_ingreso_estampado2`,
    `tfpe`.`fec_ingreso_estampado3` AS `fec_ingreso_estampado3`,
    `tfpe`.`guia_ingreso_estampado3` AS `guia_ingreso_estampado3`,
    `tfpe`.`cantidad_ingreso_estampado3` AS `cantidad_ingreso_estampado3`,
    `tfpe`.`fec_termino_estampado` AS `fec_termino_estampado`,
    `tfpe`.`fallas_estampado` AS `fallas_estampado`,
    `tfpe`.`fallas_tela_estampado` AS `fallas_tela_estampado`,
    `tfpe`.`piezas_incomp_estampado` AS `piezas_incomp_estampado`,
    `tfpe`.`auditoria_estampado` AS `auditoria_estampado`,
    `tfpe`.`estado_estampado` AS `estado_estampado`,
    `tfpe`.`observaciones_fase_estampado` AS `observaciones_fase_estampado`,
    `tfpl`.`responsable_lavanderia` AS `responsable_lavanderia`,
    `tfpl`.`precio_lavanderia` AS `precio_lavanderia`,
    `tfpl`.`fec_salida_lavanderia` AS `fec_salida_lavanderia`,
    `tfpl`.`guia_salida_lavanderia` AS `guia_salida_lavanderia`,
    `tfpl`.`cantidad_salida_lavanderia` AS `cantidad_salida_lavanderia`,
    `tfpl`.`fec_ingreso_lavanderia` AS `fec_ingreso_lavanderia`,
    `tfpl`.`guia_ingreso_lavanderia` AS `guia_ingreso_lavanderia`,
    `tfpl`.`cantidad_ingreso_lavanderia` AS `cantidad_ingreso_lavanderia`,
    `tfpl`.`fec_ingreso_lavanderia2` AS `fec_ingreso_lavanderia2`,
    `tfpl`.`guia_ingreso_lavanderia2` AS `guia_ingreso_lavanderia2`,
    `tfpl`.`cantidad_ingreso_lavanderia2` AS `cantidad_ingreso_lavanderia2`,
    `tfpl`.`fec_ingreso_lavanderia3` AS `fec_ingreso_lavanderia3`,
    `tfpl`.`guia_ingreso_lavanderia3` AS `guia_ingreso_lavanderia3`,
    `tfpl`.`cantidad_ingreso_lavanderia3` AS `cantidad_ingreso_lavanderia3`,
    `tfpl`.`fec_termino_lavanderia` AS `fec_termino_lavanderia`,
    `tfpl`.`fallas_lavanderia` AS `fallas_lavanderia`,
    `tfpl`.`fallas_tela_lavanderia` AS `fallas_tela_lavanderia`,
    `tfpl`.`piezas_incomp_lavanderia` AS `piezas_incomp_lavanderia`,
    `tfpl`.`auditoria_lavanderia` AS `auditoria_lavanderia`,
    `tfpl`.`estado_lavanderia` AS `estado_lavanderia`,
    `tfpl`.`observaciones_fase_lavanderia` AS `observaciones_fase_lavanderia`,
    `tfpb`.`responsable_bordado` AS `responsable_bordado`,
    `tfpb`.`precio_bordado` AS `precio_bordado`,
    `tfpb`.`fec_salida_bordado` AS `fec_salida_bordado`,
    `tfpb`.`guia_salida_bordado` AS `guia_salida_bordado`,
    `tfpb`.`cantidad_salida_bordado` AS `cantidad_salida_bordado`,
    `tfpb`.`fec_ingreso_bordado` AS `fec_ingreso_bordado`,
    `tfpb`.`guia_ingreso_bordado` AS `guia_ingreso_bordado`,
    `tfpb`.`cantidad_ingreso_bordado` AS `cantidad_ingreso_bordado`,
    `tfpb`.`fec_ingreso_bordado2` AS `fec_ingreso_bordado2`,
    `tfpb`.`guia_ingreso_bordado2` AS `guia_ingreso_bordado2`,
    `tfpb`.`cantidad_ingreso_bordado2` AS `cantidad_ingreso_bordado2`,
    `tfpb`.`fec_ingreso_bordado3` AS `fec_ingreso_bordado3`,
    `tfpb`.`guia_ingreso_bordado3` AS `guia_ingreso_bordado3`,
    `tfpb`.`cantidad_ingreso_bordado3` AS `cantidad_ingreso_bordado3`,
    `tfpb`.`fec_termino_bordado` AS `fec_termino_bordado`,
    `tfpb`.`fallas_bordado` AS `fallas_bordado`,
    `tfpb`.`fallas_tela_bordado` AS `fallas_tela_bordado`,
    `tfpb`.`piezas_incomp_bordado` AS `piezas_incomp_bordado`,
    `tfpb`.`auditoria_bordado` AS `auditoria_bordado`,
    `tfpb`.`estado_bordado` AS `estado_bordado`,
    `tfpb`.`observaciones_fase_bordado` AS `observaciones_fase_bordado`,
    `tfpa`.`responsable_acabados` AS `responsable_acabados`,
    `tfpa`.`precio_acabados` AS `precio_acabados`,
    `tfpa`.`fec_salida_acabados` AS `fec_salida_acabados`,
    `tfpa`.`guia_salida_acabados` AS `guia_salida_acabados`,
    `tfpa`.`cantidad_salida_acabados` AS `cantidad_salida_acabados`,
    `tfpa`.`fec_ingreso_acabados` AS `fec_ingreso_acabados`,
    `tfpa`.`guia_ingreso_acabados` AS `guia_ingreso_acabados`,
    `tfpa`.`cantidad_ingreso_acabados` AS `cantidad_ingreso_acabados`,
    `tfpa`.`fec_ingreso_acabados2` AS `fec_ingreso_acabados2`,
    `tfpa`.`guia_ingreso_acabados2` AS `guia_ingreso_acabados2`,
    `tfpa`.`cantidad_ingreso_acabados2` AS `cantidad_ingreso_acabados2`,
    `tfpa`.`fec_ingreso_acabados3` AS `fec_ingreso_acabados3`,
    `tfpa`.`guia_ingreso_acabados3` AS `guia_ingreso_acabados3`,
    `tfpa`.`cantidad_ingreso_acabados3` AS `cantidad_ingreso_acabados3`,
    `tfpa`.`fec_termino_acabados` AS `fec_termino_acabados`,
    `tfpa`.`fallas_acabados` AS `fallas_acabados`,
    `tfpa`.`fallas_tela_acabados` AS `fallas_tela_acabados`,
    `tfpa`.`piezas_incomp_acabados` AS `piezas_incomp_acabados`,
    `tfpa`.`auditoria_acabados` AS `auditoria_acabados`,
    `tfpa`.`estado_acabados` AS `estado_acabados`,
    `tfpa`.`observaciones_fase_acabados` AS `observaciones_fase_acabados`,
    if((`tfpa`.`estado_acabados` is not null AND `tfpa`.`estado_acabados` <> '-'),
    'ACABADOS',
    if((`tfpb`.`estado_bordado` is not null AND `tfpb`.`estado_bordado` <> '-'),
    'BORDADO',
    if((`tfpl`.`estado_lavanderia` is not null AND `tfpl`.`estado_lavanderia` <> '-'),
    'LAVANDERIA',
    if((`tfpe`.`estado_estampado` is not null AND `tfpe`.`estado_estampado` <> '-'),
    'ESTAMPADO',
    if((`tfpoj`.`estado_hojalboton` is not null AND `tfpoj`.`estado_hojalboton` <> '-'),
    'OJAL BOTON',
    if((`tfpc`.`estado_confeccion` is not null AND `tfpc`.`estado_confeccion` <> '-'),
    'CONFECCION',
    if((`tfph`.`estado_corte` is not null AND `tfph`.`estado_corte` <> '-'),
    'CORTE',
    if((`tfpm`.`estado_molde` is not null AND `tfpm`.`estado_molde` <> '-'),
    'MOLDES',
    if((`tfpt`.`estado_telas` is not null AND `tfpt`.`estado_telas` <> '-'),
    'TELAS',
    'ORDENES'))))))))) AS `status`
from
    (((((((((`BD_FACTURADOR`.`tbl2_fases_prod_ordenes` `tfpo`
left join `BD_FACTURADOR`.`tbl2_fases_prod_telas` `tfpt` on
    ((`tfpo`.`idx` = `tfpt`.`id_cab_orden`)))
left join `BD_FACTURADOR`.`tbl2_fases_prod_molde` `tfpm` on
    ((`tfpo`.`idx` = `tfpm`.`id_cab_orden`)))
left join `BD_FACTURADOR`.`tbl2_fases_prod_hojacorte` `tfph` on
    ((`tfpo`.`idx` = `tfph`.`id_cab_orden`)))
left join `BD_FACTURADOR`.`tbl2_fases_prod_confeccion` `tfpc` on
    ((`tfpo`.`idx` = `tfpc`.`id_cab_orden`)))
left join `BD_FACTURADOR`.`tbl2_fases_prod_ojalboton` `tfpoj` on
    ((`tfpo`.`idx` = `tfpoj`.`id_cab_orden`)))
left join `BD_FACTURADOR`.`tbl2_fases_prod_estampado` `tfpe` on
    ((`tfpo`.`idx` = `tfpe`.`id_cab_orden`)))
left join `BD_FACTURADOR`.`tbl2_fases_prod_lavanderia` `tfpl` on
    ((`tfpo`.`idx` = `tfpl`.`id_cab_orden`)))
left join `BD_FACTURADOR`.`tbl2_fases_prod_bordado` `tfpb` on
    ((`tfpo`.`idx` = `tfpb`.`id_cab_orden`)))
left join `BD_FACTURADOR`.`tbl2_fases_prod_acabados` `tfpa` on
    ((`tfpo`.`idx` = `tfpa`.`id_cab_orden`)));

SELECT 
tfpo.estado_orden,
tfpt.estado_telas,
tfpm.estado_molde,
tfph.estado_corte,
tfpc.estado_confeccion,
tfpoj.estado_hojalboton,
tfpe.estado_estampado,
tfpl.estado_lavanderia,
tfpb.estado_bordado,
tfpa.estado_acabados,
if((`tfpa`.`estado_acabados` is not null AND `tfpa`.`estado_acabados` <> '-'),
    'ACABADOS',
    if((`tfpb`.`estado_bordado` is not null AND `tfpb`.`estado_bordado` <> '-'),
    'BORDADO',
    if((`tfpl`.`estado_lavanderia` is not null AND `tfpl`.`estado_lavanderia` <> '-'),
    'LAVANDERIA',
    if((`tfpe`.`estado_estampado` is not null AND `tfpe`.`estado_estampado` <> '-'),
    'ESTAMPADO',
    if((`tfpoj`.`estado_hojalboton` is not null AND `tfpoj`.`estado_hojalboton` <> '-'),
    'OJAL BOTON',
    if((`tfpc`.`estado_confeccion` is not null AND `tfpc`.`estado_confeccion` <> '-'),
    'CONFECCION',
    if((`tfph`.`estado_corte` is not null AND `tfph`.`estado_corte` <> '-'),
    'CORTE',
    if((`tfpm`.`estado_molde` is not null AND `tfpm`.`estado_molde` <> '-'),
    'MOLDES',
    if((`tfpt`.`estado_telas` is not null AND `tfpt`.`estado_telas` <> '-'),
    'TELAS',
    'ORDENES'))))))))) AS `status`
from
    (((((((((`BD_FACTURADOR`.`tbl2_fases_prod_ordenes` `tfpo`
left join `BD_FACTURADOR`.`tbl2_fases_prod_telas` `tfpt` on
    ((`tfpo`.`idx` = `tfpt`.`id_cab_orden`)))
left join `BD_FACTURADOR`.`tbl2_fases_prod_molde` `tfpm` on
    ((`tfpo`.`idx` = `tfpm`.`id_cab_orden`)))
left join `BD_FACTURADOR`.`tbl2_fases_prod_hojacorte` `tfph` on
    ((`tfpo`.`idx` = `tfph`.`id_cab_orden`)))
left join `BD_FACTURADOR`.`tbl2_fases_prod_confeccion` `tfpc` on
    ((`tfpo`.`idx` = `tfpc`.`id_cab_orden`)))
left join `BD_FACTURADOR`.`tbl2_fases_prod_ojalboton` `tfpoj` on
    ((`tfpo`.`idx` = `tfpoj`.`id_cab_orden`)))
left join `BD_FACTURADOR`.`tbl2_fases_prod_estampado` `tfpe` on
    ((`tfpo`.`idx` = `tfpe`.`id_cab_orden`)))
left join `BD_FACTURADOR`.`tbl2_fases_prod_lavanderia` `tfpl` on
    ((`tfpo`.`idx` = `tfpl`.`id_cab_orden`)))
left join `BD_FACTURADOR`.`tbl2_fases_prod_bordado` `tfpb` on
    ((`tfpo`.`idx` = `tfpb`.`id_cab_orden`)))
left join `BD_FACTURADOR`.`tbl2_fases_prod_acabados` `tfpa` on
    ((`tfpo`.`idx` = `tfpa`.`id_cab_orden`)));

select *from tbl2_almacen ta where ruc_ = '20522094120' and nom like '%VERDES%'
select *From tab_MovCajaCierre tmcc
select *from tab_MovCajaIngEgresos tmcie
select *From tbl2_almacen_gastos tag
select *from tbl2_prod_color_talla_hq tpcth
select *from tbl2_almacen_metas tam
select *from tbl2_pagos_multiples tpm
select *From tbl2_CDP_ADI tca
select *from tbl2_CDP_cab tcc
select *from tbl2_colores tc 

select *From tbl2_CDP_cab tcc where ruc_ = '20522094120' and ANEXO = 436
select *From tbl2_productos tp where nom like '%PANTALON%'


select *from tbl2_almacen ta where ruc_ = '20522094120' and 
select *From tbl2_CDP_cab tcc 
inner join tbl2_CDP_det_2023 tcd on tcc.idx = tcd.CDP
where tcc.ruc_ = '20522094120' and tcc.ANEXO = 436

select *from tbl2_CDP_cab tcc 
select *from tbl2_CDP_det_
select *from tbl2_almacen where ruc_ = '20522094120' and idx = 462
select *from tbl2_almacen where ruc_ = '20522094120' and nom like '%AGUAS%'
select *from tab_MovCajaIngEgresos where ruc_ = '20522094120' and su

select *from tbl2_abonos ta

select consolidado.* from 
(select tr.idx,tr.nom,sum(tad.cantidad) as total From tbl2_rubros tr 
inner join tbl2_productos tp on tp.RUBROS = tr.idx 
inner join tbl2_almacen_det tad on tad.id_cabprod = tp.idx 
inner join tbl2_almacen ta on tad.id_CAB_DET = ta.idx 
where tp.ruc_ = '20522094120' and ta.idx not in (531,562,540,570) and tad.estado = 1 and ta.visibilidad_tienda = 1 group by tr.idx,tr.nom) as consolidado 
order by consolidado.total desc

select *from tbl2_almacen
select *From tbl2_subproductos where 

select *from tbl2_CDP_det_2023
select *from tbl2_productos

select ta.nom,UPPER(TRIM(tr.nom)) as rubro,SUBSTR(tp.nom,1,20) as producto,tcd.nombre_nuevo,sum(tcd.cantidad) as cantidad from tbl2_CDP_cab tcc 
inner join tbl2_CDP_det_2023 tcd on tcc.idx = tcd.CDP 
inner join tbl2_almacen ta on tcc.ANEXO = ta.idx
inner join tbl2_productos tp on tcd.a = tp.idx
left join tbl2_rubros tr on tr.idx = tp.RUBROS
where tcc.ruc_ in ('20522094120','10462873684') and tcc.usu_del is null and tcc.EST <> 'C'
and (str_to_date(cast(date_format(tcc.`fec_ope`, '%d/%m/%Y') as char charset utf8mb4),'%d/%m/%Y') >= str_to_date('01/12/2023','%d/%m/%Y')
and str_to_date(cast(date_format(tcc.`fec_ope`, '%d/%m/%Y') as char charset utf8mb4),'%d/%m/%Y') <= str_to_date('01/01/2024','%d/%m/%Y'))
group by ta.nom,tr.nom,tp.nom,tcd.nombre_nuevo

UNION ALL

select ta.nom,UPPER(TRIM(tr.nom)) as rubro,SUBSTR(tp.nom,1,20) as producto,tcd.nombre_nuevo,sum(tcd.cantidad) as cantidad from tbl2_CDP_cab tcc 
inner join tbl2_CDP_det tcd on tcc.idx = tcd.CDP 
inner join tbl2_almacen ta on tcc.ANEXO = ta.idx
inner join tbl2_productos tp on tcd.PRODUCTO = tp.idx
left join tbl2_rubros tr on tr.idx = tp.RUBROS
where tcc.ruc_ in ('20522094120','10462873684') and tcc.usu_del is null and tcc.EST <> 'C'
and (str_to_date(cast(date_format(tcc.`fec_ope`, '%d/%m/%Y') as char charset utf8mb4),'%d/%m/%Y') >= str_to_date('01/12/2023','%d/%m/%Y')
and str_to_date(cast(date_format(tcc.`fec_ope`, '%d/%m/%Y') as char charset utf8mb4),'%d/%m/%Y') <= str_to_date('01/01/2024','%d/%m/%Y'))
group by ta.nom,tr.nom,tp.nom,tcd.nombre_nuevo

select *from tbl2_almacen_gastos tag where
select *From viewProduccionOrdenes vpo 

select *from tbl2_productos where nom like '%PANTALON OVERSIZE PRAGA%'
278333

select id_CAB_DET from tbl2_almacen_det tad where id_cabprod = 278333 and estado = 1
group by id_CAB_DET 

select *from tbl2_almacen ta where idx in (
436,
518,
570
)

select *from viewProduccionOrdenes vpo 

select *from tbl2_almacen ta where ruc_ = '20522094120' and nom like '%AGUAS%'
select *from tbl2_productos tp where nom like '%CAMISA NEVER%'
select *from tbl2_CDP_cab tcc where ruc_ = '20522094120' and ANEXO = 
567
select *from tbl2_productos where nom like '%PANTALON%'
select *from tbl2_productos where nom like '%PANTALON%'

select *from tbl2_CDP_det
select *from tbl2_almacen ta where ruc_ = '20522094120' and visibilidad_tienda = 1
540	20522094120	T	20	TIENDA ECOMMERCE
544	20522094120	T	22	MALL PLAZA BELLAVISTA
562	20522094120	T	23	TIENDA ONLINE

select *from tbl2_CDP_cab tcc where ANEXO in (540,562) and MONTH(tcc.fec_ope) = 12

select *from tbl2_CDP_det tcd where ruc


select *from tbl2_productos where ruc_ = '20522094120'
select *From tbl2_CDP_cab tcc 
inner joi
where tcc.ruc_ = '20522094120' and 

select *From tbl2_productos tp where ruc_ = '20522094120' and nom like '%JOGGER%' and isbn is not NULL 

388
298410
select tcc.* from tbl2_CDP_cab tcc 
inner join tbl2_CDP_det_2023 tcd on tcc.idx = tcd.CDP
where tcc.ruc_ = '20522094120' and tcc.ANEXO = 388 and tcc.fec_ope > '2024-09-17'
and tcd.nombre_nuevo like '%PACK JOGGER%'

1838574	20522094120	247	BO	388	6809	03	2024-10-05 00:00:00		193886

select tamc.* from tbl2_almacen_mov_cab tamc
inner join tbl2_almacen_mov_det tamd on tamc.idx = tamd.id_comprobante_CAB 

select *from tbl2_almacen_mov_det

select *from tbl2_subproductos ts 
 
select *from tbl2_productos where ruc_ = '20522094120' and nom like '%PACK JOGGER%'
select *From tbl2_almacen_det tad where id_CAB_det = 388 and estado = 1
select *From tbl2_CDP_cab tcc where ruc_ = '20522094120'
select *from tbl2_almacen ta where ruc_ = '20522094120'
select *from tbl2_orden_cotizacion_cab tocc 

select *from tbl2_productos where idx = 271113
select *from tbl2_productos where idx = 292379
select *From tbl2_almacen_metas tam where ruc_ = '20522094120'

685
select *from tbl2_inventario_cab tic where idx_alm = 388 order by created_at desc
select *from tbl2_inventario_det tid where id_inventario_CAB

select *From viewVentasMetas_v3 vvmv where tienda like '%AZUL 6%' 
select *from tbl2_produccion_config 

select *from tbl2_almacen ta where ruc_ = '20522094120' and nom like '%AGUAS%'

select *from tbl2_CDP_cab tcc
inner join tbl2_CDP_det_2023 tcd on tcc.idx = tcd.CDP
where tcc.ruc_ = '20522094120' and tcc.ANEXO = 567


SELECT mes,dia,tienda,ANEXO,tot_vta,meta_diaria FROM viewVentasMetas_v3 
WHERE anio = 2024 AND fecha_operacion BETWEEN '2024-11-06' AND '2024-11-12' ORDER BY mes,dia,tienda ASC

SELECT mes,dia,tienda,ANEXO,sum(tot_vta) as total, AVG(meta_diaria) as meta FROM viewVentasMetas_v3 
WHERE anio = 2024 AND fecha_operacion BETWEEN '2024-11-06' AND '2024-11-07' and ANEXO not in (390,447)
GROUP BY mes,dia,tienda,ANEXO
ORDER BY mes,dia,tienda ASC


SELECT mes,dia,tienda,ANEXO,sum(tot_vta) as total, AVG(meta_diaria) as meta FROM viewVentasMetas_v3 
WHERE anio = 2024 AND fecha_operacion BETWEEN '2024-10-28' AND '2024-11-05' and ANEXO not in (390,447)
GROUP BY mes,dia,tienda,ANEXO
ORDER BY mes,dia,tienda ASC

select *from tbl2_almacen ta where ruc_ = '20522094120'

SELECT mes,dia,tienda,ANEXO,sum(tot_vta) as total, AVG(meta_diaria) as meta FROM viewVentasMetas_v3 
WHERE anio = 2024 AND fecha_operacion = '2024-11-09' and ANEXO not in (390,447)
GROUP BY mes,dia,tienda,ANEXO
ORDER BY mes,dia,tienda ASC

select *from tbl2_almacen where ruc_ = '20522094120'

SELECT condicion,avg(meta_diaria) as meta_diaria,sum(tot_vta) as tot_vta FROM viewVentasMetas_v3 
WHERE anio = 2024 AND fecha_operacion = '2024-11-09' and ANEXO = 436
group by condicion

select *from tbl2_CDP_cab where ruc_ = '20522094120'

select *From viewVentasMetas_v3 vvmv where tienda like '%METRO SAN%'

SELECT condicion,avg(meta_diaria) as meta_diaria,sum(tot_vta) as tot_vta 
FROM viewVentasMetas_v3 
WHERE anio = 2024 AND fecha_operacion = '2024-11-09' and ANEXO = 436 group by condicion

select *from tbl2_almacen where ruc_ = '20522094120'
select *from tbl2_almacen ta where ruc_ = '20522094120' and nom like '%AREQUIPA%'

select *from viewVentasMetas_v3 limit 10

SELECT fecha_operacion,anio,mes,dia,tienda,ANEXO,SUM(tot_vta) as tot_vta,AVG(meta_diaria) as meta FROM viewVentasMetas_v3 
WHERE anio = 2024 AND fecha_operacion BETWEEN '2024-10-30' AND '2024-11-05' 
GROUP BY fecha_operacion,mes,dia,tienda,ANEXO 
ORDER BY fecha_operacion,anio,mes,dia,tienda ASC

select *from tbl2_almacen ta where ruc_ = '20522094120'

select tcc.*from tbl2_CDP_cab tcc 
inner join tbl2_CDP_det_2023 tcd on tcc.idx = tcd.CDP 
where tcc.ruc_ = '20522094120' and tcc.ANEXO = 436
order by fec_ope desc

select *from viewVentasMetas_v3 where fecha_operacion = '2024-11-8'


SELECT condicion,avg(meta_diaria) as meta_diaria,sum(tot_vta) as tot_vta 
FROM viewVentasMetas_v3 WHERE anio = 2024 AND fecha_operacion = '2024-11-8' 
and tienda like '%GAMARRA 940%' group by condicion

select *from tbl2_almacen where ruc_ = '20522094120'
select *from viewVentasMetas_v3 limit 100 

select *from viewProduccionOrdenes vpo limit 10
select *from tbl2_fases_prod_ordenes 

select *from tbl2_fases_prod_ordenes tfpo 
inner join tbl2_fases_prod_telas tfpt on tfpo.idx = tfpt.id_cab_orden 
where tfpo.oc = '2024532'

select *from tbl_user where ruc = '20522094120'

select *from tbl2_almacen ta where ruc_ = '20522094120'
select *from tbl2_operaciones_op too 
select *From tbl2_fases_prod_telas tfpt
select *from tbl2_fases_prod_hojacorte tfph 

select *from tbl2_fases_prod_confeccion tfpc  where id_cab_orden = 28
select *from tbl2_fases_prod_ojalboton tfpo where id_cab_orden = 28
select *from tbl2_fases_prod_molde tfpm where id_cab_orden = 28

select *from tbl2_fases_prod_ordenes tfpo 
select *from tbl2_fases_prod_hojacorte tfph 
select *from tbl2_fases_prod_confeccion tfpc 
select *from tbl2_fases_prod_telas tfpt 
select *from tbl2_fases_prod_ojalboton tfpo
select *from tbl2_fases_prod_estampado tfpe 
select *from tbl2_fases_prod_lavanderia tfpl 
select *from tbl2_fases_prod_bordado tfpb 
select *from tbl2_fases_prod_acabados tfpa 

655806	facturador_seguro	38.25.17.165:2408	BD_FACTURADOR	Sleep	20	

 
SELECT *FROM information_schema.processlist 
WHERE Command = 'Sleep' and User = 'facturador_seguro'
show processlist
KILL 665787

655806	facturador_seguro	38.25.17.165:2408	BD_FACTURADOR	Sleep	416	
656776	facturador_seguro	38.25.17.165:16252		Sleep	388	
656786	facturador_seguro	38.25.17.165:16557	BD_FACTURADOR	Query	0	starting
657304	facturador_seguro	38.25.17.165:3587	BD_FACTURADOR	Sleep	18	

SELECT CONCAT('KILL ', Id, ';') 
FROM information_schema.processlist 
WHERE Command = 'Sleep' and User = 'facturador_seguro'
	
select *From tbl2_preciosxtienda tp 
select *from tbl2_almacen ta where ruc_ = '20522094120'

select *from tbl2_productos tp where tp.ruc_ = '20522094120' and nom like '%MOCHILA LEVI%'
select *from tbl2_preciosxtienda where idx_CAB_PROD = 10074

select idx,oc,estado_acabados,estado_bordado,estado_lavanderia,estado_estampado,estado_hojalboton,estado_confeccion,estado_corte,estado_molde,estado_telas
from viewProduccionOrdenes vpo where oc = '2024550' limit 10

select *From tbl2_fases_prod_ojalboton tfpo where id_cab_orden = 39
select *from tbl2_fases_prod_molde
insert into tbl2_fases_prod_molde

select *from jefferson_detalle tb2
select 0,tb1.idx,tb2.responsable,tb2.molde,tb2.muestra,tb2.lavado,tb2.cliente_corte,tb2.tizado,tb2.estado_molde,tb2.observaciones_fase_molde,NOW() from jefferson_detalle tb2
inner join jefferson_cabecera tb1 on tb1.idx = tb2.idx 
where tb2.idx = 32


select *from tbl2_fases_prod_molde

update tbl2_fases_prod_molde set responsable = molde
update tbl2_fases_prod_molde set molde = muestra
update tbl2_fases_prod_molde set muestra = lavado
update tbl2_fases_prod_molde set lavado = cliente_corte 
update tbl2_fases_prod_molde set cliente_corte = tizado
update tbl2_fases_prod_molde set tizado = estado_molde 
update tbl2_fases_prod_molde set estado_molde  = observaciones_fase_molde 
update tbl2_fases_prod_molde set observaciones_fase_molde  = null




