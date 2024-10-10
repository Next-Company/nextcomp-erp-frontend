import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../Atoms/Button/Button";
import { Input } from "../Atoms/Input/Input";
import { InputSelect } from "../Atoms/Input/InputSelect";
import { toast } from "react-toastify";
import { ModalWindowContext } from "../ModalWindow/ModalWindowContext";
import { Consulta } from "../../utils/utils";
import { Search } from "../Atoms/Search/Search";
import { useNavigate, useParams } from "react-router-dom";
import { InputMultiSelect } from "../Atoms/Input/InputMultiSelect";

const listTables = [
  'tbl2_fases_prod_ordenes',
  'tbl2_fases_prod_telas',
  'tbl2_fases_prod_molde',
  'tbl2_fases_prod_hojacorte',
  'tbl2_fases_prod_confeccion',
  'tbl2_fases_prod_ojalboton',
  'tbl2_fases_prod_estampado',
  'tbl2_fases_prod_lavanderia',
  'tbl2_fases_prod_bordado',
  'tbl2_fases_prod_acabados'
]
function FormFase({ position, info}) {
  console.log(info)
  return(
    <>
      <div className={` flex-col gap-3 pt-4 ${position == 0 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3">
          <Input name={'idx'} defaults={info.length > 0 ? info[0].idx : null} type="hidden" />
          <Input name={'oc'} title="OC" defaults={info.length > 0 ? info[0].oc : null} type="text" />
          <InputSelect title={'Cliente'} name={"cliente"} data={[{ indice: 'ESTILOS', option: 'ESTILOS', selected: true }, { indice: 'NEXT COMPANY', option: 'NEXT COMPANY' }]} df={info.length > 0 ? info[0].cliente : null} />
          <Input name={'fec_emitida'} defaults={info.length > 0 ? info[0].fec_emitida : null} title="FechaEmision" type="date" />
          <Input name={'fec_entrega'} defaults={info.length > 0 ? info[0].fec_entrega : null} title="FechaEntrega" type="date" />
          <InputSelect title={'Categoria'} name={"categoria"} data={[{ indice: 'IMPL', option: 'CONFECCION', selected: true }, { indice: 'SOPT', option: 'OJAL Y BOTON' }, { indice: 'PRCT', option: 'ESTAMPADO' }, { indice: 'PRCT', option: 'LAVANDERIA' }, { indice: 'PRCT', option: 'BORDADO' }, { indice: 'PRCT', option: 'ACABADOS' }]} df={'PRCT'} />
        </div>
        <div className="flex gap-3">
          <Input name={'marca'} defaults={info.length > 0 ? info[0].marca : null} title="Marca" type="text" />
          <Input name={'producto'} defaults={info.length > 0 ? info[0].producto : null} title="Producto" type="text" />
          <Input name={'base'} defaults={info.length > 0 ? info[0].base : null} title="Base" type="text" />
          <Input name={'precio'} defaults={info.length > 0 ? info[0].precio : null} title="Precio" type="number" />
          <Input name={'modelos'} defaults={info.length > 0 ? info[0].modelos : null} title="Modelo" type="text" />
        </div>
        {/* <div className="flex-col gap-3 w-[250px]"> */}
        {/* <div className="flex gap-3 flex-wrap justify-start"> */}
          
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo1_orden'} defaults={info.length > 0 ? info[0].combo1_orden : null} title="Combo1" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo2_orden'} defaults={info.length > 0 ? info[0].combo2_orden : null} title="Combo2" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo3_orden'} defaults={info.length > 0 ? info[0].combo3_orden : null} title="Combo3" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo4_orden'} defaults={info.length > 0 ? info[0].combo4_orden : null} title="Combo4" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo5_orden'} defaults={info.length > 0 ? info[0].combo5_orden : null} title="Combo5" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo6_orden'} defaults={info.length > 0 ? info[0].combo6_orden : null} title="Combo6" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo7_orden'} defaults={info.length > 0 ? info[0].combo7_orden : null} title="Combo7" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo8_orden'} defaults={info.length > 0 ? info[0].combo8_orden : null} title="Combo8" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo9_orden'} defaults={info.length > 0 ? info[0].combo9_orden : null} title="Combo9" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo10_orden'} defaults={info.length > 0 ? info[0].combo10_orden : null} title="Combo10" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo11_orden'} defaults={info.length > 0 ? info[0].combo11_orden : null} title="Combo11" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo12_orden'} defaults={info.length > 0 ? info[0].combo12_orden : null} title="Combo12" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo13_orden'} defaults={info.length > 0 ? info[0].combo13_orden : null} title="Combo13" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo14_orden'} defaults={info.length > 0 ? info[0].combo14_orden : null} title="Combo14" type="number" />
          </div>
        </div>
      </div>
      <div className={` flex-col gap-3 pt-4 ${position == 1 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3">
          {/* <Input name={'id_cab_orden'} defaults={info.length > 0 && info[0].idx ? info[0].idx : null} type="hidden" /> */}
          <Input name={'orden_pedido'} defaults={info.length > 0 && info[0].orden_pedido ? info[0].orden_pedido : null} title="Orden Pedido" type="text" />
          <Input name={'fec_pedido'} defaults={info.length > 0 && info[0].fec_pedido ? info[0].fec_pedido : null} title="FechaPedido" type="date" />
          <Input name={'proveedor'} defaults={info.length > 0 && info[0].proveedor ? info[0].proveedor : null} title="Proveedor" type="text" />
          <Input name={'tela'} defaults={info.length > 0 && info[0].tela ? info[0].tela : null} title="Tela" type="text" />
        </div>
        <div className="flex gap-3">
          <Input name={'articulo'} defaults={info.length > 0 && info[0].articulo ? info[0].articulo : null} title="Articulo" type="text" />
          <Input name={'guia_ingreso'} defaults={info.length > 0 && info[0].guia_ingreso ? info[0].guia_ingreso : null} title="GuiaIngreso" type="text" />
          <Input name={'estado_telas'} defaults={info.length > 0 && info[0].estado ? info[0].estado : null} title="Estado" type="text" />
        </div>
      </div>
      <div className={` flex-col gap-3 pt-4 ${position == 2 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3">
          {/* <Input name={'id_cab_orden'} defaults={info.length > 0 && info[0].idx ? info[0].idx : null}  type="hidden" /> */}
          <Input name={'responsable'} defaults={info.length > 0 && info[0].responsable ? info[0].responsable : null} title="Responsable" type="text" />
          <Input name={'molde'} defaults={info.length > 0 && info[0].molde ? info[0].molde : null}  title="Molde" type="date" />
          <Input name={'muestra'} defaults={info.length > 0 && info[0].muestra ? info[0].muestra : null} title="Muestra" type="text" />
          <Input name={'lavado'} defaults={info.length > 0 && info[0].lavado ? info[0].lavado : null} title="Lavado" type="text" />
        </div>
        <div className="flex gap-3">
          <Input name={'cliente_corte'} defaults={info.length > 0 && info[0].cliente_corte ? info[0].cliente_corte : null} title="ClienteCorte" type="text" />
          <Input name={'tizado'} defaults={info.length > 0 && info[0].tizado ? info[0].tizado : null} title="Tizado" type="text" />
          <Input name={'estado_molde'} defaults={info.length > 0 && info[0].estado_molde ? info[0].estado_molde : null} title="Estado" type="text" />
        </div>
      </div>
      <div className={` flex-col gap-3 pt-4 ${position == 3 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[250px]">
            {/* <Input name={'id_cab_orden'} defaults={info.length > 0 && info[0].idx ? info[0].idx : null} type="hidden" /> */}
            <Input name={'nro_corte'} defaults={info.length > 0 && info[0].nro_corte ? info[0].nro_corte : null} title="#HojaCorte" type="text" />
          </div>
          {/* <div className="flex-1 min-w-[350px]">
            <InputMultiSelect title={'RutaProceso'} name={"cliente"} data={[
              { indice: 'CONFECCION', option: 'CONFECCION', selected: true }, 
              { indice: 'OJAL_BOTON', option: 'OJAL_BOTON' },
              { indice: 'ESTAMPADO', option: 'ESTAMPADO' },
              { indice: 'LAVANDERIA', option: 'LAVANDERIA' },
              { indice: 'BORDADO', option: 'BORDADO' },
              { indice: 'ACABADOS', option: 'ACABADOS' },
              ]} df={'PRCT'} 
            />
          </div> */}
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo1_corte'} defaults={info.length > 0 && info[0].combo1_corte ? info[0].combo1_corte : null} title="Combo1" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo2_corte'} defaults={info.length > 0 && info[0].combo2_corte ? info[0].combo2_corte : null} title="Combo2" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo3_corte'} defaults={info.length > 0 && info[0].combo3_corte ? info[0].combo3_corte : null} title="Combo3" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo4_corte'} defaults={info.length > 0 && info[0].combo4_corte ? info[0].combo4_corte : null} title="Combo4" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo5_corte'} defaults={info.length > 0 && info[0].combo5_corte ? info[0].combo5_corte : null} title="Combo5" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo6_corte'} defaults={info.length > 0 && info[0].combo6_corte ? info[0].combo6_corte : null} title="Combo6" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo7_corte'} defaults={info.length > 0 && info[0].combo7_corte ? info[0].combo7_corte : null} title="Combo7" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo8_corte'} defaults={info.length > 0 && info[0].combo8_corte ? info[0].combo8_corte : null} title="Combo8" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo9_corte'} defaults={info.length > 0 && info[0].combo9_corte ? info[0].combo9_corte : null} title="Combo9" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo10_corte'} defaults={info.length > 0 && info[0].combo10_corte ? info[0].combo10_corte : null} title="Combo10" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo11_corte'} defaults={info.length > 0 && info[0].combo11_corte ? info[0].combo11_corte : null} title="Combo11" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo12_corte'} defaults={info.length > 0 && info[0].combo12_corte ? info[0].combo12_corte : null} title="Combo12" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo13_corte'} defaults={info.length > 0 && info[0].combo13_corte ? info[0].combo13_corte : null} title="Combo13" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo14_corte'} defaults={info.length > 0 && info[0].combo14_corte ? info[0].combo14_corte : null} title="Combo14" type="number" />
          </div>
        </div>
      </div>
      <div className={` flex-col gap-3 pt-4 ${position == 4 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3">
          {/* <Input name={'id_cab_orden'} defaults={info.length > 0 && info[0].idx ? info[0].idx : null} type="hidden" /> */}
          <Input name={'responsable_confeccion'} defaults={info.length > 0 && info[0].responsable_confeccion ? info[0].responsable_confeccion : null} title="Responsable" type="text" />
          <Input name={'precio_confeccion'} defaults={info.length > 0 && info[0].precio_confeccion ? info[0].precio_confeccion : null} title="Precio" type="number" />
          <Input name={'fec_salida_confeccion'} defaults={info.length > 0 && info[0].fec_salida_confeccion ? info[0].fec_salida_confeccion : null} title="FechaSalida" type="date" />
          <Input name={'guia_salida_confeccion'} defaults={info.length > 0 && info[0].guia_salida_confeccion ? info[0].guia_salida_confeccion : null} title="GuiaSalida" type="text" />
        </div>
        <div className="flex gap-3">
          <Input name={'cantidad_salida_confeccion'} defaults={info.length > 0 && info[0].cantidad_salida_confeccion ? info[0].cantidad_salida_confeccion : null} title="CantidadSalida" type="number" />
          <Input name={'fec_ingreso_confeccion'} defaults={info.length > 0 && info[0].fec_ingreso_confeccion ? info[0].fec_ingreso_confeccion : null} title="FechaIngreso" type="date" />
          <Input name={'guia_ingreso_confeccion'} defaults={info.length > 0 && info[0].guia_ingreso_confeccion ? info[0].guia_ingreso_confeccion : null} title="GuiaIngreso" type="text" />
          <Input name={'cantidad_ingreso_confeccion'} defaults={info.length > 0 && info[0].cantidad_ingreso_confeccion ? info[0].cantidad_ingreso_confeccion : null} title="CantidadIngreso" type="number" />
          <Input name={'fec_termino_confeccion'} defaults={info.length > 0 && info[0].fec_termino_confeccion ? info[0].fec_termino_confeccion : null} title="FechaTermino" type="date" />
        </div>
        <div className="flex gap-3">
          <Input name={'fallas_confeccion'} defaults={info.length > 0 && info[0].fallas_confeccion ? info[0].fallas_confeccion : null} title="FallasConfeccion" type="number" />
          <Input name={'fallas_tela_confeccion'} defaults={info.length > 0 && info[0].fallas_tela_confeccion ? info[0].fallas_tela_confeccion : null} title="FallasTelas" type="number" />
          <Input name={'piezas_incomp_confeccion'} defaults={info.length > 0 && info[0].piezas_incomp_confeccion ? info[0].piezas_incomp_confeccion : null} title="PiezasIncompletas" type="number" />
          <Input name={'auditoria_confeccion'} defaults={info.length > 0 && info[0].auditoria_confeccion ? info[0].auditoria_confeccion : null} title="Auditoria" type="text" />
          <Input name={'estado_confeccion'} defaults={info.length > 0 && info[0].estado_confeccion ? info[0].estado_confeccion : null} title="Estado" type="text" />
        </div>
      </div>

      <div className={` flex-col gap-3 pt-4 ${position == 5 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3">
          {/* <Input name={'id_cab_orden'} defaults={info.length > 0 && info[0].idx ? info[0].idx : null} type="hidden" /> */}
          <Input name={'responsable_ojalboton'} defaults={info.length > 0 && info[0].responsable_ojalboton ? info[0].responsable_ojalboton : null} title="Responsable" type="text" />
          <Input name={'precio_ojalboton'} defaults={info.length > 0 && info[0].precio_ojalboton ? info[0].precio_ojalboton : null} title="Precio" type="number" />
          <Input name={'fec_salida_ojalboton'} defaults={info.length > 0 && info[0].fec_salida_ojalboton ? info[0].fec_salida_ojalboton : null} title="FechaSalida" type="date" />
          <Input name={'guia_salida_ojalboton'} defaults={info.length > 0 && info[0].guia_salida_ojalboton ? info[0].guia_salida_ojalboton : null} title="GuiaSalida" type="text" />
        </div>
        <div className="flex gap-3">
          <Input name={'cantidad_salida_ojalboton'} defaults={info.length > 0 && info[0].cantidad_salida_ojalboton ? info[0].cantidad_salida_ojalboton : null} title="CantidadSalida" type="number" />
          <Input name={'fec_ingreso_ojalboton'} defaults={info.length > 0 && info[0].fec_ingreso_ojalboton ? info[0].fec_ingreso_ojalboton : null} title="FechaIngreso" type="date" />
          <Input name={'guia_ingreso_ojalboton'} defaults={info.length > 0 && info[0].guia_ingreso_ojalboton ? info[0].guia_ingreso_ojalboton : null} title="GuiaIngreso" type="text" />
          <Input name={'cantidad_ingreso_ojalboton'} defaults={info.length > 0 && info[0].cantidad_ingreso_ojalboton ? info[0].cantidad_ingreso_ojalboton : null} title="CantidadIngreso" type="number" />
          <Input name={'fec_termino_ojalboton'} defaults={info.length > 0 && info[0].fec_termino_ojalboton ? info[0].fec_termino_ojalboton : null} title="FechaTermino" type="date" />
        </div>
        <div className="flex gap-3">
          <Input name={'fallas_ojalboton'} defaults={info.length > 0 && info[0].fallas_ojalboton ? info[0].fallas_ojalboton : null} title="FallasOjalBoton" type="number" />
          <Input name={'fallas_tela_ojalboton'} defaults={info.length > 0 && info[0].fallas_tela_ojalboton ? info[0].fallas_tela_ojalboton : null} title="FallasTelas" type="number" />
          <Input name={'piezas_incomp_ojalboton'} defaults={info.length > 0 && info[0].piezas_incomp_ojalboton ? info[0].piezas_incomp_ojalboton : null} title="PiezasIncompletas" type="number" />
          <Input name={'auditoria_ojalboton'} defaults={info.length > 0 && info[0].auditoria_ojalboton ? info[0].auditoria_ojalboton : null} title="Auditoria" type="text" />
          <Input name={'estado_ojalboton'} defaults={info.length > 0 && info[0].estado_ojalboton ? info[0].estado_ojalboton : null} title="Estado" type="text" />
        </div>
      </div>

      <div className={` flex-col gap-3 pt-4 ${position == 6 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3">
          {/* <Input name={'id_cab_orden'} defaults={info.length > 0 && info[0].idx ? info[0].idx : null} type="hidden" /> */}
          <Input name={'responsable_estampado'} defaults={info.length > 0 && info[0].responsable_estampado ? info[0].responsable_estampado : null} title="Responsable" type="text" />
          <Input name={'precio_estampado'} defaults={info.length > 0 && info[0].precio_estampado ? info[0].precio_estampado : null} title="Precio" type="number" />
          <Input name={'fec_salida_estampado'} defaults={info.length > 0 && info[0].fec_salida_estampado ? info[0].fec_salida_estampado : null} title="FechaSalida" type="date" />
          <Input name={'guia_salida_estampado'} defaults={info.length > 0 && info[0].guia_salida_estampado ? info[0].guia_salida_estampado : null} title="GuiaSalida" type="text" />
        </div>
        <div className="flex gap-3">
          <Input name={'cantidad_salida_estampado'} defaults={info.length > 0 && info[0].cantidad_salida_estampado ? info[0].cantidad_salida_estampado : null} title="CantidadSalida" type="number" />
          <Input name={'fec_ingreso_estampado'} defaults={info.length > 0 && info[0].fec_ingreso_estampado ? info[0].fec_ingreso_estampado : null} title="FechaIngreso" type="date" />
          <Input name={'guia_ingreso_estampado'} defaults={info.length > 0 && info[0].guia_ingreso_estampado ? info[0].guia_ingreso_estampado : null} title="GuiaIngreso" type="text" />
          <Input name={'cantidad_ingreso_estampado'} defaults={info.length > 0 && info[0].cantidad_ingreso_estampado ? info[0].cantidad_ingreso_estampado : null} title="CantidadIngreso" type="number" />
          <Input name={'fec_termino_estampado'} defaults={info.length > 0 && info[0].fec_termino_estampado ? info[0].fec_termino_estampado : null} title="FechaTermino" type="date" />
        </div>
        <div className="flex gap-3">
          <Input name={'fallas_estampado'} defaults={info.length > 0 && info[0].fallas_estampado ? info[0].fallas_estampado : null} title="FallasEstampado" type="number" />
          <Input name={'fallas_tela_estampado'} defaults={info.length > 0 && info[0].fallas_tela_estampado ? info[0].fallas_tela_estampado : null} title="FallasTelas" type="number" />
          <Input name={'piezas_incomp_estampado'} defaults={info.length > 0 && info[0].piezas_incomp_estampado ? info[0].piezas_incomp_estampado : null} title="PiezasIncompletas" type="number" />
          <Input name={'auditoria_estampado'} defaults={info.length > 0 && info[0].auditoria_estampado ? info[0].auditoria_estampado : null} title="Auditoria" type="text" />
          <Input name={'estado_estampado'} defaults={info.length > 0 && info[0].estado_estampado ? info[0].estado_estampado : null} title="Estado" type="text" />
        </div>
      </div>

      <div className={` flex-col gap-3 pt-4 ${position == 7 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3">
          {/* <Input name={'id_cab_orden'} defaults={info.length > 0 && info[0].idx ? info[0].idx : null} type="hidden" /> */}
          <Input name={'responsable_lavanderia'} defaults={info.length > 0 && info[0].responsable_lavanderia ? info[0].responsable_lavanderia : null} title="Responsable" type="text" />
          <Input name={'precio_lavanderia'} defaults={info.length > 0 && info[0].precio_lavanderia ? info[0].precio_lavanderia : null} title="Precio" type="number" />
          <Input name={'fec_salida_lavanderia'} defaults={info.length > 0 && info[0].fec_salida_lavanderia ? info[0].fec_salida_lavanderia : null} title="FechaSalida" type="date" />
          <Input name={'guia_salida_lavanderia'} defaults={info.length > 0 && info[0].guia_salida_lavanderia ? info[0].guia_salida_lavanderia : null} title="GuiaSalida" type="text" />
        </div>
        <div className="flex gap-3">
          <Input name={'cantidad_salida_lavanderia'} defaults={info.length > 0 && info[0].cantidad_salida_lavanderia ? info[0].cantidad_salida_lavanderia : null} title="CantidadSalida" type="number" />
          <Input name={'fec_ingreso_lavanderia'} defaults={info.length > 0 && info[0].fec_ingreso_lavanderia ? info[0].fec_ingreso_lavanderia : null} title="FechaIngreso" type="date" />
          <Input name={'guia_ingreso_lavanderia'} defaults={info.length > 0 && info[0].guia_ingreso_lavanderia ? info[0].guia_ingreso_lavanderia : null} title="GuiaIngreso" type="text" />
          <Input name={'cantidad_ingreso_lavanderia'} defaults={info.length > 0 && info[0].cantidad_ingreso_lavanderia ? info[0].cantidad_ingreso_lavanderia : null} title="CantidadIngreso" type="number" />
          <Input name={'fec_termino_lavanderia'} defaults={info.length > 0 && info[0].fec_termino_lavanderia ? info[0].fec_termino_lavanderia : null} title="FechaTermino" type="date" />
        </div>
        <div className="flex gap-3">
          <Input name={'fallas_lavanderia'} defaults={info.length > 0 && info[0].fallas_lavanderia ? info[0].fallas_lavanderia : null} title="FallasLavanderia" type="number" />
          <Input name={'fallas_tela_lavanderia'} defaults={info.length > 0 && info[0].fallas_tela_lavanderia ? info[0].fallas_tela_lavanderia : null} title="FallasTelas" type="number" />
          <Input name={'piezas_incomp_lavanderia'} defaults={info.length > 0 && info[0].piezas_incomp_lavanderia ? info[0].piezas_incomp_lavanderia : null} title="PiezasIncompletas" type="number" />
          <Input name={'auditoria_lavanderia'} defaults={info.length > 0 && info[0].auditoria_lavanderia ? info[0].auditoria_lavanderia : null} title="Auditoria" type="text" />
          <Input name={'estado_lavanderia'} defaults={info.length > 0 && info[0].estado_lavanderia ? info[0].estado_lavanderia : null} title="Estado" type="text" />
        </div>
      </div>

      <div className={` flex-col gap-3 pt-4 ${position == 8 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3">
          {/* <Input name={'id_cab_orden'} defaults={info.length > 0 && info[0].idx ? info[0].idx : null} type="hidden" /> */}
          <Input name={'responsable_bordado'} defaults={info.length > 0 && info[0].responsable_bordado ? info[0].responsable_bordado : null} title="Responsable" type="text" />
          <Input name={'precio_bordado'} defaults={info.length > 0 && info[0].precio_bordado ? info[0].precio_bordado : null} title="Precio" type="number" />
          <Input name={'fec_salida_bordado'} defaults={info.length > 0 && info[0].fec_salida_bordado ? info[0].fec_salida_bordado : null} title="FechaSalida" type="date" />
          <Input name={'guia_salida_bordado'} defaults={info.length > 0 && info[0].guia_salida_bordado ? info[0].guia_salida_bordado : null} title="GuiaSalida" type="text" />
        </div>
        <div className="flex gap-3">
          <Input name={'cantidad_salida_bordado'} defaults={info.length > 0 && info[0].cantidad_salida_bordado ? info[0].cantidad_salida_bordado : null} title="CantidadSalida" type="number" />
          <Input name={'fec_ingreso_bordado'} defaults={info.length > 0 && info[0].fec_ingreso_bordado ? info[0].fec_ingreso_bordado : null} title="FechaIngreso" type="date" />
          <Input name={'guia_ingreso_bordado'} defaults={info.length > 0 && info[0].guia_ingreso_bordado ? info[0].guia_ingreso_bordado : null} title="GuiaIngreso" type="text" />
          <Input name={'cantidad_ingreso_bordado'} defaults={info.length > 0 && info[0].cantidad_ingreso_bordado ? info[0].cantidad_ingreso_bordado : null} title="CantidadIngreso" type="number" />
          <Input name={'fec_termino_bordado'} defaults={info.length > 0 && info[0].fec_termino_bordado ? info[0].fec_termino_bordado : null} title="FechaTermino" type="date" />
        </div>
        <div className="flex gap-3">
          <Input name={'fallas_bordado'} defaults={info.length > 0 && info[0].fallas_bordado ? info[0].fallas_bordado : null} title="FallasBordado" type="number" />
          <Input name={'fallas_tela_bordado'} defaults={info.length > 0 && info[0].fallas_tela_bordado ? info[0].fallas_tela_bordado : null} title="FallasTelas" type="number" />
          <Input name={'piezas_incomp_bordado'} defaults={info.length > 0 && info[0].piezas_incomp_bordado ? info[0].piezas_incomp_bordado : null} title="PiezasIncompletas" type="number" />
          <Input name={'auditoria_bordado'} defaults={info.length > 0 && info[0].auditoria_bordado ? info[0].auditoria_bordado : null} title="Auditoria" type="text" />
          <Input name={'estado_bordado'} defaults={info.length > 0 && info[0].estado_bordado ? info[0].estado_bordado : null} title="Estado" type="text" />
        </div>
      </div>

      <div className={` flex-col gap-3 pt-4 ${position == 9 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3">
          {/* <Input name={'id_cab_orden'} defaults={info.length > 0 && info[0].idx ? info[0].idx : null} type="hidden" /> */}
          <Input name={'responsable_acabados'} defaults={info.length > 0 && info[0].responsable_acabados ? info[0].responsable_acabados : null} title="Responsable" type="text" />
          <Input name={'precio_acabados'} defaults={info.length > 0 && info[0].precio_acabados ? info[0].precio_acabados : null} title="Precio" type="number" />
          <Input name={'fec_salida_acabados'} defaults={info.length > 0 && info[0].fec_salida_acabados ? info[0].fec_salida_acabados : null} title="FechaSalida" type="date" />
          <Input name={'guia_salida_acabados'} defaults={info.length > 0 && info[0].guia_salida_acabados ? info[0].guia_salida_acabados : null} title="GuiaSalida" type="text" />
        </div>
        <div className="flex gap-3">
          <Input name={'cantidad_salida_acabados'} defaults={info.length > 0 && info[0].cantidad_salida_acabados ? info[0].cantidad_salida_acabados : null} title="CantidadSalida" type="number" />
          <Input name={'fec_ingreso_acabados'} defaults={info.length > 0 && info[0].fec_ingreso_acabados ? info[0].fec_ingreso_acabados : null} title="FechaIngreso" type="date" />
          <Input name={'guia_ingreso_acabados'} defaults={info.length > 0 && info[0].guia_ingreso_acabados ? info[0].guia_ingreso_acabados : null} title="GuiaIngreso" type="text" />
          <Input name={'cantidad_ingreso_acabados'} defaults={info.length > 0 && info[0].cantidad_ingreso_acabados ? info[0].cantidad_ingreso_acabados : null} title="CantidadIngreso" type="number" />
          <Input name={'fec_termino_acabados'} defaults={info.length > 0 && info[0].fec_termino_acabados ? info[0].fec_termino_acabados : null} title="FechaTermino" type="date" />
        </div>
        <div className="flex gap-3">
          <Input name={'fallas_acabados'} defaults={info.length > 0 && info[0].fallas_acabados ? info[0].fallas_acabados : null} title="FallasAcabados" type="number" />
          <Input name={'fallas_tela_acabados'} defaults={info.length > 0 && info[0].fallas_tela_acabados ? info[0].fallas_tela_acabados : null} title="FallasTelas" type="number" />
          <Input name={'piezas_incomp_acabados'} defaults={info.length > 0 && info[0].piezas_incomp_acabados ? info[0].piezas_incomp_acabados : null} title="PiezasIncompletas" type="number" />
          <Input name={'auditoria_acabados'} defaults={info.length > 0 && info[0].auditoria_acabados ? info[0].auditoria_acabados : null} title="Auditoria" type="text" />
          <Input name={'estado_acabados'} defaults={info.length > 0 && info[0].estado_acabados ? info[0].estado_acabados : null} title="Estado" type="text" />
        </div>
      </div>
    </>
  )
}

export function NuevaOrdenProduccion() {
  const form = useRef()
  const urlparams = useParams()
  const { openModal, config, setOpenloader } = useContext(ModalWindowContext)
  const [orden, setOrden] = useState([])
  const [position, setPosition] = useState(0)
  const navigate = useNavigate()

  const onsubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    data.append('table',listTables[position])
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro del soporte ingresado?</div>,
      action: async () => {
        setOpenloader(true)
        await Consulta({
          url: 'produccion/',
          params: {
            method: 'POST', body: data
          }
        })
          .then(resp => {
            setOpenloader(false)
            navigate("/main/operaciones/inicio")
            toast.success('Soporte guardado con éxito!!', { theme: "colored" })
          })
          .catch((err)=>{
            setOpenloader(false)
            toast.error('Se produjo un error!!', { theme: "colored" })
          })
          .finally(()=>{
            setOpenloader(false)
          })
      }
    })
  }
  // const loadDataForm = (info)=>{
  //   form.current.elements.oc.value = 23424
  // }
  useEffect(()=>{
    if(urlparams.id){
      setOpenloader(true)
      const pp = async () => {
        await Consulta({url: 'produccion/' + urlparams.id,})
          .then(resp => {
            // console.log(resp)
            // setOpenloader(false)
            setOrden(resp)
          })
          .catch((err)=>{
            setOpenloader(false)
            toast.error('Se produjo un error!!', { theme: "colored" })
          })
          .finally(()=>{
            setOpenloader(false)
          })
      }
      pp()
    }
  },[])
  return (
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="pl-2 pr-2 pt-2 h-full">

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-[16px]">Operaciones / Nueva Orden</h2>
              <div className="w-[400px]">
                <Search config={{ width: '200px' }} />
              </div>
            </div>
            <hr />
          </div>

          <div className="text-left overflow-scroll scrollbar-special h-full">
            <ul className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button:hover]:text-gray-700 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button.active:hover]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
              <button className={`group ${position == 0 && 'active'}`} onClick={() => setPosition(0)} data-estado="ALL">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Ordenes
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group flex-row items-center gap-1 ${position == 1 && 'active'}`} onClick={() => setPosition(1)} data-estado="EMIT">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Telas
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group flex-row items-center gap-1 ${position == 2 && 'active'}`} onClick={() => setPosition(2)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Molde
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${position == 3 && 'active'}`} onClick={() => setPosition(3)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Hoja de corte
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${position == 4 && 'active'}`} onClick={() => setPosition(4)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Confeccion
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${position == 5 && 'active'}`} onClick={() => setPosition(5)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Ojal y botón
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${position == 6 && 'active'}`} onClick={() => setPosition(6)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Estampado
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${position == 7 && 'active'}`} onClick={() => setPosition(7)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Lavanderia
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${position == 8 && 'active'}`} onClick={() => setPosition(8)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Bordado
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${position == 9 && 'active'}`} onClick={() => setPosition(9)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Acabados
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
            </ul>
            <hr />
            <form ref={form} onSubmit={onsubmit}>
              <FormFase position={position} info={orden} />
              <div className="flex justify-end gap-2">
                <Button action={() => navigate('/main/operaciones/inicio')} type={'button'} tipo={'default'}>Cancelar</Button>
                <Button type={'submit'} tipo={'accept'}>Guardar</Button>
              </div>
            </form>
            
          </div>

        </div>
      </div>
    </>
  )
}