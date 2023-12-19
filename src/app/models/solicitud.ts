import { Cartucho } from "./cartucho";
import { Estado } from "./estado";
import { Impresora } from "./impresora";
import { ItemSolicitud } from "./item-solicitud";
import { TipoCarga } from "./tipo-carga";
import { User } from "./user";

export class Solicitud {
    id: number;
    observacion: string;
    justificacion: string;
    total: number;
    usuario:User;
    impresoras:Impresora[]=[];
    estado: Estado;
    itemSolicituds:ItemSolicitud[]=[];
    fechaCreacion: string;
    fecha_actualizacion: string;

}
