import { Cartucho } from "./cartucho";
import { Estado } from "./estado";
import { Impresora } from "./impresora";
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
    fechaCreacion: string;
    fecha_actualizacion: string;

}
