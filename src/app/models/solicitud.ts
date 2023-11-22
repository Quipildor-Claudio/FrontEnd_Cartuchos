import { Cartucho } from "./cartucho";
import { Estado } from "./estado";
import { Impresora } from "./impresora";
import { TipoCarga } from "./tipo-carga";
import { User } from "./user";

export class Solicitud {
    id: number;
    observacion: string;
    justificacion: string;
    cantidad: number;
    usuario:User;
    cartuchos: Cartucho[] = [];
    impresora:Impresora[]=[];
    estado: Estado;
    tipoCarga:TipoCarga;
    fechaCreacion: string;
    fecha_actualizacion: string;

}
